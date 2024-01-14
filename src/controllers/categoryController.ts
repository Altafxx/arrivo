import { Request, Response } from 'express';
import { query } from '../db';

export const get = async (req: Request, res: Response) => {
    const categories = await query('SELECT * FROM categories');
    res.json(categories);
};

export const view = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    try {
        const category = await query('SELECT * FROM categories WHERE categoryid = $1', [id]);
        res.json(category);
    } catch (e: any) {
        res.json({ message: e['detail'] })
    }
};

export const post = async (req: Request, res: Response) => {
    const { name, description } = req.body || req.query;

    try {
        await query('INSERT INTO categories (name, description) VALUES ($1, $2)', [name, description]);

        res.status(201).json({ message: 'Category created successfully' });
    } catch (e: any) {
        res.status(409).json({ message: e['detail'] })
    }
};

export const put = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, activated } = req.body || req.query;

    try {
        await query('UPDATE categories SET name = $1, description = $2, activated = $3 WHERE categoryid = $4', [name, description, activated, id]);

        res.status(200).json({ message: 'Category updated successfully' });
    } catch (e: any) {
        res.status(400).json({ message: 'Failed to update category' });
    }
};

export const patch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, activated } = req.body || req.query;

    try {
        const updates: any = {};
        if (name) updates.name = name;
        if (description) updates.description = description;
        if (activated) updates.activated = activated;

        if (Object.keys(updates).length > 0) {
            const queryUpdate = `UPDATE categories SET ${Object.entries(updates).map(([key, value]) => `${key} = $${Object.keys(updates).indexOf(key) + 1}`).join(', ')} WHERE categoryid = $${Object.keys(updates).length + 1}`;
            const values = [...Object.values(updates), id];
            await query(queryUpdate, values);

            res.status(200).json({ message: 'Category updated successfully' });
        } else {
            res.status(400).json({ message: 'No updates provided' });
        }
    } catch (e: any) {
        res.status(400).json({ message: 'Failed to update category' });
    }
};

export const remove = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    try {
        await query('DELETE FROM categories WHERE categoryid = $1', [id]);
        res.json({ message: 'Category deleted' });
    } catch (e: any) {
        console.log(e)
        res.json({ message: e['detail'] })
    }
};
