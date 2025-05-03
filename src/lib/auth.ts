import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { convertUserDetails } from "@/lib/actions/converters";
import { UserDetailsResponse } from "@/lib/models/user.response";

declare module "next-auth" {
  interface Session {
    user: {
      google_mail: string;
      _permissions: {
        isAuthorized: boolean;
      };
    } & UserDetailsResponse;
  }
}

export const { auth, handlers, signIn } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    async session({ session, token, user }) {
      const prismaUser = await prisma.user.findUniqueOrThrow({
        where: {
          id: user.id,
        },
      });
      const convertedUser = convertUserDetails(prismaUser);

      return {
        ...session,
        user: {
          ...convertedUser,
          google_mail: user.email,
        },
      };
    },
  },
});
