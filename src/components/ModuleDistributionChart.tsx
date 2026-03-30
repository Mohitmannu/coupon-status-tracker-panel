import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { mockCoupons } from "@/lib/mockData";

const COLORS = ["hsl(222, 47%, 11%)", "hsl(210, 40%, 50%)", "hsl(210, 40%, 75%)"];

export function ModuleDistributionChart() {
  const distribution = [
    { name: "Enterprise", value: mockCoupons.filter(c => c.couponType === "Enterprise").length },
    { name: "School/College", value: mockCoupons.filter(c => c.couponType === "School").length },
    { name: "Individual", value: mockCoupons.filter(c => c.couponType === "Individual").length },
  ];

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={distribution}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {distribution.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
