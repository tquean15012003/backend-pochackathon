const { Education } = require('../models/index.js');

const createEducation = async (req, res) => {
    const { level, name, description } = req.body
    const education = {
        level,
        name,
        description,
        claimID: "",
    }
    try {
        const newEucation = await Education.create(education);
        res.status(201).send({
            message: "Create Education successfully",
            education: newEucation
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

const getEducationList = async (req, res) => {
    try {
        const educationList = await Education.findAll();
        res.status(200).send({
            message: "Get the Education list successfully",
            educationList
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getEducationDetail = async (req, res) => {
    const { id } = req.params
    try {
        const education = await Education.findOne({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Get the Education successfully",
            education
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateEducation= async (req, res) => {
    const { id } = req.params;
    const education = {
        level: req.body.level,
        name: req.body.name,
        description: req.body.description
    };
    try {
        const updatedEducation = await Education.findOne({
            where: {
                id
            }
        });
        updatedEducation.level = education.level;
        updatedEducation.name = education.name;
        updatedEducation.description = education.description;
        await updatedEducation.save();
        res.status(200).send({
            message: "Update the Education successfully",
            education: updatedEducation
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

const deleteEducation = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEducation= await Education.findOne({
            where: {
                id
            }
        });
        await Education.destroy({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Delete the Education successfully",
            education: deletedEducation
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createEducation,
    getEducationList,
    getEducationDetail,
    updateEducation,
    deleteEducation
}