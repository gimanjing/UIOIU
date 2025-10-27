export function generateDailyShipments(days: number = 30) {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toISOString().split('T')[0],
      shipments: Math.floor(Math.random() * 50) + 100,
    });
  }
  return data;
}

export function generateRecentRuns() {
  const solvers = ['Nearest Neighbour', 'Matheuristic', 'Genetic Algorithm'];
  const statuses = ['Completed', 'Running', 'Failed'];
  return Array.from({ length: 10 }, (_, i) => ({
    id: `RUN-${1000 + i}`,
    solver: solvers[Math.floor(Math.random() * solvers.length)],
    startTime: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
    duration: `${Math.floor(Math.random() * 300)}s`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    routes: Math.floor(Math.random() * 20) + 5,
    distance: `${(Math.random() * 500 + 200).toFixed(1)} km`,
  }));
}

export function generateRouteData() {
  return Array.from({ length: 15 }, (_, i) => ({
    routeId: `R-${100 + i}`,
    truck: `TRK-${200 + i}`,
    stops: Math.floor(Math.random() * 10) + 3,
    distance: `${(Math.random() * 150 + 50).toFixed(1)} km`,
    load: `${(Math.random() * 80 + 20).toFixed(0)}%`,
    eta: `${Math.floor(Math.random() * 8 + 8)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  }));
}

export function generateTruckDistances() {
  return Array.from({ length: 8 }, (_, i) => ({
    truck: `TRK-${200 + i}`,
    distance: Math.floor(Math.random() * 200) + 100,
  }));
}

export function generateDepots() {
  return [
    { id: 'D-001', name: 'Central Depot', address: '123 Main St, City A', capacity: 5000, current: 3200 },
    { id: 'D-002', name: 'North Hub', address: '456 North Ave, City B', capacity: 3000, current: 1800 },
    { id: 'D-003', name: 'South Warehouse', address: '789 South Rd, City C', capacity: 4000, current: 2500 },
  ];
}

export function generateVendors() {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `V-${1000 + i}`,
    name: `Vendor ${String.fromCharCode(65 + i)}`,
    location: `${Math.floor(Math.random() * 90) + 10}°N, ${Math.floor(Math.random() * 180)}°W`,
    parts: Math.floor(Math.random() * 50) + 10,
    avgDelivery: `${Math.floor(Math.random() * 5) + 1}d`,
  }));
}

export function generateParts() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `P-${5000 + i}`,
    name: `Part ${i + 1}`,
    weight: `${(Math.random() * 10 + 1).toFixed(2)} kg`,
    volume: `${(Math.random() * 0.5 + 0.1).toFixed(3)} m³`,
    fragile: Math.random() > 0.7,
  }));
}

export function generatePackaging() {
  return [
    { id: 'PKG-001', type: 'Small Box', dimensions: '30x20x15 cm', maxWeight: '5 kg' },
    { id: 'PKG-002', type: 'Medium Box', dimensions: '50x40x30 cm', maxWeight: '15 kg' },
    { id: 'PKG-003', type: 'Large Box', dimensions: '80x60x50 cm', maxWeight: '30 kg' },
    { id: 'PKG-004', type: 'Pallet', dimensions: '120x100x150 cm', maxWeight: '500 kg' },
  ];
}

export function generateTrucks() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `TRK-${200 + i}`,
    model: `Model ${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`,
    capacity: `${Math.floor(Math.random() * 5000) + 3000} kg`,
    status: ['Available', 'In Transit', 'Maintenance'][Math.floor(Math.random() * 3)],
  }));
}

export function generateConstraints() {
  return [
    { id: 'C-001', type: 'Max Distance', value: '300 km', active: true },
    { id: 'C-002', type: 'Max Stops', value: '12', active: true },
    { id: 'C-003', type: 'Time Window', value: '08:00-18:00', active: true },
    { id: 'C-004', type: 'Load Factor', value: '≥ 70%', active: false },
  ];
}

export function generateForecastData(days: number = 30) {
  const data = [];
  const startDate = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const base = 100 + Math.sin(i / 7) * 20;
    data.push({
      date: date.toISOString().split('T')[0],
      forecast: Math.floor(base + Math.random() * 10),
      actual: i < 20 ? Math.floor(base + Math.random() * 15 - 5) : null,
    });
  }
  return data;
}

export function generateCostProjection() {
  return [
    { category: 'Fuel', cost: 12500 },
    { category: 'Labor', cost: 18000 },
    { category: 'Maintenance', cost: 4500 },
    { category: 'Insurance', cost: 3200 },
    { category: 'Other', cost: 2800 },
  ];
}

export function generateLogs() {
  const severities = ['info', 'warning', 'error'];
  const messages = [
    'Route optimization completed',
    'High load detected on TRK-205',
    'API rate limit approaching',
    'Depot capacity at 85%',
    'Delivery delayed due to traffic',
  ];
  
  return Array.from({ length: 50 }, (_, i) => ({
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
    severity: severities[Math.floor(Math.random() * severities.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    source: `Module-${Math.floor(Math.random() * 5) + 1}`,
  }));
}

export function generateScenarios() {
  return [
    { id: 'SC-001', name: 'Peak Season', trucks: 15, vendors: 25, created: '2024-01-15' },
    { id: 'SC-002', name: 'Low Demand', trucks: 8, vendors: 12, created: '2024-01-20' },
    { id: 'SC-003', name: 'Emergency Rush', trucks: 20, vendors: 30, created: '2024-02-01' },
  ];
}

export function generateComparisonData() {
  const solvers = ['Nearest Neighbour', 'Matheuristic', 'Genetic Algorithm'];
  return solvers.map(solver => ({
    solver,
    avgDistance: Math.floor(Math.random() * 100) + 200,
    avgTime: Math.floor(Math.random() * 200) + 100,
    successRate: Math.floor(Math.random() * 20) + 80,
  }));
}

export function generateMasterData() {
  return {
    totalVendors: 45,
    totalParts: 1250,
    totalTrucks: 28,
    activeRoutes: 18,
    lastSync: new Date().toLocaleString(),
  };
}