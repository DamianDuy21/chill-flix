const mongoose_delete = require("mongoose-delete")
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    lastAccess: String,
    movie: {
        favorite: Array,
        watchLater: Array,
        history: Array,
    }
}, {
    timestamps: true
})
userSchema.plugin(mongoose_delete, { overrideMethods: "all" })
const User = mongoose.model("users", userSchema)

module.exports = User