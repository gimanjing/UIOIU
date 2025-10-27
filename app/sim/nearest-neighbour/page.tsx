import { Card, Grid, Metric, Text, Button, TextInput, NumberInput } from "@tremor/react";

export default function NearestNeighbourPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Nearest Neighbour Algorithm</h1>
        <p className="mt-2 text-neutral-400">Configure and run nearest neighbour route optimization</p>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Algorithm Parameters</h3>
        <Grid numItemsMd={2} className="gap-4">
          <div>
            <Text className="text-neutral-400 mb-2">Starting Depot</Text>
            <TextInput placeholder="D-001" className="bg-pitch-black border-pitch-border text-white" />
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">Max Distance (km)</Text>
            <NumberInput placeholder="300" className="bg-pitch-black border-pitch-border text-white" />
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">Max Stops per Route</Text>
            <NumberInput placeholder="12" className="bg-pitch-black border-pitch-border text-white" />
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">Number of Trucks</Text>
            <NumberInput placeholder="10" className="bg-pitch-black border-pitch-border text-white" />
          </div>
        </Grid>
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700">Run Optimization</Button>
      </Card>

      <Grid numItemsMd={3} className="gap-6">
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Total Distance</Text>
          <Metric className="text-white">1,847 km</Metric>
          <Text className="mt-2 text-green-400">-12% vs baseline</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Routes Generated</Text>
          <Metric className="text-white">14</Metric>
          <Text className="mt-2 text-neutral-400">Avg 6.2 stops/route</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Computation Time</Text>
          <Metric className="text-white">2.3s</Metric>
          <Text className="mt-2 text-blue-400">Fast execution</Text>
        </Card>
      </Grid>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Algorithm Details</h3>
        <div className="space-y-3 text-neutral-300">
          <p>The Nearest Neighbour algorithm is a greedy heuristic that constructs routes by always selecting the closest unvisited location.</p>
          <p className="text-neutral-400"><strong className="text-white">Pros:</strong> Fast computation, simple implementation, good for initial solutions</p>
          <p className="text-neutral-400"><strong className="text-white">Cons:</strong> May not find optimal solution, sensitive to starting point</p>
        </div>
      </Card>
    </div>
  );
}