import type { DefaultUser } from 'next-auth';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultUser & { id: string; role: string };
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module 'next' {
  interface NextApiRequest {
    user?: DefaultUser & { id: string; role: string };
  }
}
