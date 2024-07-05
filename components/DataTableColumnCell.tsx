import type { CellContext } from '@tanstack/react-table';

interface ColumnCellProps<T> {
  info: CellContext<T, unknown>;
}

export function ColumnCell<T>({ info }: ColumnCellProps<T>) {
  return <div className="text-center">{String(info.getValue())}</div>;
}
