export type SubItem = { key: string; label: string; href?: string };
export type MenuGroup = { key: string; label: string; items?: SubItem[] };

export const MENU: MenuGroup[] = [
  { key: "home", label: "Home (Overview)", items: [{ key: "home-overview", label: "Overview", href: "/" }] },
  {
    key: "simulation",
    label: "Simulation",
    items: [
      { key: "sim-overview", label: "Route Overview", href: "/sim/overview" },
      { key: "sim-nn", label: "Nearest Neighbour", href: "/sim/nearest-neighbour" },
      { key: "sim-math", label: "Matheuristic", href: "/sim/matheuristic" },
      { key: "sim-ga", label: "Genetic Algorithm", href: "/sim/ga" },
      { key: "sim-scenario", label: "Scenario Builder", href: "/sim/scenario" },
      { key: "sim-compare", label: "Solver Comparison", href: "/sim/compare" },
    ],
  },
  {
    key: "route",
    label: "Route Setting",
    items: [
      { key: "route-depot", label: "Depot Setting", href: "/route/depot" },
      { key: "route-vendor", label: "Vendor Setting", href: "/route/vendor" },
      { key: "route-part", label: "Part Setting", href: "/route/part" },
      { key: "route-packaging", label: "Packaging Setting", href: "/route/packaging" },
      { key: "route-truck", label: "Truck Setting", href: "/route/truck" },
      { key: "route-constraint", label: "Constraint Setting", href: "/route/constraint" },
      { key: "route-master", label: "Master Data", href: "/route/master" },
      { key: "route-matrix", label: "Distance/API Setting", href: "/route/matrix" },
    ],
  },
  {
    key: "forecast",
    label: "Forecast",
    items: [
      { key: "fc-load", label: "Load Forecast", href: "/forecast/load" },
      { key: "fc-trend", label: "Trend vs Actual", href: "/forecast/trend" },
      { key: "fc-cost", label: "Cost Projection", href: "/forecast/cost" },
    ],
  },
  {
    key: "utilities",
    label: "Utilities",
    items: [
      { key: "util-data", label: "Data Management", href: "/utils/data" },
      { key: "util-logs", label: "Logs & Performance", href: "/utils/logs" },
      { key: "util-settings", label: "Settings", href: "/utils/settings" },
    ],
  },
];