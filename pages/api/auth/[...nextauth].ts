import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GitHubProvider from 'next-auth/providers/github';

const prisma = new PrismaClient();

export default NextAuth({
   adapter: PrismaAdapter(prisma),
   providers: [
      DiscordProvider({
         clientId: process.env.DISCORD_CLIENT_ID,
         clientSecret: process.env.DISCORD_CLIENT_SECRET,
      }),
      GitHubProvider({
         clientId: process.env.GITHUB_CLIENT_ID,
         clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
   ],
   callbacks: {
      async session({ session, token, user }) {
         session.user.id = user.id;
         return session;
      },
   },
});
