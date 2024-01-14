import { Request, Response } from 'express';
import btoa from 'btoa';
import { query } from '../db';

export const submit = async (req: Request, res: Response) => {
    const token = process.env.BILLPLZ_SECRET

    const username = token;
    const password = '';
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);

    const response = await fetch('https://www.billplz-sandbox.com/api/v3/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Basic ${encodedCredentials}` },
        body: JSON.stringify({
            collection_id: '275lyp7t',
            email: 'altafhasnan@gmail.com',
            mobile: '+60123456789',
            name: 'Daniell',
            amount: '100',
            callback_url: 'http://localhost:3000/payment/success',
            description: 'Premium',
            redirect_url: 'http://localhost:3000/payment/success',
        })
    })
    if (!response.ok) {
        console.error('Error from Billplz:', response.statusText);
        return res.status(500).json({ message: 'Failed to create Billplz invoice' });
    }

    const invoice = await response.json();
    await query('INSERT INTO payments (paymentid, paymentmethod, amount, status) VALUES ($1, $2, $3, $4)', [invoice.id, invoice.state, invoice.amount, invoice.state]);
    return res.json({ payment_link: invoice.url })
};

export const success = async (req: Request, res: Response) => {
    if (typeof req.query.billplz === 'string') {
        throw new Error()
    } else {
        const bill: any = req.query.billplz
        await query('UPDATE payments SET status = $1 WHERE paymentid = $2', ['complete', bill.id]);
    }

    return res.json({ message: "Payment succeed" })
};