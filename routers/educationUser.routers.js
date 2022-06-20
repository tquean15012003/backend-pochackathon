const express = require('express');
const { getEducationUserDetailByEducationID, createEducationUser, getEducationUserList, getEducationUserDetail, updateEducationUser, deleteEducationUser, getEducationUserDetailByUserID } = require('../controllers/educationUser.controllers.js')

const educationUserRouter = express.Router();

educationUserRouter.post('/', createEducationUser)
educationUserRouter.get('/', getEducationUserList)
educationUserRouter.get('/:id', getEducationUserDetail)
educationUserRouter.get('/byuserid/:id', getEducationUserDetailByUserID)
educationUserRouter.get('/byeducationid/:id', getEducationUserDetailByEducationID)
educationUserRouter.put('/:id', updateEducationUser)
educationUserRouter.delete('/:id', deleteEducationUser)

module.exports = {
    educationUserRouter
}