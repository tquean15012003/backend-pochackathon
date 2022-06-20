const { UserUserInfo } = require('../models/index.js');

const createUserUserInfo = async (req, res) => {
    const { userID, userInfoID } = req.body
    const userUserInfo = {
        userID,
        userInfoID
    }
    try {
        const newUserUserInfo = await UserUserInfo.create(userUserInfo);
        res.status(201).send({
            message: "Create User User Info successfully",
            userUserInfo: newUserUserInfo
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

const getUserUserInfoList = async (req, res) => {
    try {
        const userUserInfoList = await UserUserInfo.findAll();
        res.status(200).send({
            message: "Get the User Info list successfully",
            userUserInfoList
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getUserUserInfoDetail = async (req, res) => {
    const { id } = req.params
    try {
        const userUserInfo = await UserUserInfo.findOne({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Get the User User Info successfully",
            userUserInfo
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getUserUserInfoDetailByUserID = async (req, res) => {
    const { id } = req.params
    try {
        const userUserInfo = await UserUserInfo.findOne({
            where: {
                userID: id
            }
        });
        res.status(200).send({
            message: "Get the User User Info successfully",
            userUserInfo
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateUserUserInfo = async (req, res) => {
    const { id } = req.params;
    const userUserInfo = {
        userID: req.body.userID,
        userInfoID: req.body.userInfoID
    };
    try {
        const updatedUserUserInfo = await UserUserInfo.findOne({
            where: {
                id
            }
        });
        updatedUserUserInfo.userID = userUserInfo.userID;
        updatedUserUserInfo.userInfoID = userUserInfo.userInfoID;
        await updatedUserUserInfo.save();
        res.status(200).send({
            message: "Update the User Info successfully",
            userUserInfo: updatedUserUserInfo
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

const deleteUserUserInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUserUserInfo = await UserUserInfo.findOne({
            where: {
                id
            }
        });
        await UserUserInfo.destroy({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Delete the User Info successfully",
            userUserInfo: deletedUserUserInfo
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createUserUserInfo,
    getUserUserInfoList,
    getUserUserInfoDetail,
    updateUserUserInfo,
    deleteUserUserInfo,
    getUserUserInfoDetailByUserID
}