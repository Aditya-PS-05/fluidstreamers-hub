
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-all duration-300 relative"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
        <Sun 
          className={`absolute transition-all duration-300 ease-spring ${
            theme === 'dark' 
              ? 'opacity-0 scale-50 rotate-90' 
              : 'opacity-100 scale-100 rotate-0'
          }`} 
          size={18} 
        />
        <Moon 
          className={`absolute transition-all duration-300 ease-spring ${
            theme === 'light' 
              ? 'opacity-0 scale-50 rotate-90' 
              : 'opacity-100 scale-100 rotate-0'
          }`} 
          size={18} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
