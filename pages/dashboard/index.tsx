import { LinkedCard } from '@/components/LinkedCard';

const metadata = [
  {
    id: 1,
    title: 'Income and Expense Management',
    description: 'Manage all your incomes and expenses efficiently.',
    href: '/dashboard/revenues',
  },
  {
    id: 2,
    title: 'User Management',
    description: 'Manage all your users and their roles.',
    href: '/dashboard/users',
  },
  {
    id: 3,
    title: 'Reports',
    description: 'Generate reports to analyze your business.',
    href: '/dashboard/reports',
  },
];

const Index = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-center my-10">
        Welcome to IngesPro
      </h1>
      <div className="flex justify-center p-4 gap-5">
        {metadata.map((item) => (
          <LinkedCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default Index;
