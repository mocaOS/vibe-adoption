const express = require('express');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 8081;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to extract first element from array or return as-is
function extractValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

// Helper function to build Directus asset URL
function buildAssetUrl(fileId) {
  if (!fileId) return '';
  return `https://api.decc0s.com/assets/${fileId}`;
}

// API endpoint to get artworks data - single optimized Codex API call
app.get('/api/artworks', async (req, res) => {
  try {
    // Fetch the cheapest 10 items directly from Codex API
    // Filter for items with prices, sort by price ascending, limit to 10
    const filter = encodeURIComponent(JSON.stringify({ price: { _nnull: true } }));
    const fields = 'id,name,description,confession,thumbnail,price';
    const codexUrl = `https://api.decc0s.com/items/codex?filter=${filter}&fields=${fields}&sort=price&limit=10`;
    
    console.log('Fetching cheapest 10 artworks from Codex API...');
    const codexResponse = await fetch(codexUrl);
    const codexData = await codexResponse.json();
    
    if (!codexData.data) {
      throw new Error('Codex API request failed');
    }
    
    console.log(`Retrieved ${codexData.data.length} artworks from Codex API`);
    
    // Transform codex data to artwork format
    const artworks = codexData.data.map(item => {
      return {
        id: item.id.toString(),
        title: extractValue(item.name) || `Art DeCC0 #${item.id}`,
        price: item.price || '0.0000',
        image: buildAssetUrl(item.thumbnail),
        description: extractValue(item.description) || '',
        confession: extractValue(item.confession) || ''
      };
    });
    
    console.log(`Successfully processed ${artworks.length} artworks`);
    res.json(artworks);
    
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
