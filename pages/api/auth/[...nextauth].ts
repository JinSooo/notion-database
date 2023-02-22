import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? '',
		}),
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
	],
	callbacks: {
		session: async ({ session, token, user }) => {
			if (session?.user) {
				session.user.id = user.id
			}
			return session
		},
	},
}

export default NextAuth(authOptions)
