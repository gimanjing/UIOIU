import { Card, Grid, Metric, Text, Button } from "@tremor/react";
import { generateMasterData } from "@/lib/mockData";

export default function MasterDataPage() {
  const masterData = generateMasterData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Master Data</h1>
        <p className="mt-2 text-neutral-400">Overview of all master data entities</p>
      </div>

      <Grid numItemsMd={4} className="gap-6">
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Total Vendors</Text>
          <Metric className="text-white">{masterData.totalVendors}</Metric>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Total Parts</Text>
          <Metric className="text-white">{masterData.totalParts}</Metric>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Total Trucks</Text>
          <Metric className="text-white">{masterData.totalTrucks}</Metric>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Active Routes</Text>
          <Metric className="text-white">{masterData.activeRoutes}</Metric>
        </Card>
      </Grid>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Data Synchronization</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-white font-medium">Last Sync</Text>
              <Text className="text-neutral-400 text-sm">{masterData.lastSync}</Text>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Sync Now</Button>
          </div>
          <div className="border-t border-pitch-border pt-4">
            <Text className="text-white font-medium mb-2">Quick Actions</Text>
            <div className="flex gap-3">
              <Button variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Export All Data</Button>
              <Button variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Import Data</Button>
              <Button variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Validate Data</Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Data Quality Metrics</h3>
        <Grid numItemsMd={3} className="gap-4">
          <div>
            <Text className="text-neutral-400">Completeness</Text>
            <Metric className="text-green-400">98%</Metric>
          </div>
          <div>
            <Text className="text-neutral-400">Accuracy</Text>
            <Metric className="text-green-400">96%</Metric>
          </div>
          <div>
            <Text className="text-neutral-400">Consistency</Text>
            <Metric className="text-yellow-400">92%</Metric>
          </div>
        </Grid>
      </Card>
    </div>
  );
}