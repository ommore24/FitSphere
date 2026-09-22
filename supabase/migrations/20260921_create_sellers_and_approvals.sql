-- Migration: 20260921_create_sellers_and_approvals.sql
-- Description: Create sellers and product approvals structure (Part 10)

CREATE TABLE IF NOT EXISTS public.sellers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    business_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(150) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    business_description TEXT,
    verification_status VARCHAR(20) DEFAULT 'PENDING' NOT NULL CHECK (verification_status IN ('PENDING', 'UNDER REVIEW', 'VERIFIED', 'REJECTED', 'SUSPENDED')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add seller_id and publication status to products table if not already present
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS seller_id UUID REFERENCES public.sellers(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS publication_status VARCHAR(20) DEFAULT 'LIVE' CHECK (publication_status IN ('PENDING', 'ADMIN REVIEW', 'APPROVED', 'REJECTED', 'LIVE'));

-- Enable RLS
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view verified sellers"
ON public.sellers FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Users can create seller application"
ON public.sellers FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Sellers or admins can update seller profile"
ON public.sellers FOR UPDATE
USING (auth.uid() = user_id OR auth.role() = 'authenticated');
