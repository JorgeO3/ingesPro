import { AuthLayout } from '@/components/AuthLayout';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DefaultLayout } from '@/components/DefaultLayout';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ColumnDefinitionParams } from '@/lib/dataTableTypes';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnDefinition } from '@/components/DataTableUtils';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LayoutComponent = React.ComponentType<{ children: React.ReactNode }>;

const layoutMap: [RegExp, LayoutComponent][] = [
  [/^\/dashboard/, DashboardLayout],
  [/^\/auth/, AuthLayout],
];

export const getLayout = (pathName: string): LayoutComponent => {
  const [, Layout] = layoutMap.find(([regex]) => regex.test(pathName)) || [];
  return Layout || DefaultLayout;
};

// biome-ignore format: off
export function createColumnDefinitions<T>(config: ColumnDefinitionParams<T>[]): ColumnDef<T>[] {
  return config.map(createColumnDefinition);
}
