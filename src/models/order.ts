import Client from '../db';

export interface Order {
    id?: number;
    user_id: number;
    status: boolean;
}

export class OrderClass {
    async create(n: number): Promise<boolean> {
        try {
            const conn = await Client.connect();
            const update =
                'UPDATE orders SET status = FALSE WHERE user_id = ($1)';
            let result = await conn.query(update, [n]);
            const insert =
                'INSERT INTO orders (user_id, status) VALUES (($1), TRUE)';
            result = await conn.query(insert, [n]);
            conn.release();
            return result.rowCount as unknown as boolean;
        } catch (err) {
            try {
                console.log(`Error inserting: ${err}`);
                const altConn = await Client.connect();
                const sql =
                    'UPDATE orders SET status = TRUE WHERE id = (SELECT MAX(id) FROM orders WHERE user_id = ($1))';
                await altConn.query(sql, [n]);
                altConn.release();
                return false;
            } catch (err) {
                console.log(`Error`);
                return false;
            }
        }
    }
}
