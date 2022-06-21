const express = require('express');
const { updateClaimIDEducation, createEducation, getEducationList, getEducationDetail, updateEducation, deleteEducation} = require('../controllers/education.controllers.js')

const educationRouter = express.Router();

educationRouter.post('/', createEducation)
educationRouter.get('/', getEducationList)
educationRouter.get('/:id', getEducationDetail)
educationRouter.put('/:id', updateEducation)
educationRouter.delete('/:id', deleteEducation)
educationRouter.put('/updateclaimid/:id', updateClaimIDEducation)

module.exports = {
    educationRouter
}