import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Upload, Download, Zap } from "lucide-react";

interface GeneratedCoupon {
  code: string;
  organization: string;
  amount: number;
  validUntil: string;
  status: string;
}

const BulkGenerator = () => {
  const [form, setForm] = useState({
    organizationName: "",
    numberOfCoupons: "",
    discountType: "fixed",
    amountPerCoupon: "",
    validityMonths: "6",
    module: "1-on-1 Booking",
    autoSendEmail: false,
  });
  const [generatedCoupons, setGeneratedCoupons] = useState<GeneratedCoupon[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const generateCode = (org: string, index: number) => {
    const prefix = "POSITIVTY";
    const orgShort = org.replace(/\s+/g, "").substring(0, 6).toUpperCase();
    const random = Math.floor(Math.random() * 900 + 100);
    return `${prefix}${orgShort}${random}${index + 1}`;
  };

  const handleGenerate = () => {
    if (!form.organizationName || !form.numberOfCoupons || !form.amountPerCoupon) {
      toast.error("Please fill in all required fields");
      return;
    }

    const count = parseInt(form.numberOfCoupons);
    const amount = parseInt(form.amountPerCoupon);
    const validMonths = parseInt(form.validityMonths);
    const validUntil = new Date();
    validUntil.setMonth(validUntil.getMonth() + validMonths);

    const coupons: GeneratedCoupon[] = Array.from({ length: count }, (_, i) => ({
      code: generateCode(form.organizationName, i),
      organization: form.organizationName,
      amount,
      validUntil: validUntil.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Generated",
    }));

    setGeneratedCoupons(coupons);
    toast.success(`${count} coupons generated for ${form.organizationName}!`);
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      toast.success(`File "${file.name}" uploaded. Ready for bulk processing.`);
    }
  };

  const valueLabel = form.discountType === "percentage" ? "Discount per Coupon (%)" : "Amount per Coupon (₹)";

  return (
    <div className="p-4 md:p-6 space-y-6 pt-14 md:pt-6">
      <h1 className="text-xl md:text-2xl font-bold">Bulk Coupon Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">Generate Coupons</CardTitle>
            <CardDescription>Create multiple coupons for B2B clients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 md:p-6">
            <div className="space-y-2">
              <Label>Organization Name *</Label>
              <Input
                placeholder="e.g., Nestle India"
                value={form.organizationName}
                onChange={(e) => handleChange("organizationName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Discount Type</Label>
                <Select value={form.discountType} onValueChange={(v) => handleChange("discountType", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Number of Coupons *</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="e.g., 50"
                  value={form.numberOfCoupons}
                  onChange={(e) => handleChange("numberOfCoupons", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{valueLabel} *</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder={form.discountType === "percentage" ? "e.g., 20" : "e.g., 5000"}
                  value={form.amountPerCoupon}
                  onChange={(e) => handleChange("amountPerCoupon", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Validity Period</Label>
              <Select value={form.validityMonths} onValueChange={(v) => handleChange("validityMonths", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Month</SelectItem>
                  <SelectItem value="3">3 Months</SelectItem>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label>Auto-send Email</Label>
                <p className="text-xs text-muted-foreground">Send coupon details via email</p>
              </div>
              <Switch
                checked={form.autoSendEmail}
                onCheckedChange={(v) => handleChange("autoSendEmail", v)}
              />
            </div>

            <Button onClick={handleGenerate} className="w-full">
              <Zap className="h-4 w-4 mr-2" />
              Generate Coupons
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">CSV Upload</CardTitle>
            <CardDescription>Upload recipient details for bulk distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 md:p-6">
            <div className="border-2 border-dashed border-border rounded-lg p-6 md:p-8 text-center">
              <Upload className="h-8 w-8 md:h-10 md:w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-3">
                Upload CSV/Excel with recipient details
              </p>
              <Input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleCsvUpload}
                className="max-w-xs mx-auto"
              />
              {csvFile && (
                <p className="text-sm text-primary mt-2 font-medium">
                  ✓ {csvFile.name} uploaded
                </p>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">CSV Format:</p>
              <div className="bg-muted rounded-md p-3 text-xs font-mono overflow-x-auto">
                <p>Name, Email, Contact, Amount</p>
                <p>Rahul Mehta, rahul@nestle.com, +91 98765 43210, 5000</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Sample CSV
            </Button>
          </CardContent>
        </Card>
      </div>

      {generatedCoupons.length > 0 && (
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">Generated Coupons ({generatedCoupons.length})</CardTitle>
            <CardDescription>
              Total Value: ₹{(generatedCoupons.reduce((sum, c) => sum + c.amount, 0)).toLocaleString("en-IN")}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Coupon Code</TableHead>
                    <TableHead className="hidden sm:table-cell">Organization</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="hidden sm:table-cell">Valid Until</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedCoupons.map((coupon, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell className="font-mono font-medium text-xs">{coupon.code}</TableCell>
                      <TableCell className="hidden sm:table-cell">{coupon.organization}</TableCell>
                      <TableCell>₹{coupon.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell className="hidden sm:table-cell">{coupon.validUntil}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {coupon.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BulkGenerator;
