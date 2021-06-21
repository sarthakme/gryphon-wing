import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import order_routes from './handlers/order';
import product_routes from './handlers/product';
import user_routes from './handlers/user';
import cart_routes from './handlers/cart';
import ordersProduct_routes from './handlers/orders-product';

export const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.json('Welcome to plants store');
});

order_routes(app);
product_routes(app);
user_routes(app);
cart_routes(app);
ordersProduct_routes(app);

app.listen(port, () => {
    console.log(`Started server on 127.0.0.1:${port}`);
});
