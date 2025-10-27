import { Card, LineChart, Grid, Metric, Text } from "@tremor/react";

export default function TrendVsActualPage() {
  const trendData = Array.from({ length: 60 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 60 + i);
    const trend = 100 + Math.sin(i / 10) * 20 + i * 0.5;
    return {
      date: date.toISOString().split('T')[0],
      trend: Math.floor(trend),
      actual: Math.floor(trend + (Math.random() - 0.5) * 20),
      moving_avg: Math.floor(trend + (Math.random() - 0.5) * 5),
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Trend vs Actual</h1>
        <p className="mt-2 text-neutral-400">Historical trends and actual performance comparison</p>
      </div>

      <Grid numItemsMd={3} className="gap-6">
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Trend Correlation</Text>
          <Metric className="text-white">0.87</Metric>
          <Text className="mt-2 text-green-400">Strong positive</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Mean Deviation</Text>
          <Metric className="text-white">±8.3</Metric>
          <Text className="mt-2 text-neutral-400">shipments</Text>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Growth Rate</Text>
          <Metric className="text-white">+12%</Metric>
          <Text className="mt-2 text-blue-400">Last 60 days</Text>
        </Card>
      </Grid>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Multi-Series Trend Analysis</h3>
        <LineChart
          className="h-80"
          data={trendData}
          index="date"
          categories={["trend", "actual", "moving_avg"]}
          colors={["blue", "green", "yellow"]}
          yAxisWidth={60}
        />
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Trend Analysis</h3>
        <Grid numItemsMd={2} className="gap-6">
          <div>
            <Text className="text-white font-medium mb-2">Key Observations</Text>
            <ul className="space-y-2 text-neutral-300 text-sm">
              <li>• Consistent upward trend over 60-day period</li>
              <li>• Actual values closely follow predicted trend</li>
              <li>• Moving average smooths short-term fluctuations</li>
              <li>• Seasonal weekly patterns visible</li>
            </ul>
          </div>
          <div>
            <Text className="text-white font-medium mb-2">Recommendations</Text>
            <ul className="space-y-2 text-neutral-300 text-sm">
              <li>• Continue current forecasting methodology</li>
              <li>• Monitor for trend changes in next 2 weeks</li>
              <li>• Adjust capacity planning for growth trajectory</li>
              <li>• Consider seasonal adjustments for accuracy</li>
            </ul>
          </div>
        </Grid>
      </Card>
    </div>
  );
}