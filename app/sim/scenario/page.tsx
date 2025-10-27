import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button, Badge } from "@tremor/react";
import { generateScenarios } from "@/lib/mockData";

export default function ScenarioBuilderPage() {
  const scenarios = generateScenarios();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Scenario Builder</h1>
          <p className="mt-2 text-neutral-400">Create and manage optimization scenarios</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">+ New Scenario</Button>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Saved Scenarios</h3>
        <Table>
          <TableHead>
            <TableRow className="border-pitch-border">
              <TableHeaderCell className="text-neutral-300">Scenario ID</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Name</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Trucks</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Vendors</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Created</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scenarios.map((scenario) => (
              <TableRow key={scenario.id} className="border-pitch-border">
                <TableCell className="text-neutral-300">{scenario.id}</TableCell>
                <TableCell className="text-white font-medium">{scenario.name}</TableCell>
                <TableCell className="text-neutral-300">{scenario.trucks}</TableCell>
                <TableCell className="text-neutral-300">{scenario.vendors}</TableCell>
                <TableCell className="text-neutral-400 text-sm">{scenario.created}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="xs" variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Load</Button>
                    <Button size="xs" variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Edit</Button>
                    <Button size="xs" variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface text-red-400">Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Scenario Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-pitch-border rounded p-4 hover:bg-pitch-black cursor-pointer transition-colors">
            <h4 className="text-white font-semibold mb-2">Standard Operations</h4>
            <p className="text-sm text-neutral-400">10 trucks, 20 vendors, normal constraints</p>
            <Badge className="mt-2" color="blue">Default</Badge>
          </div>
          <div className="border border-pitch-border rounded p-4 hover:bg-pitch-black cursor-pointer transition-colors">
            <h4 className="text-white font-semibold mb-2">High Volume</h4>
            <p className="text-sm text-neutral-400">20 trucks, 40 vendors, extended hours</p>
            <Badge className="mt-2" color="yellow">Peak</Badge>
          </div>
          <div className="border border-pitch-border rounded p-4 hover:bg-pitch-black cursor-pointer transition-colors">
            <h4 className="text-white font-semibold mb-2">Cost Optimized</h4>
            <p className="text-sm text-neutral-400">8 trucks, 15 vendors, fuel efficiency focus</p>
            <Badge className="mt-2" color="green">Economy</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}