import { Card, Text, Button, TextInput, Select, SelectItem } from "@tremor/react";

export default function MatrixSettingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Distance/API Setting</h1>
        <p className="mt-2 text-neutral-400">Configure distance matrix and API settings</p>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Distance Matrix Provider</h3>
        <div className="space-y-4">
          <div>
            <Text className="text-neutral-400 mb-2">Provider</Text>
            <Select className="bg-pitch-black border-pitch-border text-white">
              <SelectItem value="google">Google Maps API</SelectItem>
              <SelectItem value="mapbox">Mapbox API</SelectItem>
              <SelectItem value="osrm">OSRM (Open Source)</SelectItem>
              <SelectItem value="here">HERE Maps API</SelectItem>
            </Select>
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">API Key</Text>
            <TextInput placeholder="Enter API key" type="password" className="bg-pitch-black border-pitch-border text-white" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Configuration</Button>
        </div>
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Matrix Settings</h3>
        <div className="space-y-4">
          <div>
            <Text className="text-neutral-400 mb-2">Distance Unit</Text>
            <Select className="bg-pitch-black border-pitch-border text-white">
              <SelectItem value="km">Kilometers</SelectItem>
              <SelectItem value="miles">Miles</SelectItem>
            </Select>
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">Traffic Model</Text>
            <Select className="bg-pitch-black border-pitch-border text-white">
              <SelectItem value="best_guess">Best Guess</SelectItem>
              <SelectItem value="pessimistic">Pessimistic</SelectItem>
              <SelectItem value="optimistic">Optimistic</SelectItem>
            </Select>
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">Cache Duration (hours)</Text>
            <TextInput placeholder="24" className="bg-pitch-black border-pitch-border text-white" />
          </div>
        </div>
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Matrix Operations</h3>
        <div className="flex gap-3">
          <Button variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Refresh Matrix</Button>
          <Button variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Clear Cache</Button>
          <Button variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Export Matrix</Button>
        </div>
        <div className="mt-4 p-4 bg-pitch-black border border-pitch-border rounded">
          <Text className="text-neutral-400 text-sm">Last matrix update: 2 hours ago</Text>
          <Text className="text-neutral-400 text-sm">Matrix size: 45 × 45 locations</Text>
          <Text className="text-neutral-400 text-sm">API calls this month: 2,847 / 10,000</Text>
        </div>
      </Card>
    </div>
  );
}