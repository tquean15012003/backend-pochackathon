const { Request } = require('../models/index.js');

const createRequest = async (req, res) => { 
    const { requestType, holderID, issuerID, data, holderDID, identity } = req.body
    const request = {
        requestType,
        holderID,
        issuerID,
        data,
        holderDID,
        identity,
        isdone: "false",
        claimID: ""
    }
    try {
        const newRequest = await Request.create(request);
        res.status(201).send({
            message: "Create Request successfully",
            request: newRequest
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

const getRequestListByHolderID = async (req, res) => {
    const { id } = req.params
    try {
        const requestList = await Request.findAll({
            where: {
                holderID: id
            }
        });
        res.status(200).send({
            message: "Get the Request List successfully",
            requestList
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getRequestListByIssuerID = async (req, res) => {
    const { id } = req.params
    try {
        const requestList = await Request.findAll({
            where: {
                issuerID: id
            }
        });
        res.status(200).send({
            message: "Get the Request List successfully",
            requestList
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRequest = await Request.findOne({
            where: {
                id
            }
        });
        await Request.destroy({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Delete the Request successfully",
            request: deletedRequest
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const rejectRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const rejectedRequest = await Request.findOne({
            where: {
                id
            }
        });
        rejectedRequest.isdone = "true";
        await rejectedRequest.save();
        res.status(200).send({
            message: "Reject the Request successfully",
            request: rejectedRequest
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createRequest,
    getRequestListByHolderID,
    getRequestListByIssuerID,
    deleteRequest,
    rejectRequest
}