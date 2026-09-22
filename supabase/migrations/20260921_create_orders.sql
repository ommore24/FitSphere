-- Migration: 20260921_create_orders.sql
-- Description: Create orders and order_items tables for E-commerce Checkout & Orders (Part 9)

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    subtotal_inr NUMERIC(10, 2) NOT NULL,
    shipping_charge_inr NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    tax_inr NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    discount_inr NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    total_amount_inr NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'UPI / Card' NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'PAID' NOT NULL CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
    order_status VARCHAR(30) DEFAULT 'ORDER PLACED' NOT NULL CHECK (order_status IN ('ORDER PLACED', 'CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED', 'RETURN REQUESTED', 'RETURN APPROVED', 'REFUNDED')),
    shipping_address JSONB NOT NULL,
    tracking_number VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    unit_price_inr NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL,
    total_price_inr NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id OR auth.role() = 'authenticated');

CREATE POLICY "Users can insert their own orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = user_id OR auth.role() = 'authenticated');

CREATE POLICY "Users can update their own orders"
ON public.orders FOR UPDATE
USING (auth.uid() = user_id OR auth.role() = 'authenticated');

CREATE POLICY "Users can view order items for their orders"
ON public.order_items FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert order items"
ON public.order_items FOR INSERT
WITH CHECK (auth.role() = 'authenticated');
