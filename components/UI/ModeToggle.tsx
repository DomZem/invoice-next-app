'use client';

import { useTheme } from 'next-themes';
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs';

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      className="p-2"
      onClick={() => {
        theme === 'dark' ? setTheme('light') : setTheme('dark');
      }}
    >
      {theme === 'dark' ? (
        <BsSunFill className="action-button" />
      ) : (
        <BsFillMoonFill className="action-button" />
      )}
    </button>
  );
}
