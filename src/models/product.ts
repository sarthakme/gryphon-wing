import Client from '../db';

export interface Product {
    id?: number;
    name: string;
    price: number;
}

export class ProductClass {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            console.log(`Error retrieving: ${err}`);
            return [];
        }
    }

    async show(n: number): Promise<Product> {
        const p: Product = {
            id: 0,
            name: '',
            price: 0,
        };
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id = ($1)';
            const result = await conn.query(sql, [n]);
            conn.release();
            if (result.rows.length === 0) return p;
            return result.rows[0];
        } catch (err) {
            console.log(`Error retrieving: ${err}`);
            return p;
        }
    }

    async create(product: Product): Promise<Product> {
        const p: Product = {
            id: 0,
            name: '',
            price: 0,
        };
        try {
            const conn = await Client.connect();
            const insert = 'INSERT INTO products (name, price) VALUES ($1, $2)';
            await conn.query(insert, [product.name, product.price]);
            const select =
                'SELECT * FROM products WHERE id = (SELECT MAX(id) FROM products)';
            const result = await conn.query(select);
            conn.release();
            return result.rows[0];
        } catch (err) {
            console.log(`Error inserting: ${err}`);
            return p;
        }
    }

    async showExpensive(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            console.log(`Error retrieving: ${err}`);
            return [];
        }
    }
}
