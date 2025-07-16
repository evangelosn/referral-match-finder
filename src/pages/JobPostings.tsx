import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Clock,
  Users,
  MoreVertical
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    remote_options: "hybrid" as const,
    seniority_level: "senior" as const,
    required_skills: ["React", "TypeScript", "Node.js"],
    status: "active" as const,
    candidates_found: 12,
    referrals_sent: 3,
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    remote_options: "remote" as const,
    seniority_level: "mid" as const,
    required_skills: ["Product Strategy", "Analytics", "Agile"],
    status: "active" as const,
    candidates_found: 8,
    referrals_sent: 2,
    created_at: "2024-01-10T14:30:00Z"
  },
  {
    id: "3",
    title: "UX Designer",
    department: "Design",
    location: "Austin, TX",
    remote_options: "onsite" as const,
    seniority_level: "mid" as const,
    required_skills: ["Figma", "User Research", "Prototyping"],
    status: "paused" as const,
    candidates_found: 15,
    referrals_sent: 5,
    created_at: "2024-01-08T09:15:00Z"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    case 'closed': return 'bg-gray-100 text-gray-800';
    default: return 'bg-blue-100 text-blue-800';
  }
};

const getRemoteColor = (remote: string) => {
  switch (remote) {
    case 'remote': return 'bg-blue-100 text-blue-800';
    case 'hybrid': return 'bg-purple-100 text-purple-800';
    case 'onsite': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function JobPostings() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = mockJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Postings</h1>
          <p className="text-muted-foreground">
            Manage your open positions and track candidate discovery
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Job Posting
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search job postings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Job Postings Grid */}
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <Badge variant="outline" className={getRemoteColor(job.remote_options)}>
                      {job.remote_options}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Find Candidates</DropdownMenuItem>
                    <DropdownMenuItem>Edit Job</DropdownMenuItem>
                    <DropdownMenuItem>Pause Posting</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Skills */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.required_skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>{job.candidates_found}</strong> candidates found
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        <strong>{job.referrals_sent}</strong> referrals sent
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Candidates
                    </Button>
                    <Button size="sm">
                      Find More
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No job postings found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Create your first job posting to get started"}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Job Posting
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}