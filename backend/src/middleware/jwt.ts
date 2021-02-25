import { NextFunction, Response } from "express"
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import User from '../models/user'

const TOKEN_EXPIRED = process.env.TOKEN_EXPIRED || '3600'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refreshToken'
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'tokenScret'

function cacheError(err: any, res: Response) {
    if (err instanceof TokenExpiredError) {
        return res.status(403).json({ error: 1, error_code: 'TOKEN_EXPIRED', message: 'Token was expired' });
    }

    if (err instanceof JsonWebTokenError) {
        return res.status(403).json({ error: 1, error_code: 'TOKEN_INVALID', message: 'Token Invalid' });
    }

    console.log(err)
    return res.sendStatus(403)
}


export default function JWTMiddleware(req: any, res: any, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)


    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err: any, user: any) => {
        if (err) return cacheError(err, res)
        user = await User.findOne({ username: user.username });

        if (user) {
            req.user = user;

            next()
        } else {
            return res.json({ error: 'User not exists' });
        }
    })
}