import { OrdersProductClass, OrdersProduct } from '../models/orders-product';
import express, { Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

const ordersProduct = new OrdersProductClass();

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
        if (
            req.body.product_id === undefined ||
            req.body.quantity === undefined
        ) {
            res.json('Required field(s) empty');
            return;
        }
        const op: OrdersProduct = {
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        };
        const ordersProducts = await ordersProduct.create(
            op,
            decoded.id as number
        );
        if (ordersProducts) {
            res.json('Product added to cart');
            return;
        }
        res.json('Error inserting into database');
    } catch (err) {
        res.status(401);
        res.json('Invalid token');
    }
};

const ordersProduct_routes = (app: express.Application): void => {
    app.post('/order/add', create);
};

export default ordersProduct_routes;
