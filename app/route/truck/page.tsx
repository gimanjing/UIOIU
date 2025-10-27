import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button, Badge } from "@tremor/react";
import { generateTrucks } from "@/lib/mockData";

export default function TruckSettingPage() {
  const trucks = generateTrucks();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Truck Setting</h1>
          <p className="mt-2 text-neutral-400">Manage truck fleet and specifications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">+ Add Truck</Button>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <Table>
          <TableHead>
            <TableRow className="border-pitch-border">
              <TableHeaderCell className="text-neutral-300">Truck ID</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Model</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Capacity</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Status</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trucks.map((truck) => (
              <TableRow key={truck.id} className="border-pitch-border">
                <TableCell className="text-neutral-300">{truck.id}</TableCell>
                <TableCell className="text-white font-medium">{truck.model}</TableCell>
                <TableCell className="text-neutral-300">{truck.capacity}</TableCell>
                <TableCell>
                  <Badge color={truck.status === 'Available' ? 'green' : truck.status === 'In Transit' ? 'blue' : 'yellow'}>
                    {truck.status}
                  </Badge>
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