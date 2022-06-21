const express = require('express');
const { approveRequest, shareVC, storeVC, signVC, createRequest, getRequestListByHolderID, getRequestListByIssuerID, deleteRequest, rejectRequest, buildUnsignedVC } = require("../controllers/request.controllers.js");

const requestRouter = express.Router();

requestRouter.post('/', createRequest)
requestRouter.get('/byholderid/:id', getRequestListByHolderID)
requestRouter.get('/byissuerid/:id', getRequestListByIssuerID)
requestRouter.delete('/:id', deleteRequest)
requestRouter.put('/rejectrequest/:id', rejectRequest)
requestRouter.post('/buildunsignedvc', buildUnsignedVC)
requestRouter.post('/signvc', signVC)
requestRouter.post('/storevc', storeVC)
requestRouter.post('/sharevc', shareVC)
requestRouter.put('/approverequest', approveRequest)

module.exports = {
    requestRouter
}