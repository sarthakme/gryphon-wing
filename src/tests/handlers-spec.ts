import supertest from 'supertest';
import { app } from '../server';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { OrdersProduct } from '../models/orders-product';

const test = supertest(app);
const authStr =
    'Bearer ' +
    jwt.sign(
        {
            id: 1,
            fname: 'Raj',
            lname: 'Mehra',
            password: 'password',
        },
        process.env.TOKEN_SECRET as string
    );

const u: User = {
    id: 1,
    fname: 'Raj',
    lname: 'Mehra',
    password: 'password',
};

export const uWoutPwd: User = {
    id: 1,
    fname: 'Raj',
    lname: 'Mehra',
};

describe('Testing user routes', () => {
    it('post /user', async () => {
        const res = await test.post('/user').send(u);
        const token = JSON.parse(res.text).jwt;
        const decoded = jwt.verify(
            token,
            process.env.TOKEN_SECRET as string
        ) as User;
        expect(decoded.id).toEqual(1);
    });

    it('post /user/in', async () => {
        const res = await test.post('/user/in').send(u);
        const token = JSON.parse(res.text);
        const decoded = jwt.verify(
            token,
            process.env.TOKEN_SECRET as string
        ) as User;
        expect(decoded.id).toEqual(1);
    });

    it('get /user', async () => {
        const res = await test.get('/user').set('Authorization', authStr);
        expect(JSON.parse(res.text)).toEqual([uWoutPwd]);
    });

    it('get /user/1', async () => {
        const res = await test.get('/user/1').set('Authorization', authStr);
        expect(JSON.parse(res.text)).toEqual(uWoutPwd);
    });
});

export const p: Product = {
    id: 1,
    name: 'Book',
    price: 10,
};

describe('Testing product routes', () => {
    it('post /product', async () => {
        const res = await test
            .post('/product')
            .send(p)
            .set('Authorization', authStr);
        expect(JSON.parse(res.text)).toEqual(p);
    });

    it('get /product', async () => {
        const res = await test.get('/product');
        expect(JSON.parse(res.text)).toEqual([p]);
    });

    it('get /product/1', async () => {
        const res = await test.get('/product/1');
        expect(JSON.parse(res.text)).toEqual(p);
    });

    it('get /product/show/expensive', async () => {
        const res = await test.get('/product/show/expensive');
        expect(JSON.parse(res.text)).toEqual([p]);
    });
});

const o: Order = {
    id: 1,
    user_id: 1,
    status: true,
};

describe('Testing order routes', () => {
    it('post /order/create', async () => {
        const res = await test
            .post('/order/create')
            .send(o)
            .set('Authorization', authStr);
        expect(JSON.parse(res.text)).toEqual(
            'Previous order closed. New order opened.'
        );
    });
});

const op: OrdersProduct = {
    order_id: 1,
    product_id: 1,
    quantity: 1,
};

describe('Testing orders-product routes', () => {
    it('post /order/add', async () => {
        const res = await test
            .post('/order/add')
            .send(op)
            .set('Authorization', authStr);
        expect(JSON.parse(res.text)).toEqual('Product added to cart');
    });

    it('again', async () => {
        const res = await test
            .post('/order/add')
            .send(op)
            .set('Authorization', authStr);
        expect(JSON.parse(res.text)).toEqual('Product added to cart');
    });

    it('get /order/show/1', async () => {
        const res = await test
            .get('/order/show/1')
            .set('Authorization', authStr);
        expect(JSON.parse(res.text)).toEqual([
            {
                id: p.id,
                name: p.name,
                price: p.price,
                quantity: 2 * op.quantity,
            },
        ]);
    });
});
