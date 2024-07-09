import { ExpenseRevenueChart } from '@/components/ReportChart';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const data: DataRecord[] = [
  { month: 'Jan', expenses: 4000, revenue: 2400 },
  { month: 'Feb', expenses: 3000, revenue: 1398 },
  { month: 'Mar', expenses: 2000, revenue: 9800 },
  { month: 'Apr', expenses: 2780, revenue: 3908 },
  { month: 'May', expenses: 1890, revenue: 4800 },
  { month: 'Jun', expenses: 2390, revenue: 3800 },
  { month: 'Jul', expenses: 3490, revenue: 4300 },
  { month: 'Aug', expenses: 3490, revenue: 4300 },
  { month: 'Sep', expenses: 3490, revenue: 4300 },
  { month: 'Oct', expenses: 3490, revenue: 4300 },
  { month: 'Nov', expenses: 3490, revenue: 4300 },
  { month: 'Dec', expenses: 3490, revenue: 4300 },
];

interface DataRecord {
  month: string;
  expenses: number;
  revenue: number;
}

const Reports = () => {
  return (
    <>
      {/* Title */}
      <h1 className="text-3xl font-semibold text-center my-10">
        Revenue and expense management system
      </h1>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseRevenueChart data={data} />
        </CardContent>
        <CardFooter className="flex justify-end">
          <div>
            <span>Total Balance</span>
            <CardTitle>$15.231.000,89</CardTitle>
          </div>
        </CardFooter>
      </Card>

      <div className="flex justify-end py-4">
        <Button className="dark:text-secondary-foreground">
          Download Report
        </Button>
      </div>
    </>
  );
};

export default Reports;
