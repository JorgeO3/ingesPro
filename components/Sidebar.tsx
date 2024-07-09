'use client';

import { Links } from '@/lib/links';
import { useSidebar } from '@/hooks/useSidebar';
import { SidebarLink } from '@/components/SidebarLink';
import { LogoutButton } from '@/components/LogoutButton';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CollapseButton } from '@/components/CollapseButton';
import { signOut } from 'next-auth/react';

export const SideBar = () => {
  const { isCollapsed, showContent, toggleCollapse } = useSidebar();
  const handleLogout = () => signOut();

  const sidebarClasses = `
    group h-screen sticky top-0 bg-background text-white p-4 box-border 
    flex flex-col justify-between transition-all duration-300
    border-r ease-in-out ${isCollapsed ? 'w-18' : 'w-64'}
  `;
  return (
    <div className={sidebarClasses}>
      <div className="flex flex-col space-y-4">
        <CollapseButton
          isCollapsed={isCollapsed}
          onClick={toggleCollapse}
          showContent={showContent}
        />
        <TooltipProvider>
          {Links.map((link) => (
            <SidebarLink
              key={link.id}
              {...link}
              isCollapsed={isCollapsed}
              showContent={showContent}
            />
          ))}
        </TooltipProvider>
      </div>
      <LogoutButton logOut={handleLogout} />
    </div>
  );
};
