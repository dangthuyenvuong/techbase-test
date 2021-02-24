import { Request, Response } from "express";
import User from 'models/User';
import { isValidObjectId } from "mongoose";

export default {
    index: async (req: Request, res: Response) => {
        res.json(await User.find({}).exec())
    },
    get: async (req: Request, res: Response) => {
        let user = null
        if (isValidObjectId(req.params.id)) {
            user = await User.findById(req.params.id).exec();
        }
        res.json(user)
    },
    update: async (req: Request, res: Response) => { },
    delete: async (req: Request, res: Response) => { },
}