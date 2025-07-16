import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  department: string | null;
  location: string | null;
  salary_range: string | null;
  employment_type: string | null;
  requirements: string[] | null;
  benefits: string[] | null;
  status: string;
  posted_by: string | null;
  company_id: string | null;
  created_at: string;
  updated_at: string;
  companies?: {
    name: string;
    description: string | null;
  };
}

export interface CreateJobData {
  title: string;
  description: string;
  department?: string;
  location?: string;
  salary_range?: string;
  employment_type?: string;
  requirements?: string[];
  benefits?: string[];
  company_id: string;
}

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_postings')
        .select(`
          *,
          companies (
            name,
            description
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as JobPosting[];
    },
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (jobData: CreateJobData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('job_postings')
        .insert({
          ...jobData,
          posted_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: "Job posted successfully!",
        description: "Your job posting is now live.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error posting job",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name');

      if (error) throw error;
      return data;
    },
  });
};