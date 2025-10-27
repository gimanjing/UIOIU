import { Card, Grid, Metric, Text, Button, TextInput, NumberInput } from "@tremor/react";

export default function MatheuristicPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Matheuristic Solver</h1>
        <p className="mt-2 text-neutral-400">Hybrid mathematical programming and heuristic optimization</p>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Solver Configuration</h3>
        <Grid numItemsMd={2} className="gap-4">
          <div>
            <Text className="text-neutral-400 mb-2">Time Limit (seconds)</Text>
            <NumberInput placeholder="300" className="bg-pitch-black border-pitch-border text-white" />
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">MIP Gap (%)</Text>
            <NumberInput placeholder="5" className="bg-pitch-black border-pitch-border text-white" />
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">Heuristic Iterations</Text>
            <NumberInput placeholder="100" className="bg-pitch-black border-pitch-border text-white" />
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">Neighborhood Size</Text>
            <NumberInput placeholder="20" className="bg-pitch-black border-pitch-border text-white" />
          </div>
        </Grid>
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700">Run Matheuristic</Button>
      </Card>

      <Grid numItemsMd={3} className="gap-6">
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Total Distance</Text>
          <Metric className="text-white">1,623 km</Metric>
          <Text className="mt-2 text-green-400">-24% vs baseline</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Routes Generated</Text>
          <Metric className="text-white">12</Metric>
          <Text className="mt-2 text-neutral-400">Avg 7.3 stops/route</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Computation Time</Text>
          <Metric className="text-white">47.8s</Metric>
          <Text className="mt-2 text-yellow-400">Medium execution</Text>
        </Card>
      </Grid>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Optimization Progress</h3>
        <div className="space-y-3 text-neutral-300">
          <div className="flex justify-between">
            <span className="text-neutral-400">Initial Solution:</span>
            <span className="text-white">2,145 km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">After MIP Phase:</span>
            <span className="text-white">1,789 km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">After Local Search:</span>
            <span className="text-white">1,623 km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Total Improvement:</span>
            <span className="text-green-400">-24.3%</span>
          </div>
        </div>
      </Card>
    </div>
  );
}