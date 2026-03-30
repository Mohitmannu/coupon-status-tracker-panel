import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { mockCoupons, mockSessionBookings } from "@/lib/mockData";
import { Check, X, Mail, RefreshCw } from "lucide-react";

interface CouponDetailsDialogProps {
  couponId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CouponDetailsDialog({ couponId, open, onOpenChange }: CouponDetailsDialogProps) {
  const coupon = mockCoupons.find((c) => c.id === couponId);
  if (!coupon) return null;

  const sessions = mockSessionBookings.filter((s) => s.couponId === couponId);
  const usagePercent = coupon.value > 0 ? (coupon.utilizedAmount / coupon.value) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-mono">{coupon.code}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recipient">Recipient</TabsTrigger>
            <TabsTrigger value="email">Email History</TabsTrigger>
            <TabsTrigger value="usage">Usage History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="flex-1 overflow-auto space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader><CardTitle className="text-lg">Coupon Info</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <Badge variant="outline">{coupon.couponType}</Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Module</p>
                      <p className="font-medium">{coupon.module}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Organization</p>
                      <p className="font-medium">{coupon.organizationName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <Badge variant={coupon.status === "Active" ? "default" : coupon.status === "Expired" ? "destructive" : "secondary"}>
                        {coupon.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Created</p>
                      <p className="font-medium">{coupon.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Valid Until</p>
                      <p className="font-medium">{coupon.validUntil}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Created by: {coupon.createdBy}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-lg">Balance</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-1">
                    <p className="text-3xl font-bold">₹{coupon.balance.toLocaleString("en-IN")}</p>
                    <p className="text-sm text-muted-foreground">Remaining Balance</p>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>₹{coupon.utilizedAmount.toLocaleString("en-IN")} used</span>
                    <span>₹{coupon.value.toLocaleString("en-IN")} total</span>
                  </div>
                  <Progress value={usagePercent} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center">{usagePercent.toFixed(1)}% utilized</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recipient" className="flex-1 overflow-auto">
            <Card>
              <CardHeader><CardTitle className="text-lg">Recipient Information</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{coupon.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{coupon.assignedEmail}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Contact</p>
                    <p className="font-medium">{coupon.assignedContact}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Organization</p>
                    <p className="font-medium">{coupon.organizationName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="flex-1 overflow-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Email History</CardTitle>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-3 w-3 mr-1" /> Resend
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {coupon.emailHistory.map((entry, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className={`p-1.5 rounded-full ${entry.status === "Sent" ? "bg-green-50" : "bg-red-50"}`}>
                        {entry.status === "Sent" ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{entry.status}</p>
                        <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="flex-1 overflow-hidden">
            <Card className="flex-1 overflow-hidden flex flex-col">
              <CardHeader>
                <CardTitle>Session Bookings</CardTitle>
                <CardDescription>Sessions booked using this coupon</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-[350px]">
                  <div className="p-4 space-y-3">
                    {sessions.length > 0 ? (
                      sessions.map((session) => (
                        <div key={session.id} className="p-3 border rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{session.sessionName}</p>
                            <Badge variant="outline" className="text-xs">
                              {session.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                            <p>Booking: <span className="font-mono font-medium text-foreground">{session.bookingId}</span></p>
                            <p>Amount: <span className="font-medium text-foreground">₹{session.amount.toLocaleString("en-IN")}</span></p>
                            <p>User: <span className="font-medium text-foreground">{session.user}</span></p>
                            <p>Date: <span className="font-medium text-foreground">{session.bookingDate} {session.bookingTime}</span></p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-muted-foreground">
                        No sessions booked with this coupon yet
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
