const aqp = require("api-query-params")
const User = require("../models/user.js")


const getAllUsers = async (req, res) => {
    let q = aqp(req.query)
    let page = q.filter.page || 1
    let limit = q.limit || 10
    let skip = (page - 1) * limit
    if (q.filter.page) {
        delete q.filter.page
    }
    let data = await User.find(q.filter).skip(skip).limit(limit).exec()
    return res.status(200).json({
        ec: 0,
        data: data
    })
}

const addUser = async (req, res) => {
    let user = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        createdAt: req.body.createdAt,
        lastAccess: req.body.lastAccess
    }
    const data = await User.create(user)
    return res.status(200).json({
        ec: 0,
        data: data
    })
}
const editUser = async (req, res) => {
    const data = await User.findOneAndUpdate({ _id: req.body._id }, {
        username: req.body.username,
        password: req.body.password,
        lastAccess: req.body.lastAccess,
        movie: req.body.movie,
    })
    return res.status(200).json({
        ec: 0,
        data: data
    })
}

const deleteUser = async (req, res) => {
    const data = await User.delete({ _id: req.query._id })
    return res.status(200).json({
        ec: 0,
        data: data
    })
}

module.exports = { getAllUsers, addUser, editUser, deleteUser }