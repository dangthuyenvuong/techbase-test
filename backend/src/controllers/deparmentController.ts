import { NextFunction, Request, Response } from "express";
import Department from '../models/department';
import mongoose from "mongoose";
import { objExclude } from "../config/helper";

export default {
    getOne: (req: Request, res: Response, next: NextFunction) => {
        let { _id } = req.params

        Department.findOne({ _id }).populate('team')
            .then(result => {
                return res.status(200).json({
                    department: result,
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
        Department.find().exec()
            .then(result => {
                return res.status(200).json({
                    department: result,
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
        const department = new Department({
            ...req.body,
            _id: new mongoose.Types.ObjectId(),

        })

        return department.save()
            .then(result => res.status(201).json({
                department: result
            }))
            .catch(error => res.status(500).json({
                message: error.message,
                error
            }))
    },
    put: (req: Request, res: Response, next: NextFunction) => {
        let { _id } = req.params

        Department.updateOne({ _id }, {
            $set: objExclude(req.body, { createdAt: 1, updatedAt: 1 })
        }, { runValidators: true })
            .then(result => {
                res.status(200).json({
                    department: result
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
        Department.deleteOne({ _id })
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
    }
}