import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Secret key for JWT signing and verification
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-minimum-32-chars-long"
);

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image?: string | null;
  provider: string;
}

export interface Session {
  user: User;
  expires: string;
}

// Cookie management helper
const cookieManager = {
  async set(name: string, value: string, options: Record<string, unknown>) {
    try {
      const cookieStore = await cookies();
      cookieStore.set(name, value, options);
      return true;
    } catch (error) {
      console.error("Error setting cookie:", error);
      return false;
    }
  },

  async get(name: string) {
    try {
      const cookieStore = await cookies();
      return cookieStore.get(name);
    } catch (error) {
      console.error("Error getting cookie:", error);
      return undefined;
    }
  },

  async delete(name: string) {
    try {
      const cookieStore = await cookies();
      cookieStore.delete(name);
      return true;
    } catch (error) {
      console.error("Error deleting cookie:", error);
      return false;
    }
  },
};

// Create a session token and store it in a cookie
export async function createSession(user: User): Promise<void> {
  // Create a JWT that expires in 30 days
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const session: Session = {
    user,
    expires: expires.toISOString(),
  };

  const token = await new SignJWT({ session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(SECRET_KEY);

  // Store the token in a cookie
  await cookieManager.set("session", token, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

// Get the current session from the cookie
export async function getSession(): Promise<Session | null> {
  const cookie = await cookieManager.get("session");
  const token = cookie?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const session = payload.session as Session;

    // Check if the session is expired
    if (new Date(session.expires) < new Date()) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("Error verifying session token:", error);
    return null;
  }
}

// Get the current user from the session
export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user || null;
}

// Require authentication for a route
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return user;
}

// Sign out by clearing the session cookie
export async function signOut() {
  await cookieManager.delete("session");
  redirect("/");
}
