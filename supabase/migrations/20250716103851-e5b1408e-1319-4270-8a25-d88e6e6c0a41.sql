-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'employee' CHECK (role IN ('employee', 'hr', 'admin')),
  department TEXT,
  hire_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job postings table
CREATE TABLE public.job_postings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  department TEXT,
  location TEXT,
  salary_range TEXT,
  employment_type TEXT CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship')),
  requirements TEXT[],
  benefits TEXT[],
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'closed')),
  posted_by UUID REFERENCES public.profiles(id),
  company_id UUID REFERENCES public.companies(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create candidates table
CREATE TABLE public.candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  resume_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  skills TEXT[],
  experience_years INTEGER,
  current_position TEXT,
  current_company TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'screening', 'interviewed', 'hired', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create referrals table
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.job_postings(id) ON DELETE CASCADE,
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE,
  referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'hired', 'rejected')),
  referral_notes TEXT,
  bonus_amount DECIMAL(10,2),
  bonus_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_id, candidate_id)
);

-- Create reports table for tracking metrics
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_type TEXT NOT NULL CHECK (report_type IN ('referral_metrics', 'hiring_pipeline', 'bonus_tracking')),
  data JSONB NOT NULL,
  generated_by UUID REFERENCES public.profiles(id),
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- RLS Policies for companies
CREATE POLICY "Everyone can view companies" ON public.companies
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "HR and Admin can manage companies" ON public.companies
  FOR ALL TO authenticated USING (
    public.get_user_role(auth.uid()) IN ('hr', 'admin')
  );

-- RLS Policies for job postings
CREATE POLICY "Everyone can view active job postings" ON public.job_postings
  FOR SELECT TO authenticated USING (status = 'active');

CREATE POLICY "HR and Admin can manage job postings" ON public.job_postings
  FOR ALL TO authenticated USING (
    public.get_user_role(auth.uid()) IN ('hr', 'admin')
  );

-- RLS Policies for candidates
CREATE POLICY "HR and Admin can view all candidates" ON public.candidates
  FOR SELECT TO authenticated USING (
    public.get_user_role(auth.uid()) IN ('hr', 'admin')
  );

CREATE POLICY "HR and Admin can manage candidates" ON public.candidates
  FOR ALL TO authenticated USING (
    public.get_user_role(auth.uid()) IN ('hr', 'admin')
  );

-- RLS Policies for referrals
CREATE POLICY "Users can view their own referrals" ON public.referrals
  FOR SELECT TO authenticated USING (
    referrer_id = auth.uid() OR public.get_user_role(auth.uid()) IN ('hr', 'admin')
  );

CREATE POLICY "Users can create referrals" ON public.referrals
  FOR INSERT TO authenticated WITH CHECK (referrer_id = auth.uid());

CREATE POLICY "HR and Admin can update referrals" ON public.referrals
  FOR UPDATE TO authenticated USING (
    public.get_user_role(auth.uid()) IN ('hr', 'admin')
  );

-- RLS Policies for reports
CREATE POLICY "HR and Admin can view reports" ON public.reports
  FOR SELECT TO authenticated USING (
    public.get_user_role(auth.uid()) IN ('hr', 'admin')
  );

CREATE POLICY "HR and Admin can create reports" ON public.reports
  FOR INSERT TO authenticated WITH CHECK (
    public.get_user_role(auth.uid()) IN ('hr', 'admin') AND generated_by = auth.uid()
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers for all tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE ON public.job_postings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_candidates_updated_at
  BEFORE UPDATE ON public.candidates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_referrals_updated_at
  BEFORE UPDATE ON public.referrals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Insert sample data
INSERT INTO public.companies (name, description, website) VALUES
  ('TechCorp Inc.', 'Leading technology company specializing in software solutions', 'https://techcorp.com'),
  ('InnovateLabs', 'Research and development company focused on emerging technologies', 'https://innovatelabs.com');

INSERT INTO public.job_postings (title, description, department, location, employment_type, requirements, benefits, company_id) VALUES
  ('Senior Software Engineer', 'Looking for an experienced software engineer to join our development team', 'Engineering', 'San Francisco, CA', 'full-time', ARRAY['5+ years experience', 'React/TypeScript', 'Node.js'], ARRAY['Health insurance', '401k', 'Flexible hours'], (SELECT id FROM public.companies WHERE name = 'TechCorp Inc.')),
  ('Product Manager', 'Seeking a product manager to lead our product development initiatives', 'Product', 'Remote', 'full-time', ARRAY['3+ years PM experience', 'Agile methodology', 'Technical background'], ARRAY['Health insurance', 'Stock options', 'Remote work'], (SELECT id FROM public.companies WHERE name = 'InnovateLabs'));