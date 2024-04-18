'use client';

import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

export const DarkModeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const textDark = 'Темный режим';
  const textLight = 'Светлый режим';

  const handleChange = () => {
    if (theme === 'light') setTheme('dark');
    if (theme === 'dark') setTheme('light');
  };
  return (
    <div className="flex item-center gap-3">
      <Switch onCheckedChange={handleChange} />
      {textDark}
    </div>
  );
};
