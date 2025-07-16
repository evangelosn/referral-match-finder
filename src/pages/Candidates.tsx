import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter,
  Star,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  Link as LinkIcon,
  User,
  MoreVertical,
  Heart,
  MessageSquare,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockCandidates = [
  {
    id: "1",
    name: "Alex Rodriguez",
    current_position: "Senior Frontend Developer",
    current_company: "TechCorp",
    location: "San Francisco, CA",
    match_score: 94,
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    experience_years: 6,
    referred_by: "Sarah Mitchell",
    referrer_connection: "Former colleague",
    email: "alex.rodriguez@email.com",
    linkedin: "linkedin.com/in/alexrodriguez",
    status: "new" as const,
    interested_positions: ["Senior React Developer"],
    last_contacted: null
  },
  {
    id: "2",
    name: "Emily Watson",
    current_position: "Product Manager",
    current_company: "StartupXYZ",
    location: "New York, NY", 
    match_score: 91,
    skills: ["Product Strategy", "Analytics", "Agile", "User Research"],
    experience_years: 4,
    referred_by: "John Davidson",
    referrer_connection: "University friend",
    email: "emily.watson@email.com",
    linkedin: "linkedin.com/in/emilywatson",
    status: "contacted" as const,
    interested_positions: ["Product Manager"],
    last_contacted: "2024-01-20T10:00:00Z"
  },
  {
    id: "3",
    name: "David Park",
    current_position: "UX Designer",
    current_company: "DesignStudio",
    location: "Austin, TX",
    match_score: 88,
    skills: ["Figma", "Sketch", "Prototyping", "User Research"],
    experience_years: 5,
    referred_by: "Lisa Kim",
    referrer_connection: "Design community",
    email: "david.park@email.com",
    linkedin: "linkedin.com/in/davidpark",
    status: "interested" as const,
    interested_positions: ["UX Designer"],
    last_contacted: "2024-01-18T14:30:00Z"
  },
  {
    id: "4",
    name: "Rachel Green",
    current_position: "Data Scientist",
    current_company: "DataTech",
    location: "Seattle, WA",
    match_score: 85,
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    experience_years: 3,
    referred_by: "Michael Chen",
    referrer_connection: "Previous teammate",
    email: "rachel.green@email.com",
    linkedin: "linkedin.com/in/rachelgreen",
    status: "rejected" as const,
    interested_positions: ["Data Scientist"],
    last_contacted: "2024-01-15T09:15:00Z"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800';
    case 'contacted': return 'bg-yellow-100 text-yellow-800';
    case 'interested': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    case 'hired': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getMatchColor = (score: number) => {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-yellow-600';
  return 'text-red-600';
};

export default function Candidates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.current_position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">
            Discover and manage candidates from your employee network
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Discover More
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Bulk Message
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+23 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Match (90%+)</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">Top tier candidates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interested</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Ready to interview</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setStatusFilter(statusFilter === "all" ? "new" : "all")}>
          <Filter className="h-4 w-4 mr-2" />
          Status: {statusFilter === "all" ? "All" : statusFilter}
        </Button>
      </div>

      {/* Candidates Grid */}
      <div className="grid gap-6">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">{candidate.name}</CardTitle>
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                    <div className={`text-lg font-bold ${getMatchColor(candidate.match_score)}`}>
                      {candidate.match_score}% match
                    </div>
                  </div>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {candidate.current_position} at {candidate.current_company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <User className="h-4 w-4" />
                      Referred by {candidate.referred_by} ({candidate.referrer_connection})
                    </div>
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Full Profile</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                    <DropdownMenuItem>Add to Job</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Not Interested</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Skills */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Experience and Positions */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Experience:</span> {candidate.experience_years} years
                  </div>
                  <div>
                    <span className="font-medium">Interested in:</span> {candidate.interested_positions.join(", ")}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    {candidate.last_contacted 
                      ? `Last contacted: ${new Date(candidate.last_contacted).toLocaleDateString()}`
                      : "Not yet contacted"
                    }
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Call
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No candidates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Start discovering candidates from your employee network"}
            </p>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Discover Candidates
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}