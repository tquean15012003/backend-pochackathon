const express = require('express');
const { createUserInfo, getUserInfoList, getUserInfoDetail, updateUserInfo, deleteUserInfo } = require('../controllers/userInfo.controllers.js')

const userInfoRouter = express.Router();

userInfoRouter.post('/', createUserInfo)
userInfoRouter.get('/', getUserInfoList)
userInfoRouter.get('/:id', getUserInfoDetail)
userInfoRouter.put('/:id', updateUserInfo)
userInfoRouter.delete('/:id', deleteUserInfo)

module.exports = {
    userInfoRouter
}