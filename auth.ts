import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Linkedin from "next-auth/providers/linkedin";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google, Facebook, Linkedin],
});
