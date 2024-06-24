'use server';

import type { Provider } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '~/lib/utils/supabase/server';

export async function signInWithOAuth(
  _: { message: string },
  formData: FormData
) {
  const host = headers().get('x-forwarded-host') || 'localhost:3000';
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    provider: formData.get('provider') as Provider,
  };

  const { data: response, error } = await supabase.auth.signInWithOAuth({
    provider: data.provider,
    options: {
      redirectTo: `http://${host}/auth/callback`,
    },
  });

  if (error) {
    return { message: error.message };
  }

  if (response.url) {
    redirect(response.url);
  }

  return { message: 'Success!' };
}

export async function signInWithOtp(
  _: { message: string },
  formData: FormData
) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
  };

  const { error } = await supabase.auth.signInWithOtp({
    email: data.email,
    options: {
      emailRedirectTo: '/auth/confirm',
    },
  });

  if (error) {
    return { message: error.message };
  }

  return { message: 'Success!' };
}
