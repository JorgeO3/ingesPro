import type React from 'react';
import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type {
  Payload,
  Props,
} from 'recharts/types/component/DefaultLegendContent';

interface DataRecord {
  month: string;
  expenses: number;
  revenue: number;
}

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

export const ExpenseRevenueChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseOver = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(null);
  };

  // // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  // const CustomizedBar = (props: any) => {
  //   const highlight = activeIndex === index ? fill : `${fill}80`;
  //   return (
  //     <rect
  //       x={x}
  //       y={y}
  //       width={width}
  //       height={height}
  //       fill={highlight}
  //       onMouseOver={() => handleMouseOver(index)}
  //       onMouseOut={handleMouseOut}
  //       onFocus={() => handleMouseOver(index)}
  //       onBlur={handleMouseOut}
  //       tabIndex={0}
  //       cursor="pointer"
  //     />
  //   );
  // };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        style={{ backgroundColor: '#020817', color: '#a0aec0' }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#2d3748"
          horizontal={true}
          vertical={false}
        />
        <XAxis dataKey="month" tick={{ fill: '#a0aec0' }} className="text-xs" />
        <YAxis
          tick={{ fill: '#a0aec0' }}
          className="text-xs"
          tickFormatter={(value) =>
            `$${new Intl.NumberFormat('us').format(value)}`
          }
        />
        <Tooltip
          cursor={{ fill: 'transparent' }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const tooltipData = payload.map((entry) => ({
                name: entry.dataKey as string,
                color: entry.color as string,
                value: `$${new Intl.NumberFormat('us').format(Number(entry.value) ?? 0)}`,
              }));

              return <ChartTooltip data={tooltipData} />;
            }

            return null;
          }}
        />
        <Legend
          wrapperStyle={{ color: '#a0aec0', fontSize: 12 }}
          verticalAlign="top"
          content={(props) => <CustomLegend {...props} />}
        />
        {/* <Bar dataKey="expenses" fill="#3B82F6" shape={<CustomizedBar />} />
        <Bar dataKey="revenue" fill="#13B982" shape={<CustomizedBar />} /> */}

        <Bar dataKey="expenses" fill="#3B82F6" />
        <Bar dataKey="revenue" fill="#13B982" />
      </BarChart>
    </ResponsiveContainer>
  );
};

interface CustomLegendProps {
  payload?: Payload[];
}

const CustomLegend = ({ payload }: Props) => {
  return (
    <div className="p-3 min-w-[180px] flex gap-1 justify-end">
      {payload?.map((entry) => (
        <div key={entry.value} className="flex justify-between">
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 mr-2">
              <svg width="100%" height="100%" viewBox="0 0 30 30">
                <title>Circle</title>
                <path
                  d="M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
                  stroke={entry.color}
                  fill={entry.color}
                  strokeWidth="1"
                />
              </svg>
            </span>
            <span>{entry.value}</span>
          </div>
          <span className="font-semibold ml-4">
            {entry.dataKey === 'expenses'}
          </span>
        </div>
      ))}
    </div>
  );
};

interface CustomizedBarProps {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
}

interface ChartTooltipProps {
  title?: string;
  data: { name: string; color: string; value: string }[];
}

const ChartTooltip = ({ title, data }: ChartTooltipProps) => {
  return (
    <Card className="text-sm">
      {title && (
        <CardHeader className="p-3 border-b">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-3 min-w-[180px] flex flex-col gap-1">
        {data.map((item) => (
          <div key={item.name} className="flex justify-between">
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 mr-2">
                <svg width="100%" height="100%" viewBox="0 0 30 30">
                  <title>Circle</title>
                  <path
                    d="M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
                    stroke={item.color}
                    fill={item.color}
                    strokeWidth="1"
                  />
                </svg>
              </span>
              <span>{item.name}</span>
            </div>
            <span className="font-semibold ml-4">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
