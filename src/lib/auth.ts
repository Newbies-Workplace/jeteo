import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      google_mail: string;
      _permissions: {
        isAuthorized: boolean;
      };
    } & DefaultSession["user"];
  }
}

export const { auth, handlers, signIn } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    session({ session, token, user }) {
      // todo fetch user from db and add permissions
      return {
        ...session,
        user: {
          ...session.user,
          google_mail: user.email,
          _permissions: {
            isAuthorized: true,
          },
        },
      };
    },
  },
});
