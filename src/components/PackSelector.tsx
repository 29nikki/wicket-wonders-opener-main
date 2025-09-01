import React from 'react';
import { motion } from 'framer-motion';
import { CardPack } from '@/types/game';
import { cardPacks } from '@/data/packs';
import { Button } from '@/components/ui/button';
import { Coins, Info } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { cn } from '@/lib/utils';
import stadiumBg from '@/assets/cricket-stadium-bg.jpg';

interface PackSelectorProps {
  onPackSelect: (pack: CardPack) => void;
}

const packStyles = {
  bronze: {
    bgClass: 'bg-gradient-to-br from-amber-700/20 to-amber-900/20',
    borderClass: 'border-amber-600',
    glowClass: 'hover:shadow-amber-600/30'
  },
  silver: {
    bgClass: 'bg-gradient-to-br from-gray-300/20 to-gray-600/20',
    borderClass: 'border-gray-400',
    glowClass: 'hover:shadow-gray-400/30'
  },
  gold: {
    bgClass: 'bg-gradient-legendary',
    borderClass: 'border-legendary',
    glowClass: 'hover:shadow-legendary'
  }
};

export function PackSelector({ onPackSelect }: PackSelectorProps) {
  const { gameState } = useGame();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Stadium Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ 
          backgroundImage: `url(${stadiumBg})` 
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-cricket bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Wicket Wonders
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Open cricket card packs and build your ultimate team!
          </motion.p>
          
          {/* Coins Display */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-glass border rounded-lg px-4 py-2 mx-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Coins className="w-5 h-5 text-legendary" />
            <span className="font-bold text-lg text-foreground">
              {gameState.coins.toLocaleString()}
            </span>
          </motion.div>
        </div>

        {/* Pack Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
          {cardPacks.map((pack, index) => {
            const styles = packStyles[pack.type];
            const canAfford = gameState.coins >= pack.price;
            
            return (
              <motion.div
                key={pack.id}
                className={cn(
                  "relative p-6 rounded-xl border-2 backdrop-blur-glass",
                  "transition-all duration-300 cursor-pointer",
                  styles.bgClass,
                  styles.borderClass,
                  canAfford ? styles.glowClass : 'opacity-50 cursor-not-allowed',
                  "hover:scale-105 hover:shadow-2xl"
                )}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={canAfford ? { y: -10 } : {}}
                onClick={() => canAfford && onPackSelect(pack)}
              >
                {/* Pack Image/Icon */}
                <div className="text-center mb-4 md:mb-6">
                  <div className={cn(
                    "w-24 h-32 md:w-32 md:h-40 mx-auto rounded-lg flex items-center justify-center text-4xl md:text-6xl font-bold",
                    "bg-gradient-to-b from-card/50 to-card border",
                    styles.borderClass,
                    pack.type === 'gold' && 'animate-glow-pulse'
                  )}>
                    📦
                  </div>
                </div>

                {/* Pack Info */}
                <div className="text-center space-y-3 md:space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">{pack.name}</h3>
                  
                  <div className="flex items-center justify-center gap-2">
                    <Coins className="w-4 h-4 text-legendary" />
                    <span className="text-lg font-semibold text-foreground">
                      {pack.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground">
                    {pack.cardCount} cards per pack
                  </p>

                  {/* Odds Display */}
                  <div className="text-xs text-muted-foreground space-y-1 bg-background/50 rounded-lg p-3">
                    <div className="flex justify-between">
                      <span>Legendary:</span>
                      <span className="text-legendary font-semibold">{pack.rarityOdds.legendary}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Epic:</span>
                      <span className="text-epic font-semibold">{pack.rarityOdds.epic}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rare:</span>
                      <span className="text-rare font-semibold">{pack.rarityOdds.rare}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Common:</span>
                      <span className="text-common font-semibold">{pack.rarityOdds.common}%</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-3 text-base font-semibold"
                    disabled={!canAfford}
                    variant={pack.type === 'gold' ? 'default' : 'secondary'}
                  >
                    {canAfford ? 'Open Pack' : 'Not Enough Coins'}
                  </Button>
                </div>

                {/* Special Effects for Gold Pack */}
                {pack.type === 'gold' && (
                  <>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-legendary rounded-full animate-sparkle" />
                    <div className="absolute top-6 left-4 w-1 h-1 bg-legendary rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-8 right-6 w-1.5 h-1.5 bg-legendary rounded-full animate-sparkle" style={{ animationDelay: '1s' }} />
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}