import React from 'react';
import { MenuIcon, XIcon } from 'lucide-react';

interface Props {
  isCollapsed: boolean;
  onClick: () => void;
  showContent: boolean;
}

export const CollapseButton = ({
  isCollapsed,
  onClick,
  showContent,
}: Props) => {
  const buttonClasses = `
    mb-4 flex items-center w-full
    bg-accent text-accent-foreground rounded-md h-10
    hover:bg-accent-hover hover:text-accent-foreground
    transition-colors duration-200 justify-start
  `;

  const textClasses = `
    transition-opacity duration-300 ease-in-out
    whitespace-nowrap overflow-hidden text-sm font-medium
    ${showContent ? 'opacity-100' : 'opacity-0'}
  `;

  return (
    <button type="button" onClick={onClick} className={buttonClasses}>
      <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
        {isCollapsed ? (
          <MenuIcon className="h-5 w-5" />
        ) : (
          <XIcon className="h-5 w-5" />
        )}
      </div>
      {!isCollapsed && <span className={textClasses}>Collapse Sidebar</span>}
    </button>
  );
};
