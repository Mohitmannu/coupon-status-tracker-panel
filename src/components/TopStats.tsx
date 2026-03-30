import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TagIcon, TicketCheckIcon, TicketXIcon, IndianRupee } from "lucide-react";
import { mockCoupons } from "@/lib/mockData";

export function TopStats() {
  const total = mockCoupons.length;
  const used = mockCoupons.filter((c) => c.status === "Used").length;
  const expired = mockCoupons.filter((c) => c.status === "Expired").length;
  const totalValue = mockCoupons.reduce((s, c) => s + c.value, 0);
  const totalUtilized = mockCoupons.reduce((s, c) => s + c.utilizedAmount, 0);
  const utilizationRate = totalValue > 0 ? ((totalUtilized / totalValue) * 100).toFixed(1) : "0";

  const stats = [
    {
      title: "Total Coupons",
      value: total.toString(),
      description: "All generated coupons",
      icon: TagIcon,
      changeType: "positive" as const,
    },
    {
      title: "Coupons Redeemed",
      value: mockCoupons.filter((c) => c.redeemed).length.toString(),
      percent: `${((mockCoupons.filter((c) => c.redeemed).length / total) * 100).toFixed(1)}%`,
      description: "Partially or fully used",
      icon: TicketCheckIcon,
      changeType: "positive" as const,
    },
    {
      title: "Coupons Expired",
      value: expired.toString(),
      percent: `${((expired / total) * 100).toFixed(1)}%`,
      description: "Expired coupons",
      icon: TicketXIcon,
      changeType: "negative" as const,
    },
    {
      title: "Utilization Rate",
      value: `₹${totalUtilized.toLocaleString("en-IN")}`,
      percent: `${utilizationRate}%`,
      description: `of ₹${totalValue.toLocaleString("en-IN")} issued`,
      icon: IndianRupee,
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`rounded-full p-2 ${stat.changeType === "positive" ? "bg-green-100" : "bg-red-100"}`}>
                <stat.icon className={`h-5 w-5 ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`} />
              </div>
            </div>
            {stat.percent && (
              <div className="mt-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{stat.description}</span>
                  <span className="font-medium">{stat.percent}</span>
                </div>
                <Progress value={parseFloat(stat.percent)} className="h-1" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
