import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { NextResponse } from "next/server"

const { auth } = NextAuth({ providers: [Google] })

export default auth((req) => {
  if (!req.auth) {
    const isRoot = req.nextUrl.pathname === "/";
    if (isRoot) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url));
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
}