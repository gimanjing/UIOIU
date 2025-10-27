import { Card, Text, TextInput, Select, SelectItem, Button, Switch } from "@tremor/react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-neutral-400">Configure system preferences and options</p>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <Text className="text-neutral-400 mb-2">Organization Name</Text>
            <TextInput placeholder="Logistics Corp" className="bg-pitch-black border-pitch-border text-white" />
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">Time Zone</Text>
            <Select className="bg-pitch-black border-pitch-border text-white">
              <SelectItem value="utc">UTC</SelectItem>
              <SelectItem value="est">Eastern Time</SelectItem>
              <SelectItem value="pst">Pacific Time</SelectItem>
              <SelectItem value="cst">Central Time</SelectItem>
            </Select>
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">Language</Text>
            <Select className="bg-pitch-black border-pitch-border text-white">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-white font-medium">Dark Mode</Text>
              <Text className="text-neutral-400 text-sm">Use dark theme throughout the application</Text>
            </div>
            <Switch defaultChecked={true} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-white font-medium">Compact View</Text>
              <Text className="text-neutral-400 text-sm">Show more information in less space</Text>
            </div>
            <Switch defaultChecked={false} />
          </div>
        </div>
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-white font-medium">Email Notifications</Text>
              <Text className="text-neutral-400 text-sm">Receive updates via email</Text>
            </div>
            <Switch defaultChecked={true} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-white font-medium">Route Completion Alerts</Text>
              <Text className="text-neutral-400 text-sm">Get notified when routes are completed</Text>
            </div>
            <Switch defaultChecked={true} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-white font-medium">Performance Warnings</Text>
              <Text className="text-neutral-400 text-sm">Alert on performance issues</Text>
            </div>
            <Switch defaultChecked={true} />
          </div>
        </div>
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <Text className="text-neutral-400 mb-2">API Endpoint</Text>
            <TextInput placeholder="https://api.example.com" disabled className="bg-pitch-black border-pitch-border text-neutral-500" />
          </div>
          <div>
            <Text className="text-neutral-400 mb-2">API Key</Text>
            <TextInput placeholder="••••••••••••••••" type="password" disabled className="bg-pitch-black border-pitch-border text-neutral-500" />
          </div>
          <Text className="text-neutral-400 text-sm">Contact administrator to update API settings</Text>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        <Button variant="secondary" className="bg-pitch-black border-pitch-border hover:bg-pitch-surface">Reset to Defaults</Button>
      </div>
    </div>
  );
}