import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import Team from '../models/team'
import { objExclude } from '../config/helper'

export default {
    getOne: (req: Request, res: Response, next: NextFunction) => {
        let { _id } = req.params

        Team.findOne({ _id }).populate('team')
            .then(result => {
                return res.status(200).json({
                    team: result,
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
        Team.find().exec()
            .then(result => {
                return res.status(200).json({
                    team: result,
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
        let { name } = req.body
        const team = new Team({
            ...req.body,
            _id: new mongoose.Types.ObjectId(),

        })

        return team.save()
            .then(result => res.status(201).json({
                team: result
            }))
            .catch(error => res.status(500).json({
                message: error.message,
                error
            }))
    },
    put: (req: Request, res: Response, next: NextFunction) => {
        let { _id } = req.params
        Team.updateOne({ _id }, {
            $set: objExclude(req.body, { _id: 1, createdAt: 1, updatedAt: 1 })
        }, { runValidators: true })
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
    delete: (req: Request, res: Response, next: NextFunction) => {
        let { _id } = req.params
        Team.deleteOne({ _id })
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
