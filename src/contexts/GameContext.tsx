import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CricketPlayer, GameState } from '@/types/game';

interface GameContextType {
  gameState: GameState;
  addPlayerToCollection: (player: CricketPlayer) => void;
  spendCoins: (amount: number) => void;
  addCoins: (amount: number) => void;
  incrementPacksOpened: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

type GameAction = 
  | { type: 'ADD_PLAYER'; player: CricketPlayer }
  | { type: 'SPEND_COINS'; amount: number }
  | { type: 'ADD_COINS'; amount: number }
  | { type: 'INCREMENT_PACKS' }
  | { type: 'RESET_GAME' }
  | { type: 'LOAD_STATE'; state: GameState };

const initialState: GameState = {
  coins: 10000, // Starting coins
  collection: [],
  packsOpened: 0
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        ...state,
        collection: [...state.collection, action.player]
      };
    case 'SPEND_COINS':
      return {
        ...state,
        coins: Math.max(0, state.coins - action.amount)
      };
    case 'ADD_COINS':
      return {
        ...state,
        coins: state.coins + action.amount
      };
    case 'INCREMENT_PACKS':
      return {
        ...state,
        packsOpened: state.packsOpened + 1
      };
    case 'RESET_GAME':
      return initialState;
    case 'LOAD_STATE':
      return action.state;
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('cricket-game-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', state: parsedState });
      } catch (error) {
        console.error('Error loading game state:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('cricket-game-state', JSON.stringify(gameState));
  }, [gameState]);

  const addPlayerToCollection = (player: CricketPlayer) => {
    dispatch({ type: 'ADD_PLAYER', player });
  };

  const spendCoins = (amount: number) => {
    dispatch({ type: 'SPEND_COINS', amount });
  };

  const addCoins = (amount: number) => {
    dispatch({ type: 'ADD_COINS', amount });
  };

  const incrementPacksOpened = () => {
    dispatch({ type: 'INCREMENT_PACKS' });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
    localStorage.removeItem('cricket-game-state');
  };

  return (
    <GameContext.Provider value={{
      gameState,
      addPlayerToCollection,
      spendCoins,
      addCoins,
      incrementPacksOpened,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}