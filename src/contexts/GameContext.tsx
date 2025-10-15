import React, { createContext, useContext, useState, ReactNode } from 'react';

export type GameTheme = 'gamer' | 'minimal' | 'normal';
export type GridSize = 3 | 5;

interface GameContextType {
  theme: GameTheme;
  setTheme: (theme: GameTheme) => void;
  gridSize: GridSize;
  setGridSize: (size: GridSize) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<GameTheme>('normal');
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <GameContext.Provider
      value={{
        theme,
        setTheme,
        gridSize,
        setGridSize,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
