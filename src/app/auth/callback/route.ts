import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createClient } from '~/lib/utils/supabase/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL('/account', req.url));
}
