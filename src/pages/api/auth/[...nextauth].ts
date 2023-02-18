import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs"

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { signIn } from "next-auth/react/index.js";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async jwt({token, user}) {
      if(user) {
        token.id = user.id 
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {}
      },
      async authorize(credentials, req) {
        const user = await prisma.mdbUser.findUnique({
          where: {
            username: credentials?.username
          }
        })

        if(!user) 
         return null

        const isValid = await bcrypt.compare(credentials?.password ||  "", user.pwHash)
        if(!isValid)
          return null

        return ({
          username: user.username,
          name: user.name,
          age: user.age,
          surname: user.surname,
          id: `${user.id}`
        })
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/sign-up'
  }
};

export default NextAuth(authOptions);
