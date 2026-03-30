import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CouponStatusChart } from "@/components/CouponStatusChart";
import { RecentActivity } from "@/components/RecentActivity";
import { TopStats } from "@/components/TopStats";
import { ModuleDistributionChart } from "@/components/ModuleDistributionChart";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <TopStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Coupon Usage Overview</CardTitle>
            <CardDescription>Track coupon redemptions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <CouponStatusChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Module Distribution</CardTitle>
            <CardDescription>Individual vs B2B breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ModuleDistributionChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Last 10 coupon events</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentActivity />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
