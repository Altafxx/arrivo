import jwt, { Secret, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY: Secret = process.env.JWT_SECRET!;
import { query } from '../db';

export const generateToken = (user: any) => {
    return jwt.sign({ username: user.username, email: user.email }, SECRET_KEY, { expiresIn: '24h' });
};

export const check = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.replace('Bearer ', '');
        if (!token) {
            throw new Error('No token provided');
        }

        const decoded = jwt.verify(token, SECRET_KEY);

        //TODO: Fix JWT auth
        // req.user = decoded;
        if (typeof decoded === 'string') {
            throw new Error();
        } else {
            const user = await query('SELECT * FROM users WHERE username = $1 AND email = $2', [decoded.username, decoded.email]);
            if (user.length == 0) throw new Error();
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export const membership = async (token: string) => {
    try {
        const decoded = verify(token?.replace('Bearer ', ''), SECRET_KEY);

        if (typeof decoded === 'string') {
            throw new Error();
        } else {
            const membership = await query('SELECT membership FROM users WHERE username = $1 AND email = $2', [decoded.username, decoded.email]);

            if (membership.length == 0) throw new Error();
            return membership[0].membership
        }
    } catch (error) {
        console.error(error);
    }
}