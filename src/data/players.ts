import { CricketPlayer, CardRarity } from '@/types/game';

// Import player images
import viratKohliImg from '@/assets/players/virat-kohli.jpg';
import msDhoniImg from '@/assets/players/ms-dhoni.jpg';
import rohitSharmaImg from '@/assets/players/rohit-sharma.jpg';
import jaspritBumrahImg from '@/assets/players/jasprit-bumrah.jpg';
import hardikPandyaImg from '@/assets/players/hardik-pandya.jpg';
import steveSmithImg from '@/assets/players/steve-smith.jpg';
import joeRootImg from '@/assets/players/joe-root.jpg';
import babarAzamImg from '@/assets/players/babar-azam.jpg';
import abDeVilliersImg from '@/assets/players/ab-de-villiers.jpg';
import chrisGayleImg from '@/assets/players/chris-gayle.jpg';

export const cricketPlayers: CricketPlayer[] = [
  // Legendary Players
  {
    id: '1',
    name: 'Virat Kohli',
    role: 'BAT',
    team: 'India',
    rating: 98,
    rarity: 'legendary',
    stats: { batting: 96, fielding: 85 },
    image: viratKohliImg
  },
  {
    id: '2',
    name: 'MS Dhoni',
    role: 'WK',
    team: 'India',
    rating: 97,
    rarity: 'legendary',
    stats: { batting: 88, fielding: 95 },
    image: msDhoniImg
  },
  {
    id: '3',
    name: 'Babar Azam',
    role: 'BAT',
    team: 'Pakistan',
    rating: 96,
    rarity: 'legendary',
    stats: { batting: 94, fielding: 82 },
    image: babarAzamImg
  },
  {
    id: '4',
    name: 'AB de Villiers',
    role: 'BAT',
    team: 'South Africa',
    rating: 95,
    rarity: 'legendary',
    stats: { batting: 93, fielding: 88 },
    image: abDeVilliersImg
  },

  // Epic Players
  {
    id: '5',
    name: 'Rohit Sharma',
    role: 'BAT',
    team: 'India',
    rating: 92,
    rarity: 'epic',
    stats: { batting: 91, fielding: 78 },
    image: rohitSharmaImg
  },
  {
    id: '6',
    name: 'Jasprit Bumrah',
    role: 'BOWL',
    team: 'India',
    rating: 94,
    rarity: 'epic',
    stats: { bowling: 96, fielding: 75 },
    image: jaspritBumrahImg
  },
  {
    id: '7',
    name: 'Steve Smith',
    role: 'BAT',
    team: 'Australia',
    rating: 93,
    rarity: 'epic',
    stats: { batting: 95, fielding: 88 },
    image: steveSmithImg
  },
  {
    id: '8',
    name: 'Joe Root',
    role: 'BAT',
    team: 'England',
    rating: 91,
    rarity: 'epic',
    stats: { batting: 89, fielding: 80 },
    image: joeRootImg
  },

  // Rare Players
  {
    id: '9',
    name: 'Hardik Pandya',
    role: 'AR',
    team: 'India',
    rating: 87,
    rarity: 'rare',
    stats: { batting: 82, bowling: 79, fielding: 85 },
    image: hardikPandyaImg
  },
  {
    id: '10',
    name: 'Chris Gayle',
    role: 'BAT',
    team: 'West Indies',
    rating: 88,
    rarity: 'rare',
    stats: { batting: 90, fielding: 72 },
    image: chrisGayleImg
  },
  {
    id: '11',
    name: 'Jos Buttler',
    role: 'WK',
    team: 'England',
    rating: 86,
    rarity: 'rare',
    stats: { batting: 82, fielding: 85 },
    image: '/api/placeholder/200/280'
  },
  {
    id: '12',
    name: 'David Warner',
    role: 'BAT',
    team: 'Australia',
    rating: 89,
    rarity: 'rare',
    stats: { batting: 87, fielding: 75 },
    image: '/api/placeholder/200/280'
  },

  // Common Players
  {
    id: '13',
    name: 'Shikhar Dhawan',
    role: 'BAT',
    team: 'India',
    rating: 82,
    rarity: 'common',
    stats: { batting: 80, fielding: 70 },
    image: '/api/placeholder/200/280'
  },
  {
    id: '14',
    name: 'Mohammed Shami',
    role: 'BOWL',
    team: 'India',
    rating: 81,
    rarity: 'common',
    stats: { bowling: 83, fielding: 65 },
    image: '/api/placeholder/200/280'
  },
  {
    id: '15',
    name: 'Fakhar Zaman',
    role: 'BAT',
    team: 'Pakistan',
    rating: 78,
    rarity: 'common',
    stats: { batting: 76, fielding: 68 },
    image: '/api/placeholder/200/280'
  },
  {
    id: '16',
    name: 'Chris Jordan',
    role: 'AR',
    team: 'England',
    rating: 79,
    rarity: 'common',
    stats: { batting: 65, bowling: 75, fielding: 82 },
    image: '/api/placeholder/200/280'
  },
  {
    id: '17',
    name: 'Mitchell Starc',
    role: 'BOWL',
    team: 'Australia',
    rating: 85,
    rarity: 'rare',
    stats: { bowling: 87, fielding: 70 },
    image: '/api/placeholder/200/280'
  },
  {
    id: '18',
    name: 'Quinton de Kock',
    role: 'WK',
    team: 'South Africa',
    rating: 84,
    rarity: 'rare',
    stats: { batting: 83, fielding: 80 },
    image: '/api/placeholder/200/280'
  },
  {
    id: '19',
    name: 'Trent Boult',
    role: 'BOWL',
    team: 'New Zealand',
    rating: 86,
    rarity: 'rare',
    stats: { bowling: 85, fielding: 72 },
    image: '/api/placeholder/200/280'
  },
  {
    id: '20',
    name: 'Aaron Finch',
    role: 'BAT',
    team: 'Australia',
    rating: 80,
    rarity: 'common',
    stats: { batting: 78, fielding: 70 },
    image: '/api/placeholder/200/280'
  }
];

export const getRandomPlayer = (rarity?: CardRarity): CricketPlayer => {
  const playersOfRarity = rarity 
    ? cricketPlayers.filter(p => p.rarity === rarity)
    : cricketPlayers;
  
  return playersOfRarity[Math.floor(Math.random() * playersOfRarity.length)];
};

export const getPlayersByRarity = (rarity: CardRarity): CricketPlayer[] => {
  return cricketPlayers.filter(p => p.rarity === rarity);
};