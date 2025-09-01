import React from 'react';
import { motion } from 'framer-motion';
import { CricketPlayer, CardRarity } from '@/types/game';
import { cn } from '@/lib/utils';

interface CricketCardProps {
  player: CricketPlayer;
  isRevealing?: boolean;
  onRevealComplete?: () => void;
}

const rarityConfig = {
  common: {
    borderClass: 'border-common',
    glowClass: 'shadow-none',
    bgClass: 'bg-card',
    textClass: 'text-common'
  },
  rare: {
    borderClass: 'border-rare',
    glowClass: 'shadow-rare',
    bgClass: 'bg-gradient-rare',
    textClass: 'text-rare-glow'
  },
  epic: {
    borderClass: 'border-epic',
    glowClass: 'shadow-epic',
    bgClass: 'bg-gradient-epic',
    textClass: 'text-epic-glow'
  },
  legendary: {
    borderClass: 'border-legendary',
    glowClass: 'shadow-legendary',
    bgClass: 'bg-gradient-legendary',
    textClass: 'text-legendary-glow'
  }
};

const roleColors = {
  BAT: 'text-blue-400',
  BOWL: 'text-red-400',
  AR: 'text-purple-400',
  WK: 'text-green-400'
};

export function CricketCard({ player, isRevealing = false, onRevealComplete }: CricketCardProps) {
  const config = rarityConfig[player.rarity];
  
  return (
    <motion.div
      className={cn(
        "relative w-32 h-48 sm:w-36 sm:h-54 md:w-40 md:h-60 lg:w-48 lg:h-72 rounded-lg md:rounded-xl border-2 overflow-hidden",
        "backdrop-blur-glass bg-card/80",
        config.borderClass,
        config.glowClass,
        player.rarity !== 'common' && 'animate-glow-pulse'
      )}
      initial={isRevealing ? { rotateY: 180, scale: 0.8 } : { scale: 1 }}
      animate={isRevealing ? { rotateY: 0, scale: 1 } : { scale: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        onComplete: onRevealComplete
      }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      {/* Rarity Background */}
      <div className={cn(
        "absolute inset-0 opacity-20",
        config.bgClass
      )} />
      
      {/* Sparkle Effects for Rare+ Cards */}
      {player.rarity !== 'common' && (
        <>
          <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-sparkle" />
          <div className="absolute top-8 left-6 w-1 h-1 bg-white rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-12 right-8 w-1.5 h-1.5 bg-white rounded-full animate-sparkle" style={{ animationDelay: '1s' }} />
        </>
      )}

      {/* Player Image */}
      <div className="relative h-20 sm:h-24 md:h-32 lg:h-40 bg-gradient-to-b from-muted/50 to-transparent">
        <img 
          src={player.image} 
          alt={player.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      {/* Card Content */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-card to-transparent">
        {/* Rarity Badge */}
        <div className={cn(
          "inline-block px-1 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-bold mb-1 sm:mb-2 uppercase tracking-wide",
          config.textClass,
          config.bgClass
        )}>
          {player.rarity}
        </div>

        {/* Player Name */}
        <h3 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-foreground mb-1 truncate">
          {player.name}
        </h3>

        {/* Team and Role */}
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="text-xs sm:text-sm text-muted-foreground truncate">{player.team}</span>
          <span className={cn("text-xs sm:text-sm font-semibold", roleColors[player.role])}>
            {player.role}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs sm:text-sm text-muted-foreground">OVR</span>
          <span className="text-sm sm:text-lg md:text-xl font-bold text-foreground">{player.rating}</span>
        </div>

        {/* Stats */}
        <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-2">
          {player.stats.batting && (
            <div className="text-center flex-1">
              <div className="text-xs text-muted-foreground">BAT</div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">{player.stats.batting}</div>
            </div>
          )}
          {player.stats.bowling && (
            <div className="text-center flex-1">
              <div className="text-xs text-muted-foreground">BWL</div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">{player.stats.bowling}</div>
            </div>
          )}
          {player.stats.fielding && (
            <div className="text-center flex-1">
              <div className="text-xs text-muted-foreground">FLD</div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">{player.stats.fielding}</div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}