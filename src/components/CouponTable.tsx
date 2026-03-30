import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MoreHorizontalIcon, Check, X, Mail, Clock } from "lucide-react";
import { CouponDetailsDialog } from "./CouponDetailsDialog";
import { mockCoupons } from "@/lib/mockData";

export function CouponTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [emailSentFilter, setEmailSentFilter] = useState("all");
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const filteredCoupons = mockCoupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.assignedEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.organizationName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || coupon.status === statusFilter;
    const matchesType = typeFilter === "all" || coupon.couponType === typeFilter;
    const matchesEmailSent =
      emailSentFilter === "all" ||
      (emailSentFilter === "sent" && coupon.emailSent) ||
      (emailSentFilter === "not-sent" && !coupon.emailSent);

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
          <Input
            placeholder="Search by name, email, org, or coupon code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px]"
          />
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger><SelectValue placeholder="Filter by status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Used">Used</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger><SelectValue placeholder="Filter by type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Individual">Individual</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
              <SelectItem value="School">School</SelectItem>
            </SelectContent>
          </Select>

          <Select value={emailSentFilter} onValueChange={setEmailSentFilter}>
            <SelectTrigger><SelectValue placeholder="Email status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sent">Email Sent</SelectItem>
              <SelectItem value="not-sent">Not Sent</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal w-full">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>{format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}</>
                  ) : format(dateRange.from, "LLL dd, y")
                ) : "Date range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="range" selected={dateRange} onSelect={setDateRange as any} initialFocus />
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
              <TableHead className="hidden lg:table-cell">Organization</TableHead>
              <TableHead className="hidden lg:table-cell">Assigned To</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Value (₹)</TableHead>
              <TableHead className="hidden lg:table-cell">Utilized (₹)</TableHead>
              <TableHead className="hidden lg:table-cell">Balance (₹)</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
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
                  <TableCell className="font-mono font-medium text-xs">{coupon.code}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{coupon.couponType}</Badge>
                  </TableCell>
                  <TableCell className="text-xs">{coupon.module}</TableCell>
                  <TableCell className="hidden lg:table-cell text-xs">{coupon.organizationName}</TableCell>
                  <TableCell className="hidden lg:table-cell text-xs">{coupon.assignedTo}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {coupon.emailSent ? (
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs">
                        <Mail className="h-3 w-3 mr-1" /> Sent
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 text-xs">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={coupon.status === "Active" ? "default" : coupon.status === "Expired" ? "destructive" : "secondary"}
                      className="flex items-center gap-1 text-xs"
                    >
                      {coupon.status === "Active" ? <Check className="h-3 w-3" /> :
                        coupon.status === "Expired" ? <X className="h-3 w-3" /> :
                          <Clock className="h-3 w-3" />}
                      {coupon.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">₹{coupon.value.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="hidden lg:table-cell">₹{coupon.utilizedAmount.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="hidden lg:table-cell">₹{coupon.balance.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="hidden md:table-cell text-xs">{coupon.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(coupon.id)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Resend Email</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Expired</DropdownMenuItem>
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
        <CouponDetailsDialog couponId={selectedCoupon} open={showDetailsDialog} onOpenChange={setShowDetailsDialog} />
      )}
    </div>
  );
}
