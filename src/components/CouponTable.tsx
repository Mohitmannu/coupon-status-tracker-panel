
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MoreHorizontalIcon, Check, X, Mail, Clock } from "lucide-react";
import { CouponDetailsDialog } from "./CouponDetailsDialog";
import { mockCoupons } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function CouponTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [emailSentFilter, setEmailSentFilter] = useState("all");
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Enhanced mockCoupons with additional fields from your requirements
  const enhancedCoupons = mockCoupons.map(coupon => ({
    ...coupon,
    couponType: ["Individual", "Enterprise", "School"][Math.floor(Math.random() * 3)],
    module: ["Gift Card", "Subscription", "Premium Access", "Workshop"][Math.floor(Math.random() * 4)],
    assignedTo: coupon.status === "active" ? "John Doe" : "Jane Smith",
    emailSent: Math.random() > 0.2,
    value: `$${Math.floor(Math.random() * 500) + 50}`,
    utilizedAmount: `$${Math.floor(Math.random() * 50)}`,
    balance: `$${Math.floor(Math.random() * 450) + 50}`,
  }));

  // Filter coupons based on search query, status filter, type filter, and email sent filter
  const filteredCoupons = enhancedCoupons.filter((coupon) => {
    const matchesSearch = 
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || coupon.status === statusFilter;
    const matchesType = typeFilter === "all" || coupon.couponType === typeFilter;
    const matchesEmailSent = emailSentFilter === "all" || 
      (emailSentFilter === "sent" && coupon.emailSent) ||
      (emailSentFilter === "not-sent" && !coupon.emailSent);
    
    // Date range filtering
    const createdDate = new Date(coupon.createdAt);
    const matchesDateRange = 
      (!dateRange.from || createdDate >= dateRange.from) &&
      (!dateRange.to || createdDate <= dateRange.to);
    
    return matchesSearch && matchesStatus && matchesType && matchesEmailSent && matchesDateRange;
  });

  const handleViewDetails = (couponId: string) => {
    setSelectedCoupon(couponId);
    setShowDetailsDialog(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setEmailSentFilter("all");
    setDateRange({ from: undefined, to: undefined });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-auto">
            <Input
              placeholder="Search by name, email, or coupon code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[300px]"
            />
          </div>
          
          <div className="w-full sm:w-auto flex flex-row gap-2">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="Individual">Individual</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
              <SelectItem value="School">School</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={emailSentFilter} onValueChange={setEmailSentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Email sent status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="sent">Email sent</SelectItem>
              <SelectItem value="not-sent">Email not sent</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal w-full">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Date range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange as any}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Module</TableHead>
              <TableHead className="hidden lg:table-cell">Assigned To</TableHead>
              <TableHead className="hidden md:table-cell">Email Sent</TableHead>
              <TableHead>Redeemed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Value</TableHead>
              <TableHead className="hidden lg:table-cell">Utilized</TableHead>
              <TableHead className="hidden lg:table-cell">Balance</TableHead>
              <TableHead className="hidden md:table-cell">Created Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center py-6 text-muted-foreground">
                  No coupons found
                </TableCell>
              </TableRow>
            ) : (
              filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{coupon.couponType}</TableCell>
                  <TableCell>{coupon.module}</TableCell>
                  <TableCell className="hidden lg:table-cell">{coupon.assignedTo}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {coupon.emailSent ? (
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        <Mail className="h-3 w-3 mr-1" />
                        Sent
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {coupon.usedCount > 0 ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        coupon.status === "active" ? "default" :
                        coupon.status === "expired" ? "destructive" :
                        "outline"
                      }
                      className="flex items-center gap-1"
                    >
                      {coupon.status === "active" ? (
                        <Check className="h-3 w-3" />
                      ) : coupon.status === "expired" ? (
                        <X className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {coupon.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{coupon.value}</TableCell>
                  <TableCell className="hidden lg:table-cell">{coupon.utilizedAmount}</TableCell>
                  <TableCell className="hidden lg:table-cell">{coupon.balance}</TableCell>
                  <TableCell className="hidden md:table-cell">{coupon.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(coupon.id)}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Resend email</DropdownMenuItem>
                        <DropdownMenuItem>Mark as expired</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete coupon
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {selectedCoupon && (
        <CouponDetailsDialog
          couponId={selectedCoupon}
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
        />
      )}
    </div>
  );
}
