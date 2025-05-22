import { TicketIcon, TagIcon, TicketXIcon } from "lucide-react";

export const mockCoupons = [
  {
    id: "1",
    code: "SUMMER25",
    description: "25% off summer collection",
    discount: "25%",
    type: "Percentage",
    createdAt: "May 10, 2025",
    validUntil: "Aug 31, 2025",
    usedCount: 124,
    maxUses: 500,
    status: "active",
    restrictions: "Minimum purchase of $50"
  },
  {
    id: "2",
    code: "WELCOME10",
    description: "10% off your first purchase",
    discount: "10%",
    type: "Percentage",
    createdAt: "Jan 15, 2025",
    validUntil: "Dec 31, 2025",
    usedCount: 298,
    maxUses: -1,
    status: "active",
    restrictions: null
  },
  {
    id: "3",
    code: "FLASH50",
    description: "50% off flash sale items",
    discount: "50%",
    type: "Percentage",
    createdAt: "Apr 5, 2025",
    validUntil: "Apr 7, 2025",
    usedCount: 76,
    maxUses: 100,
    status: "expired",
    restrictions: "Flash sale items only"
  },
  {
    id: "4",
    code: "FREESHIP",
    description: "Free shipping on all orders",
    discount: "$0 shipping",
    type: "Shipping",
    createdAt: "Mar 22, 2025",
    validUntil: "Jun 22, 2025",
    usedCount: 210,
    maxUses: 300,
    status: "active",
    restrictions: null
  },
  {
    id: "5",
    code: "HOLIDAY20",
    description: "20% off holiday items",
    discount: "20%",
    type: "Percentage",
    createdAt: "May 1, 2025",
    validUntil: "Dec 25, 2025",
    usedCount: 0,
    maxUses: 200,
    status: "scheduled",
    restrictions: "Holiday category items only"
  },
  {
    id: "6",
    code: "FLAT25",
    description: "$25 off orders over $100",
    discount: "$25",
    type: "Fixed",
    createdAt: "Feb 14, 2025",
    validUntil: "May 31, 2025",
    usedCount: 43,
    maxUses: 50,
    status: "active",
    restrictions: "Minimum purchase of $100"
  },
  {
    id: "7",
    code: "SPRING15",
    description: "15% off spring collection",
    discount: "15%",
    type: "Percentage",
    createdAt: "Feb 1, 2025",
    validUntil: "Apr 15, 2025",
    usedCount: 89,
    maxUses: 100,
    status: "expired",
    restrictions: "Spring collection only"
  },
];

export const mockCouponUsageHistory = [
  {
    id: "u1",
    couponId: "1",
    user: "John Smith",
    email: "john.smith@example.com",
    date: "May 22, 2025",
    time: "14:25:32",
    orderId: "ORD-12345",
    discountApplied: "$37.50"
  },
  {
    id: "u2",
    couponId: "1",
    user: "Emma Johnson",
    email: "emma.j@example.com",
    date: "May 21, 2025",
    time: "09:12:45",
    orderId: "ORD-12344",
    discountApplied: "$25.00"
  },
  {
    id: "u3",
    couponId: "1",
    user: "Michael Brown",
    email: "michael.b@example.com",
    date: "May 20, 2025",
    time: "18:03:21",
    orderId: "ORD-12343",
    discountApplied: "$42.75"
  },
  {
    id: "u4",
    couponId: "2",
    user: "Sophia Miller",
    email: "sophia.m@example.com",
    date: "May 22, 2025",
    time: "11:35:17",
    orderId: "ORD-12342",
    discountApplied: "$9.99"
  },
  {
    id: "u5",
    couponId: "2",
    user: "James Wilson",
    email: "james.w@example.com",
    date: "May 21, 2025",
    time: "16:45:23",
    orderId: "ORD-12341",
    discountApplied: "$12.50"
  }
];

export const mockChartData = [
  {
    date: "May 16",
    redeemed: 12,
    expired: 3,
    created: 5
  },
  {
    date: "May 17",
    redeemed: 19,
    expired: 2,
    created: 0
  },
  {
    date: "May 18",
    redeemed: 14,
    expired: 0,
    created: 7
  },
  {
    date: "May 19",
    redeemed: 22,
    expired: 1,
    created: 2
  },
  {
    date: "May 20",
    redeemed: 25,
    expired: 4,
    created: 0
  },
  {
    date: "May 21",
    redeemed: 18,
    expired: 0,
    created: 3
  },
  {
    date: "May 22",
    redeemed: 24,
    expired: 2,
    created: 5
  }
];

export const mockRecentActivity = [
  {
    id: "a1",
    type: "redemption",
    icon: TicketIcon,
    message: "Coupon redeemed",
    couponCode: "SUMMER25",
    time: "2 minutes ago",
    user: "john.smith@example.com",
    amount: "$25.00",
    module: "Gift Card",
    bookingId: "BK-12345"
  },
  {
    id: "a2",
    type: "creation",
    icon: TagIcon,
    message: "New coupon created",
    couponCode: "EXTRA15",
    time: "1 hour ago",
    user: "admin@example.com",
    module: "Enterprise",
    emailStatus: "Sent"
  },
  {
    id: "a3",
    type: "redemption",
    icon: TicketIcon,
    message: "Coupon redeemed",
    couponCode: "WELCOME10",
    time: "2 hours ago",
    user: "sophia.m@example.com",
    amount: "$10.00",
    module: "Gift Card",
    bookingId: "BK-12346"
  },
  {
    id: "a4",
    type: "expiration",
    icon: TicketXIcon,
    message: "Coupon expired",
    couponCode: "FLASH50",
    time: "5 hours ago",
    user: "system",
    module: "School"
  },
  {
    id: "a5",
    type: "redemption",
    icon: TicketIcon,
    message: "Coupon redeemed",
    couponCode: "WELCOME10",
    time: "6 hours ago",
    user: "james.w@example.com",
    amount: "$10.00",
    module: "Individual",
    bookingId: "BK-12347"
  },
  {
    id: "a6",
    type: "redemption",
    icon: TicketIcon,
    message: "Coupon redeemed",
    couponCode: "FREESHIP",
    time: "1 day ago",
    user: "emma.j@example.com",
    amount: "$0.00",
    module: "Gift Card",
    bookingId: "BK-12348"
  },
];
