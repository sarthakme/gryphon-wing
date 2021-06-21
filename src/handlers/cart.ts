import { CartClass } from '../services/cart';
import express, { Request, Response } from 'express';
import { auth } from '../handlers/product';

const cart = new CartClass();

const showCurrent = async (req: Request, res: Response) => {
    const carts = await cart.showCurrent(req.params.id as unknown as number);
    res.json(carts);
};

const cart_routes = (app: express.Application): void => {
    app.get('/order/show/:id', auth, showCurrent);
};

export default cart_routes;
