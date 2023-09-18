import prisma from "@/lib/prisma";

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password, // Note: You should hash the password before storing it in the database.
      },
    });

    return new Response(JSON.stringify(user));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Registration failed." }), { status: 500 });
  }
}
