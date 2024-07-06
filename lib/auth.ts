import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

export const authenticate = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler,
) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.user = session.user;
  next(req, res);
};

export const authorize = (roles: string[]) => {
  return (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    const user = req.user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next(req, res);
  };
};
