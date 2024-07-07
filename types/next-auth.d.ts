import type { DefaultUser } from 'next-auth';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultUser & { id: string; role: string };
    accessToken?: string;
  }

  interface User {
    id: string;
    role: string;
  }

  interface JWT {
    accessToken?: string; // Añadido para incluir accessToken en el JWT
  }
}

declare module 'next' {
  interface NextApiRequest {
    user?: DefaultUser & { id: string; role: string };
  }
}
