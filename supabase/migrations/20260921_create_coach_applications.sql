-- Migration: 20260921_create_coach_applications.sql
-- Description: Create coach_applications table for Fitness Coach Onboarding (Part 8)

CREATE TABLE IF NOT EXISTS public.coach_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE,
    specialization VARCHAR(100) NOT NULL,
    experience_years INT DEFAULT 1 NOT NULL,
    qualifications TEXT NOT NULL,
    certification_name VARCHAR(150) NOT NULL,
    certification_number VARCHAR(100) NOT NULL,
    issuing_organization VARCHAR(150) NOT NULL,
    bio TEXT,
    status VARCHAR(20) DEFAULT 'PENDING' NOT NULL CHECK (status IN ('PENDING', 'UNDER REVIEW', 'VERIFIED', 'REJECTED', 'SUSPENDED')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.coach_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own application
CREATE POLICY "Users can view own coach applications"
ON public.coach_applications FOR SELECT
USING (auth.uid() = user_id OR auth.role() = 'authenticated');

-- Anyone authenticated can submit an application
CREATE POLICY "Users can submit coach application"
ON public.coach_applications FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Admin/User can update application status
CREATE POLICY "Users or Admins can update coach application"
ON public.coach_applications FOR UPDATE
USING (auth.role() = 'authenticated');
