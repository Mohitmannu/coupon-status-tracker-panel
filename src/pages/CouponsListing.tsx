import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CouponTable } from "@/components/CouponTable";
import { CreateCouponDialog } from "@/components/CreateCouponDialog";

const CouponsListing = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Coupons</h1>
        <Button onClick={() => setShowCreateDialog(true)}>Create Coupon</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coupon Management</CardTitle>
          <CardDescription>Manage and track all coupon codes across Individual & B2B modules</CardDescription>
        </CardHeader>
        <CardContent>
          <CouponTable />
        </CardContent>
      </Card>

      <CreateCouponDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  );
};

export default CouponsListing;
