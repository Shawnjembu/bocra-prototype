# setup-backend

Sets up the full Supabase backend for the BOCRA prototype: installs the client, creates the database schema, seeds mock data, configures RLS policies, and wires up storage buckets.

## Step 1 — Install Supabase client
```bash
npm install @supabase/supabase-js
```

## Step 2 — Create `src/lib/supabase.js`
```js
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

## Step 3 — Create `.env.local`
```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```
Add `.env.local` to `.gitignore`.

## Step 4 — Database Schema (run in Supabase SQL Editor)

```sql
-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('citizen','admin','superadmin')) DEFAULT 'citizen',
  phone TEXT,
  national_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Complaints
CREATE TABLE complaints (
  id TEXT PRIMARY KEY,
  reference_no TEXT UNIQUE,
  user_id UUID REFERENCES profiles(id),
  category TEXT,
  subject TEXT,
  description TEXT,
  status TEXT DEFAULT 'submitted',
  provider TEXT,
  priority TEXT DEFAULT 'medium',
  assigned_to TEXT,
  response TEXT,
  submitted_date DATE DEFAULT CURRENT_DATE,
  resolved_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- License Applications
CREATE TABLE license_applications (
  id TEXT PRIMARY KEY,
  reference_no TEXT UNIQUE,
  applicant_id UUID REFERENCES profiles(id),
  company_name TEXT,
  license_type TEXT,
  contact_name TEXT,
  contact_email TEXT,
  status TEXT DEFAULT 'pending',
  submitted_date DATE DEFAULT CURRENT_DATE,
  reviewed_by TEXT,
  notes TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Licenses
CREATE TABLE licenses (
  id TEXT PRIMARY KEY,
  licensee_id UUID REFERENCES profiles(id),
  license_number TEXT UNIQUE,
  license_type TEXT,
  status TEXT DEFAULT 'active',
  issued_date DATE,
  expiry_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tenders
CREATE TABLE tenders (
  id TEXT PRIMARY KEY,
  reference_no TEXT,
  title TEXT,
  description TEXT,
  category TEXT,
  deadline DATE,
  status TEXT DEFAULT 'draft',
  budget TEXT,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- News
CREATE TABLE news (
  id TEXT PRIMARY KEY,
  title TEXT,
  content TEXT,
  category TEXT,
  author TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  date DATE,
  location TEXT,
  type TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports
CREATE TABLE reports (
  id TEXT PRIMARY KEY,
  title TEXT,
  category TEXT,
  year INTEGER,
  file_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Log
CREATE TABLE audit_log (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  user_name TEXT,
  action TEXT,
  module TEXT,
  details TEXT,
  ip_address TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Votes
CREATE TABLE votes (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  type TEXT CHECK (type IN ('single','multi')) DEFAULT 'single',
  max_choices INTEGER DEFAULT 1,
  status TEXT CHECK (status IN ('active','closed')) DEFAULT 'active',
  deadline DATE,
  created_by TEXT,
  anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE vote_options (
  id TEXT PRIMARY KEY,
  vote_id TEXT REFERENCES votes(id) ON DELETE CASCADE,
  option_text TEXT,
  vote_count INTEGER DEFAULT 0
);

CREATE TABLE vote_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vote_id TEXT REFERENCES votes(id),
  user_id UUID REFERENCES profiles(id),
  option_ids TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vote_id, user_id)
);
```

## Step 5 — RLS Policies

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vote_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE vote_responses ENABLE ROW LEVEL SECURITY;

-- Profiles: users see own; admins see all
CREATE POLICY "Own profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Admin read all profiles" ON profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin','superadmin')));

-- Complaints: users see own; admins see all
CREATE POLICY "Own complaints" ON complaints FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Admin read complaints" ON complaints FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin','superadmin')));
CREATE POLICY "Admin update complaints" ON complaints FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin','superadmin')));

-- License applications: users see own; admins see all
CREATE POLICY "Own applications" ON license_applications FOR ALL USING (applicant_id = auth.uid());
CREATE POLICY "Admin manage applications" ON license_applications FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin','superadmin')));

-- Tenders: public read published; admins manage all
CREATE POLICY "Public read tenders" ON tenders FOR SELECT USING (status != 'draft');
CREATE POLICY "Admin manage tenders" ON tenders FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin','superadmin')));

-- News/Events/Reports: public read published; admins manage all
CREATE POLICY "Public read news" ON news FOR SELECT USING (published = TRUE);
CREATE POLICY "Admin manage news" ON news FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin','superadmin')));

-- Audit log: superadmin only
CREATE POLICY "Superadmin audit log" ON audit_log FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'superadmin'));

-- Votes: admin/superadmin manage; authenticated read
CREATE POLICY "Authenticated read votes" ON votes FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin manage votes" ON votes FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role IN ('admin','superadmin')));

CREATE POLICY "Authenticated read vote options" ON vote_options FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Own vote response" ON vote_responses FOR ALL USING (user_id = auth.uid());
```

## Step 6 — Storage Buckets (Supabase Dashboard)

Create these buckets:
- `complaint-attachments` — authenticated only, 10MB file limit
- `license-documents` — authenticated only, 25MB file limit
- `reports` — public read, admin write

## Step 7 — Update AuthContext to use Supabase Auth

Replace the mock `login` function with:
```js
import { supabase } from '../lib/supabase';

const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { success: false, error: error.message };
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
  setUser({ name: profile.full_name, id: profile.id, email: profile.email });
  setUserType(profile.role);
  return { success: true };
};

const logout = async () => {
  await supabase.auth.signOut();
  setUser(null);
  setUserType('public');
};
```

## Step 8 — Seed Mock Data

After setting up the schema, run the seed script from `src/context/AuthContext.jsx` to insert all mock complaints, applications, licenses, tenders, news, events, reports, and audit log entries into the database.
