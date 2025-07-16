export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  remote_options: 'onsite' | 'remote' | 'hybrid';
  seniority_level: 'entry' | 'mid' | 'senior' | 'lead' | 'director';
  required_skills: string[];
  preferred_skills: string[];
  description: string;
  requirements: string[];
  salary_range?: {
    min: number;
    max: number;
    currency: string;
  };
  hiring_manager_id: string;
  status: 'draft' | 'active' | 'paused' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  linkedin_url?: string;
  github_url?: string;
  network_imported: boolean;
  network_last_sync?: string;
  created_at: string;
  updated_at: string;
}

export interface NetworkConnection {
  id: string;
  employee_id: string;
  contact_name: string;
  contact_linkedin?: string;
  contact_github?: string;
  contact_email?: string;
  contact_company?: string;
  contact_role?: string;
  contact_location?: string;
  skills: string[];
  connection_strength: 'first' | 'second' | 'third';
  source: 'linkedin' | 'github' | 'manual';
  created_at: string;
  updated_at: string;
}

export interface Candidate {
  id: string;
  job_posting_id: string;
  network_connection_id: string;
  employee_id: string; // Who knows this candidate
  match_score: number;
  skills_match: number;
  location_match: number;
  level_match: number;
  referral_status: 'identified' | 'requested' | 'contacted' | 'responded' | 'referred' | 'rejected';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ReferralRequest {
  id: string;
  candidate_id: string;
  employee_id: string;
  hiring_manager_id: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  response?: string;
  contacted_at?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MatchingFilters {
  location?: string;
  skills?: string[];
  seniority_level?: string;
  min_match_score?: number;
  connection_strength?: string[];
}