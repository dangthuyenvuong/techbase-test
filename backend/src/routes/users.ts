import express from 'express'
import UserController from 'controllers/UserController'
// var express = require('express');
var router = express.Router();
// const UserController = require('../controllers/UserController')


/* GET users listing. */
router.get('/', UserController.index);
router.get('/:id', UserController.get)
router.put('/:id')


export default router;
