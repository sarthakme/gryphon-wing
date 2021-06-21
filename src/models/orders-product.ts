import Client from '../db';

export interface OrdersProduct {
    order_id?: number;
    product_id: number;
    quantity: number;
}

export class OrdersProductClass {
    async create(ordersProduct: OrdersProduct, id: number): Promise<boolean> {
        try {
            const conn = await Client.connect();
            const select1 =
                'SELECT id FROM orders WHERE user_id = ($1) AND status = TRUE';
            let result = await conn.query(select1, [id]);
            const select2 =
                'SELECT quantity FROM orders_products WHERE order_id = ($1) AND product_id = ($2)';
            const existingValue = await conn.query(select2, [
                result.rows[0].id,
                ordersProduct.product_id,
            ]);
            if (existingValue.rows.length) {
                const quantity =
                    ordersProduct.quantity + existingValue.rows[0].quantity;
                const update =
                    'UPDATE orders_products SET quantity = ($1) WHERE order_id = ($2) AND product_id = ($3)';
                result = await conn.query(update, [
                    quantity,
                    result.rows[0].id,
                    ordersProduct.product_id,
                ]);
            } else {
                const insert =
                    'INSERT INTO orders_products VALUES ($1, $2, $3)';
                result = await conn.query(insert, [
                    result.rows[0].id,
                    ordersProduct.product_id,
                    ordersProduct.quantity,
                ]);
            }
            conn.release();
            return result.rowCount as unknown as boolean;
        } catch (err) {
            console.log(`Error inserting: ${err}`);
            return false;
        }
    }
}
