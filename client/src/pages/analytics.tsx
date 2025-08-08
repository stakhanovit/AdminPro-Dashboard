import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SalesChart } from "@/components/charts/sales-chart";
import { TrafficChart } from "@/components/charts/traffic-chart";
import { Percent, Clock, TrendingDown } from "lucide-react";

export default function Analytics() {
  const { data: stats } = useQuery({
    queryKey: ["/api/analytics/stats"],
  });

  const { data: salesData } = useQuery({
    queryKey: ["/api/analytics/sales"],
  });

  const { data: trafficData } = useQuery({
    queryKey: ["/api/analytics/traffic"],
  });

  const performanceData = [
    {
      page: "/dashboard",
      views: "8,429",
      visitors: "5,847",
      duration: "5:42",
      bounceRate: "32.4%"
    },
    {
      page: "/products",
      views: "6,247",
      visitors: "4,392",
      duration: "3:28",
      bounceRate: "45.2%"
    },
    {
      page: "/users",
      views: "4,892",
      visitors: "3,245",
      duration: "4:15",
      bounceRate: "38.7%"
    },
    {
      page: "/analytics",
      views: "3,567",
      visitors: "2,891",
      duration: "6:23",
      bounceRate: "29.1%"
    },
    {
      page: "/settings",
      views: "2,134",
      visitors: "1,876",
      duration: "2:47",
      bounceRate: "52.8%"
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="mt-2 text-muted-foreground">
            Comprehensive business analytics and performance metrics
          </p>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {salesData ? (
                  <SalesChart data={salesData} />
                ) : (
                  <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-blue-400 text-4xl mb-2">📊</div>
                      <p className="text-sm text-muted-foreground">Loading chart...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {trafficData ? (
                  <TrafficChart data={trafficData} />
                ) : (
                  <div className="h-full bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-800/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-purple-400 text-4xl mb-2">🥧</div>
                      <p className="text-sm text-muted-foreground">Loading chart...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-semibold text-foreground">
                    {stats?.conversionRate || "3.24"}%
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    ↗ 0.8% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <Percent className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Session Duration</p>
                  <p className="text-2xl font-semibold text-foreground">
                    {stats?.avgSessionDuration || "4:35"}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    ↘ 12s from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
                  <p className="text-2xl font-semibold text-foreground">
                    {stats?.bounceRate || "42.3"}%
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    ↘ 3.2% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Unique Visitors</TableHead>
                  <TableHead>Avg. Duration</TableHead>
                  <TableHead>Bounce Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.page}</TableCell>
                    <TableCell>{row.views}</TableCell>
                    <TableCell>{row.visitors}</TableCell>
                    <TableCell>{row.duration}</TableCell>
                    <TableCell>{row.bounceRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
