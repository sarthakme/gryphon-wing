import Client from '../db';

export class CartClass {
    async showCurrent(n: number): Promise<
        {
            id: number;
            name: string;
            price: number;
            quantity: number;
        }[]
    > {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT id, name, price, quantity FROM products INNER JOIN orders_products ON product_id = id WHERE order_id = (SELECT id FROM orders WHERE user_id = ($1) AND status = TRUE)';
            const result = await conn.query(sql, [n]);
            conn.release();
            return result.rows;
        } catch (err) {
            console.log(`Error retrieving: ${err}`);
            return [];
        }
    }
}
