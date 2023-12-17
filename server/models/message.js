const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
    sender: {
        userType: {
            type: String,
            enum: ["customer", "admin"]
        },
        userId: { type: mongoose.Schema.Types.ObjectId, refPath: "sender.userType" }
    },
    messageContent: String,
});

module.exports = mongoose.model("message", messageSchema);
