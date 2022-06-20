const express = require('express');
const { userRouter } = require('./user.routers.js');
const { userInfoRouter } = require('./userInfo.routers.js')
const { userUserInfoRouter } = require('./userUserInfo.routers.js')

const rootRouter = express.Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/userinfos', userInfoRouter)
rootRouter.use('/useruserinfos', userUserInfoRouter)
module.exports = {
    rootRouter
}