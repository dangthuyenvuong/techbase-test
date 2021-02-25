import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose'
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import Token from "../models/token";
import Admin from "../models/admin";
import md5 from 'md5'
import IAdmin from '../interfaces/admin'

function cacheError(err: any, res: Response) {
    if (err instanceof TokenExpiredError) {
        return res.status(403).json({ error: 1, error_code: 'TOKEN_EXPIRED', message: 'Token was expired' });
    }

    if (err instanceof JsonWebTokenError) {
        return res.status(403).json({ error: 1, error_code: 'TOKEN_INVALID', message: 'Token Invalid' });
    }

    return res.sendStatus(403)

}
export function JWTMiddleware(req: any, res: any, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'AccessToken', (err: any, user: any) => {


        if (err) return cacheError(err, res)

        req.user = user

        next()
    })
}

export default {
    login: async (req: Request, res: Response, next: NextFunction) => {
        console.log('admin')
        let { username, password } = req.body
        let user = await Admin.findOne({ username, password: md5(password) })
        if (user) {
            return res.json({
                username,
                token: await Token.createToken(user)
            })
        }

        return res.status(500).json({
            message: 'Username or Password not exits!'
        })
    },
    register: async (req: Request, res: Response, next: NextFunction) => {
        let { username, password } = req.body
        let user = await Admin.findOne({ username })

        // if (user) {
        //     return res.status(500).json({
        //         message: 'User have exits!'
        //     })
        // }

        let register = new Admin({ username, password: md5(password), _id: new mongoose.Types.ObjectId() })
        return register.save()
            .then(async (result: IAdmin) => {
                let user = JSON.parse(JSON.stringify(result))

                delete user.password
                delete user.id
                delete user._id
                delete user.__v
                delete user.createdAt
                delete user.updatedAt


                return res.json({
                    user,
                    token: await Token.createToken(user)
                })
            })
            .catch(error => res.status(500).json({
                message: error.message,
                error
            }))


    },
    refreshToken: (req: Request, res: Response, next: NextFunction) => {
        let { username, password } = req.body
        if (username === 'admin' && password === 'password@') {
            return res.json({
                username,
                token: 'demo'
            })
        } else {
            return res.status(500).json({
                message: 'Username or Password not exits!'
            })
        }
    },
}