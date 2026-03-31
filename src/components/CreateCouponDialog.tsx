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
    discountType: "fixed",
    assignTo: "Individual",
    module: "1-on-1 Booking",
    organizationName: "",
    value: "",
    validUntil: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.value) {
      toast.error("Please fill in all required fields");
      return;
    }
    const label = form.discountType === "percentage" ? `${form.value}%` : `₹${form.value}`;
    toast.success(`Coupon ${form.code} (${label}) created!`);
    setForm({
      code: "", discountType: "fixed", assignTo: "Individual",
      module: "1-on-1 Booking", organizationName: "", value: "", validUntil: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Coupon</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Coupon Code *</Label>
            <Input
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value)}
              placeholder="e.g., POSITIVTYNESTLE2025"
              className="uppercase font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Discount Type *</Label>
              <Select value={form.discountType} onValueChange={(v) => handleChange("discountType", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{form.discountType === "percentage" ? "Discount (%)" : "Value (₹)"} *</Label>
              <Input
                type="number"
                min={form.discountType === "percentage" ? "1" : "100"}
                max={form.discountType === "percentage" ? "100" : undefined}
                value={form.value}
                onChange={(e) => handleChange("value", e.target.value)}
                placeholder={form.discountType === "percentage" ? "e.g., 20" : "e.g., 20000"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Assign To</Label>
              <Select value={form.assignTo} onValueChange={(v) => handleChange("assignTo", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Organization">Organization (B2B)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Module</Label>
              <Select value={form.module} onValueChange={(v) => handleChange("module", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-on-1 Booking">1-on-1 Booking</SelectItem>
                  <SelectItem value="Group Session">Group Session</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {form.assignTo === "Organization" && (
            <div className="space-y-2">
              <Label>Organization Name</Label>
              <Input
                value={form.organizationName}
                onChange={(e) => handleChange("organizationName", e.target.value)}
                placeholder="e.g., Nestle India"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Valid Until</Label>
            <Input
              type="date"
              value={form.validUntil}
              onChange={(e) => handleChange("validUntil", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">Create Coupon</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
