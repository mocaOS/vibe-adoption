# Art DeCC0 Adoption Center

The Art DeCC0 Adoption Center is designed to help you find the perfect Art DeCC0 companion. Browse through currently available Art DeCC0s, learn about their unique characteristics, and when you've found the right match, bring them home.

Whether you're a seasoned collector or new to the world of crypto art, our adoption center makes it easy to discover affordable Art DeCC0s that speak to you personally.

## How It Works

1. **Browse** - Scroll through the gallery of the 10 cheapest currently available Art DeCC0s
2. **Learn** - Click on any Art DeCC0 to see detailed information including their biography and confession
3. **Explore** - Visit the Codex to learn more about each character's rich backstory
4. **Adopt** - When you've found the perfect companion, hit the buy button to bring them home

## Features

- **Real-time Data** - Fetches the 10 cheapest listings from MOCA's marketplace
- **Rich Metadata** - Integrates with the [MOCA Codex API](https://github.com/mocaOS/codex) for detailed character information
- **Optimized Performance** - Single API call for all artwork data with sorting and filtering
- **Beautiful Gallery** - Horizontal scrolling with smooth navigation and momentum
- **Dark Mode Interface** - Optimized for comfortable viewing
- **Detailed Modal View** - Full character biography, confession, and artwork details
- **Direct Links** - Quick access to Codex profiles and marketplace listings

## About Art DeCC0s

Art DeCC0s are unique digital avatars that represent the intersection of crypto art history and cutting-edge AI generation. Each DeCC0 is a 1-of-1 piece with a rich backstory, personality, and visual identity.

The collection features 10,000 unique characters, each with:
- **Detailed Biography** - Background story and personality traits
- **Personal Confession** - First-person narrative revealing their inner world
- **Visual Identity** - Unique character design on custom background
- **Cultural Heritage** - Diverse global influences and philosophical perspectives

Learn more about the Art DeCC0 collection and explore the full Codex at [docs.decc0s.com](https://docs.decc0s.com).

## Navigation

- **Mouse Wheel Scrolling** - Scroll horizontally using the mouse wheel with momentum
- **Arrow Key Navigation** - Use left/right arrow keys to navigate
- **Navigation Arrows** - Click the directional arrows on both sides of the gallery
- **Touch Scrolling** - Natural touch scrolling on mobile devices

## Technical Architecture

### API Integration

This application uses the **MOCA Codex API** (`https://api.decc0s.com/items/codex`) to provide real-time marketplace data:

- **Directus-based API** - Powerful headless CMS with advanced querying capabilities
- **Single Optimized Query** - Fetches the 10 cheapest listings with all metadata in one call
- **Built-in Filtering** - `filter[price][_nnull]=true` to get only listed items
- **Native Sorting** - `sort=price` to get cheapest items first
- **Field Selection** - `fields=id,name,description,confession,thumbnail,price` for minimal payload
- **Documentation**: [docs.decc0s.com](https://docs.decc0s.com)
- **Source Code**: [github.com/mocaOS/codex](https://github.com/mocaOS/codex)

### Performance Optimization

The application uses an ultra-efficient data fetching strategy:
- **1 Total API Call** - Single request gets everything (vs 11+ in previous implementations)
- **Server-Side Filtering** - Database-level filtering for items with prices
- **Server-Side Sorting** - Database-level sorting by price (ascending)
- **Minimal Payload** - Only fetches the exact fields needed
- **No Post-Processing** - Data comes pre-sorted and filtered from the API

### Data Flow

```
Codex API (filter + sort + limit) → Enriched Artworks → Client
           ↓                              ↓
    Full metadata                  Gallery display
    (10 cheapest items)
```

## Getting Started

### Prerequisites

- Node.js v22.18.0 (specified in `.nvmrc`)
- npm (comes with Node.js)

**Note:** This project requires Node.js version 22.18.0. If you use nvm, run `nvm use` in the project directory.

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd vibe-adoption

# Install dependencies
npm install
```

### Running the Application

**Production Mode:**
```bash
npm start
```

**Development Mode** (with auto-reload):
```bash
npm run dev
```

The application will be available at `http://localhost:8081`

## Project Structure

```
vibe-adoption/
├── server.js           # Express server with optimized API integration
├── public/
│   ├── index.html      # Main gallery page
│   ├── styles.css      # Dark mode styling
│   ├── script.js       # Client-side gallery interactions
│   └── img/            # Static assets
├── package.json        # Dependencies and scripts
└── llm.json           # OpenAPI documentation for Codex API
```

## API Documentation

For detailed information about the MOCA Codex API:
- **Documentation**: [docs.decc0s.com](https://docs.decc0s.com)
- **Source Code**: [github.com/mocaOS/codex](https://github.com/mocaOS/codex)
- **OpenAPI Spec**: See `llm.json` in this repository

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
