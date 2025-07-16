import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Users, 
  Network, 
  TrendingUp,
  Plus,
  Search
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Discover candidates through your employee network
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Job Posting
          </Button>
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Find Candidates
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Job Postings
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Employee Networks
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              Connected employees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Network Connections
            </CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              Total network reach
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Successful Referrals
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
            <CardDescription>
              Your latest job openings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Senior React Developer", department: "Engineering", posted: "2 days ago" },
                { title: "Product Manager", department: "Product", posted: "1 week ago" },
                { title: "UX Designer", department: "Design", posted: "1 week ago" },
              ].map((job, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.department}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.posted}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Candidates</CardTitle>
            <CardDescription>
              Highest matching candidates from your network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Alex Johnson", role: "Senior Developer", match: "94%", source: "via Sarah M." },
                { name: "Maria Garcia", role: "Product Manager", match: "91%", source: "via John D." },
                { name: "David Chen", role: "UX Designer", match: "88%", source: "via Lisa K." },
              ].map((candidate, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium">{candidate.name}</p>
                    <p className="text-sm text-muted-foreground">{candidate.role} • {candidate.source}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{candidate.match}</p>
                    <p className="text-xs text-muted-foreground">match</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}