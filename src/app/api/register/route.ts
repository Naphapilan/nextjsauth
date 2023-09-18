import prisma from "@/lib/prisma";

interface RegisterRequestBody {
  username: string;
  password: string;
  // Add any additional registration fields here
}

export async function POST(req: Request) {
  const body: RegisterRequestBody = await req.json();

  // Check if the user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });

  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
  }

  // Create a new user
  const user = await prisma.user.create({
    data: {
      email: body.username,
      password: body.password, // Ensure to hash the password before saving it in production
      // Add any additional registration fields here
    },
  });

  return new Response(JSON.stringify({ success: true }));
}
