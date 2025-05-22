
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockCoupons, mockCouponUsageHistory } from "@/lib/mockData";

interface CouponDetailsDialogProps {
  couponId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CouponDetailsDialog({ couponId, open, onOpenChange }: CouponDetailsDialogProps) {
  // Find the coupon by ID
  const coupon = mockCoupons.find((coupon) => coupon.id === couponId);
  
  if (!coupon) {
    return null;
  }

  // Get usage history for this coupon
  const usageHistory = mockCouponUsageHistory.filter((usage) => usage.couponId === couponId);
  
  // Calculate usage percent
  const usagePercent = 
    coupon.maxUses === -1 
      ? 0 
      : (coupon.usedCount / coupon.maxUses) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Coupon Details</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage-history">Usage History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="flex-1 overflow-auto">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Coupon Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Code</p>
                      <p className="font-mono text-lg font-bold">{coupon.code}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Description</p>
                      <p>{coupon.description}</p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Discount</p>
                        <p>{coupon.discount}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Type</p>
                        <p>{coupon.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                        <Badge
                          variant={
                            coupon.status === "active" ? "default" :
                            coupon.status === "expired" ? "destructive" :
                            "outline"
                          }
                        >
                          {coupon.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span>Usage Count</span>
                      <span className="font-medium">{coupon.usedCount}/{coupon.maxUses === -1 ? "∞" : coupon.maxUses}</span>
                    </div>
                    {coupon.maxUses !== -1 && (
                      <Progress value={usagePercent} className="h-2" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Created</p>
                      <p>{coupon.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Valid Until</p>
                      <p>{coupon.validUntil}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Restrictions</p>
                    <p>{coupon.restrictions || "None"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="usage-history" className="flex-1 overflow-hidden">
            <Card className="flex-1 overflow-hidden flex flex-col">
              <CardHeader>
                <CardTitle>Usage History</CardTitle>
                <CardDescription>History of all redemptions for this coupon</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-[400px] rounded-md">
                  <div className="p-4 space-y-4">
                    {usageHistory.length > 0 ? (
                      usageHistory.map((usage) => (
                        <div key={usage.id} className="pb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{usage.user}</p>
                              <p className="text-sm text-muted-foreground">{usage.email}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">{usage.date}</p>
                              <p className="text-sm text-muted-foreground">{usage.time}</p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm">
                              <span className="font-medium">Order ID:</span> {usage.orderId}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Discount Applied:</span> {usage.discountApplied}
                            </p>
                          </div>
                          <Separator className="mt-4" />
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-muted-foreground">
                        No usage history found for this coupon
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
