import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Referral {
  id: string;
  candidate_id: string | null;
  referrer_id: string | null;
  job_id: string | null;
  status: string;
  referral_notes: string | null;
  bonus_amount: number | null;
  bonus_paid: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface CreateReferralData {
  candidate_id: string;
  job_id?: string;
  referral_notes?: string;
  bonus_amount?: number;
}

export const useReferrals = () => {
  return useQuery({
    queryKey: ['referrals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Referral[];
    },
  });
};

export const useCreateReferral = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (referralData: CreateReferralData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('referrals')
        .insert({
          ...referralData,
          referrer_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      toast({
        title: "Referral created successfully!",
        description: "Your referral has been submitted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating referral",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};