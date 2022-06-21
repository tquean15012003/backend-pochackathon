const express = require('express');
const { createRequest, getRequestListByHolderID, getRequestListByIssuerID, deleteRequest, rejectRequest } = require("../controllers/request.controllers.js");

const requestRouter = express.Router();

requestRouter.post('/', createRequest)
requestRouter.get('/byholderid/:id', getRequestListByHolderID)
requestRouter.get('/byissuerid/:id', getRequestListByIssuerID)
requestRouter.delete('/:id', deleteRequest)
requestRouter.put('/rejectrequest/:id', rejectRequest)

module.exports = {
    requestRouter
}