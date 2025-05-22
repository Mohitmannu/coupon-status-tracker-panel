
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CreateCouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCouponDialog({ open, onOpenChange }: CreateCouponDialogProps) {
  const [couponData, setCouponData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    validUntil: "",
    maxUses: "",
    restrictions: "",
  });

  const handleChange = (field: string, value: string) => {
    setCouponData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!couponData.code || !couponData.discountValue) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In a real app, this would save the coupon to the database
    console.log("Creating coupon:", couponData);
    
    // Show success message
    toast.success("Coupon created successfully!");
    
    // Reset form and close dialog
    setCouponData({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      validUntil: "",
      maxUses: "",
      restrictions: "",
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
            <Label htmlFor="code">Coupon Code</Label>
            <Input
              id="code"
              value={couponData.code}
              onChange={(e) => handleChange("code", e.target.value)}
              placeholder="e.g., SUMMER2023"
              className="uppercase"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={couponData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="e.g., Summer sale promotion"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Discount Type</Label>
            <RadioGroup
              value={couponData.discountType}
              onValueChange={(value) => handleChange("discountType", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage" id="percentage" />
                <Label htmlFor="percentage">Percentage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="fixed" />
                <Label htmlFor="fixed">Fixed Amount</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="discountValue">
              {couponData.discountType === "percentage" ? "Discount Percentage" : "Discount Amount"}
            </Label>
            <div className="relative">
              <Input
                id="discountValue"
                value={couponData.discountValue}
                onChange={(e) => handleChange("discountValue", e.target.value)}
                placeholder={couponData.discountType === "percentage" ? "e.g., 10" : "e.g., 25.00"}
                type="number"
                min="0"
                step={couponData.discountType === "percentage" ? "1" : "0.01"}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                {couponData.discountType === "percentage" ? "%" : "$"}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                id="validUntil"
                type="date"
                value={couponData.validUntil}
                onChange={(e) => handleChange("validUntil", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxUses">Max Uses</Label>
              <Input
                id="maxUses"
                type="number"
                value={couponData.maxUses}
                onChange={(e) => handleChange("maxUses", e.target.value)}
                placeholder="Leave empty for unlimited"
                min="1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="restrictions">Restrictions (Optional)</Label>
            <Textarea
              id="restrictions"
              value={couponData.restrictions}
              onChange={(e) => handleChange("restrictions", e.target.value)}
              placeholder="e.g., Minimum purchase of $50"
            />
          </div>
          
          <DialogFooter>
            <Button type="submit">Create Coupon</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
