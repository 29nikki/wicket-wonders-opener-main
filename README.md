# 🏏 Wicket Wonders Opener

A modern, interactive cricket card pack opening experience built with React, TypeScript, and Tailwind CSS. Collect legendary cricket players and build your ultimate team through an engaging pack opening system.

![Wicket Wonders](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite)

## ✨ Features

### 🎮 Core Gameplay

- **Card Pack Opening**: Open bronze, silver, and gold packs with different rarity odds
- **Player Collection**: Collect cricket players from various teams and roles
- **Rarity System**: 4-tier rarity system (Common, Rare, Epic, Legendary)
- **Virtual Economy**: Coin-based system for purchasing packs
- **Progress Tracking**: Monitor your collection size and packs opened

### 🎨 Visual Experience

- **Stunning UI**: Modern, responsive design with cricket stadium background
- **Card Animations**: Smooth card flip animations and pack opening effects
- **Rarity Visuals**: Color-coded cards with glowing effects for different rarities
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Dark/Light Theme**: Built-in theme support with shadcn/ui components

### 🏏 Cricket Content

- **Real Players**: Features actual cricket players from international teams
- **Player Roles**: BAT (Batsman), BOWL (Bowler), AR (All-Rounder), WK (Wicket-Keeper)
- **Player Stats**: Detailed batting, bowling, and fielding statistics
- **Team Diversity**: Players from India, Pakistan, Australia, England, South Africa, and more

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/wicket-wonders-opener.git
   cd wicket-wonders-opener
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start playing!

### Building for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

## 🎯 How to Play

### Main Menu

- **Open Card Packs**: Purchase and open different types of card packs
- **My Collection**: View all collected players and their statistics
- **Player Stats**: Track your coins, collection size, and packs opened

### Pack Types

| Pack Type | Price | Common | Rare | Epic | Legendary |
| --------- | ----- | ------ | ---- | ---- | --------- |
| Bronze    | 1,000 | 70%    | 25%  | 4.5% | 0.5%      |
| Silver    | 2,500 | 40%    | 45%  | 13%  | 2%        |
| Gold      | 5,000 | 20%    | 50%  | 25%  | 5%        |

### Player Rarities

- **Common** (Gray): Basic players with lower ratings
- **Rare** (Blue): Skilled players with good statistics
- **Epic** (Purple): Elite players with excellent performance
- **Legendary** (Orange): World-class players with outstanding stats

## 🛠️ Technical Stack

### Frontend Framework

- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript 5.8.3**: Type-safe development experience
- **Vite 5.4.19**: Fast build tool and development server

### UI & Styling

- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **Framer Motion**: Smooth animations and transitions

### State Management

- **React Context**: Global game state management
- **Local Storage**: Persistent game progress
- **React Query**: Data fetching and caching

### Development Tools

- **ESLint**: Code linting and quality
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Collection.tsx  # Collection view component
│   ├── CricketCard.tsx # Player card component
│   ├── PackOpening.tsx # Pack opening animation
│   └── PackSelector.tsx # Pack selection interface
├── contexts/           # React contexts
│   └── GameContext.tsx # Game state management
├── data/              # Static data
│   ├── packs.ts       # Pack configurations
│   └── players.ts     # Player data
├── hooks/             # Custom React hooks
├── pages/             # Page components
│   ├── Index.tsx      # Main game page
│   └── NotFound.tsx   # 404 page
├── types/             # TypeScript type definitions
│   └── game.ts        # Game-related types
└── assets/            # Static assets
    ├── players/       # Player images
    └── cricket-stadium-bg.jpg
```

## 🎨 Customization

### Adding New Players

Edit `src/data/players.ts` to add new cricket players:

```typescript
{
  id: 'unique-id',
  name: 'Player Name',
  role: 'BAT' | 'BOWL' | 'AR' | 'WK',
  team: 'Country',
  rating: 85,
  rarity: 'common' | 'rare' | 'epic' | 'legendary',
  stats: {
    batting: 80,
    bowling: 75,
    fielding: 70
  },
  image: playerImage
}
```

### Modifying Pack Odds

Edit `src/data/packs.ts` to adjust pack probabilities and pricing.

### Styling Customization

- Modify `tailwind.config.ts` for theme customization
- Update CSS variables in `src/index.css` for color schemes
- Customize animations in the Tailwind config

## 🎮 Game Features

### Player Collection System

- Collect players from different teams and roles
- View detailed player statistics
- Track collection progress

### Pack Opening Mechanics

- Realistic pack opening animations
- Rarity-based card distribution
- Coin economy system

### Progress Persistence

- Automatic save to local storage
- Game state restoration on reload
- Progress tracking across sessions

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

### Other Platforms

The project can be deployed to any static hosting service that supports React applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Cricket player images and data
- shadcn/ui for the excellent component library
- Radix UI for accessible primitives
- The React and TypeScript communities

## 📞 Support

If you have any questions or need help with the project, please open an issue on GitHub or contact the maintainers.

---

**Happy collecting! 🏏✨**
