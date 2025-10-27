import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button, Badge } from "@tremor/react";
import { generateDepots } from "@/lib/mockData";

export default function DepotSettingPage() {
  const depots = generateDepots();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Depot Setting</h1>
          <p className="mt-2 text-neutral-400">Manage depot locations and capacities</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">+ Add Depot</Button>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <Table>
          <TableHead>
            <TableRow className="border-pitch-border">
              <TableHeaderCell className="text-neutral-300">Depot ID</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Name</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Address</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Capacity</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Current Load</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Status</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {depots.map((depot) => {
              const utilization = (depot.current / depot.capacity) * 100;
              return (
                <TableRow key={depot.id} className="border-pitch-border">
                  <TableCell className="text-neutral-300">{depot.id}</TableCell>
                  <TableCell className="text-white font-medium">{depot.name}</TableCell>
                  <TableCell className="text-neutral-400 text-sm">{depot.address}</TableCell>
                  <TableCell className="text-neutral-300">{depot.capacity}</TableCell>
                  <TableCell className="text-neutral-300">{depot.current}</TableCell>
                  <TableCell>
                    <Badge color={utilization > 80 ? "red" : utilization > 60 ? "yellow" : "green"}>
                      {utilization.toFixed(0)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="xs" variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Edit</Button>
                      <Button size="xs" variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface text-red-400">Remove</Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}