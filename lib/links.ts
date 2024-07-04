import {
  HouseIcon,
  UsersIcon,
  BarChart2Icon,
  HandCoinsIcon,
  type LucideIcon,
} from 'lucide-react';

export interface LinkItem {
  id: string;
  text: string;
  icon: LucideIcon;
  href: string;
}

// biome-ignore format: off
export const Links: LinkItem[] = [
  { id: '0', text: 'Dashboard', icon: HouseIcon, href: '/dashboard' },
  { id: '1', text: 'Revenues and expenses', icon: HandCoinsIcon, href: '/dashboard/revenues'},
  { id: '2', text: 'Users', icon: UsersIcon, href: '/dashboard/users' },
  { id: '3', text: 'Reports', icon: BarChart2Icon, href: '/dashboard/reports' },
];
