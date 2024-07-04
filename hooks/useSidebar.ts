import { useEffect, useState } from 'react';

export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // biome-ignore format: off
  useEffect(() => {
    const timer = setTimeout(
      () => { setShowContent(!isCollapsed)},
      isCollapsed ? 0 : 150,
    );

    return () => clearTimeout(timer);
  }, [isCollapsed]);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return { isCollapsed, showContent, toggleCollapse };
};
