import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('AuthMiddleware');
    const token = req.headers['auth-user'];

    if (Array.isArray(token)) {
      return res.status(400).json({ message: 'Invalid token format.' });
    }

    if (!token) {
      return res.status(403).json({ message: 'Access denied, token missing.' });
    }

    try {
      const secret =
        '123';
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
      if (!('userId' in decoded) || !decoded.userId) {
        console.log('Token not containing userID');
        return res
          .status(401)
          .json({ message: 'Token does not contain userId.' });
      }
      req['user'] = decoded;
      console.log(decoded);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  }
}