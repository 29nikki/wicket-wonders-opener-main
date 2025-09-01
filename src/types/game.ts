export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type PlayerRole = 'BAT' | 'BOWL' | 'AR' | 'WK';

export interface CricketPlayer {
  id: string;
  name: string;
  role: PlayerRole;
  team: string;
  rating: number;
  rarity: CardRarity;
  stats: {
    batting?: number;
    bowling?: number;
    fielding?: number;
  };
  image: string;
}

export interface CardPack {
  id: string;
  name: string;
  type: 'bronze' | 'silver' | 'gold';
  price: number;
  cardCount: number;
  rarityOdds: {
    common: number;
    rare: number;
    epic: number;
    legendary: number;
  };
}

export interface GameState {
  coins: number;
  collection: CricketPlayer[];
  packsOpened: number;
}