import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CreateCouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCouponDialog({ open, onOpenChange }: CreateCouponDialogProps) {
  const [form, setForm] = useState({
    code: "",
    couponType: "Individual",
    module: "1-on-1 Booking",
    organizationName: "",
    assignedTo: "",
    assignedEmail: "",
    assignedContact: "",
    value: "",
    validUntil: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.value || !form.assignedTo) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success(`Coupon ${form.code} created successfully!`);
    setForm({
      code: "", couponType: "Individual", module: "1-on-1 Booking",
      organizationName: "", assignedTo: "", assignedEmail: "",
      assignedContact: "", value: "", validUntil: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Coupon</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Coupon Code *</Label>
            <Input value={form.code} onChange={(e) => handleChange("code", e.target.value)} placeholder="e.g., POSITIVTYLOVABLE123" className="uppercase font-mono" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.couponType} onValueChange={(v) => handleChange("couponType", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="School">School / College</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Module</Label>
              <Select value={form.module} onValueChange={(v) => handleChange("module", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-on-1 Booking">1-on-1 Booking</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Group Session">Group Session</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {form.couponType !== "Individual" && (
            <div className="space-y-2">
              <Label>Organization Name</Label>
              <Input value={form.organizationName} onChange={(e) => handleChange("organizationName", e.target.value)} placeholder="e.g., Nestle India" />
            </div>
          )}
          <div className="space-y-2">
            <Label>Assigned To *</Label>
            <Input value={form.assignedTo} onChange={(e) => handleChange("assignedTo", e.target.value)} placeholder="Recipient name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={form.assignedEmail} onChange={(e) => handleChange("assignedEmail", e.target.value)} placeholder="recipient@company.com" />
            </div>
            <div className="space-y-2">
              <Label>Contact</Label>
              <Input value={form.assignedContact} onChange={(e) => handleChange("assignedContact", e.target.value)} placeholder="+91 98765 43210" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Coupon Value (₹) *</Label>
              <Input type="number" min="100" value={form.value} onChange={(e) => handleChange("value", e.target.value)} placeholder="e.g., 20000" />
            </div>
            <div className="space-y-2">
              <Label>Valid Until</Label>
              <Input type="date" value={form.validUntil} onChange={(e) => handleChange("validUntil", e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Coupon</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
