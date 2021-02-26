import express from 'express'
import controller from '../controllers/teamController'
import JWTMiddleware from '../middleware/jwt'

const router = express.Router()

router.get('/', controller.get)
router.get('/:_id', controller.getOne)
router.post('/', JWTMiddleware, controller.post)
router.put('/:_id', JWTMiddleware, controller.put)
router.delete('/:_id', JWTMiddleware, controller.delete)

export = router