import { Card, Grid, Metric, Text, Button, NumberInput, LineChart } from "@tremor/react";

export default function GeneticAlgorithmPage() {
  const evolutionData = Array.from({ length: 50 }, (_, i) => ({
    generation: i + 1,
    bestFitness: 2200 - i * 10 - Math.random() * 50,
    avgFitness: 2500 - i * 8,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Genetic Algorithm</h1>
        <p className="mt-2 text-neutral-400">Evolutionary optimization for complex routing problems</p>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">GA Parameters</h3>
        <Grid numItemsMd={2} className="gap-4">
          <div>
            <Text className="text-neutral-400 mb-2">Population Size</Text>
            <NumberInput placeholder="100" className="bg-pitch-black border-pitch-border text-white" />
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">Generations</Text>
            <NumberInput placeholder="200" className="bg-pitch-black border-pitch-border text-white" />
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">Mutation Rate (%)</Text>
            <NumberInput placeholder="5" className="bg-pitch-black border-pitch-border text-white" />
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">Crossover Rate (%)</Text>
            <NumberInput placeholder="80" className="bg-pitch-black border-pitch-border text-white" />
          </div>
        </Grid>
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700">Start Evolution</Button>
      </Card>

      <Grid numItemsMd={3} className="gap-6">
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Best Solution</Text>
          <Metric className="text-white">1,598 km</Metric>
          <Text className="mt-2 text-green-400">-25% vs baseline</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Generation</Text>
          <Metric className="text-white">50/200</Metric>
          <Text className="mt-2 text-blue-400">25% complete</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Convergence</Text>
          <Metric className="text-white">78%</Metric>
          <Text className="mt-2 text-yellow-400">Stable</Text>
        </Card>
      </Grid>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Evolution Progress</h3>
        <LineChart
          className="h-72"
          data={evolutionData}
          index="generation"
          categories={["bestFitness", "avgFitness"]}
          colors={["green", "blue"]}
          yAxisWidth={60}
        />
      </Card>
    </div>
  );
}