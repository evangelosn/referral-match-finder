import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Briefcase,
  Target,
  Download,
  Calendar,
  Filter
} from "lucide-react";

const mockReportData = {
  overview: {
    total_referrals: 156,
    successful_hires: 23,
    conversion_rate: 14.7,
    avg_time_to_hire: 28,
    network_size: 2847,
    active_employees: 47
  },
  monthly_trends: [
    { month: "Jan", referrals: 12, hires: 2 },
    { month: "Feb", referrals: 18, hires: 3 },
    { month: "Mar", referrals: 15, hires: 1 },
    { month: "Apr", referrals: 22, hires: 4 },
    { month: "May", referrals: 28, hires: 5 },
    { month: "Jun", referrals: 25, hires: 3 }
  ],
  top_referrers: [
    { name: "Sarah Mitchell", referrals: 12, hires: 4, department: "Engineering" },
    { name: "Lisa Kim", referrals: 10, hires: 3, department: "Design" },
    { name: "John Davidson", referrals: 8, hires: 2, department: "Product" },
    { name: "Michael Chen", referrals: 7, hires: 3, department: "Engineering" },
    { name: "Emma Wilson", referrals: 6, hires: 1, department: "Marketing" }
  ],
  department_performance: [
    { department: "Engineering", referrals: 45, hires: 12, rate: 26.7 },
    { department: "Design", referrals: 23, hires: 5, rate: 21.7 },
    { department: "Product", referrals: 18, hires: 3, rate: 16.7 },
    { department: "Marketing", referrals: 15, hires: 2, rate: 13.3 },
    { department: "Sales", referrals: 12, hires: 1, rate: 8.3 }
  ]
};

export default function Reports() {
  const { overview, top_referrers, department_performance } = mockReportData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Track your referral program performance and insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.total_referrals}</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Hires</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.successful_hires}</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.conversion_rate}%</div>
            <p className="text-xs text-red-600 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              -2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time to Hire</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.avg_time_to_hire} days</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              -5 days from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Trends Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Referral Trends</CardTitle>
            <CardDescription>Referrals and hires over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>Chart visualization would appear here</p>
                <p className="text-sm">Connect to data source to enable charts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Referral success rate by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>Chart visualization would appear here</p>
                <p className="text-sm">Connect to data source to enable charts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Referrers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
            <CardDescription>Employees with the most successful referrals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {top_referrers.map((referrer, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{referrer.name}</p>
                      <p className="text-sm text-muted-foreground">{referrer.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{referrer.hires} hires</p>
                    <p className="text-sm text-muted-foreground">{referrer.referrals} referrals</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Referral success rates by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {department_performance.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{dept.department}</span>
                    <span className="text-sm text-muted-foreground">{dept.rate}% success rate</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span>{dept.hires} hires</span>
                    <span className="text-muted-foreground">from {dept.referrals} referrals</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${dept.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>AI-powered insights from your referral data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Best Performing Month</h4>
              <p className="text-sm text-blue-700">
                May had the highest number of successful hires (5) with a 17.9% conversion rate.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Top Source Department</h4>
              <p className="text-sm text-green-700">
                Engineering leads with 26.7% success rate, contributing 52% of all hires.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Growth Opportunity</h4>
              <p className="text-sm text-yellow-700">
                Marketing and Sales departments show potential for 30% growth in referrals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}