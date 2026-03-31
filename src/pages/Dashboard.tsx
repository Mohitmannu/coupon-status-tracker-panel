import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CouponStatusChart } from "@/components/CouponStatusChart";
import { RecentActivity } from "@/components/RecentActivity";
import { TopStats } from "@/components/TopStats";
import { ModuleDistributionChart } from "@/components/ModuleDistributionChart";

const Dashboard = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 pt-14 md:pt-6">
      <h1 className="text-xl md:text-2xl font-bold">Dashboard Overview</h1>

      <TopStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">Coupon Usage Overview</CardTitle>
            <CardDescription>Track coupon redemptions over time</CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            <div className="h-64 md:h-80">
              <CouponStatusChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">Module Distribution</CardTitle>
            <CardDescription>Individual vs B2B breakdown</CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            <ModuleDistributionChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg">Recent Activity</CardTitle>
          <CardDescription>Last 10 coupon events</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <RecentActivity />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
