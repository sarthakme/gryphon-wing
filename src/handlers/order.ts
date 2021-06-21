import { OrderClass } from '../models/order';
import { User } from '../models/user';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const order = new OrderClass();

const create = async (req: Request, res: Response) => {
    try {
        const str = req.headers.authorization;
        if (str === undefined) {
            res.status(401);
            res.json('Need to be logged in to perform this action');
            return;
        }
        const token = (str as string).split(' ')[1];
        const decoded = jwt.verify(
            token,
            process.env.TOKEN_SECRET as string
        ) as User;
        const orders = await order.create(decoded.id as unknown as number);
        if (orders) {
            res.json('Previous order closed. New order opened.');
            return;
        }
        res.json('Problem in creating new order');
    } catch (err) {
        console.log('Invalid token: ${err}');
        res.status(401);
        res.json('Invalid token');
    }
};

const order_routes = (app: express.Application): void => {
    app.post('/order/create', create);
};

export default order_routes;
