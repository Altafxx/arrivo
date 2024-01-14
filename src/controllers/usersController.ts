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
    const id = parseInt(req.params.id)
    try {
        const user = await query('SELECT * FROM users WHERE userid = $1', [id]);
        res.json(user);
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
    const { id } = req.params;
    const { username, password, email, fullname, membership } = req.body || req.query;

    // TODO: HASH PASSWORD

    try {
        await query('UPDATE users SET username = $1, password = $2, email = $3, fullname = $4, membership = $5 WHERE userid = $6', [username, password, email, fullname, membership, id]);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (e: any) {
        res.status(400).json({ message: 'Failed to update user' });
    }
};

export const patch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password, email, fullname, membership } = req.body || req.query;

    // TODO: HASH PASSWORD (if password is included in the request body)

    try {
        const updates: any = {};
        if (username) updates.username = username;
        if (password) updates.password = password;
        if (email) updates.email = email;
        if (fullname) updates.fullname = fullname;
        if (membership) updates.membership = membership;


        if (Object.keys(updates).length > 0) {
            const queryUpdate = `UPDATE users SET ${Object.entries(updates).map(([key, value]) => `${key} = $${Object.keys(updates).indexOf(key) + 1}`).join(', ')} WHERE userid = $${Object.keys(updates).length + 1}`;
            const values = [...Object.values(updates), id];
            await query(queryUpdate, values);

            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(400).json({ message: 'No updates provided' });
        }
    } catch (e: any) {
        res.status(400).json({ message: 'Failed to update user' });
    }
};

export const remove = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    try {
        await query('DELETE FROM users WHERE UserID = $1', [id]);
        res.json({ message: 'User deleted' });
    } catch (e: any) {
        console.log(e)
        res.json({ message: e['detail'] })
    }
};
