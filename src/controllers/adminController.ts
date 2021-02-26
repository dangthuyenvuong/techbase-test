import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose'
import Token from "../models/token";
import Admin from "../models/admin";
import md5 from 'md5'
import IAdmin from '../interfaces/admin'
export default {
    login: async (req: Request, res: Response, next: NextFunction) => {
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

        if (user) {
            return res.status(500).json({
                message: 'User have exits!'
            })
        }

        let register = new Admin({ username, password: md5(password), _id: new mongoose.Types.ObjectId() })
        return register.save()
            .then(async (result: IAdmin) => {
                let user = JSON.parse(JSON.stringify(result))

                delete user.password
                delete user.id
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