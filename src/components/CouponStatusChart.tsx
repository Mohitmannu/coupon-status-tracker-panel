
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockChartData } from "@/lib/mockData";

export function CouponStatusChart() {
  return (
    <Tabs defaultValue="line">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="line" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockChartData}>
            <defs>
              <linearGradient id="colorRedeemed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpired" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Area
              type="monotone"
              dataKey="redeemed"
              stroke="#2563EB"
              fillOpacity={1}
              fill="url(#colorRedeemed)"
            />
            <Area
              type="monotone"
              dataKey="expired"
              stroke="#EF4444"
              fillOpacity={1}
              fill="url(#colorExpired)"
            />
            <Area
              type="monotone"
              dataKey="created"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorCreated)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </TabsContent>
      
      <TabsContent value="bar" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockChartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Bar dataKey="redeemed" fill="#2563EB" />
            <Bar dataKey="expired" fill="#EF4444" />
            <Bar dataKey="created" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  );
}
