import prisma from "@/lib/prisma";

interface RequestBody {
  username: string;
  name: string;
  password: string;
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  const user = await prisma.user.create({
    data: {
      email: body.username,
      name: body.name,
      password: body.password, // Note: You should hash the password before storing it in the database.
    },
  });

  if (user) {
    const { password, ...noPassword } = user;
    return new Response(JSON.stringify(noPassword));
  }

  return new Response(JSON.stringify(null));
}
