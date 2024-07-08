import type { DefaultUser } from 'next-auth';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultUser & { id: string; role: string };
    accessToken: string;
  }

  interface User {
    id: string;
    role: string;
    email: string;
    password?: string;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    iat: number;
    exp: number;
    jti: string;
  }
}

declare module 'next' {
  interface NextApiRequest {
    user?: DefaultUser & { id: string; role: string };
  }
}
