import { useEffect, useState } from 'react';
import { useGame } from '@/contexts/GameContext';

interface WinCelebrationProps {
  winner: 'X' | 'O' | null;
}

const WinCelebration = ({ winner }: WinCelebrationProps) => {
  const { theme } = useGame();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (winner) {
      setShow(true);
    }
  }, [winner]);

  if (!show || !winner) return null;

  const getThemeColor = () => {
    switch (theme) {
      case 'gamer':
        return 'hsl(var(--gamer-primary))';
      case 'minimal':
        return 'hsl(var(--minimal-primary))';
      default:
        return 'hsl(var(--normal-primary))';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* Celebration Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-celebrate"
          style={{
            left: `${50 + (Math.random() - 0.5) * 60}%`,
            top: `${50 + (Math.random() - 0.5) * 60}%`,
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            background: getThemeColor(),
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            opacity: Math.random() * 0.8 + 0.2,
            animationDelay: `${Math.random() * 0.3}s`,
          }}
        />
      ))}

      {/* Winner Text */}
      <div className="animate-celebrate text-center">
        <h2
          className="text-6xl md:text-8xl font-bold mb-4"
          style={{ color: getThemeColor() }}
        >
          {winner} Wins! 🎉
        </h2>
      </div>
    </div>
  );
};

export default WinCelebration;
