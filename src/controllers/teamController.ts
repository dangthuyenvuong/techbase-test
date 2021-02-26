import { NextFunction, Request, Response } from 'express'
import Team from '../models/team'
import AbstractController from '../core/AbstractController'

class Controller extends AbstractController {
    constructor() {
        super(Team)
    }
}

export default new Controller()