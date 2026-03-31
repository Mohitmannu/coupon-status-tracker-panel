import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TagIcon, TicketCheckIcon, TicketXIcon, IndianRupee } from "lucide-react";
import { mockCoupons } from "@/lib/mockData";

export function TopStats() {
  const total = mockCoupons.length;
  const _used = mockCoupons.filter((c) => c.status === "Used").length;
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
      title: "Redeemed",
      value: mockCoupons.filter((c) => c.redeemed).length.toString(),
      percent: `${((mockCoupons.filter((c) => c.redeemed).length / total) * 100).toFixed(1)}%`,
      description: "Partially or fully used",
      icon: TicketCheckIcon,
      changeType: "positive" as const,
    },
    {
      title: "Expired",
      value: expired.toString(),
      percent: `${((expired / total) * 100).toFixed(1)}%`,
      description: "Expired coupons",
      icon: TicketXIcon,
      changeType: "negative" as const,
    },
    {
      title: "Utilization",
      value: `₹${totalUtilized.toLocaleString("en-IN")}`,
      percent: `${utilizationRate}%`,
      description: `of ₹${totalValue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-medium text-muted-foreground truncate">{stat.title}</p>
                <p className="text-lg md:text-3xl font-bold truncate">{stat.value}</p>
              </div>
              <div className={`rounded-full p-1.5 md:p-2 shrink-0 ${stat.changeType === "positive" ? "bg-green-100" : "bg-red-100"}`}>
                <stat.icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`} />
              </div>
            </div>
            {stat.percent && (
              <div className="mt-2 md:mt-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground truncate">{stat.description}</span>
                  <span className="font-medium shrink-0 ml-1">{stat.percent}</span>
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
