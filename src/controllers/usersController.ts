import { Request, Response } from 'express';
import { query } from '../db';
import { User } from '../models/user';

// export const view = async (req: Request, res: Response) => {
//     function fetchUsers(): User[] {
//         return [{
//             UserID: 0,
//             Username: "string",
//             Password: "string", // Store passwords securely using hashing
//             Email: "string",
//             FullName: "string",
//             Membership: 'Premium',
//             CreatedAt: new Date('2024-01-12'),
//             UpdatedAt: new Date(),
//         }]
//     }


//     const users: User[] = await fetchUsers(); // Replace with your data fetching logic
//     res.render('users/index', { users });
// };

export const get = async (req: Request, res: Response) => {
    const users = await query('SELECT * FROM users');
    res.json(users);
};

export const view = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id)
    try {
        const users = await query('SELECT * FROM users WHERE UserID = $1', [userId]);
        res.json(users);
    } catch (e: any) {
        res.json({ message: e['detail'] })
    }
};

export const post = async (req: Request, res: Response) => {
    const { username, password, email, fullname, membership } = req.body || req.query;

    // TODO: HASH PASSWORD

    try {
        await query('INSERT INTO users (username, password, email, fullname, membership) VALUES ($1, $2, $3, $4, $5)', [username, password, email, fullname, membership]);

        res.status(201).json({ message: 'User created successfully' });
    } catch (e: any) {
        res.status(409).json({ message: e['detail'] })
    }
};

export const put = async (req: Request, res: Response) => {
    const users: string = "users"
    res.json(users);
};

export const patch = async (req: Request, res: Response) => {
    const users: string = "users"
    res.json(users);
};

export const remove = async (req: Request, res: Response) => {
    const users: string = "users"
    res.json(users);
};
