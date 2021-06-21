import { uWoutPwd, p } from './handlers-spec';
import { UserClass, User } from '../models/user';
import { ProductClass, Product } from '../models/product';
import { OrderClass, Order } from '../models/order';
import { OrdersProductClass, OrdersProduct } from '../models/orders-product';
import { CartClass } from '../services/cart';

const user = new UserClass();

const u2: User = {
    id: 2,
    fname: 'Raj',
    lname: 'Mehra',
    password: 'password',
};

const u2WoutPwd: User = {
    id: 2,
    fname: 'Raj',
    lname: 'Mehra',
};

describe('User model', () => {
    it('create method', () => {
        user.create(u2).then((value) => {
            expect(value.id).toEqual(u2.id);
        });
    });

    it('index method', () => {
        user.index().then((value) => {
            expect(value.length).toEqual(2);
        });
    });

    it('show method', () => {
        user.show(u2.id as number).then((value) => {
            expect(value).toEqual(u2WoutPwd);
        });
    });

    it('validate method', () => {
        user.validate(u2.id as number, u2.password as string).then((value) => {
            expect(value.id).toEqual(u2.id);
        });
    });
});

const product = new ProductClass();

const p2: Product = {
    id: 2,
    name: 'Milk',
    price: 20,
};

describe('Product model', () => {
    it('create method', () => {
        product.create(p2).then((value) => {
            expect(value).toEqual(p2);
        });
    });

    it('index method', () => {
        product.index().then((value) => {
            expect(value).toEqual([p, p2]);
        });
    });

    it('show method', () => {
        product.show(p2.id as number).then((value) => {
            expect(value).toEqual(p2);
        });
    });

    it('showExpensive method', () => {
        product.showExpensive().then((value) => {
            expect(value).toEqual([p2, p]);
        });
    });
});

const order = new OrderClass();

const o: Order = {
    id: 2,
    user_id: 1,
    status: true,
};

describe('Order model', () => {
    it('create method', () => {
        order.create(o.user_id).then((value1) => {
            expect(value1).toBeTruthy();
            ordersProduct.create(op, o.user_id).then((value2) => {
                expect(value2).toBeTruthy();
                cart.showCurrent(1).then((value) => {
                    expect(value).toBeTruthy();
                });
            });
        });
    });
});

const ordersProduct = new OrdersProductClass();

const op: OrdersProduct = {
    order_id: 2,
    product_id: 1,
    quantity: 1,
};

/* describe('OrdersProduct model', () => {
	it('create method', () => {
		ordersProduct.create(op, o.user_id).then((value) => {
			expect(value).toBeFalsy();
		});
	});
	
	//Shifted into order model: line 96
	//Rarely, a test will fail because of latency in delivery of promises.
	
}); */

const cart = new CartClass();
