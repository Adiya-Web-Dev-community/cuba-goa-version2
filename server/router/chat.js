const router = require("express").Router();
// middleware
const middleware = require("../middleware/common");
// model
const Admin = require("../models/admin-accounts");
const Customer = require("../models/customer-accounts");
const { findByIdAndUpdate } = require("../models/chat");
const Chat = require("../models/chat");
const Message = require("../models/message");
const { ObjectId } = require("mongoose").Types;

const { default: mongoose } = require("mongoose");
// serach user
router.get("/search-user", middleware, async (req, resp) => {
  const { search_user } = req.query;
  if (!search_user) {
    return resp.json({ success: false, msg: "No user" });
  }
  try {
    const user = new RegExp(search_user, "i");
    const findCustomers = await Customer.find({
      $or: [{ email: user }, { name: user }],
      _id: { $ne: req.accountId },
    });
    const findAdmins = await Admin.find({
      $or: [{ email: user }, { name: user }],
      _id: { $ne: req.accountId },
    });

    const foundUsers = {
      customers: findCustomers,
      admins: findAdmins,
    };
    if (findCustomers.length || findAdmins.length) {
      return resp.json({ success: true, foundUsers });
    }

    return resp.json({
      success: false,
      msg: "No search results",
      foundUsers,
    });
  } catch (err) {
    return resp.json({ success: false, msg: err.message });
  }
});

// get existing conversations
router.get("/all-active-conversations", middleware, async (req, resp) => {
  console.log(req.accountId);
  try {
    const activeChats = await Chat.find({
      "users.userId": req.accountId,
      "users.userType": { $in: ["customer", "admin"] },
    }).populate({
      path: "users.userId",
      model: req.userType,
      select: "name email",
    });
    resp.send(activeChats);
  } catch (err) {
    resp.send(err.message);
  }
});

router.get("/all-active-conversations-admin", middleware, async (req, resp) => {
  console.log(req.accountId);
  try {
    // console.log(req.userType);

    const activeChats = await Chat.find({
      "users.userId": req.accountId,
      "users.userType": { $in: ["customer", "admin"] },
    }).populate({
      path: "users.userId",
      model: "customers",
      select: "name email",
    });
    resp.send(activeChats);
  } catch (err) {
    console.log(err);
    resp.send(err.message);
  }
});

// open chat if not existing create new
router.post("/get-access-to-conversation", middleware, async (req, resp) => {
  const { receiverId, userType } = req.body;
  if (!receiverId) {
    return resp.send("no user selected");
  }
  try {
    // check if chat exist
    const isChat = await Chat.findOne({
      users: {
        $all: [
          {
            $elemMatch: {
              userType: { $in: ["customer", "admin"] },
              userId: req.accountId,
            },
          },
          {
            $elemMatch: {
              userType: { $in: ["customer", "admin"] },
              userId: receiverId,
            },
          },
        ],
      },
    });
    // chat exixt
    if (isChat) {
      console.log(isChat);
      return resp.json({ msg: "chat exist", chat: isChat });
    }
    // new chat
    const newChat = await Chat.create({
      users: [
        {
          userType: req.userType,
          userId: req.accountId,
        },
        {
          userType: userType,
          userId: receiverId,
        },
      ],
    });
    return resp.json({ msg: "new chat", chat: newChat });
  } catch (err) {
    return resp.send(err.message);
  }
});

// get chat messages
router.get("/chat/:chatId", async (req, resp) => {
  console.log(req.params);
  try {
    const chatMessages = await Message.find({
      chat: req.params.chatId,
    }).populate("sender", "name");
    console.log(chatMessages);
    resp.send(chatMessages);
  } catch (err) {
    resp.send(err);
  }
});

//send message

router.post("/send-message", middleware, async (req, resp) => {
  const { chatId, messageContent } = req.body;
  if (!messageContent) {
    return resp
      .status(400)
      .send("Cannot send empty message or missing sender ID");
  }
  const senderId = req.accountId;
  try {
    const newMessage = {
      chat: chatId,
      sender: {
        userType: req.userType,
        userId: senderId,
      },
      messageContent: messageContent,
    };

    const message = await Message.create(newMessage);

    const populatedMessage = await Message.findById(message._id).populate(
      "sender"
    );

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: populatedMessage,
    });

    console.log("populated message", populatedMessage);
    resp.json(populatedMessage);
  } catch (err) {
    console.error(err);
    resp.status(500).send("Error creating and populating message");
  }
});

//get all users (admin and customer)
router.get("/get-all-users", middleware, async (req, resp) => {
  try {
    let user;
    if (req.userType === "admin") {
      user = await Admin.findById(req.accountId);
    } else if (req.userType === "customer") {
      user = await Customer.findById(req.accountId);
    }

    const customerData = await Customer.find({});
    const adminData = await Admin.find({});
    const foundUsers = {
      customers: customerData,
      admins: adminData,
    };

    resp.status(200).json({
      success: true,
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      data: foundUsers,
    });
  } catch (error) {
    resp.status(400).json({
      success: false,
      msg: error.message,
    });
  }
});

module.exports = router;
