import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { Transaction } from '@/lib/transactions';
import { useTransactionTable } from '@/hooks/useTransactionTable';
import { TransactionTableBody } from '@/components/TransactionTableBody';
import { TransactionTableHeader } from '@/components/TransactionTableHeader';
import { TransactionTablePagination } from '@/components/TransactionTablePagination';

interface Props {
  data: Transaction[];
}

export const TransactionTable = ({ data }: Props) => {
  const table = useTransactionTable(data);
  return (
    <div className="flex flex-col">
      <Button className="place-self-end my-3" type="button" variant="default">
        Nuevo
      </Button>
      <div className="rounded-md border">
        <Table>
          <TransactionTableHeader table={table} />
          <TransactionTableBody table={table} />
        </Table>
      </div>
      <TransactionTablePagination table={table} />
    </div>
  );
};
