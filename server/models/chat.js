const mongoose = require("mongoose");

const chat = new mongoose.Schema({
    users: [
        {
            userType: {
                type: String,
                enum: ["customer", "admin"],
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: "users.userType",
            },
        },
    ],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "message" },
});

module.exports = mongoose.model("chat", chat);
