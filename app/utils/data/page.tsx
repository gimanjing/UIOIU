import { Card, Button, Grid, Text, Metric } from "@tremor/react";

export default function DataManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Data Management</h1>
        <p className="mt-2 text-neutral-400">Import, export, and manage system data</p>
      </div>

      <Grid numItemsMd={3} className="gap-6">
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Total Records</Text>
          <Metric className="text-white">12,847</Metric>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Last Backup</Text>
          <Metric className="text-white">2h ago</Metric>
        </Card>
        <Card className="bg-pitch-surface border-pitch-border">
          <Text className="text-neutral-400">Storage Used</Text>
          <Metric className="text-white">2.4 GB</Metric>
        </Card>
      </Grid>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Import Data</h3>
        <div className="space-y-3">
          <Text className="text-neutral-400">Upload CSV or JSON files to import data</Text>
          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">Import Vendors</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Import Parts</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Import Routes</Button>
          </div>
        </div>
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Export Data</h3>
        <div className="space-y-3">
          <Text className="text-neutral-400">Download system data in various formats</Text>
          <div className="flex gap-3">
            <Button variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Export as CSV</Button>
            <Button variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Export as JSON</Button>
            <Button variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Export as Excel</Button>
          </div>
        </div>
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Data Operations</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-pitch-black border border-pitch-border rounded">
            <div>
              <Text className="text-white font-medium">Backup Database</Text>
              <Text className="text-neutral-400 text-sm">Create a full backup of all system data</Text>
            </div>
            <Button size="xs" className="bg-green-600 hover:bg-green-700">Backup Now</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-pitch-black border border-pitch-border rounded">
            <div>
              <Text className="text-white font-medium">Restore from Backup</Text>
              <Text className="text-neutral-400 text-sm">Restore data from a previous backup</Text>
            </div>
            <Button size="xs" variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Restore</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-pitch-black border border-pitch-border rounded">
            <div>
              <Text className="text-white font-medium">Reset System Data</Text>
              <Text className="text-neutral-400 text-sm">Clear all data and reset to defaults (irreversible)</Text>
            </div>
            <Button size="xs" variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface text-red-400">Reset</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}