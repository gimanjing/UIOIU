import { Card, LineChart, Grid, Metric, Text } from "@tremor/react";
import { generateForecastData } from "@/lib/mockData";

export default function LoadForecastPage() {
  const forecastData = generateForecastData(30);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Load Forecast</h1>
        <p className="mt-2 text-neutral-400">Predicted vs actual load volumes</p>
      </div>

      <Grid numItemsMd={3} className="gap-6">
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Forecast Accuracy</Text>
          <Metric className="text-white">94.2%</Metric>
          <Text className="mt-2 text-green-400">+2.1% vs last month</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Next 7 Days Avg</Text>
          <Metric className="text-white">118</Metric>
          <Text className="mt-2 text-blue-400">shipments/day</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Peak Day</Text>
          <Metric className="text-white">145</Metric>
          <Text className="mt-2 text-yellow-400">Expected in 5 days</Text>
        </Card>
      </Grid>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Load Forecast vs Actual</h3>
        <LineChart
          className="h-80"
          data={forecastData}
          index="date"
          categories={["forecast", "actual"]}
          colors={["blue", "green"]}
          yAxisWidth={60}
        />
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Forecast Insights</h3>
        <div className="space-y-3 text-neutral-300">
          <p>• Steady increase expected over the next 2 weeks (+8% volume)</p>
          <p>• Peak demand anticipated on weekdays, lower on weekends</p>
          <p>• Seasonal pattern suggests higher loads in mid-month</p>
          <p>• Recommend increasing fleet capacity by 2 trucks for peak periods</p>
        </div>
      </Card>
    </div>
  );
}