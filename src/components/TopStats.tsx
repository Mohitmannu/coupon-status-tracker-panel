
import { Card, CardContent } from "@/components/ui/card";
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
    },
    {
      title: "Active Coupons",
      value: "94",
      change: "+5%",
      changeType: "positive",
      icon: TicketCheckIcon,
    },
    {
      title: "Redeemed Today",
      value: "24",
      change: "+18%",
      changeType: "positive",
      icon: TicketIcon,
    },
    {
      title: "Expired",
      value: "34",
      change: "+2",
      changeType: "negative",
      icon: TicketXIcon,
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
            <div className="mt-2">
              <span className={`text-xs font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
