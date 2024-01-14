import { Request, Response } from 'express';
import { query } from '../db';
import { generateToken } from '../middleware/jwt';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body || req.query;
        if (!username && !password) return res.json({ message: 'Authorization invalid' })

        const user: any = await query('SELECT * FROM users WHERE username = $1', [username]);
        if (password != user[0].password) return res.json({ message: 'Password invalid' })

        const token = generateToken(user[0]);
        res.json({ token });
    } catch (e) {
        return res.json({ message: 'Username or password invalid' })
    }
};