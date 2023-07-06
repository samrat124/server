import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
//  import dotenv from 'dotenv';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Missing token.' });
    }
  
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET || '') ;
      res.locals.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };
  
  // Authorization middleware
  export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = res.locals.user ;
  
    //   if (!user.roles.some((role) => roles.includes(role))) {
    //     return res.status(403).json({ message: 'Forbidden.' });
    //   }
  
      next();
    };
  };


//   module.exports={
//     authenticate,authorize
//   }
  