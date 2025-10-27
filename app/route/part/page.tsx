import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button, Badge } from "@tremor/react";
import { generateParts } from "@/lib/mockData";

export default function PartSettingPage() {
  const parts = generateParts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Part Setting</h1>
          <p className="mt-2 text-neutral-400">Manage part specifications and properties</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">+ Add Part</Button>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <Table>
          <TableHead>
            <TableRow className="border-pitch-border">
              <TableHeaderCell className="text-neutral-300">Part ID</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Name</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Weight</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Volume</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Fragile</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parts.map((part) => (
              <TableRow key={part.id} className="border-pitch-border">
                <TableCell className="text-neutral-300">{part.id}</TableCell>
                <TableCell className="text-white font-medium">{part.name}</TableCell>
                <TableCell className="text-neutral-300">{part.weight}</TableCell>
                <TableCell className="text-neutral-300">{part.volume}</TableCell>
                <TableCell>
                  {part.fragile ? (
                    <Badge color="red">Yes</Badge>
                  ) : (
                    <Badge color="gray">No</Badge>
                  )}
                </TableCell>
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