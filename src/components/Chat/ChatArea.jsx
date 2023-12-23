/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer } from "react";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
// import { PiSpinnerGapBold } from "react-icons/pi";
import { AiOutlineArrowLeft } from "react-icons/ai";

// import useWindowDimensions from "../../../helpers/useWindowDimension";
import { FaWindowClose } from "react-icons/fa";

import { RiCustomerService2Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import "./Chat.css";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "../../helpers/axios";

// const initialState = {
//   isLoading: true,
//   message: "",
//   selectUser: {},
//   selectAdmin: false,
//   userList: [],
//   searchUser: "",
//   foundUsers: [],
//   selectChatId: [],
//   allUserIdMessages: [],
//   allMessages: [],
//   userDetails: {},
//   admin: [],
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     // case "SET_LOADING":
//     //   return { ...state, isLoading: action.payload };
//     case "SET_USER_DETAILS":
//       return { ...state, userDetails: action.payload };
//     case "SET_MESSAGE":
//       return { ...state, message: action.payload };
//     case "SET_SELECT_USER":
//       return { ...state, selectUser: action.payload };
//     case "SET_SELECT_ADMIN":
//       return { ...state, selectAdmin: action.payload };
//     case "SET_USER_LIST":
//       return { ...state, userList: action.payload };
//     case "SET_SEARCH_USER":
//       return { ...state, searchUser: action.payload };
//     case "SET_FOUND_USERS":
//       return { ...state, foundUsers: action.payload };
//     case "SET_SELECT_CHAT_ID":
//       return { ...state, selectChatId: action.payload };
//     case "SET_ALL_USER_ID_MESSAGES":
//       return { ...state, allUserIdMessages: action.payload };
//     case "SET_ALL_MESSAGES":
//       return { ...state, allMessages: action.payload };

//     case "SET_ADMIN":
//       return { ...state, admin: action.payload };
//     default:
//       return state;
//   }
// };

const ChatArea = () => {
  // const dummyRef = useRef();
  // const { width } = useWindowDimensions();
  const { userName, authorization: token } = JSON.parse(
    localStorage.getItem("user")
  );
  // const userName = localStorage.getItem("userName");
  // const userName = "userName";
  // const [isLoading, setIsLoading] = useState(true);
  //   const [messagesLoading, setMessageLoading] = useState(true);
  //   const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState("");
  const [selectUser, setSelectUser] = useState({});
  const [selectAdmin, setSelectAdmin] = useState(false);
  const [userList, setUserList] = useState([]);
  // const [userChat, setUser] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);

  const [selectChatId, setSelectChatId] = useState([]);

  const [activeUsers, setActiveUsers] = useState("");

  const [allMessages, setAllMessages] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  // const [state, dispatch] = useReducer(reducer, initialState);

  // get admin details
  const [admin, setAdmin] = useState([]);

  /*
   {
    userId, userName, userEmail
   }
   
   */

  // console.log(token);
  // console.log(userName, "users name");
  // const token = 0;
  const getAdminData = async () => {
    try {
      //step_01 search users
      // console.log(searchUser);
      const allUsersResponse = await axios.get(`/get-all-users`, {
        headers: { authorization: token },
      });

      if (!allUsersResponse.data.success) {
        console.error("Error fetching all users:", allUsersResponse.data.msg);
        return;
      }

      setUserDetails({ ...allUsersResponse.data });
      // dispatch({type:"SET_USER_DETAILS", payloade: { ...allUsersResponse.data } })
    } catch (err) {
      console.log(err.message);
    }
  };

  const searchUsers = async () => {
    try {
      // setIsLoading(true);
      const searchResponse = await axios.get("/search-user", {
        params: {
          search_user: searchUser,
        },

        headers: { authorization: token },
      });

      // console.log(searchResponse, "searchUser");

      if (searchResponse.data.success) {
        // setIsLoading(false);
        setFoundUsers(searchResponse.data.foundUsers.customers);
      } else {
        setFoundUsers([]);
        // console.error("Error searching users:", searchResponse.data.msg);
      }
    } catch (error) {
      // console.log(error.message);
    }
  };

  const getActiveUser = async () => {
    //step_02 active conversation
    // setIsLoading(true);
    try {
      const allUsers = await axios.get(
        "/all-active-conversations-admin",

        {
          headers: { authorization: token },
        }
      );

      // setIsLoading(false);

      // const activeUsers = allUsers.data
      // .filter((user) => user.latestMessage)
      // .map((user, i) => {
      //   return {
      //      user.users[i].userType === "customer" ? ...user.users[i].userId : ''
      //     userChatId: user._id,
      //     userType: user.users[1].userType,
      //   };
      // });

      const activeUsers = allUsers.data
        .filter((user) => user.latestMessage)
        .map((user) => {
          const customer = user.users.find((u) => u.userType === "customer");

          if (customer) {
            return {
              userChatId: user._id,
              userType: customer.userType,
              _id: customer.userId._id,
              name: customer.userId.name,
              email: customer.userId.email,
            };
          }

          return null; // If there is no customer in the users array
        })
        .filter((customer) => customer !== null);
      console.log(allUsers, "all users");
      console.log(activeUsers, "All active users");
      setUserList(activeUsers);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchData = async () => {
    // console.log(token);
    try {
      // setIsLoading(true);

      const accessId = await axios.post(
        "/get-access-to-conversation",
        {
          receiverId: selectUser?._id,
          userType: "customer",
        },
        {
          headers: { authorization: token },
        }
      );

      const inActiveUsers = {
        userData: accessId?.data?.chat?.users[1],
        userChatId: accessId?.data?.chat?._id,
      };
      // setActiveUsers(inActiveUsers);

      const activeUserChat = async () => {
        setSelectChatId(inActiveUsers?.userChatId);
        const userChats = await axios.get(`/chat/${inActiveUsers?.userChatId}`);

        // console.log(userChats, inActiveUsers, "single inActive user chat");

        // console.log(userChats?.data);
        setAllMessages([...userChats?.data]);
      };

      activeUserChat();

      // console.log(inActiveUsers?.userChatId, "from get active convertaion");
      // console.log(accessId.data, "serach user acess");
    } catch (err) {
      console.log(err.message);
      // setIsLoading(false);
    }
  };

  const fetchAllChats = async (id) => {
    try {
      //step_03 get all chat by using chat id

      const singleUser = userList.find((user) => {
        return user?._id === selectUser?._id;
      });

      setSelectChatId(singleUser?.userChatId);

      const userChats = await axios.get(`/chat/${singleUser?.userChatId}`);

      // console.log(userChats, singleUser, "single Active user chat");

      console.log(userChats?.data);
      setAllMessages([...userChats?.data]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleMessage = async (e) => {
    //    async (e) => {
    e.preventDefault();

    try {
      setMessage("");

      // console.log(selectChatId, "from message send handler");
      const sendMessageResponse = await axios.post(
        `/send-message`,
        {
          chatId: selectChatId,
          messageContent: message,
        },
        {
          headers: { authorization: token },
        }
      );

      console.log(sendMessageResponse, "send chat", selectChatId);

      // if (sendMessageResponse.data.success) {
      //   // Update the messages locally
      //   setAllMessages((prevMessages) => [
      //     ...prevMessages,
      //     sendMessageResponse.data.message,
      //   ]);
      // } else {
      //   console.error("Error sending message:", sendMessageResponse.data.msg);
      // }
      // console.log(selectChatId);
      // const res = await axios.post(
      //   "/new-message",
      //   {
      //     chatId: selectChatId,
      //     messageContent: message,
      //   },
      //   {
      //     headers: { authorization: token },
      //   }
      // );
      // setAllMessages([...allMessages, res.data]);
    } catch (err) {
      console.log(err);
    }
    getActiveUser();
    fetchData();
    fetchAllChats();
  };

  useEffect(() => {
    getAdminData();
    searchUsers();

    fetchData();
    getActiveUser();
    fetchAllChats();
  }, [searchUser]);

  // console.log(userList, "users");
  // console.log(userList?.admins, "admins data");

  // const userName = "admin";

  // const message2 = allMessages.map((message) => {
  //   console.log(message._id);
  // });
  // const allMessages = [];

  // console.log(userList, "users");
  // console.log(selectUser);

  useEffect(() => {
    // getActiveUser();
    fetchData();
    fetchAllChats();
    // const userChats = allUserIdMessages.find((user) => {
    //   return user.userId === selectUser._id;
    // });

    // console.log(allUserIdMessages, "chats");
    // console.log(selectUser._id, "selcetd user id");
    // console.log(userChats, "selcetd user id");
    // console.log()

    /*return {
                  userChats: userChats,
                  userId: ids.userId,
                }; */
    // if (chats?.userChats) {
    // console.log(userChats?.userChatId, "user chat Id");
    // setSelectChatId(userChats?.userChatId);
    // setAllMessages(userChats?.userChats?.data);
    // if (chats.userChats.length === 0) {
    //   set;
    // }
  }, [selectUser._id]);

  console.log(selectUser);

  // const handleUserSelection = (user) => {
  //   setSelectUser(user);
  //   setSelectAdmin(false);
  //   fetchAllChats(user);
  // };
  console.log(allMessages, "userMasaw");

  const combinedUsers = [
    ...new Map(
      [...foundUsers, ...userList].map((user) => [user._id, user])
    ).values(),
  ];

  return (
    <main className="chat_container">
      <section
        className={`group_1 ${
          Object.keys(selectUser).length !== 0
            ? "group_1_collaps"
            : "group_1_visible"
        }`}
      >
        <section
          className={`heading ${
            Object.keys(selectUser).length !== 0
              ? "heading_collaps"
              : "heading_visible"
          }
          `}
        >
          <div className="enter_person_header">
            <div className="header_container">
              <img
                // src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userName || "Logan Gravic"
                )}&size=150`}
                alt="person avatar"
                className="enter_person_img"
              />
              <div className="enter_person_details">
                <h3 className="enter_person_name">
                  {userName || "Logan Gravic"}
                </h3>
                {/* <p className="enter_person_designation">{userName.includes("user") ? "User" : "Admin"}</p> */}
              </div>
            </div>
            <button className="goback_home">
              <Link to={"/"}>
                <RiArrowGoBackFill className="icon_goback" />
              </Link>
            </button>
          </div>

          <div className="search_input">
            {/* <div className="menu_icon">
                <HiOutlineMenu className="outline_menu" />
              </div> */}

            <div class="icon_container">
              <svg
                style={{
                  width: "0.9rem",
                  height: "0.9rem",
                  color: "#718096",
                }}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>

            {/* <FiSearch className="search_icon" /> */}
            <input
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              type="text"
              placeholder="Search user"
              className="search_user"
            />
          </div>
        </section>

        <section
          className={`side_panel ${
            Object.keys(selectUser).length !== 0
              ? "side_panel_collaps"
              : "side_panel_visible"
          }`}
        >
          {/* <div
            onClick={() => {
              setSelectUser(admin);
              setSelectAdmin(true);
            }}
            className={`admin_area`}
          >
            <div className="help_desk_icon"></div>
            <RiCustomerService2Fill className="help_desk_icon" />
            <span style={{ fontSize: "1rem" }}>Help Desk</span>
          </div> */}
          {/* {[...foundUsers, ...userList].map((user) => ( */}
          {combinedUsers.map((user) => (
            <React.Fragment key={user?._id}>
              <div
                // key={user._id}
                onClick={() => {
                  setSelectUser(user);
                  // handleUserSelection(user);
                  // setSelectAdmin(false);
                }}
                className={"user_element"}
                // ; background-color: ;
                style={{
                  backgroundColor:
                    user._id === selectUser?._id
                      ? "rgb(165 243 252)"
                      : "transparent",
                  ":hover": {
                    backgroundColor:
                      user._id === selectUser?._id
                        ? "transparent"
                        : "rgb(241 245 249)",
                  },
                }}
              >
                <div
                  style={{
                    // backgroundImage: `url(${user?.profileImg})`,
                    backgroundImage: `url(${`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.userId?.name || user?.name
                    )}&size=150`})`,
                  }}
                  className="user_icon"
                ></div>
                <p className="user_containt">
                  <span className="user_name">
                    {user?.userId?.name || user?.name}
                  </span>
                  <span className="user_email">
                    {user?.userId?.email || user?.email}
                  </span>
                </p>
                <p className="user_type">{user?.userType || "customer"}</p>
              </div>
            </React.Fragment>
          ))}
        </section>
      </section>
      {/* Chat Section */}

      <section
        // style={{ backgroundSize: "500px auto", ...dynamicWidth }}
        className={`group_2 ${
          Object.keys(selectUser).length !== 0
            ? "group_2_visible"
            : "group_2_collaps"
        }`}
      >
        <section className="message_holding_container">
          <section className="heading_area">
            <AiOutlineArrowLeft
              onClick={() => setSelectUser({})}
              className="arrow_icon"
            />
            <div
              style={{
                backgroundImage: `url(${
                  selectAdmin
                    ? "https://e7.pngegg.com/pngimages/888/510/png-clipart-computer-icons-help-desk-technical-support-symbol-help-desk-icon-miscellaneous-silhouette-thumbnail.png"
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        selectUser.name
                      )}&size=150`
                })`,
              }}
              className="user_image"
            ></div>
            {/* <div
              style={{
                backgroundImage: `url(${
                  selectAdmin ? "admin_avatar_url" : selectUser.profileImg
                })`,
              }}
              className="user_image"
            ></div> */}
            <span
              className="user_heading_name"
              style={{ textTransform: "capitalize" }}
            >
              {/* {selectAdmin ? "Help" : selectUser.firstName || searchUser.name}
              {selectAdmin ? "Desk" : selectUser.lastName} */}
              {selectUser.name}
            </span>

            <p className="user_notation">{selectUser?.userType}</p>
          </section>
          {/* chat messages */}
          <section className="messages_container">
            <div
              className="messages_box"
              style={{ padding: "0 0 0 0.7rem", marginTop: "1.2rem" }}
            >
              {selectUser?.name &&
                allMessages?.map((message) => (
                  //userId: '643f8cc8bd56f74606209cf7'
                  //  console.log(message?.sender?._id === selectUser.id)
                  <div
                    key={message?._id}
                    style={{
                      marginLeft:
                        message?.sender?.userId === userDetails?.userId
                          ? "auto"
                          : "0",
                      marginRight:
                        message?.sender?.userId === userDetails?.userId
                          ? "0"
                          : "auto",
                      display: "flex",
                      justifyContent:
                        message?.sender?.userId === userDetails?.userId
                          ? "flex-end "
                          : "flex-start",
                      position: "relative",
                      width: "75%",
                    }}
                  >
                    <p
                      style={{
                        backgroundColor:
                          message?.sender?.userId === userDetails?.userId
                            ? "#4dc0b5"
                            : "#a0aec0",
                        width: "fit-content",
                        padding: "0.375rem 0.625rem 7px",
                        borderRadius: "0.375rem",
                        display: "inline-block",
                      }}
                    >
                      {message.messageContent}
                    </p>
                    <span
                      className={`absolute top-0 border-b-[20px]  ${
                        message?.sender?.firstName === selectUser.id
                          ? "border-b-cyan-200 border-r-[20px] border-r-transparent rotate-90 -right-2.5"
                          : "border-b-slate-200 border-l-[20px] border-l-transparent -rotate-90 -left-2.5"
                      }`}
                      style={{
                        position: "absolute",
                        top: 0,
                        borderBottom: "20px solid #yourColor",
                        ...(message?.sender?.firstName === selectUser.id
                          ? {
                              borderRight: "20px solid transparent",
                              borderLeft: "none",
                              transform: "rotate(90deg)",
                              right: "-2.5px",
                              left: "auto",
                            }
                          : {
                              borderRight: "none",
                              borderLeft: "20px solid transparent",
                              transform: "rotate(-90deg)",
                              right: "auto",
                              left: "-2.5px",
                            }),
                      }}
                    ></span>
                  </div>
                ))}
              {/* <div ref={dummyRef}></div> */}
            </div>
          </section>

          <form onSubmit={handleMessage} className="form_style">
            <div className="form_controll">
              <input
                value={message}
                type="text"
                placeholder="Type a message"
                className="input_style"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="form_submit">
                <IoIosSend className="send_icon" />
              </button>
            </div>
          </form>
        </section>
      </section>

      {/* <section className="background_element">
        <section className="person_profile">
          <div className="person_details">
            <div
              style={{
                backgroundImage: `url(${
                  selectAdmin
                    ? "https://e7.pngegg.com/pngimages/888/510/png-clipart-computer-icons-help-desk-technical-support-symbol-help-desk-icon-miscellaneous-silhouette-thumbnail.png"
                    : selectUser.profileImg
                })`,
              }}
              className="person_icon"
            ></div>
            <div className="person_name">
              <h3>
                {selectAdmin ? "Help" : selectUser.firstName || searchUser.name}
                {selectAdmin ? "Desk" : selectUser.lastName}
              </h3>
            </div>
          </div>

          <div className="person_extraDetails">
            <div className="person_extra">
              <div className="person_friends">
                <FaRegUser />
                <p className="friends">View Friends</p>
              </div>
              <div className="person_favorite">
                <FaRegHeart />
                <p className="favorite">Add to Favorite</p>
              </div>
            </div>
            <div className="person_attachment">
              <p className="person_text">Attachments</p>
              <div className="person_att_group">
                <div className="person_pdf">PDF</div>
                <div className="person_video">video</div>
                <div className="person_mp3">mp3</div>
                <div className="person_image">image</div>
              </div>
            </div>
          </div>
        </section>
      </section> */}
      {/* )} */}
    </main>
  );
};

export default ChatArea;
