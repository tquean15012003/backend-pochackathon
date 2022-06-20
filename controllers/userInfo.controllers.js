const { UserInfo } = require('../models/index.js');

const createUserInfo = async (req, res) => {
    const { name, contact, location } = req.body
    const userInfo = {
        name,
        contact,
        location,
        isVerified: "false",
    }
    try {
        const newUserInfo = await UserInfo.create(userInfo);
        res.status(201).send({
            message: "Create User Info successfully",
            userInfo: newUserInfo
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

const getUserInfoList = async (req, res) => {
    try {
        const userInfoList = await UserInfo.findAll();
        res.status(200).send({
            message: "Get the User Info list successfully",
            userInfoList
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getUserInfoDetail = async (req, res) => {
    const { id } = req.params
    try {
        const userInfo = await UserInfo.findOne({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Get the User Info successfully",
            userInfo
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateUserInfo = async (req, res) => {
    const { id } = req.params;
    const userInfo = {
        name: req.body.name,
        contact: req.body.contact,
        location: req.body.location
    };
    try {
        const updatedUserInfo = await UserInfo.findOne({
            where: {
                id
            }
        });
        updatedUserInfo.name = userInfo.name;
        updatedUserInfo.contact = userInfo.contact;
        updatedUserInfo.location = userInfo.location;
        await updatedUserInfo.save();
        res.status(200).send({
            message: "Update the User Info successfully",
            userInfo: updatedUserInfo
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

const deleteUserInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUserInfo = await UserInfo.findOne({
            where: {
                id
            }
        });
        await UserInfo.destroy({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Delete the User Info successfully",
            userInfo: deletedUserInfo
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createUserInfo,
    getUserInfoList,
    getUserInfoDetail,
    updateUserInfo,
    deleteUserInfo
}