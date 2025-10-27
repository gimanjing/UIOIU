import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button, Badge } from "@tremor/react";
import { generateConstraints } from "@/lib/mockData";

export default function ConstraintSettingPage() {
  const constraints = generateConstraints();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Constraint Setting</h1>
          <p className="mt-2 text-neutral-400">Configure optimization constraints and rules</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">+ Add Constraint</Button>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <Table>
          <TableHead>
            <TableRow className="border-pitch-border">
              <TableHeaderCell className="text-neutral-300">Constraint ID</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Type</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Value</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Status</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {constraints.map((constraint) => (
              <TableRow key={constraint.id} className="border-pitch-border">
                <TableCell className="text-neutral-300">{constraint.id}</TableCell>
                <TableCell className="text-white font-medium">{constraint.type}</TableCell>
                <TableCell className="text-neutral-300">{constraint.value}</TableCell>
                <TableCell>
                  <Badge color={constraint.active ? 'green' : 'gray'}>
                    {constraint.active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="xs" variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">
                      {constraint.active ? 'Disable' : 'Enable'}
                    </Button>
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