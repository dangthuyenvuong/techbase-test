

import express from 'express'
import controller from '../controllers/adminController'

const router = express.Router()



router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/refresh-token', controller.refreshToken)


export = router