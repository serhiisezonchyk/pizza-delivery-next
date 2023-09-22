import { prisma } from '@/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions, User, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
declare module 'next-auth' {
  interface Session {
    user: User & {
      isAdmin: boolean;
    };
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    isAdmin: boolean;
  }
}
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      // clientId:process.env.GOOGLE_ID as string,
      // clientSecret: process.env.GOOGLE_SECRET as string,
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });
      token.isAdmin = dbUser?.isAdmin!;
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);