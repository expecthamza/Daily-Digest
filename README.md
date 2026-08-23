# Daily Digest — real backend, step 1

This is a working skeleton: real Supabase auth (magic-link email sign-in,
no passwords, no mocking) + a dashboard that reads/writes a real database
row. Everything after this point is porting your prototype's views into
this structure, one at a time.

## What you need before starting
- A Supabase project with `daily_digest_schema.sql` already run (SQL Editor → paste → Run)
- A GitHub account with an empty repo
- A Vercel account connected to that repo

## Get your Supabase keys
1. Supabase dashboard → your project → **Settings → API**
2. Copy **Project URL** and the **anon public** key

## Push this to GitHub (no command line needed)
1. Unzip this folder on your computer
2. On github.com, open your empty repo → **"uploading an existing file"**
3. Drag every file/folder from the unzipped project into that upload box
4. Commit — Vercel will auto-deploy within about a minute

## Add your Supabase keys to Vercel (required — the app won't work without this)
1. Vercel dashboard → your project → **Settings → Environment Variables**
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon public key
3. Redeploy (Vercel → Deployments → ⋯ → Redeploy) so it picks up the new variables

## Turn on email sign-in in Supabase
1. Supabase → **Authentication → Providers → Email** → make sure it's enabled
2. **Authentication → URL Configuration** → add your Vercel URL (e.g.
   `https://your-project.vercel.app`) to **Redirect URLs**, or the magic
   link won't be allowed to send people back to your app

## Test it
1. Open your live Vercel URL
2. Enter your email → check inbox → click the link
3. You should land on `/dashboard`, see "Fluid target: 2000 ml", and be
   able to click "+ Log 250ml water" — refresh the page and the number
   should still be there, because it's now a real row in Supabase, not
   memory that disappears on refresh.

## What's next
Once this works end-to-end, the next step is porting one view at a time
from the HTML prototype — bowel logging first (closest to what's already
here), then the rest. Bring the working link back to this chat and we'll
do the next piece.
