-- Migration: 20260921_create_memberships.sql
-- Description: Create memberships table for FitSphere Premium Membership (Part 6)

CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    plan VARCHAR(50) DEFAULT 'FitSphere Pro' NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE' NOT NULL CHECK (status IN ('ACTIVE', 'EXPIRED', 'CANCELLED')),
    price_inr NUMERIC(10, 2) DEFAULT 499.00 NOT NULL,
    start_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    expiry_date TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days') NOT NULL,
    payment_id VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own membership"
ON public.memberships FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert/update their own membership"
ON public.memberships FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own membership"
ON public.memberships FOR UPDATE
USING (auth.uid() = user_id);
