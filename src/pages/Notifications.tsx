import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Mail, XCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "usage",
    icon: CheckCircle,
    title: "Coupon Redeemed",
    message: "POSITIVTYNESTLE2025 was used by karan.singh@nestle.com for ₹3,000 session booking.",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "email_fail",
    icon: XCircle,
    title: "Email Delivery Failed",
    message: "Failed to deliver coupon POSITIVTYWIPRO25 to vikram.singh@wipro.com. Please resend.",
    time: "2 days ago",
    read: false,
  },
  {
    id: 3,
    type: "expiry",
    icon: AlertTriangle,
    title: "Coupon Expiring Soon",
    message: "POSITIVTYLOV123 assigned to Sneha Reddy expires on Jun 20, 2025. Balance: ₹5,000 unused.",
    time: "3 days ago",
    read: false,
  },
  {
    id: 4,
    type: "expiry",
    icon: Clock,
    title: "Coupon Expired",
    message: "POSITIVTYDPS2025 (Delhi Public School) expired with ₹5,500 unused balance.",
    time: "5 days ago",
    read: true,
  },
  {
    id: 5,
    type: "usage",
    icon: CheckCircle,
    title: "Coupon Fully Utilized",
    message: "POSITIVTYTCS500 (TCS) has been fully utilized. Total: ₹15,000.",
    time: "1 week ago",
    read: true,
  },
  {
    id: 6,
    type: "email_fail",
    icon: Mail,
    title: "Email Resent Successfully",
    message: "Coupon POSITIVTYINFOSYS100 details resent to priya.sharma@infosys.com.",
    time: "1 week ago",
    read: true,
  },
];

const typeStyles: Record<string, string> = {
  usage: "text-green-600 bg-green-50",
  email_fail: "text-red-600 bg-red-50",
  expiry: "text-yellow-600 bg-yellow-50",
};

const Notifications = () => {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {unread > 0 && (
          <Badge variant="destructive">{unread} new</Badge>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card key={notif.id} className={notif.read ? "opacity-70" : ""}>
            <CardContent className="p-4 flex items-start gap-4">
              <div className={`p-2 rounded-full shrink-0 ${typeStyles[notif.type]}`}>
                <notif.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{notif.title}</p>
                  {!notif.read && (
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
