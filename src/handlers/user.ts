import { UserClass, User } from '../models/user';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { auth } from '../handlers/product';

const user = new UserClass();

const index = async (req: Request, res: Response) => {
    const users = await user.index();
    res.json(users);
};

const show = async (req: Request, res: Response) => {
    const users = await user.show(req.params.id as unknown as number);
    if (users.id === 0) {
        res.json('No user with this id');
        return;
    }
    res.json(users);
};

const create = async (req: Request, res: Response) => {
    if (
        req.body.fname === undefined ||
        req.body.lname === undefined ||
        req.body.password === undefined
    ) {
        res.json('Required field(s) empty');
        return;
    }
    const u: User = {
        fname: req.body.fname as string,
        lname: req.body.lname as string,
        password: req.body.password as string,
    };
    const users = await user.create(u);
    if (users.id === 0) {
        res.json('Error creating entry in database');
        return;
    }
    const token = jwt.sign(users, process.env.TOKEN_SECRET as string);
    res.json({
        id: users.id,
        jwt: token,
    });
};

const validate = async (req: Request, res: Response) => {
    if (req.body.id === undefined || req.body.password === undefined) {
        console.log('Required field(s) empty');
        return;
    }
    const users = await user.validate(req.body.id, req.body.password);
    if (users.id === 0) {
        res.json('Invalid credentials');
        return;
    }
    users.password = req.body.password;
    const token = jwt.sign(users, process.env.TOKEN_SECRET as string);
    res.json(token);
};

const user_routes = (app: express.Application): void => {
    app.get('/user', auth, index);
    app.get('/user/:id', auth, show);
    app.post('/user', create);
    app.post('/user/in', validate);
};

export default user_routes;
