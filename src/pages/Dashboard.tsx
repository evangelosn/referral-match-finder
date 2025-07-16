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
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useJobs } from "@/hooks/useJobs";
import { useMatchCandidates } from "@/hooks/useMatchCandidates";
import CreateJobDialog from "@/components/jobs/CreateJobDialog";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: jobs, isLoading: jobsLoading } = useJobs();
  const { data: matchedCandidates, isLoading: candidatesLoading } = useMatchCandidates();

  const recentJobs = jobs?.slice(0, 3) || [];
  const topCandidates = matchedCandidates?.slice(0, 3) || [];

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
          <CreateJobDialog />
          <Button variant="outline" onClick={() => navigate('/candidates')}>
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
            <div className="text-2xl font-bold">
              {statsLoading ? "-" : stats?.activeJobs || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +{stats?.monthlyGrowth.jobs || 0} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? "-" : stats?.totalEmployees || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered employees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Candidates
            </CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? "-" : stats?.totalCandidates || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +{stats?.monthlyGrowth.candidates || 0} this month
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
            <div className="text-2xl font-bold">
              {statsLoading ? "-" : stats?.successfulReferrals || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.monthlyGrowth.referrals ? `+${stats.monthlyGrowth.referrals}%` : '+0%'} from last month
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
              {jobsLoading ? (
                <div className="text-sm text-muted-foreground">Loading...</div>
              ) : recentJobs.length > 0 ? (
                recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(job.created_at), 'MMM d')}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-2">No job postings yet</p>
                  <CreateJobDialog />
                </div>
              )}
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
              {candidatesLoading ? (
                <div className="text-sm text-muted-foreground">Loading...</div>
              ) : topCandidates.length > 0 ? (
                topCandidates.map((candidate) => (
                  <div key={candidate.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium">{candidate.first_name} {candidate.last_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {candidate.current_position} • via {candidate.referred_by}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">{candidate.match_score}%</p>
                      <p className="text-xs text-muted-foreground">match</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-2">No candidates yet</p>
                  <Button variant="outline" onClick={() => navigate('/candidates')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Candidates
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}