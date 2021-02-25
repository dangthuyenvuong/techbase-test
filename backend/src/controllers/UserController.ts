import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import User from '../models/user';
import mongoose from "mongoose";
import { objExclude } from "../config/helper";
import Token from "../models/token";

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
    getOne: (req: Request, res: Response, next: NextFunction) => {
        let { _id } = req.params

        User.findOne({ _id }).populate('team')
            .then(result => {
                return res.status(200).json({
                    user: result,
                })
            })
            .catch(error => {
                return res.status(500).json({
                    message: error.message,
                    error
                })
            })
    },
    get: (req: Request, res: Response, next: NextFunction) => {
        User.find().populate('team').exec()
            .then(result => {
                return res.status(200).json({
                    user: result,
                    count: result.length
                })
            })
            .catch(error => {
                return res.status(500).json({
                    message: error.message,
                    error
                })
            })
    },
    post: (req: Request, res: Response, next: NextFunction) => {
        const user = new User({
            ...req.body,
            _id: new mongoose.Types.ObjectId(),

        })

        return user.save()
            .then(result => res.status(201).json({
                user: result
            }))
            .catch(error => res.status(500).json({
                message: error.message,
                error
            }))
    },
    put: (req: Request, res: Response, next: NextFunction) => {
        let { _id } = req.params

        User.updateOne({ _id }, {
            $set: objExclude(req.body, { createdAt: 1, updatedAt: 1 })
        }, { runValidators: true })
            .then(result => {
                res.status(200).json({
                    User: result
                })
            }).catch(error => {
                return res.status(500).json({
                    message: error.message,
                    error
                })
            })
    },
    delete: (req: Request, res: Response, next: NextFunction) => {
        let { _id } = req.params
        User.deleteOne({ _id })
            .then(result => {
                res.status(200).json({
                    team: result
                })
            }).catch(error => {
                return res.status(500).json({
                    message: error.message,
                    error
                })
            })
    },
}