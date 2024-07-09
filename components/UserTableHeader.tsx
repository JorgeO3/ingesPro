'use client';

import { type Table, flexRender } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from './ui/table';

interface Props<T> {
  table: Table<T>;
}

export const UserTableHeader = <T,>({ table }: Props<T>) => (
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableHead key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
);
