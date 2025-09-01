import React, { useState } from 'react';
import { PackSelector } from '@/components/PackSelector';
import { PackOpening } from '@/components/PackOpening';
import { Collection } from '@/components/Collection';
import { CardPack } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Package, Coins } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import stadiumBg from '@/assets/cricket-stadium-bg.jpg';

type GameScreen = 'menu' | 'packs' | 'opening' | 'collection';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const [selectedPack, setSelectedPack] = useState<CardPack | null>(null);
  const { gameState } = useGame();

  const handlePackSelect = (pack: CardPack) => {
    setSelectedPack(pack);
    setCurrentScreen('opening');
  };

  const handleOpeningComplete = () => {
    setCurrentScreen('packs');
    setSelectedPack(null);
  };

  if (currentScreen === 'opening' && selectedPack) {
    return (
      <PackOpening 
        pack={selectedPack} 
        onComplete={handleOpeningComplete}
      />
    );
  }

  if (currentScreen === 'packs') {
    return <PackSelector onPackSelect={handlePackSelect} />;
  }

  if (currentScreen === 'collection') {
    return <Collection onBack={() => setCurrentScreen('menu')} />;
  }

  // Main Menu
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Stadium Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ 
          backgroundImage: `url(${stadiumBg})` 
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/20" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Game Title */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-cricket bg-clip-text text-transparent mb-4 animate-glow-pulse px-4">
            Wicket Wonders
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 px-4">
            Cricket Card Pack Opening Experience
          </p>
          
          {/* Player Stats */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6 md:mb-8 px-4">
            <div className="bg-card/80 backdrop-blur-glass border rounded-lg px-4 py-3 md:px-6 md:py-4 flex-1 min-w-24 max-w-32">
              <div className="flex items-center gap-1 md:gap-2 mb-1 justify-center md:justify-start">
                <Coins className="w-4 h-4 md:w-5 md:h-5 text-legendary" />
                <span className="text-xs md:text-sm text-muted-foreground">Coins</span>
              </div>
              <div className="text-lg md:text-2xl font-bold text-foreground text-center md:text-left">
                {gameState.coins.toLocaleString()}
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-glass border rounded-lg px-4 py-3 md:px-6 md:py-4 flex-1 min-w-24 max-w-32">
              <div className="flex items-center gap-1 md:gap-2 mb-1 justify-center md:justify-start">
                <Package className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="text-xs md:text-sm text-muted-foreground">Cards</span>
              </div>
              <div className="text-lg md:text-2xl font-bold text-foreground text-center md:text-left">
                {gameState.collection.length}
              </div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-glass border rounded-lg px-4 py-3 md:px-6 md:py-4 flex-1 min-w-28 max-w-36 col-span-2 md:col-span-1">
              <div className="text-xs md:text-sm text-muted-foreground mb-1 text-center md:text-left">Packs Opened</div>
              <div className="text-lg md:text-2xl font-bold text-foreground text-center md:text-left">
                {gameState.packsOpened}
              </div>
            </div>
          </div>
        </div>

        {/* Main Menu Buttons */}
        <div className="flex flex-col gap-3 md:gap-4 w-full max-w-md px-4">
          <Button 
            size="lg" 
            className="text-base md:text-lg py-4 md:py-6 bg-gradient-cricket hover:shadow-glow transition-all duration-300"
            onClick={() => setCurrentScreen('packs')}
          >
            <Package className="w-5 h-5 md:w-6 md:h-6 mr-2" />
            Open Card Packs
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="text-base md:text-lg py-4 md:py-6"
            onClick={() => setCurrentScreen('collection')}
          >
            My Collection
            {gameState.collection.length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-sm">
                {gameState.collection.length}
              </span>
            )}
          </Button>
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-4 md:bottom-8 text-center text-xs md:text-sm text-muted-foreground px-4">
          <p>Build your ultimate cricket team • Collect legendary players</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
