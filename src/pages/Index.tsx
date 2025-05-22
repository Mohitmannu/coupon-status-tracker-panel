
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CouponStatusChart } from "@/components/CouponStatusChart";
import { CouponTable } from "@/components/CouponTable";
import { RecentActivity } from "@/components/RecentActivity";
import { TopStats } from "@/components/TopStats";
import { useState } from "react";
import { CreateCouponDialog } from "@/components/CreateCouponDialog";

const Index = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Coupon Management</h1>
            <Button onClick={() => setShowCreateDialog(true)}>Create Coupon</Button>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-6">
        <TopStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
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
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest coupon usage</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Coupons</CardTitle>
              <CardDescription>Manage and track all coupon codes</CardDescription>
            </CardHeader>
            <CardContent>
              <CouponTable />
            </CardContent>
          </Card>
        </div>
      </main>
      
      <CreateCouponDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </div>
  );
};

export default Index;
