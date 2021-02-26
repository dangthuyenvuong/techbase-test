import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import mongoose, { Model, Schema } from "mongoose";
import { IToken } from "../interfaces/token";
import IAdmin from '../interfaces/admin';
import User from './user'

const TOKEN_EXPIRED = process.env.TOKEN_EXPIRED || '3600000'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refreshToken'
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'tokenScret'

export const TokenSchema = new Schema<IToken, ITokenModel>({
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    expiredIn: { type: Number },
    expiredAt: { type: Number },
    tokenType: {
        type: String,
        enum: ['jwt'],
        default: 'jwt'
    },
}, {
    timestamps: true
})

TokenSchema.statics.createToken = async function (user: IAdmin) {

    let expiredAt = new Date()


    expiredAt.setMilliseconds(expiredAt.getMilliseconds() + parseInt(TOKEN_EXPIRED))

    // let accessToken = generateAccessToken({ _id, email, rule: [], expired_at: expired_at.getTime(), expired_in: parseInt(this.expiresIn) })
    let accessToken = jwt.sign({ user }, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXPIRED });
    let refreshToken = jwt.sign({ user }, REFRESH_TOKEN_SECRET);

    let result = new this({
        accessToken,
        refreshToken,
        user: user._id,
        expiredAt: expiredAt.getTime(),
        expiredIn: parseInt(TOKEN_EXPIRED)
    })

    let token = await result.save();

    return token;
}

export interface ITokenModel extends Model<IToken> {
    createToken(user: IAdmin): Promise<IToken>
}

export default mongoose.model<IToken, ITokenModel>('token', TokenSchema)
