import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame, GameTheme, GridSize } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BackgroundEffects from '@/components/BackgroundEffects';
import NightModeToggle from '@/components/NightModeToggle';
import { Grid3x3, Grid2x2, Flame, Sparkles, Zap } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { setTheme, setGridSize } = useGame();
  const [selectedGrid, setSelectedGrid] = useState<GridSize>(3);
  const [selectedTheme, setSelectedTheme] = useState<GameTheme>('normal');

  const handleStartGame = () => {
    setGridSize(selectedGrid);
    setTheme(selectedTheme);
    navigate('/game');
  };

  const gridOptions = [
    { size: 3 as GridSize, label: '3x3 Grid', icon: Grid3x3, description: 'Classic' },
    { size: 5 as GridSize, label: '5x5 Grid', icon: Grid2x2, description: 'Challenge' },
  ];

  const themeOptions = [
    {
      id: 'gamer' as GameTheme,
      label: 'Dark Gamer',
      icon: Flame,
      description: 'Intense & Aggressive',
      gradient: 'from-red-600 to-orange-500',
    },
    {
      id: 'minimal' as GameTheme,
      label: 'Light Minimal',
      icon: Sparkles,
      description: 'Soothing & Relaxing',
      gradient: 'from-blue-400 to-teal-400',
    },
    {
      id: 'normal' as GameTheme,
      label: 'Normal',
      icon: Zap,
      description: 'Balanced & Smooth',
      gradient: 'from-purple-500 to-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <BackgroundEffects />
      <NightModeToggle />

      <div className="max-w-4xl w-full space-y-8 animate-slide-in">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-float">
            Tic Tac Toe
          </h1>
          <p className="text-lg text-muted-foreground">Choose your battle settings</p>
        </div>

        {/* Grid Selection */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Select Grid Size</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gridOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.size}
                  className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                    selectedGrid === option.size
                      ? 'ring-4 ring-primary shadow-lg shadow-primary/50'
                      : 'hover:ring-2 hover:ring-primary/50'
                  }`}
                  onClick={() => setSelectedGrid(option.size)}
                >
                  <div className="flex items-center gap-4">
                    <Icon className="h-12 w-12 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold">{option.label}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Theme Selection */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Choose Game Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card
                  key={option.id}
                  className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                    selectedTheme === option.id
                      ? 'ring-4 ring-primary shadow-lg shadow-primary/50'
                      : 'hover:ring-2 hover:ring-primary/50'
                  }`}
                  onClick={() => setSelectedTheme(option.id)}
                >
                  <div className="text-center space-y-3">
                    <div
                      className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${option.gradient} flex items-center justify-center`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{option.label}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={handleStartGame}
            className="text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
