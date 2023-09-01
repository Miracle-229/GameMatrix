import type { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        '749843461913-ctbh9n870pdbm69glbnp05m3odqm536v.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
};
