const express = require('express');
const { signUp, logIn, getCompanyList, getAdminList} = require("../controllers/user.controllers.js");

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', logIn);

userRouter.get('/getcompanylist', getCompanyList)
userRouter.get('/getadminlist', getAdminList)

module.exports = {
    userRouter
}