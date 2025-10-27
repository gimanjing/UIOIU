import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from "@tremor/react";
import { generateVendors } from "@/lib/mockData";

export default function VendorSettingPage() {
  const vendors = generateVendors();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Vendor Setting</h1>
          <p className="mt-2 text-neutral-400">Manage vendor information and locations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">+ Add Vendor</Button>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <Table>
          <TableHead>
            <TableRow className="border-pitch-border">
              <TableHeaderCell className="text-neutral-300">Vendor ID</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Name</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Location</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Parts Count</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Avg Delivery</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id} className="border-pitch-border">
                <TableCell className="text-neutral-300">{vendor.id}</TableCell>
                <TableCell className="text-white font-medium">{vendor.name}</TableCell>
                <TableCell className="text-neutral-400 text-sm">{vendor.location}</TableCell>
                <TableCell className="text-neutral-300">{vendor.parts}</TableCell>
                <TableCell className="text-neutral-300">{vendor.avgDelivery}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="xs" variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Edit</Button>
                    <Button size="xs" variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface text-red-400">Remove</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}