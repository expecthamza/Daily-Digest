'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabaseClient';

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [fluidToday, setFluidToday] = useState(0);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/login');
        return;
      }

      // profiles row was auto-created by the trigger in daily_digest_schema.sql
      const { data: profileRow } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileRow);

      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const { data: entries } = await supabase
        .from('entries')
        .select('ml')
        .eq('user_id', user.id)
        .eq('type', 'hydration')
        .gte('logged_at', startOfToday.toISOString());
      setFluidToday((entries || []).reduce((sum, e) => sum + (e.ml || 0), 0));

      setLoading(false);
    }
    load();
  }, [router, supabase]);

  async function logHydration() {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('entries').insert({
      user_id: user.id,
      type: 'hydration',
      ml: 250,
    });
    setFluidToday((v) => v + 250);
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  if (loading) return <div className="card">Loading…</div>;

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p className="muted">Signed in — this data is real, in your Supabase database.</p>
      <p>
        Fluid target: <b>{profile?.fluid_target ?? 2000} ml</b>
      </p>
      <p>
        Logged today: <b>{fluidToday} ml</b>
      </p>
      <button onClick={logHydration}>+ Log 250ml water</button>
      <div style={{ height: 10 }} />
      <button style={{ background: '#888' }} onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}
