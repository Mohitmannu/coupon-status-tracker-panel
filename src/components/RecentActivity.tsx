
import { Badge } from "@/components/ui/badge";
import { mockRecentActivity } from "@/lib/mockData";

export function RecentActivity() {
  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
      {mockRecentActivity.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-4 p-3 rounded-lg border border-border"
        >
          <div
            className={`rounded-full p-2 
              ${activity.type === 'redemption' ? 'bg-blue-100' : 
                activity.type === 'creation' ? 'bg-green-100' : 'bg-red-100'}`}
          >
            <activity.icon 
              className={`h-4 w-4 
                ${activity.type === 'redemption' ? 'text-blue-600' : 
                  activity.type === 'creation' ? 'text-green-600' : 'text-red-600'}`} 
            />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {activity.message}
              </p>
              <Badge variant="outline" className="text-xs">
                {activity.couponCode}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {activity.time} • {activity.user}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
