const express = require("express")
const { getAllUsers, addUser, editUser, deleteUser } = require("../controllers/userController")

const userRouter = express.Router()

userRouter.get("/users", getAllUsers)
userRouter.post("/user", addUser)
userRouter.put("/user", editUser)
userRouter.delete("/user", deleteUser)


module.exports = userRouter