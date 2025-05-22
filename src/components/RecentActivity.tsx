
import { Badge } from "@/components/ui/badge";
import { mockRecentActivity } from "@/lib/mockData";
import { Check, X } from "lucide-react";

export function RecentActivity() {
  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
      {mockRecentActivity.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
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
            <div className="flex items-center justify-between text-xs">
              <p className="text-muted-foreground">
                {activity.time} • {activity.user}
              </p>
              {activity.type === 'redemption' && (
                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs ml-2">
                  {activity.amount || '$25.00'}
                </Badge>
              )}
            </div>
            <div className="flex items-center mt-1 gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                Module: <span className="font-medium">{activity.module || 'Gift Card'}</span>
              </span>
              {activity.type === 'redemption' && activity.bookingId && (
                <span className="flex items-center gap-1">
                  Booking ID: <span className="font-medium">{activity.bookingId}</span>
                </span>
              )}
              {activity.type === 'creation' && activity.emailStatus && (
                <span className="flex items-center gap-1">
                  Email: <span className={`font-medium ${activity.emailStatus === 'Sent' ? 'text-green-600' : 'text-red-500'}`}>
                    {activity.emailStatus}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
