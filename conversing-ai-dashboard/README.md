# Conversing AI Dashboard

A premium, production-ready SaaS dashboard for Conversing AI clients to monitor their AI receptionist performance, view calls, transcripts, leads, and appointments.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React (Icons)
- Recharts (Analytics)
- Clerk (Authentication)
- Supabase (Database)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Rename `.env.local.example` or update your `.env.local` file with keys from Clerk and Supabase:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   WEBHOOK_SECRET=your_webhook_secret
   ```

3. **Database Setup**
   Run the SQL script located in `supabase_schema.sql` in your Supabase SQL Editor to generate all tables and Row Level Security policies.

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

1. Push this repository to GitHub.
2. Go to Vercel and import the repository.
3. Add all the Environment Variables listed in `.env.local` to Vercel's Environment Variables settings.
4. Deploy!

## API Webhooks
The webhook endpoint is available at `/api/webhooks`. It verifies the `x-webhook-secret` header against the `WEBHOOK_SECRET` env var. It maps payloads from Vapi, Retell, and Twilio into the normalized Supabase structure.
