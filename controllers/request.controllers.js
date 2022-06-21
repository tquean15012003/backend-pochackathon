const { Request } = require('../models/index.js');
const { apiKey, url } = require('../utils/settings.js');
const axios = require('axios');

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

const buildUnsignedVC = async (req, res) => {
    const request = req.body;
    const data = JSON.stringify({
        "type": "EducationCredentialPersonV1",
        "data": {
            "@type": [
                "Person",
                "PersonE",
                "EducationPerson"
            ],
            "name": `${request.name}`,
            "hasCredential": {
                "@type": "EducationalOcupationalCredential",
                "credentialCategory": "",
                "educationalLevel": "",
                "recognizedBy": {
                    "@type": [
                        "Organization",
                        "OrganizationE"
                    ],
                    "name": `${request.issuerName}`
                },
                "dateCreated": "",
                "url": ""
            }
        },
        "holderDid": `${request.holderDID}`
    });
    await axios({
        method: 'post',
        url: `https://affinity-issuer.prod.affinity-project.org/api/v1/vc/build-unsigned`,
        headers: {
            'Api-Key': `${apiKey}`,
            'Content-Type': 'application/json'
        },
        data: data
    }).then(function (response) {
        res.status(200).send(response.data);
    }).catch(function (error) {
        res.status(500).send(error);
    });
}

const signVC = async (req, res) => {
    const unsignedCredential = req.body
    const accessToken = req.header("Authorization")
    const data = JSON.stringify(unsignedCredential);
    await axios({
        method: 'post',
        url: `https://cloud-wallet-api.prod.affinity-project.org/api/v1/wallet/sign-credential`,
        headers: {
            'Api-Key': `${apiKey}`,
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        data: data
    }).then(function (response) {
        res.status(200).send(response.data);
    }).catch(function (error) {
        res.status(500).send(error);
    });
}

const storeVC = async (req, res) => {
    const signedCredential = req.body
    const accessToken = req.header("Authorization")
    const data = JSON.stringify(signedCredential);
    await axios({
        method: 'post',
        url: `https://cloud-wallet-api.prod.affinity-project.org/api/v1/wallet/credentials`,
        headers: {
            'Api-Key': `${apiKey}`,
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        data: data
    }).then(function (response) {
        res.status(200).send(response.data);
    }).catch(function (error) {
        res.status(500).send(error);
    });
}

const shareVC = async (req, res) => {
    const claimID = req.body
    const accessToken = req.header("Authorization")
    await axios({
        method: 'post',
        url: `https://cloud-wallet-api.prod.affinity-project.org/api/v1/wallet/credentials/${claimID.id}/share`,
        headers: {
            'Api-Key': `${apiKey}`,
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
    }).then(function (response) {
        console.log(response);
        res.status(200).send(response.data);
    }).catch(function (error) {
        res.status(500).send(error);
    });
}

const approveRequest = async (req, res) => {
    const data = req.body
    console.log(data)
    try {
        const approvedRequest = await Request.findOne({
            where: {
                id: data.id
            }
        });
        approvedRequest.isdone = "true";
        approvedRequest.claimID = data.claimID
        approvedRequest.link = data.sharingUrl
        await approvedRequest.save();
        res.status(200).send({
            message: "Approve the Request successfully",
            request: approvedRequest
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
    rejectRequest,
    buildUnsignedVC,
    signVC,
    storeVC,
    shareVC,
    approveRequest
}