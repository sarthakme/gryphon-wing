import { ProductClass, Product } from '../models/product';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const product = new ProductClass();

export const auth = async (
    req: Request,
    res: Response,
    next: Function
): Promise<void> => {
    try {
        const str = req.headers.authorization;
        if (str === undefined) {
            res.status(401);
            res.json('Need to be logged in to perform this action');
            return;
        }
        const token = (str as string).split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    } catch (err) {
        res.status(401);
        res.json(`Invalid token: ${err}`);
    }
};

const index = async (req: Request, res: Response) => {
    const products = await product.index();
    res.json(products);
};

const show = async (req: Request, res: Response) => {
    const products = await product.show(req.params.id as unknown as number);
    if (products.id === 0) {
        res.json('No product with this id');
        return;
    }
    res.json(products);
};

const create = async (req: Request, res: Response) => {
    if (req.body.name === undefined || req.body.price === undefined) {
        res.json('Required field(s) empty');
        return;
    }
    const p: Product = {
        name: req.body.name as string,
        price: req.body.price as unknown as number,
    };
    const products = await product.create(p);
    if (products.id === 0) {
        res.json('Error creating entry in database');
        return;
    }
    res.json(products);
};

const showExpensive = async (req: Request, res: Response) => {
    const products = await product.showExpensive();
    res.json(products);
};

const product_routes = (app: express.Application): void => {
    app.get('/product', index);
    app.get('/product/:id', show);
    app.get('/product/show/expensive', showExpensive);
    app.post('/product', auth, create);
};

export default product_routes;
