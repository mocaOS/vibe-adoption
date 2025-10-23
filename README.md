# Art DeCC0 Adoption Center

The Art DeCC0 Adoption Center is designed to help you find the perfect Art DeCC0 companion. Browse through currently available Art DeCC0s, learn about their unique characteristics, chat with them to get to know their personality, and when you've found the right match, bring them home with the buy button.

Whether you're a seasoned collector or new to the world of crypto art, our adoption center makes it easy to discover affordable Art DeCC0s that speak to you personally.

## How It Works

1. **Meet** - Browse through the gallery of currently available Art DeCC0s
2. **Learn** - Click on any Art DeCC0 to see detailed information about its unique traits and characteristics
3. **Chat** - Use the chat button to interact with an Art DeCC0 and get to know its personality
4. **Buy** - When you've found the perfect companion, hit the buy button to bring them home

## Features

- Real-time artwork data aggregation from MOCA's APIs
- Dynamic pricing information for each Art DeCC0
- Detailed artwork information including titles and descriptions
- Horizontal scrolling gallery with smooth navigation
- Dark mode interface for optimal viewing
- Responsive design that works on all device sizes
- Detailed modal view for each Art DeCC0
- "Chat" and "Buy" buttons linking to museumofcryptoart.com

## About Art DeCC0s

Art DeCC0s are unique digital avatars that represent the intersection of crypto art history and cutting-edge AI generation. Each DeCC0 is a 1-of-1 piece created through a complex generative process that combines four distinct DNA traits:

1. **Lineage** - Historical art collectors and patrons that shaped crypto art culture
2. **Memetics** - Influential memes and iconic crypto art projects
3. **Artist Self-Portraits** - Famous self-portraits from art history to contemporary crypto artists
4. **MOCA Collection Works** - Pieces from MOCA's extensive crypto art collections

The collection features 10,000 unique characters placed on 10,000 unique backgrounds representing 16 different artistic styles from cave paintings to cubism.

## Enhanced Navigation

- **Mouse Wheel Scrolling**: Scroll horizontally using the mouse wheel
- **Arrow Key Navigation**: Use left/right arrow keys to navigate
- **Navigation Arrows**: Click the directional arrows on both sides of the gallery
- **Touch Scrolling**: Natural touch scrolling on mobile devices

## Real-time Data Updates

The adoption center fetches the latest Art DeCC0 listings every minute from MOCA's APIs, ensuring you always have access to the most current available artworks. Data is aggregated from multiple sources:

1. **Listings API** - Updated every minute with the latest available Art DeCC0s
2. **Codex API** - Provides detailed artwork information including titles, descriptions, and images
3. **Real-time Aggregation** - Data is processed and combined to create complete artwork profiles

## Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Production Mode
To start the application in production mode:
```bash
npm start
```

The application will be available at http://localhost:8081

### Development Mode
To start the application in development mode with auto-reload:
```bash
npm run dev
```

## Project Structure

- `server.js` - Main server file that fetches and aggregates Art DeCC0 data from MOCA's external APIs
- `public/` - Static files directory
  - `index.html` - Main gallery page
  - `styles.css` - Styling for the gallery (dark mode)
  - `script.js` - Client-side JavaScript with enhanced scrolling
  - `img/` - Artwork images

## How Art DeCC0s Are Created

Art DeCC0s were created through an intensive 6-month process involving:

- Over 300,000 AI-generated characters
- 10,000 unique backgrounds across 16 artistic styles
- Complex DNA combination system using four distinct trait categories
- Extensive curation process to select the final 10,000 pieces
- Technical innovation in AI generation and workflow automation

Each Art DeCC0 is truly unique, with no two pieces looking exactly alike even when sharing the same DNA traits.

## Customization

To change the links for the "Chat" and "Buy" buttons, modify the `href` attributes in `public/index.html`.
