import express from 'express'
import controller from '../controllers/teamController'

const router = express.Router()

router.post('/create', controller.createTeam)
router.get('/get', controller.getAllTeam)

export = router