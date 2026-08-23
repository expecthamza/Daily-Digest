'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { createClient } from '../../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');
  const supabase = createClient();

  async function sendMagicLink(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Where Supabase redirects the user after they click the emailed link.
        emailRedirectTo:
          typeof window !== 'undefined'
            ? `${window.location.origin}/dashboard`
            : undefined,
      },
    });
    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
    } else {
      setStatus('sent');
    }
  }

  return (
    <div className="card">
      <h2>Daily Digest</h2>
      <p className="muted">
        Enter your email — we&apos;ll send a real sign-in link. No password to
        manage, no mocked auth.
      </p>

      {status === 'sent' ? (
        <p>Check your inbox for a sign-in link.</p>
      ) : (
        <form onSubmit={sendMagicLink}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send sign-in link'}
          </button>
          {status === 'error' && (
            <p style={{ color: '#a33', fontSize: 13 }}>{errorMsg}</p>
          )}
        </form>
      )}
    </div>
  );
}
