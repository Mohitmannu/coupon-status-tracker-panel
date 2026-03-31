import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CouponTable } from "@/components/CouponTable";
import { CreateCouponDialog } from "@/components/CreateCouponDialog";

const CouponsListing = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="p-4 md:p-6 space-y-6 pt-14 md:pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">All Coupons</h1>
        <Button onClick={() => setShowCreateDialog(true)} size="sm" className="md:size-default">
          Create Coupon
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg">Coupon Management</CardTitle>
          <CardDescription>Manage and track all coupon codes</CardDescription>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <CouponTable />
        </CardContent>
      </Card>

      <CreateCouponDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  );
};

export default CouponsListing;
