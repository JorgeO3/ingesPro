import { RevenueForm } from '@/components/RevenueForm';
import { TransactionTable } from '@/components/TransactionTable';
import { Button } from '@/components/ui/button';
import { transactionData } from '@/lib/transactions';

const Reveneues = () => {
  return (
    <>
      {/* Title */}
      <h1 className="text-3xl font-semibold text-center my-10">
        Revenue and expense management system
      </h1>

      {/* Revenue and expenses form */}
      <RevenueForm />

      {/*  Revenue and expenses table */}
      <div className="flex justify-center">
        <div className="w-full">
          <TransactionTable data={transactionData} />
        </div>
      </div>

      {/* Total */}
      <div className="text-right">
        <span className="text-lg font-medium text-muted-foreground">
          Total:{' '}
        </span>
        <span className="text-lg font-bold text-foreground">$45.000.000</span>
      </div>
    </>
  );
};

export default Reveneues;
