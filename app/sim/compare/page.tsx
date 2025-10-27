import { Card, BarChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";
import { generateComparisonData } from "@/lib/mockData";

export default function SolverComparisonPage() {
  const comparisonData = generateComparisonData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Solver Comparison</h1>
        <p className="mt-2 text-neutral-400">Compare performance across different optimization algorithms</p>
      </div>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Average Distance Comparison</h3>
        <BarChart
          className="h-72"
          data={comparisonData}
          index="solver"
          categories={["avgDistance"]}
          colors={["blue"]}
          yAxisWidth={60}
          showLegend={false}
        />
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Computation Time Comparison</h3>
        <BarChart
          className="h-72"
          data={comparisonData}
          index="solver"
          categories={["avgTime"]}
          colors={["green"]}
          yAxisWidth={60}
          showLegend={false}
        />
      </Card>

      <Card className="bg-pitch-surface border-pitch-border">
        <h3 className="text-lg font-semibold text-white mb-4">Detailed Comparison</h3>
        <Table>
          <TableHead>
            <TableRow className="border-pitch-border">
              <TableHeaderCell className="text-neutral-300">Solver</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Avg Distance (km)</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Avg Time (s)</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Success Rate</TableHeaderCell>
              <TableHeaderCell className="text-neutral-300">Recommendation</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comparisonData.map((solver) => (
              <TableRow key={solver.solver} className="border-pitch-border">
                <TableCell className="text-white font-medium">{solver.solver}</TableCell>
                <TableCell className="text-neutral-300">{solver.avgDistance}</TableCell>
                <TableCell className="text-neutral-300">{solver.avgTime}</TableCell>
                <TableCell className="text-neutral-300">{solver.successRate}%</TableCell>
                <TableCell>
                  <Badge color={solver.avgDistance < 250 ? "green" : "yellow"}>
                    {solver.avgDistance < 250 ? "Optimal" : "Good"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}