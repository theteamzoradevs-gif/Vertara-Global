import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";
import { authConfig } from "@/lib/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const conn = await connectDB();
        if (!conn) {
          if (
            email === (process.env.ADMIN_EMAIL || "admin@gccadvisor.com") &&
            password === (process.env.ADMIN_PASSWORD || "ChangeMe123!")
          ) {
            return { id: "dev-admin", email, name: "Admin" };
          }
          return null;
        }

        const user = await AdminUser.findOne({ email: email.toLowerCase() });
        if (!user) return null;
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;
        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
});
