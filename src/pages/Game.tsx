import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import BackgroundEffects from '@/components/BackgroundEffects';
import NightModeToggle from '@/components/NightModeToggle';
import WinCelebration from '@/components/WinCelebration';
import { Home, RotateCcw } from 'lucide-react';

type Player = 'X' | 'O' | null;

const Game = () => {
  const navigate = useNavigate();
  const { gridSize, theme } = useGame();
  const [board, setBoard] = useState<Player[]>(Array(gridSize * gridSize).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [showHomeDialog, setShowHomeDialog] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    setBoard(Array(gridSize * gridSize).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setTimeout(() => setGameStarted(true), 100);
  }, [gridSize]);

  const getThemeClasses = () => {
    switch (theme) {
      case 'gamer':
        return {
          container: 'bg-[hsl(var(--gamer-bg))] text-[hsl(var(--gamer-fg))]',
          cell: 'bg-[hsl(var(--gamer-grid))] hover:bg-[hsl(var(--gamer-grid))]/80 border-[hsl(var(--gamer-primary))]',
          cellActive: 'shadow-[0_0_20px_hsl(var(--gamer-glow))]',
          player: {
            X: 'text-[hsl(var(--gamer-primary))]',
            O: 'text-[hsl(var(--gamer-accent))]',
          },
        };
      case 'minimal':
        return {
          container: 'bg-[hsl(var(--minimal-bg))] text-[hsl(var(--minimal-fg))]',
          cell: 'bg-[hsl(var(--minimal-grid))] hover:bg-[hsl(var(--minimal-grid))]/70 border-[hsl(var(--minimal-primary))]',
          cellActive: 'shadow-[0_0_15px_hsl(var(--minimal-glow))]',
          player: {
            X: 'text-[hsl(var(--minimal-primary))]',
            O: 'text-[hsl(var(--minimal-accent))]',
          },
        };
      default:
        return {
          container: 'bg-[hsl(var(--normal-bg))] text-[hsl(var(--normal-fg))]',
          cell: 'bg-[hsl(var(--normal-grid))] hover:bg-[hsl(var(--normal-grid))]/75 border-[hsl(var(--normal-primary))]',
          cellActive: 'shadow-[0_0_18px_hsl(var(--normal-glow))]',
          player: {
            X: 'text-[hsl(var(--normal-primary))]',
            O: 'text-[hsl(var(--normal-accent))]',
          },
        };
    }
  };

  const checkWinner = (board: Player[]): Player => {
    const size = gridSize;
    const lines: number[][] = [];

    // Rows
    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, j) => i * size + j));
    }

    // Columns
    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, j) => j * size + i));
    }

    // Diagonals
    lines.push(Array.from({ length: size }, (_, i) => i * size + i));
    lines.push(Array.from({ length: size }, (_, i) => i * size + (size - 1 - i)));

    for (const line of lines) {
      const values = line.map((i) => board[i]);
      if (values.every((v) => v && v === values[0])) {
        return values[0];
      }
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(gridSize * gridSize).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameStarted(false);
    setTimeout(() => setGameStarted(true), 100);
  };

  const handleHomeClick = () => {
    setShowHomeDialog(true);
  };

  const confirmHome = () => {
    navigate('/');
  };

  const themeClasses = getThemeClasses();
  const cellSize = gridSize === 3 ? 'w-24 h-24 md:w-32 md:h-32' : 'w-16 h-16 md:w-20 md:h-20';
  const fontSize = gridSize === 3 ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl';

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative transition-colors ${themeClasses.container}`}>
      <BackgroundEffects />
      <NightModeToggle />
      <WinCelebration winner={winner} />

      {/* Home Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleHomeClick}
        className="fixed top-4 left-4 z-50 rounded-full w-12 h-12 shadow-lg backdrop-blur-sm bg-background/80 border-2 transition-all hover:scale-110"
      >
        <Home className="h-5 w-5" />
      </Button>

      <div className={`space-y-8 ${gameStarted ? 'animate-slide-in' : 'opacity-0'}`}>
        {/* Game Info */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            {winner ? `${winner} Wins!` : `Current Player: ${currentPlayer}`}
          </h1>
          <p className="text-lg text-muted-foreground">
            {gridSize}x{gridSize} Grid - {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
          </p>
        </div>

        {/* Game Board */}
        <div
          className={`grid gap-3 md:gap-4 ${gameStarted ? 'animate-grid-appear' : 'opacity-0'}`}
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!cell || !!winner}
              className={`
                ${cellSize} 
                ${themeClasses.cell}
                border-2 rounded-xl
                flex items-center justify-center
                transition-all duration-300
                disabled:cursor-not-allowed
                ${!cell && !winner ? 'hover:scale-105 cursor-pointer' : ''}
                ${cell ? themeClasses.cellActive : ''}
                backdrop-blur-sm
              `}
            >
              {cell && (
                <span className={`${fontSize} font-bold ${themeClasses.player[cell]} animate-celebrate`}>
                  {cell}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={resetGame}
            size="lg"
            className="rounded-full shadow-lg hover:scale-105 transition-all"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset Game
          </Button>
        </div>
      </div>

      {/* Home Confirmation Dialog */}
      <AlertDialog open={showHomeDialog} onOpenChange={setShowHomeDialog}>
        <AlertDialogContent className="backdrop-blur-xl bg-background/95">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to go back to the home page? Your current game will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, stay</AlertDialogCancel>
            <AlertDialogAction onClick={confirmHome}>Yes, go back</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Game;
