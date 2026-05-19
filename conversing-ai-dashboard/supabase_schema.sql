-- ==========================================
-- CONVERSING AI DASHBOARD - SUPABASE SCHEMA
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Businesses Table
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    industry VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'UTC',
    plan VARCHAR(50) DEFAULT 'starter',
    greeting TEXT,
    forwarding_number VARCHAR(50),
    business_hours JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Users Table (Maps Clerk Auth to Businesses)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_id VARCHAR(255) UNIQUE NOT NULL,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Calls Table
CREATE TABLE calls (
    id VARCHAR(255) PRIMARY KEY, -- Custom ID from providers (e.g., Vapi/Retell)
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
    caller_name VARCHAR(255) DEFAULT 'Unknown Caller',
    phone VARCHAR(50) NOT NULL,
    duration INTEGER DEFAULT 0, -- in seconds
    outcome VARCHAR(50) NOT NULL,
    sentiment VARCHAR(50) DEFAULT 'neutral',
    appointment_booked BOOLEAN DEFAULT FALSE,
    lead_captured BOOLEAN DEFAULT FALSE,
    spam_blocked BOOLEAN DEFAULT FALSE,
    summary TEXT,
    recording_url TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    provider VARCHAR(50),
    raw_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Transcripts Table
CREATE TABLE transcripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    call_id VARCHAR(255) REFERENCES calls(id) ON DELETE CASCADE NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'ai' or 'customer'
    content TEXT NOT NULL,
    timestamp_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Appointments Table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
    call_id VARCHAR(255) REFERENCES calls(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INTEGER DEFAULT 30, -- minutes
    status VARCHAR(50) DEFAULT 'pending',
    service VARCHAR(255),
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT FALSE,
    booked_by_ai BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Leads Table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
    call_id VARCHAR(255) REFERENCES calls(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    company VARCHAR(255),
    stage VARCHAR(50) DEFAULT 'new',
    score INTEGER DEFAULT 0,
    source VARCHAR(50) DEFAULT 'call',
    service VARCHAR(255),
    notes TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    last_contacted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Notifications Table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    link VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Analytics Events Table (For arbitrary timeline events)
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Helper function to get the current user's business_id based on Clerk auth ID
CREATE OR REPLACE FUNCTION get_current_business_id()
RETURNS UUID AS $$
DECLARE
    b_id UUID;
BEGIN
    SELECT business_id INTO b_id FROM users WHERE clerk_id = auth.uid()::text LIMIT 1;
    RETURN b_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for businesses
CREATE POLICY "Users can view their own business" ON businesses
    FOR SELECT USING (id = get_current_business_id());

-- Policies for calls
CREATE POLICY "Users can view their own calls" ON calls
    FOR SELECT USING (business_id = get_current_business_id());

-- Policies for appointments
CREATE POLICY "Users can view their own appointments" ON appointments
    FOR SELECT USING (business_id = get_current_business_id());
CREATE POLICY "Users can update their own appointments" ON appointments
    FOR UPDATE USING (business_id = get_current_business_id());
CREATE POLICY "Users can insert their own appointments" ON appointments
    FOR INSERT WITH CHECK (business_id = get_current_business_id());

-- Policies for leads
CREATE POLICY "Users can view their own leads" ON leads
    FOR SELECT USING (business_id = get_current_business_id());
CREATE POLICY "Users can update their own leads" ON leads
    FOR UPDATE USING (business_id = get_current_business_id());
CREATE POLICY "Users can insert their own leads" ON leads
    FOR INSERT WITH CHECK (business_id = get_current_business_id());

-- Policies for notifications
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (business_id = get_current_business_id());
CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (business_id = get_current_business_id());
