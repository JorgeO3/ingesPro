'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import type { LucideIcon } from 'lucide-react';

interface Props {
  text: string;
  icon: LucideIcon;
  href: string;
  isCollapsed: boolean;
  showContent: boolean;
}

export const SidebarLink = ({
  text,
  icon: Icon,
  isCollapsed,
  showContent,
  ...props
}: Props) => {
  const route = usePathname();
  const isActive = route === props.href;

  const linkClasses = `
    flex items-center rounded-md h-10
    ${isActive ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground'}
    hover:bg-accent hover:text-accent-foreground transition-colors duration-200
    justify-start
  `;

  const textClasses = `
    transition-opacity duration-300 ease-in-out
    whitespace-nowrap overflow-hidden flex-grow pe-2.5
    ${showContent ? 'opacity-100' : 'opacity-0'}
    text-sm font-medium
  `;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link className="block w-full" {...props}>
          <div className={linkClasses}>
            <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            {!isCollapsed && <span className={textClasses}>{text}</span>}
          </div>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" align="start" alignOffset={-12}>
        {text}
      </TooltipContent>
    </Tooltip>
  );
};
