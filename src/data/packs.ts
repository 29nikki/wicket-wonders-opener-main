import { CardPack } from '@/types/game';

export const cardPacks: CardPack[] = [
  {
    id: 'bronze',
    name: 'Bronze Pack',
    type: 'bronze',
    price: 1000,
    cardCount: 5,
    rarityOdds: {
      common: 70,
      rare: 25,
      epic: 4.5,
      legendary: 0.5
    }
  },
  {
    id: 'silver',
    name: 'Silver Pack',
    type: 'silver',
    price: 2500,
    cardCount: 5,
    rarityOdds: {
      common: 40,
      rare: 45,
      epic: 13,
      legendary: 2
    }
  },
  {
    id: 'gold',
    name: 'Gold Pack',
    type: 'gold',
    price: 5000,
    cardCount: 5,
    rarityOdds: {
      common: 20,
      rare: 50,
      epic: 25,
      legendary: 5
    }
  }
];

export const getPackById = (id: string): CardPack | undefined => {
  return cardPacks.find(pack => pack.id === id);
};