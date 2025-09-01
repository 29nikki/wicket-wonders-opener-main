import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardPack, CricketPlayer, CardRarity } from '@/types/game';
import { CricketCard } from './CricketCard';
import { getRandomPlayer } from '@/data/players';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface PackOpeningProps {
  pack: CardPack;
  onComplete: () => void;
}

export function PackOpening({ pack, onComplete }: PackOpeningProps) {
  const [phase, setPhase] = useState<'shaking' | 'opening' | 'revealing' | 'complete'>('shaking');
  const [revealedCards, setRevealedCards] = useState<CricketPlayer[]>([]);
  const [currentRevealIndex, setCurrentRevealIndex] = useState(0);
  const [packCards, setPackCards] = useState<CricketPlayer[]>([]);
  const { addPlayerToCollection, spendCoins, incrementPacksOpened } = useGame();

  // Generate cards based on pack odds
  const generatePackCards = (): CricketPlayer[] => {
    const cards: CricketPlayer[] = [];
    
    for (let i = 0; i < pack.cardCount; i++) {
      const random = Math.random() * 100;
      let rarity: CardRarity;
      
      if (random <= pack.rarityOdds.legendary) {
        rarity = 'legendary';
      } else if (random <= pack.rarityOdds.legendary + pack.rarityOdds.epic) {
        rarity = 'epic';
      } else if (random <= pack.rarityOdds.legendary + pack.rarityOdds.epic + pack.rarityOdds.rare) {
        rarity = 'rare';
      } else {
        rarity = 'common';
      }
      
      cards.push(getRandomPlayer(rarity));
    }
    
    return cards;
  };

  // Initialize pack opening
  useEffect(() => {
    const cards = generatePackCards();
    setPackCards(cards);
    
    // Deduct coins and increment counter
    spendCoins(pack.price);
    incrementPacksOpened();

    // Shaking phase
    const shakeTimer = setTimeout(() => {
      setPhase('opening');
      
      // Opening animation
      const openTimer = setTimeout(() => {
        setPhase('revealing');
      }, 1000);
      
      return () => clearTimeout(openTimer);
    }, 2000);

    return () => clearTimeout(shakeTimer);
  }, []);

  // Handle card revealing sequence
  useEffect(() => {
    if (phase === 'revealing' && currentRevealIndex < packCards.length) {
      const timer = setTimeout(() => {
        const newCard = packCards[currentRevealIndex];
        setRevealedCards(prev => [...prev, newCard]);
        addPlayerToCollection(newCard);
        setCurrentRevealIndex(prev => prev + 1);
        
        // Add delay for rare+ cards
        const delay = newCard.rarity !== 'common' ? 1500 : 800;
        
        if (currentRevealIndex === packCards.length - 1) {
          setTimeout(() => setPhase('complete'), delay);
        }
      }, currentRevealIndex === 0 ? 500 : 1200);
      
      return () => clearTimeout(timer);
    }
  }, [phase, currentRevealIndex, packCards]);

  const hasRareCard = packCards.some(card => card.rarity !== 'common');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: phase === 'revealing' && hasRareCard 
            ? 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(0,0,0,0.9) 100%)'
            : 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)'
        }}
        transition={{ duration: 1 }}
      />

      <AnimatePresence mode="wait">
        {/* Shaking Pack */}
        {phase === 'shaking' && (
          <motion.div
            key="pack-shake"
            className="text-center"
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div
              className="w-64 h-80 bg-gradient-pack border-2 border-primary rounded-xl flex items-center justify-center text-8xl mx-auto mb-8"
              animate={{ x: [-2, 2, -2, 2, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 0.2,
                ease: "easeInOut"
              }}
            >
              📦
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground">
              Opening {pack.name}...
            </h2>
          </motion.div>
        )}

        {/* Pack Opening Animation */}
        {phase === 'opening' && (
          <motion.div
            key="pack-open"
            className="text-center"
            initial={{ scale: 1 }}
            animate={{ scale: 1.2, rotateY: 180 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-64 h-80 bg-gradient-pack border-2 border-primary rounded-xl flex items-center justify-center text-8xl mx-auto">
              ✨
            </div>
          </motion.div>
        )}

        {/* Card Revealing */}
        {phase === 'revealing' && (
          <motion.div
            key="revealing"
            className="w-full max-w-6xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 justify-items-center">
              {packCards.map((card, index) => (
                <div key={index} className="relative">
                  {index < revealedCards.length ? (
                    <CricketCard 
                      player={card} 
                      isRevealing={index === revealedCards.length - 1}
                    />
                  ) : (
                    <motion.div
                      className="w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 bg-card border-2 border-border rounded-xl flex items-center justify-center"
                      animate={{ rotateY: [0, 5, -5, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="text-3xl sm:text-4xl md:text-6xl">🎴</div>
                    </motion.div>
                  )}
                  
                  {/* Special effects for rare cards */}
                  {index < revealedCards.length && card.rarity !== 'common' && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="absolute top-2 right-2 w-6 h-6 text-legendary animate-sparkle" />
                      <Sparkles className="absolute bottom-4 left-4 w-4 h-4 text-legendary animate-sparkle" style={{ animationDelay: '0.5s' }} />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Complete Phase */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            className="text-center w-full max-w-6xl mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 md:mb-8 text-center px-4">
              Pack Opened Successfully! 🎉
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 justify-items-center mb-6 md:mb-8">
              {revealedCards.map((card, index) => (
                <CricketCard key={index} player={card} />
              ))}
            </div>

            {/* Pack Summary */}
            <div className="bg-card/80 backdrop-blur-glass border rounded-lg p-4 md:p-6 mb-6 md:mb-8 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-foreground mb-4 text-center">Pack Summary</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(
                  revealedCards.reduce((acc, card) => {
                    acc[card.rarity] = (acc[card.rarity] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([rarity, count]) => (
                  <div key={rarity} className="flex justify-between">
                    <span className="capitalize text-muted-foreground">{rarity}:</span>
                    <span className={`font-semibold ${
                      rarity === 'legendary' ? 'text-legendary' :
                      rarity === 'epic' ? 'text-epic' :
                      rarity === 'rare' ? 'text-rare' : 'text-common'
                    }`}>
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={onComplete} 
              size="lg" 
              className="text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 bg-gradient-cricket text-white font-bold border-2 border-legendary shadow-2xl hover:shadow-legendary hover:scale-105 transition-all duration-300 relative z-10 mx-4"
            >
              Continue
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}