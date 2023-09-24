'use client';
import { NextResponse } from 'next/server';
import { postsRoute } from '@/utils/routes';

export async function GET() {
  const res = await fetch(postsRoute, {
    headers: <any>{
      'Content-Type': 'application/json',
      // 'API-Key': process.env.DATA_API_KEY,
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
