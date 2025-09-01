import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CricketCard } from './CricketCard';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CardRarity, PlayerRole } from '@/types/game';
import { ArrowLeft, Search, Filter } from 'lucide-react';

interface CollectionProps {
  onBack: () => void;
}

export function Collection({ onBack }: CollectionProps) {
  const { gameState } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState<CardRarity | 'all'>('all');
  const [roleFilter, setRoleFilter] = useState<PlayerRole | 'all'>('all');

  // Filter and search logic
  const filteredCards = gameState.collection.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = rarityFilter === 'all' || card.rarity === rarityFilter;
    const matchesRole = roleFilter === 'all' || card.role === roleFilter;
    
    return matchesSearch && matchesRarity && matchesRole;
  });

  // Get collection stats
  const stats = {
    total: gameState.collection.length,
    legendary: gameState.collection.filter(c => c.rarity === 'legendary').length,
    epic: gameState.collection.filter(c => c.rarity === 'epic').length,
    rare: gameState.collection.filter(c => c.rarity === 'rare').length,
    common: gameState.collection.filter(c => c.rarity === 'common').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center gap-2 md:gap-4 mb-4 flex-wrap">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2 text-sm md:text-base">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Collection</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="bg-background/80 rounded-lg px-3 py-2 border text-center md:text-left">
              <span className="text-xs md:text-sm text-muted-foreground block md:inline">Total:</span>
              <span className="ml-0 md:ml-2 font-bold text-foreground block md:inline">{stats.total}</span>
            </div>
            <div className="bg-background/80 rounded-lg px-3 py-2 border text-center md:text-left">
              <span className="text-xs md:text-sm text-legendary block md:inline">Legend:</span>
              <span className="ml-0 md:ml-2 font-bold text-legendary block md:inline">{stats.legendary}</span>
            </div>
            <div className="bg-background/80 rounded-lg px-3 py-2 border text-center md:text-left">
              <span className="text-xs md:text-sm text-epic block md:inline">Epic:</span>
              <span className="ml-0 md:ml-2 font-bold text-epic block md:inline">{stats.epic}</span>
            </div>
            <div className="bg-background/80 rounded-lg px-3 py-2 border text-center md:text-left">
              <span className="text-xs md:text-sm text-rare block md:inline">Rare:</span>
              <span className="ml-0 md:ml-2 font-bold text-rare block md:inline">{stats.rare}</span>
            </div>
            <div className="bg-background/80 rounded-lg px-3 py-2 border text-center md:text-left col-span-2 md:col-span-1">
              <span className="text-xs md:text-sm text-common block md:inline">Common:</span>
              <span className="ml-0 md:ml-2 font-bold text-common block md:inline">{stats.common}</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={rarityFilter} onValueChange={(value) => setRarityFilter(value as CardRarity | 'all')}>
                <SelectTrigger className="w-full md:w-32 bg-background">
                  <SelectValue placeholder="Rarity" />
                </SelectTrigger>
                <SelectContent className="bg-background border">
                  <SelectItem value="all">All Rarities</SelectItem>
                  <SelectItem value="legendary">Legendary</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                </SelectContent>
              </Select>

              <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as PlayerRole | 'all')}>
                <SelectTrigger className="w-full md:w-28 bg-background">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent className="bg-background border">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="BAT">Batsman</SelectItem>
                  <SelectItem value="BOWL">Bowler</SelectItem>
                  <SelectItem value="AR">All-Rounder</SelectItem>
                  <SelectItem value="WK">Wicket Keeper</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Grid */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {gameState.collection.length === 0 ? (
          <div className="text-center py-16 md:py-20 px-4">
            <div className="text-4xl md:text-6xl mb-4">🏏</div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">No Cards Yet</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Open your first pack to start building your collection!
            </p>
            <Button onClick={onBack}>Open Packs</Button>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="text-center py-16 md:py-20 px-4">
            <div className="text-4xl md:text-6xl mb-4">🔍</div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">No Cards Found</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6 justify-items-center"
            layout
          >
            {filteredCards.map((card, index) => (
              <motion.div
                key={`${card.id}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <CricketCard player={card} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}