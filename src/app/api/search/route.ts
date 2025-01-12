import { type NextRequest, NextResponse } from 'next/server';

import getCladesByName from '~/lib/utils/supabase/queries/getCladesByName';

export async function POST(req: NextRequest) {
  const res = await req.json();
  const results = await getCladesByName(res.query);

  return NextResponse.json(results);
}
