const { EducationUser } = require('../models/index.js');

const createEducationUser = async (req, res) => {
    const { userID, educationID } = req.body
    const educationUser = {
        userID,
        educationID
    }
    try {
        const newEducationUser = await EducationUser.create(educationUser);
        res.status(201).send({
            message: "Create Education User successfully",
            educationUser: newEducationUser
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

const getEducationUserList = async (req, res) => {
    try {
        const userEducationUserList = await EducationUser.findAll();
        res.status(200).send({
            message: "Get the Education User list successfully",
            userEducationUserList
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getEducationUserDetail = async (req, res) => {
    const { id } = req.params
    try {
        const educationUser = await EducationUser.findOne({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Get the Education User successfully",
            educationUser
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getEducationUserDetailByUserID = async (req, res) => {
    const { id } = req.params
    try {
        const educationUserList = await EducationUser.findAll({
            where: {
                userID: id
            }
        });
        res.status(200).send({
            message: "Get the Education User successfully",
            educationUserList
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getEducationUserDetailByEducationID = async (req, res) => {
    const { id } = req.params
    try {
        const educationUser = await EducationUser.findOne({
            where: {
                educationID: id
            }
        });
        res.status(200).send({
            message: "Get the Education User successfully",
            educationUser
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateEducationUser= async (req, res) => {
    const { id } = req.params;
    const educationUser = {
        userID: req.body.userID,
        educationID: req.body.educationID
    };
    try {
        const updatedEducationUser = await EducationUser.findOne({
            where: {
                id
            }
        });
        updatedEducationUser.userID = educationUser.userID;
        updatedEducationUser.educationID = educationUser.educationID;
        await updatedEducationUser.save();
        res.status(200).send({
            message: "Update the Education User successfully",
            educationUser: updatedEducationUser
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

const deleteEducationUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEducationUser = await EducationUser.findOne({
            where: {
                id
            }
        });
        await EducationUser.destroy({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Delete the Education User successfully",
            educationUser: deletedEducationUser
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createEducationUser,
    getEducationUserList,
    getEducationUserDetail,
    updateEducationUser,
    deleteEducationUser,
    getEducationUserDetailByUserID,
    getEducationUserDetailByEducationID
}