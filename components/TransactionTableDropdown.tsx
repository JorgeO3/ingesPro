import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import type { Transaction } from '@/lib/transactions';

interface Props {
  transaction: Transaction;
}

export const TransactionTableDropdown = ({ transaction }: Props) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onClick={() => navigator.clipboard.writeText(transaction.id.toString())}
      >
        Copy transaction ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
