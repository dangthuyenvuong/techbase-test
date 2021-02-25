import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import Team from '../models/team'

const createTeam = (req: Request, res: Response, next: NextFunction) => {
    let { name } = req.body
    const team = new Team({
        _id: new mongoose.Types.ObjectId(),
        name,
    })

    return team.save()
        .then(result => res.status(201).json({
            team: result
        }))
        .catch(error => res.status(500).json({
            message: error.message,
            error
        }))
}

const getAllTeam = (req: Request, res: Response, next: NextFunction) => {
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
}

export default { getAllTeam, createTeam }