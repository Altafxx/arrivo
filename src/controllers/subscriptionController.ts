import { Request, Response } from 'express';
import { query } from '../db';
import { membership } from '../middleware/jwt';


//TODO:Rework payment
export const premium = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const label = await membership(req.headers.authorization!)
    try {
        if (label == 'Premium') return res.json({ message: 'User is already PREMIUM' });
        await query('UPDATE users SET membership = $1 WHERE userid = $2', ['Premium', id]);

        res.json({ message: 'Membership changed to PREMIUM' });
    } catch (e: any) {
        res.json({ message: e['detail'] })
    }
};
export const normal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const label = await membership(req.headers.authorization!)
    try {
        if (label == 'Normal') return res.json({ message: 'User is already NORMAL' });
        await query('UPDATE users SET membership = $1 WHERE userid = $2', ['Normal', id]);
        res.json({ message: 'Membership changed to NORMAL' });
    } catch (e: any) {
        res.json({ message: e['detail'] })
    }
};
