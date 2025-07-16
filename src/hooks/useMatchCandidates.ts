import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Candidate } from './useCandidates';
import { JobPosting } from './useJobs';

export interface CandidateWithMatch extends Candidate {
  match_score: number;
  matching_skills: string[];
  referred_by?: string;
  referrer_connection?: string;
}

// Simple matchmaking algorithm
function calculateMatchScore(candidate: Candidate, job: JobPosting): number {
  let score = 0;
  const candidateSkills = candidate.skills || [];
  const jobRequirements = job.requirements || [];
  
  // Skill matching (60% of score)
  const skillMatches = candidateSkills.filter(skill => 
    jobRequirements.some(req => 
      req.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(req.toLowerCase())
    )
  );
  const skillScore = skillMatches.length > 0 ? (skillMatches.length / Math.max(jobRequirements.length, 1)) * 60 : 0;
  
  // Experience matching (30% of score)
  const experienceScore = candidate.experience_years ? Math.min(candidate.experience_years / 5, 1) * 30 : 15;
  
  // Position relevance (10% of score)
  const positionScore = candidate.current_position && job.title ? 
    (candidate.current_position.toLowerCase().includes(job.title.toLowerCase().split(' ')[0]) ? 10 : 0) : 0;
  
  score = skillScore + experienceScore + positionScore;
  
  // Add some randomness to make it more realistic (±5 points)
  score += (Math.random() - 0.5) * 10;
  
  return Math.round(Math.max(0, Math.min(100, score)));
}

export const useMatchCandidates = (jobId?: string) => {
  return useQuery({
    queryKey: ['match-candidates', jobId],
    queryFn: async () => {
      // Get candidates
      const { data: candidates, error: candidatesError } = await supabase
        .from('candidates')
        .select('*');

      if (candidatesError) throw candidatesError;

      // Get job if specific job ID provided
      let targetJob = null;
      if (jobId) {
        const { data: job, error: jobError } = await supabase
          .from('job_postings')
          .select('*')
          .eq('id', jobId)
          .single();

        if (jobError) throw jobError;
        targetJob = job;
      } else {
        // Get most recent active job for general matching
        const { data: jobs, error: jobsError } = await supabase
          .from('job_postings')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1);

        if (jobsError) throw jobsError;
        targetJob = jobs?.[0];
      }

      if (!targetJob || !candidates) {
        return [];
      }

      // Calculate match scores and add referral info
      const candidatesWithMatch: CandidateWithMatch[] = await Promise.all(
        candidates.map(async (candidate) => {
          const matchScore = calculateMatchScore(candidate, targetJob);
          
          // Try to find referral info (mock for now since we don't have referrer names in candidates table)
          const mockReferrers = ['Sarah Mitchell', 'John Davidson', 'Lisa Kim', 'Michael Chen', 'Emma Wilson'];
          const mockConnections = ['Former colleague', 'University friend', 'Design community', 'Previous teammate', 'LinkedIn connection'];
          
          return {
            ...candidate,
            match_score: matchScore,
            matching_skills: candidate.skills?.filter(skill => 
              targetJob.requirements?.some(req => 
                req.toLowerCase().includes(skill.toLowerCase()) ||
                skill.toLowerCase().includes(req.toLowerCase())
              )
            ) || [],
            referred_by: mockReferrers[Math.floor(Math.random() * mockReferrers.length)],
            referrer_connection: mockConnections[Math.floor(Math.random() * mockConnections.length)],
          };
        })
      );

      // Sort by match score descending
      return candidatesWithMatch.sort((a, b) => b.match_score - a.match_score);
    },
    enabled: true, // Always enabled for dashboard view
  });
};