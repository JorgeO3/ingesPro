import { LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogoutButtonProps {
  logOut: () => void;
  className?: string;
}

export const LogoutButton = ({ className = '', logOut }: LogoutButtonProps) => {
  const ButtonClasses = `
    relative inline-flex items-center justify-center 
    bg-secondary text-secondary-foreground rounded-full 
    w-10 h-10 ${className}
  `;
  return (
    <Button className={ButtonClasses} size="icon" onClick={logOut}>
      <LogOutIcon className="w-3/6 h-3/6 text-secondary-foreground" />
    </Button>
  );
};
