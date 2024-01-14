import { Request, Response } from 'express';
import { query } from '../db';
import { membership } from '../middleware/jwt';

export const get = async (req: Request, res: Response) => {
    const label = await membership(req.headers.authorization!)
    const posts = await query(`SELECT * FROM posts WHERE (Label = 'Normal' OR $1 = 'Premium')`, [label]);

    res.json(posts);
};

export const view = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    try {
        const user = await query('SELECT * FROM posts WHERE postid = $1', [id]);
        res.json(user);
    } catch (e: any) {
        res.json({ message: e['detail'] })
    }
};

export const post = async (req: Request, res: Response) => {
    try {
        const { title, body, categoryid, status, label } = req.body || req.query;
        console.log(req.query)

        const values = [title, body, categoryid, status, label];

        await query('INSERT INTO posts (title, body, categoryid, status, label) VALUES ($1, $2, $3, $4, $5)', values);

        // res.status(201).json({ message: 'Post created successfully', postId: result.rows[0].PostID });
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create post' });
    }
};

export const put = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, body, categoryid, status, label } = req.body || req.query;

    try {
        await query('UPDATE posts SET title = $1, body = $2, categoryid = $3, status = $4, label = $5 WHERE postid = $6', [title, body, categoryid, status, label, id]);

        res.status(200).json({ message: 'Post updated successfully' });
    } catch (e: any) {
        res.status(400).json({ message: 'Failed to update post' });
    }
};

export const patch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, body, categoryid, status, label } = req.body || req.query;

    try {
        const updates: any = {};
        if (title) updates.title = title;
        if (body) updates.body = body;
        if (categoryid) updates.categoryid = categoryid;
        if (status) updates.status = status;
        if (label) updates.label = label;


        if (Object.keys(updates).length > 0) {
            const queryUpdate = `UPDATE posts SET ${Object.entries(updates).map(([key, value]) => `${key} = $${Object.keys(updates).indexOf(key) + 1}`).join(', ')} WHERE postid = $${Object.keys(updates).length + 1}`;
            const values = [...Object.values(updates), id];
            console.log(await query(queryUpdate, values))
            await query(queryUpdate, values);

            res.status(200).json({ message: 'Post updated successfully' });
        } else {
            res.status(400).json({ message: 'No updates provided' });
        }
    } catch (e: any) {
        res.status(400).json({ message: 'Failed to update post' });
    }
};

export const remove = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    try {
        const user = await query('DELETE FROM posts WHERE postid = $1', [id]);
        res.json({ message: 'Post deleted' });
    } catch (e: any) {
        res.json({ message: e['detail'] })
    }
};
