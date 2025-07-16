import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardStats {
  activeJobs: number;
  totalEmployees: number;
  totalCandidates: number;
  successfulReferrals: number;
  monthlyGrowth: {
    jobs: number;
    referrals: number;
    candidates: number;
  };
}

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Get active jobs count
      const { count: activeJobs } = await supabase
        .from('job_postings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Get total employees count (profiles)
      const { count: totalEmployees } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get total candidates count
      const { count: totalCandidates } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true });

      // Get successful referrals count
      const { count: successfulReferrals } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .in('status', ['hired', 'accepted']);

      // Get monthly growth data (last 30 days vs previous 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

      // Jobs growth
      const { count: recentJobs } = await supabase
        .from('job_postings')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());

      const { count: previousJobs } = await supabase
        .from('job_postings')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sixtyDaysAgo.toISOString())
        .lt('created_at', thirtyDaysAgo.toISOString());

      // Candidates growth
      const { count: recentCandidates } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());

      // Referrals growth
      const { count: recentReferrals } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString())
        .in('status', ['hired', 'accepted']);

      const { count: previousReferrals } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sixtyDaysAgo.toISOString())
        .lt('created_at', thirtyDaysAgo.toISOString())
        .in('status', ['hired', 'accepted']);

      return {
        activeJobs: activeJobs || 0,
        totalEmployees: totalEmployees || 0,
        totalCandidates: totalCandidates || 0,
        successfulReferrals: successfulReferrals || 0,
        monthlyGrowth: {
          jobs: recentJobs || 0,
          referrals: previousReferrals ? Math.round(((recentReferrals || 0) - previousReferrals) / previousReferrals * 100) : 0,
          candidates: recentCandidates || 0,
        },
      } as DashboardStats;
    },
  });
};