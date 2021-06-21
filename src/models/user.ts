import Client from '../db';
import bcrypt from 'bcrypt';

export interface User {
    id?: number;
    fname: string;
    lname: string;
    password?: string;
}

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export class UserClass {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT id, fname, lname FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            console.log(`Error retrieving: ${err}`);
            return [];
        }
    }

    async show(n: number): Promise<User> {
        const u: User = {
            id: 0,
            fname: '',
            lname: '',
            password: '',
        };
        try {
            const conn = await Client.connect();
            const sql = 'SELECT id, fname, lname FROM users WHERE id = ($1)';
            const result = await conn.query(sql, [n]);
            conn.release();
            if (result.rows.length === 0) return u;
            return result.rows[0];
        } catch (err) {
            console.log(`Error retrieving: ${err}`);
            return u;
        }
    }

    async create(user: User): Promise<User> {
        const u: User = {
            id: 0,
            fname: '',
            lname: '',
            password: '',
        };
        try {
            const conn = await Client.connect();
            let sql =
                'INSERT INTO users (fname, lname, password) VALUES ($1, $2, $3)';
            const hash = bcrypt.hashSync(
                user.password + (pepper as string),
                parseInt(saltRounds as string)
            );
            let result = await conn.query(sql, [user.fname, user.lname, hash]);
            sql = 'SELECT * FROM users WHERE id = (SELECT MAX(id) FROM users)';
            result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            console.log(`Error inserting: ${err}`);
            return u;
        }
    }

    async validate(id: number, password: string): Promise<User> {
        const u: User = {
            id: 0,
            fname: '',
            lname: '',
            password: '',
        };
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows.length === 0) return u;
            if (
                bcrypt.compareSync(
                    password + (pepper as string),
                    String(result.rows[0].password)
                )
            )
                return result.rows[0];
            else return u;
        } catch (err) {
            console.log(`Error retrieving: ${err}`);
            return u;
        }
    }
}
