import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter,
  Users,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  Link as LinkIcon,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockEmployees = [
  {
    id: "1",
    name: "Sarah Mitchell",
    position: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    connections: 247,
    successful_referrals: 8,
    email: "sarah.mitchell@company.com",
    linkedin: "linkedin.com/in/sarahmitchell",
    skills: ["React", "Node.js", "Python", "Machine Learning"],
    joined_date: "2022-03-15"
  },
  {
    id: "2",
    name: "John Davidson",
    position: "Product Manager",
    department: "Product",
    location: "New York, NY",
    connections: 189,
    successful_referrals: 5,
    email: "john.davidson@company.com",
    linkedin: "linkedin.com/in/johndavidson",
    skills: ["Product Strategy", "Analytics", "Agile", "User Research"],
    joined_date: "2021-08-20"
  },
  {
    id: "3",
    name: "Lisa Kim",
    position: "UX Designer",
    department: "Design",
    location: "Austin, TX",
    connections: 156,
    successful_referrals: 12,
    email: "lisa.kim@company.com",
    linkedin: "linkedin.com/in/lisakim",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    joined_date: "2023-01-10"
  },
  {
    id: "4",
    name: "Michael Chen",
    position: "Data Scientist",
    department: "Engineering",
    location: "Seattle, WA",
    connections: 203,
    successful_referrals: 6,
    email: "michael.chen@company.com",
    linkedin: "linkedin.com/in/michaelchen",
    skills: ["Python", "SQL", "Machine Learning", "Statistics"],
    joined_date: "2022-11-05"
  }
];

export default function EmployeeNetwork() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Network</h1>
          <p className="text-muted-foreground">
            Manage your employee referral network and track their connections
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Invite Employee
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">72% of network</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">Network reach</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Connections</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">61</div>
            <p className="text-xs text-muted-foreground">Per employee</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
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

      {/* Employee Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {employee.position}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {employee.location}
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
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>View Network</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    <DropdownMenuItem>Remove from Network</DropdownMenuItem>
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
                    {employee.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                    {employee.skills.length > 3 && (
                      <Badge variant="outline">+{employee.skills.length - 3} more</Badge>
                    )}
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <strong>{employee.connections}</strong> connections
                    </div>
                    <div>
                      <strong>{employee.successful_referrals}</strong> referrals
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Network
                    </Button>
                    <Button size="sm">
                      Request Referral
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No employees found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Invite employees to join your referral network"}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Invite Employee
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}