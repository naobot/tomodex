import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // `user` is only present on the first sign-in
      // After that, we carry the id forward from the token itself
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Copy the id from the token into the session
      // so your app code can read session.user.id
      if (token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})