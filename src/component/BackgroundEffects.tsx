import { useGame } from '@/contexts/GameContext';

const BackgroundEffects = () => {
  const { theme } = useGame();

  const getThemeColors = () => {
    switch (theme) {
      case 'gamer':
        return {
          color1: 'hsl(var(--gamer-primary) / 0.15)',
          color2: 'hsl(var(--gamer-accent) / 0.1)',
          intensity: 'intense',
        };
      case 'minimal':
        return {
          color1: 'hsl(var(--minimal-primary) / 0.08)',
          color2: 'hsl(var(--minimal-accent) / 0.06)',
          intensity: 'gentle',
        };
      default:
        return {
          color1: 'hsl(var(--normal-primary) / 0.1)',
          color2: 'hsl(var(--normal-accent) / 0.08)',
          intensity: 'moderate',
        };
    }
  };

  const { color1, color2, intensity } = getThemeColors();
  const particleCount = intensity === 'intense' ? 20 : intensity === 'gentle' ? 10 : 15;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
        style={{ background: color1 }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
        style={{ background: color2, animationDelay: '1s' }}
      />

      {/* Floating Particles */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background: i % 2 === 0 ? color1 : color2,
            borderRadius: '50%',
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${20 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundEffects;
