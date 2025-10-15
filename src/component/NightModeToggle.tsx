import { Moon, Sun } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';

const NightModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useGame();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 z-50 rounded-full w-12 h-12 shadow-lg backdrop-blur-sm bg-background/80 border-2 transition-all hover:scale-110"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-primary" />
      )}
    </Button>
  );
};

export default NightModeToggle;
