# Supabase setup (WeMarket leads)

## 1. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and create a project.
2. Note your **Project URL** and **API keys** from **Project Settings → API**.

## 2. Run the migration

Open **SQL Editor** in Supabase and run:

```
supabase/migrations/001_leads.sql
```

This creates the `leads` table, indexes, `updated_at` trigger, and Row Level Security.

## 3. Configure environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API → anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → service_role secret key |

**Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.**

## 4. Security model

- The public website does **not** write to Supabase from the browser.
- Lead inserts happen in the Next.js `/api/leads` route using the service role key.
- RLS is enabled; `anon` and `authenticated` roles have no direct table access.
- The service role bypasses RLS for server-side inserts only.

## 5. Verify

After configuring `.env.local`, submit the contact form on `/contact`.

Check **Table Editor → leads** in Supabase for new rows.
