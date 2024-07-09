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
  Rectangle,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LegendProps } from 'recharts';

interface DataRecord {
  month: string;
  expenses: number;
  revenue: number;
}

interface ExpenseRevenueChartProps {
  data: DataRecord[];
}

export const ExpenseRevenueChart = ({ data }: ExpenseRevenueChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseOver = (index: number) => setActiveIndex(index);
  const handleMouseOut = () => setActiveIndex(null);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const CustomizedBar: React.FC<any> = (props) => {
    const { fill, x, y, width, height, index } = props;
    const highlight = activeIndex === index ? fill : `${fill}80`;
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={highlight}
        onMouseOver={() => handleMouseOver(index)}
        onMouseOut={handleMouseOut}
        onFocus={() => handleMouseOver(index)}
        onBlur={handleMouseOut}
        tabIndex={0}
        cursor="pointer"
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={270}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        style={{ backgroundColor: '#020817', color: '#a0aec0' }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#2d3748"
          horizontal
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
        <Tooltip content={<ChartTooltip />} cursor={{ fill: 'transparent' }} />
        <Legend
          content={<CustomLegend />}
          verticalAlign="top"
          wrapperStyle={{ color: '#a0aec0', fontSize: 12 }}
        />
        <Bar dataKey="expenses" fill="#3B82F6" shape={<CustomizedBar />} />
        <Bar dataKey="revenue" fill="#13B982" shape={<CustomizedBar />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

interface CustomLegendProps extends LegendProps {}

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => (
  <div className="p-3 min-w-[180px] flex gap-1 justify-end">
    {payload?.map((entry) => (
      <div key={entry.value} className="flex items-center">
        <LegendIcon color={entry.color as string} />
        <span>{entry.value}</span>
      </div>
    ))}
  </div>
);

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ dataKey: string; color: string; value: number }>;
  label?: string;
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload) return null;

  const data = payload.map((entry) => ({
    name: entry.dataKey as string,
    color: entry.color as string,
    value: `$${new Intl.NumberFormat('us').format(entry.value)}`,
  }));

  return (
    <Card className="text-sm">
      {label && (
        <CardHeader className="p-3 border-b">
          <CardTitle>{label}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-3 min-w-[180px] flex flex-col gap-1">
        {data.map((item) => (
          <div key={item.name} className="flex justify-between">
            <div className="flex items-center">
              <LegendIcon color={item.color} />
              <span>{item.name}</span>
            </div>
            <span className="font-semibold ml-4">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

interface LegendIconProps {
  color: string;
}

const LegendIcon: React.FC<LegendIconProps> = ({ color }) => (
  <span className="w-2.5 h-2.5 mr-2">
    <svg width="100%" height="100%" viewBox="0 0 30 30">
      <title>Circle</title>
      <path
        d="M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
        stroke={color}
        fill={color}
        strokeWidth="1"
      />
    </svg>
  </span>
);

export default ExpenseRevenueChart;
