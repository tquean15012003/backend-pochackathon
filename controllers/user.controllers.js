const { User } = require('../models/index.js');
const bcrypt = require('bcryptjs')
const { url, apiKey } = require('../utils/settings.js');
const axios = require('axios');

const signUp = async (req, res) => {
    // get data from frontend
    const { username, password, name, type } = req.body
    try {
        // call sign up api from affinidi
        const { data } = await axios({
            url: `${url}/users/signup`,
            method: "POST",
            headers: { "Api-Key": apiKey },
            data: {
                username,
                password
            }
        })
        // generate a random string
        const salt = bcrypt.genSaltSync(10);
        // encrypt random string + password
        const hashPassword = bcrypt.hashSync(password, salt);
        // create a new user in database
        const newUser = await User.create({
            username,
            password: hashPassword,
            name,
            type,
            did: data.did
        })
        // return data to frontend if suceedd
        res.status(200).send({
            message: "Sign up Successfully!",
            user: newUser
        });
    } catch (error) {
        // return error to frontend if not suceedd
        res.status(500).send(error);
    }
}

const logIn = async (req, res) => {
    // get data from frontend
    const { username, password, type } = req.body
    // find match username
    const user = await User.findOne({
        where: {
            username
        }
    })
    // match username
    if (user) {
        // check domain
        if (type === user.type) {
            // check match password
            const isAuth = bcrypt.compareSync(password, user.password)
            if (isAuth) {
                try {
                    // call log in api from affinidi
                    const { data } = await axios({
                        url: `${url}/users/login`,
                        method: "POST",
                        headers: { "Api-Key": apiKey },
                        data: {
                            username,
                            password
                        }
                    })
                    // return data to frontend if suceedd
                    res.status(200).send({
                        message: "Log in successfully!",
                        accessToken: data.accessToken,
                        did: data.did,
                        user
                    });
                }
                catch (error) {
                    // return error to frontend if not suceedd
                    res.status(500).send(error)
                }
            } else {
                // Incorrect password
                res.status(500).send({
                    message: "Incorrect password!"
                });
            }
        } else {
            // wrong domain
            res.status(500).send({
                message: "User does not exist in this domain!"
            });
        }
    } else {
        // does not match
        res.status(500).send({
            message: "User does not exist!"
        });
    }
}

const getCompanyList = async (req, res) => {
    try {
        // get company list from database
        const companyList = await User.findAll({
            where:{
                type: "company"
            }
        })
        // return data to frontend if suceedd
        res.status(200).send({
            message: "Get company list successfully!",
            companyList
        })
    } catch (error) {
        // return error to frontend if not suceedd
        res.status(500).send(error)
    }
}

const getAdminList = async (req, res) => {
    try {
        // get admin list from database
        const adminList = await User.findAll({
            where:{
                type: "admin"
            }
        })
        // return data to frontend if suceedd
        res.status(200).send({
            message: "Get admin list successfully!",
            adminList
        })
    } catch (error) {
        // return error to frontend if not suceedd
        res.status(500).send(error)
    }
}

module.exports = {
    signUp,
    logIn,
    getCompanyList,
    getAdminList
}