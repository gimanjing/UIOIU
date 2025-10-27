import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from "@tremor/react";
import { generatePackaging } from "@/lib/mockData";

export default function PackagingSettingPage() {
  const packaging = generatePackaging();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Packaging Setting</h1>
          <p className="mt-2 text-neutral-400">Define packaging types and specifications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">+ Add Packaging</Button>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <Table>
          <TableHead>
            <TableRow className="border-pitch-border">
              <TableHeaderCell className="text-neutral-300">Package ID</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Type</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Dimensions</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Max Weight</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packaging.map((pkg) => (
              <TableRow key={pkg.id} className="border-pitch-border">
                <TableCell className="text-neutral-300">{pkg.id}</TableCell>
                <TableCell className="text-white font-medium">{pkg.type}</TableCell>
                <TableCell className="text-neutral-300">{pkg.dimensions}</TableCell>
                <TableCell className="text-neutral-300">{pkg.maxWeight}</TableCell>
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