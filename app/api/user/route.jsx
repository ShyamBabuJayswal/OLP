import { db } from '../../../config/db';

import { usersTable } from '../../../config/schema'; 
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, name } = await req.json();
    console.log("💡 Received:", { name, email });

    if (!email || !name) {
      return NextResponse.json({ error: "Missing name or email" }, { status: 400 });
    }

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (users?.length === 0) {
      const result = await db
        .insert(usersTable)
        .values({ name, email })
        .returning(usersTable);
        console.log(result)
      return NextResponse.json(result);
    }

    return NextResponse.json(users[0]);
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
