const express = require('express');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 8081;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to convert price from API format to ETH string
function convertPrice(apiPrice) {
  const { value, decimals } = apiPrice;
  // Convert the value to ETH by dividing by 10^decimals
  // Since these are very large numbers, we need to handle them as strings
  const divisor = Math.pow(10, decimals);
  
  // Convert value to a number and divide by the divisor
  const ethValue = parseInt(value) / divisor;
  
  // Format to a reasonable number of decimal places
  // Based on the example, we want something like 0.0136 ETH
  return ethValue.toFixed(4);
}

// Function to fetch codex data for a given id
async function fetchCodexData(id) {
  try {
    const response = await fetch(`https://api-staging.moca.qwellco.de/codex/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching codex data for id ${id}:`, error);
    return null;
  }
}

// Function to enrich artwork data with codex information
async function enrichArtworkData(artwork) {
  try {
    const codexData = await fetchCodexData(artwork.id);
    if (codexData && codexData.success && codexData.data) {
      // Replace title with name from codex
      if (codexData.data.name) {
        artwork.title = Array.isArray(codexData.data.name) 
          ? codexData.data.name[0] 
          : codexData.data.name;
      }
      
      // Replace description with biography from codex
      if (codexData.data.description) {
        artwork.description = Array.isArray(codexData.data.description) 
          ? codexData.data.description[0] 
          : codexData.data.description;
      }
      
      // Add confession data from codex if available
      if (codexData.data.confession) {
        artwork.confession = Array.isArray(codexData.data.confession) 
          ? codexData.data.confession[0] 
          : codexData.data.confession;
      }
      
      // Replace image with thumbnail from codex
      if (codexData.data.thumbnail) {
        artwork.image = codexData.data.thumbnail;
      }
    }
    return artwork;
  } catch (error) {
    console.error(`Error enriching artwork data for id ${artwork.id}:`, error);
    return artwork;
  }
}

// API endpoint to get artworks data
app.get('/api/artworks', async (req, res) => {
  try {
    // Fetch data from the listings API directly
    console.log('Fetching data from listings API...');
    const response = await fetch('https://api-staging.moca.qwellco.de/listings');
    const apiData = await response.json();
    
    if (!apiData.success) {
      throw new Error('API request was not successful');
    }
    
    console.log(`Received ${apiData.data.length} artworks from API`);
    
    // Transform API data to match artworks.json structure
    let artworks = apiData.data.map(item => {
      return {
        id: item.tokenId,
        title: "",  // Will be populated from codex
        price: convertPrice(item.price),
        image: "",  // Will be populated from codex
        description: "",  // Will be populated from codex
        confession: ""  // Will be populated from codex
      };
    });
    
    console.log('Enriching artworks with codex data...');
    // Enrich each artwork with codex data
    const enrichedArtworks = [];
    for (const artwork of artworks) {
      const enrichedArtwork = await enrichArtworkData(artwork);
      enrichedArtworks.push(enrichedArtwork);
    }
    
    res.json(enrichedArtworks);
  } catch (error) {
    console.error('Error fetching and processing artworks:', error);
    res.status(500).json({ error: 'Failed to load artworks data' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
