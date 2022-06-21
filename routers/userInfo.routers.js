const express = require('express');
const { updateClaimIDUserInfo, createUserInfo, getUserInfoList, getUserInfoDetail, updateUserInfo, deleteUserInfo } = require('../controllers/userInfo.controllers.js')

const userInfoRouter = express.Router();

userInfoRouter.post('/', createUserInfo)
userInfoRouter.get('/', getUserInfoList)
userInfoRouter.get('/:id', getUserInfoDetail)
userInfoRouter.put('/:id', updateUserInfo)
userInfoRouter.delete('/:id', deleteUserInfo)
userInfoRouter.put('/updateclaimid/:id', updateClaimIDUserInfo)
module.exports = {
    userInfoRouter
}