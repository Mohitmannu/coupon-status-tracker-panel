import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockSessionBookings } from "@/lib/mockData";

const statusColors: Record<string, string> = {
  Completed: "bg-green-50 text-green-700 border-green-200",
  Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  Upcoming: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

const SessionTracking = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = mockSessionBookings.filter((b) => {
    const matchesSearch =
      b.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      b.user.toLowerCase().includes(search.toLowerCase()) ||
      b.couponCode.toLowerCase().includes(search.toLowerCase()) ||
      b.sessionName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesType = typeFilter === "all" || b.sessionType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalAmount = filtered.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Session Booking Tracking</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Sessions</p>
            <p className="text-2xl font-bold">{filtered.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Amount Redeemed</p>
            <p className="text-2xl font-bold">₹{totalAmount.toLocaleString("en-IN")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completed Sessions</p>
            <p className="text-2xl font-bold">
              {filtered.filter((b) => b.status === "Completed").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Coupon-Based Bookings</CardTitle>
          <CardDescription>Sessions booked via coupon codes on the Positvity platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search by booking ID, user, coupon, session..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:w-[300px]"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="1-on-1 Booking">1-on-1 Booking</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Group Session">Group Session</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Coupon Code</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Session Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No bookings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono font-medium">{booking.bookingId}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{booking.user}</p>
                          <p className="text-xs text-muted-foreground">{booking.userEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{booking.couponCode}</TableCell>
                      <TableCell>₹{booking.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell>{booking.sessionName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{booking.sessionType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{booking.bookingDate}</p>
                          <p className="text-xs text-muted-foreground">{booking.bookingTime}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[booking.status] || ""}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionTracking;
