import { TransactionTable } from '@/components/TransactionTable';
import { RevenuesForm } from '@/components/RevenuesForm';
import { transactionData } from '@/lib/transactions';

const Reveneues = () => {
  return (
    <>
      {/* Title */}
      <h1 className="text-3xl font-semibold text-center my-10">
        Revenue and expense management system
      </h1>

      {/* Revenue and expenses form */}
      <RevenuesForm />

      {/*  Revenue and expenses table */}
      <div className="flex justify-center">
        <div className="w-full">
          <TransactionTable data={transactionData} />
        </div>
      </div>

      <div className="flex justify-end">
        <div>
          <span>Total</span>
          <br />
          <span className="text-2xl font-semibold leading-none tracking-tight">
            $45.000.000
          </span>
        </div>
      </div>
    </>
  );
};

export default Reveneues;
