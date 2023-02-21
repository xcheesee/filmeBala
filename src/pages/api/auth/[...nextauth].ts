import NextAuth, { type User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import bcrypt from "bcryptjs"
import { prisma } from "../../../server/db/client";
import { type JWT } from "next-auth/jwt/types.js";
import { type AdapterUser } from "next-auth/adapters.js";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async jwt({ token, user }: {token: JWT, user?: MdbUser | MdbAdapterUser | undefined }) {
      if(user) {
        token.id = user.id 
        token.name = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name
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
      async authorize(credentials) {
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

interface MdbUser extends User {
    username?: string;
    surname?: string;
}

interface MdbAdapterUser extends AdapterUser {
    username?: string;
    surname?: string;
}

export default NextAuth(authOptions);
