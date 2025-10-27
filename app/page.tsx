import { Card, Grid, Metric, Text, AreaChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";
import { generateDailyShipments, generateRecentRuns } from "@/lib/mockData";

export default function HomePage() {
  const shipmentData = generateDailyShipments(30);
  const recentRuns = generateRecentRuns();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="mt-2 text-neutral-400">Real-time logistics and route optimization metrics</p>
      </div>

      <Grid numItemsMd={3} className="gap-6">
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Active Vendors</Text>
          <Metric className="text-white">45</Metric>
          <Text className="mt-2 text-green-400">+3 this month</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Total Parts</Text>
          <Metric className="text-white">1,250</Metric>
          <Text className="mt-2 text-blue-400">+127 this month</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Active Routes</Text>
          <Metric className="text-white">18</Metric>
          <Text className="mt-2 text-yellow-400">2 in progress</Text>
        </Card>
      </Grid>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white">Daily Shipments (Last 30 Days)</h3>
        <AreaChart
          className="mt-4 h-72"
          data={shipmentData}
          index="date"
          categories={["shipments"]}
          colors={["blue"]}
          showLegend={false}
          showGridLines={true}
        />
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Optimization Runs</h3>
        <Table>
          <TableHead>
            <TableRow className="border-pitch-border">
              <TableHeaderCell className="text-neutral-300">Run ID</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Solver</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Start Time</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Duration</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Status</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Routes</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Distance</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentRuns.map((run) => (
              <TableRow key={run.id} className="border-pitch-border">
                <TableCell className="text-neutral-300">{run.id}</TableCell>
                <TableCell className="text-neutral-300">{run.solver}</TableCell>
                <TableCell className="text-neutral-400 text-sm">{run.startTime}</TableCell>
                <TableCell className="text-neutral-300">{run.duration}</TableCell>
                <TableCell>
                  <Badge color={run.status === 'Completed' ? 'green' : run.status === 'Running' ? 'blue' : 'red'}>
                    {run.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-neutral-300">{run.routes}</TableCell>
                <TableCell className="text-neutral-300">{run.distance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}