import { createClient } from '~/lib/utils/supabase/server';

export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      const errorUrl = new URL('/auth/error', req.url);
      errorUrl.searchParams.set('error', error.message);
      return Response.redirect(errorUrl);
    }
  }

  return Response.redirect(new URL('/tree', req.url));
}
