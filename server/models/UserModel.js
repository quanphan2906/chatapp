const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        room: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const model = mongoose.model;
module.exports = model("User", UserSchema);
