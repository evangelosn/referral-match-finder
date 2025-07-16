import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  department: string | null;
  hire_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileData {
  email: string;
  full_name: string;
  role?: string;
  department?: string;
  hire_date?: string;
}

export interface UpdateProfileData {
  full_name?: string;
  role?: string;
  department?: string;
  hire_date?: string;
}

export const useProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('full_name');

      if (error) throw error;
      return data as Profile[];
    },
  });
};

export const useCurrentProfile = () => {
  return useQuery({
    queryKey: ['current-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (profileData: UpdateProfileData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-profile'] });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      toast({
        title: "Profile updated successfully!",
        description: "Your profile has been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (profileData: CreateProfileData) => {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: profileData.email,
        password: 'TempPassword123!', // Temporary password - user should change it
        options: {
          data: {
            full_name: profileData.full_name
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Update the profile with additional data
        const { data, error } = await supabase
          .from('profiles')
          .update({
            role: profileData.role || 'employee',
            department: profileData.department,
            hire_date: profileData.hire_date,
          })
          .eq('id', authData.user.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      toast({
        title: "Employee added successfully!",
        description: "The new employee has been added to the system.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error adding employee",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};