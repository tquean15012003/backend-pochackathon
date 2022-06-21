const express = require('express');
const { userRouter } = require('./user.routers.js');
const { userInfoRouter } = require('./userInfo.routers.js')
const { userUserInfoRouter } = require('./userUserInfo.routers.js')
const { educationRouter } = require('./education.routers.js')
const { educationUserRouter } = require('./educationUser.routers.js')
const { requestRouter } = require("./request.routers.js")

const rootRouter = express.Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/userinfos', userInfoRouter)
rootRouter.use('/useruserinfos', userUserInfoRouter)
rootRouter.use('/educations', educationRouter)
rootRouter.use('/educationusers', educationUserRouter)
rootRouter.use('/requests', requestRouter)

module.exports = {
    rootRouter
}