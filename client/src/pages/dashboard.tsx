import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/ui/stats-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { UserGrowthChart } from "@/components/charts/user-growth-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Package, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ["/api/analytics/stats"],
  });

  const { data: revenueData } = useQuery({
    queryKey: ["/api/analytics/revenue"],
  });

  const { data: users } = useQuery({
    queryKey: ["/api/users"],
  });

  const recentUsers = Array.isArray(users) ? users.slice(0, 5) : [];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={stats?.totalUsers?.toLocaleString() || "0"}
            change={{ value: "12%", trend: "up" }}
            icon={Users}
          />
          <StatsCard
            title="Revenue"
            value={`$${stats?.revenue?.toLocaleString() || "0"}`}
            change={{ value: "8.2%", trend: "up" }}
            icon={DollarSign}
            iconColor="bg-green-500"
          />
          <StatsCard
            title="Products"
            value={stats?.totalProducts?.toLocaleString() || "0"}
            change={{ value: "3.1%", trend: "up" }}
            icon={Package}
            iconColor="bg-orange-500"
          />
          <StatsCard
            title="Orders"
            value={stats?.orders?.toLocaleString() || "0"}
            change={{ value: "2.4%", trend: "down" }}
            icon={TrendingUp}
            iconColor="bg-purple-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {Array.isArray(revenueData) ? (
                  <RevenueChart data={revenueData} />
                ) : (
                  <div className="h-full bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 text-primary/40 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Loading chart...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {Array.isArray(revenueData) ? (
                  <UserGrowthChart data={revenueData} />
                ) : (
                  <div className="h-full bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-800/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Loading chart...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="text-sm font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          user.role === "admin" ? "default" : 
                          user.role === "manager" ? "secondary" : "outline"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === "active" ? "default" : "destructive"}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.lastLogin ? 
                        new Date(user.lastLogin).toLocaleDateString() : 
                        "Never"
                      }
                    </TableCell>
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
