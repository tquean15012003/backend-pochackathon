const express = require('express');
const { createUserUserInfo, getUserUserInfoList, getUserUserInfoDetail, updateUserUserInfo, deleteUserUserInfo, getUserUserInfoDetailByUserID } = require('../controllers/userUserInfo.controllers.js')

const userUserInfoRouter = express.Router();

userUserInfoRouter.post('/', createUserUserInfo)
userUserInfoRouter.get('/', getUserUserInfoList)
userUserInfoRouter.get('/:id', getUserUserInfoDetail)
userUserInfoRouter.get('/byuserid/:id', getUserUserInfoDetailByUserID)
userUserInfoRouter.put('/:id', updateUserUserInfo)
userUserInfoRouter.delete('/:id', deleteUserUserInfo)

module.exports = {
    userUserInfoRouter
}