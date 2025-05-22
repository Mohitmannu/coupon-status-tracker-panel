
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TagIcon, TicketIcon, TicketCheckIcon, TicketXIcon } from "lucide-react";

export function TopStats() {
  // In a real app, these would come from an API
  const stats = [
    {
      title: "Total Coupons",
      value: "128",
      change: "+12%",
      changeType: "positive",
      icon: TagIcon,
      description: "Total generated coupons"
    },
    {
      title: "Coupons Used",
      value: "45",
      percent: "35.2%",
      change: "+5%",
      changeType: "positive",
      icon: TicketCheckIcon,
      description: "Redeemed coupons"
    },
    {
      title: "Coupons Expired",
      value: "34",
      percent: "26.6%",
      change: "+2",
      changeType: "negative",
      icon: TicketXIcon,
      description: "Expired without use"
    },
    {
      title: "Utilization Rate",
      value: "$4,560",
      percent: "62.4%",
      change: "+18%",
      changeType: "positive",
      icon: TicketIcon,
      description: "Total redeemed vs issued"
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
              <div className={`rounded-full p-2 ${stat.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'}`}>
                <stat.icon className={`h-5 w-5 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`} />
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
            {!stat.percent && (
              <div className="mt-2">
                <span className={`text-xs font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">from last period</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
