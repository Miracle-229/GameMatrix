import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth'

export const authOptions:NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        '749843461913-ctbh9n870pdbm69glbnp05m3odqm536v.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
};
export default NextAuth(authOptions);
