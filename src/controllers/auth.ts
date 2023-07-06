import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface User {
  id: string;
  name: string;
  roles: string[];
}

const users: User[] = [
  {
    id: '1',
    name: 'Creator User',
    roles: ['CREATOR']
  },
  {
    id: '2',
    name: 'Viewer User',
    roles: ['VIEWER']
  },
  {
    id: '3',
    name: 'View All User',
    roles: ['VIEW ALL']
  },
  {
    id: '4',
    name: 'Creator and Viewer User',
    roles: ['CREATOR', 'VIEWER']
  }
];

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your-secret-key') as{ userId: string, roles: string[] };

    // Attach the decoded token to the request object
    req.body.token = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { roles: userRoles } = req.body.token;

    if (roles.some((role) => userRoles.includes(role))) {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
};
