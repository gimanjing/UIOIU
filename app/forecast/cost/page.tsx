import { Card, BarChart, DonutChart, Grid, Metric, Text } from "@tremor/react";
import { generateCostProjection } from "@/lib/mockData";

export default function CostProjectionPage() {
  const costData = generateCostProjection();
  const totalCost = costData.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Cost Projection</h1>
        <p className="mt-2 text-neutral-400">Monthly cost breakdown and projections</p>
      </div>

      <Grid numItemsMd={3} className="gap-6">
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Total Monthly Cost</Text>
          <Metric className="text-white">${totalCost.toLocaleString()}</Metric>
          <Text className="mt-2 text-yellow-400">+5% vs last month</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Cost per Shipment</Text>
          <Metric className="text-white">$38.50</Metric>
          <Text className="mt-2 text-green-400">-2% vs last month</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Next Month Projection</Text>
          <Metric className="text-white">$43,200</Metric>
          <Text className="mt-2 text-blue-400">+6% expected</Text>
        </Card>
      </Grid>

      <Grid numItemsMd={2} className="gap-6">
        <Card className="bg-pitch-surface border-pitch-border">
          <h3 className="text-lg font-semibold text-white mb-4">Cost by Category</h3>
          <BarChart
            className="h-72"
            data={costData}
            index="category"
            categories={["cost"]}
            colors={["blue"]}
            yAxisWidth={60}
            showLegend={false}
          />
        </Card>

        <Card className="bg-pitch-surface border-pitch-border">
          <h3 className="text-lg font-semibold text-white mb-4">Cost Distribution</h3>
          <DonutChart
            className="h-72"
            data={costData}
            category="cost"
            index="category"
            colors={["blue", "cyan", "indigo", "violet", "purple"]}
            showLabel={true}
          />
        </Card>
      </Grid>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Cost Optimization Opportunities</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-pitch-black border border-pitch-border rounded">
            <div>
              <Text className="text-white font-medium">Fuel Efficiency Program</Text>
              <Text className="text-neutral-400 text-sm">Optimize routes to reduce fuel consumption</Text>
            </div>
            <Text className="text-green-400 font-semibold">-8%</Text>
          </div>
          <div className="flex items-center justify-between p-3 bg-pitch-black border border-pitch-border rounded">
            <div>
              <Text className="text-white font-medium">Preventive Maintenance</Text>
              <Text className="text-neutral-400 text-sm">Reduce emergency repairs through scheduled maintenance</Text>
            </div>
            <Text className="text-green-400 font-semibold">-12%</Text>
          </div>
          <div className="flex items-center justify-between p-3 bg-pitch-black border border-pitch-border rounded">
            <div>
              <Text className="text-white font-medium">Load Consolidation</Text>
              <Text className="text-neutral-400 text-sm">Improve load factors to reduce trips</Text>
            </div>
            <Text className="text-green-400 font-semibold">-15%</Text>
          </div>
        </div>
      </Card>
    </div>
  );
}