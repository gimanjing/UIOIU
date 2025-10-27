import { Card, Grid, Metric, Text, BarChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from "@tremor/react";
import { generateRouteData, generateTruckDistances } from "@/lib/mockData";

export default function SimOverviewPage() {
  const routes = generateRouteData();
  const truckDistances = generateTruckDistances();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Route Overview</h1>
        <p className="mt-2 text-neutral-400">Current route assignments and performance metrics</p>
      </div>

      <Grid numItemsMd={4} className="gap-6">
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Total Routes</Text>
          <Metric className="text-white">15</Metric>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Avg Distance</Text>
          <Metric className="text-white">127 km</Metric>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Avg Stops</Text>
          <Metric className="text-white">6.8</Metric>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Avg Load</Text>
          <Metric className="text-white">68%</Metric>
        </Card>
      </Grid>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Distance by Truck</h3>
        <BarChart
          className="h-72"
          data={truckDistances}
          index="truck"
          categories={["distance"]}
          colors={["blue"]}
          showLegend={false}
        />
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Active Routes</h3>
        <Table>
          <TableHead>
            <TableRow className="border-pitch-border">
              <TableHeaderCell className="text-neutral-300">Route ID</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Truck</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Stops</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Distance</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Load</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">ETA</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.routeId} className="border-pitch-border">
                <TableCell className="text-neutral-300">{route.routeId}</TableCell>
                <TableCell className="text-neutral-300">{route.truck}</TableCell>
                <TableCell className="text-neutral-300">{route.stops}</TableCell>
                <TableCell className="text-neutral-300">{route.distance}</TableCell>
                <TableCell className="text-neutral-300">{route.load}</TableCell>
                <TableCell className="text-neutral-300">{route.eta}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}