/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
// import { PiSpinnerGapBold } from "react-icons/pi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "../../../helpers/axios";
import useWindowDimensions from "../../../helpers/useWindowDimension";
import { FaWindowClose } from "react-icons/fa";

import { RiCustomerService2Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import "./Chat.css";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ChatArea = () => {
  const dummyRef = useRef();

  const { userName, authorization: token } = JSON.parse(
    localStorage.getItem("user")
  );
  // const userName = localStorage.getItem("userName");
  // const userName = "userName";
  const [isLoading, setIsLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [selectUser, setSelectUser] = useState({});
  // const [selectAdmin, setSelectAdmin] = useState(false);
  const [userList, setUserList] = useState([]);
  // const [searchUser, setSearchUser] = useState("");
  const [selectChatId, setSelectChatId] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  // get admin details
  const [admin, setAdmin] = useState([]);

  const fetchData = async () => {
    // console.log(token);
    try {
      setIsLoading(true);

      //step_01 for user first get all data
      const response = await axios.get(`/get-all-users`, {
        headers: { authorization: token },
      });

      // setUserDetails({response.data.userId, response.data.userName, response.data.userEmail});
      console.log(response.data);

      if (response.data.success) {
        setUserDetails({ ...response.data });
        setUserList(response.data.data);
      }

      //step_02 for user set link to admin by sending his id and userType to
      // generating chat id or retriving id if they already in chat
      const accessId = await axios.post(
        "/get-access-to-conversation",
        {
          receiverId: response.data.data.admins[0]._id,
          userType: response.data.data.admins[0].userType,
        },
        {
          headers: { authorization: token },
        }
      );

      //for users
      // console.log(accessId.data.chat._id, "user chat Id with admin");

      setSelectChatId(accessId?.data?.chat?._id);

      const res2 = await axios.get(`/chat/${accessId?.data?.chat?._id}`);
      setAllMessages(res2.data);

      // console.log(accessId?.data?.chat?._id, "from get-acess api");
    } catch (err) {
      console.log(err.message);
      // setIsLoading(false);
    }
  };

  const fetchAllChats = async () => {
    try {
      //     // setAllMessages(res2.data);
      // console.log(selectChatId, "from chat api");
      //step_03 get all chat by using chat id
      // const res2 = await axios.get(`/chat/${selectChatId}`);
      // setAllMessages(res2.data);
      // setAllMessages([]);
      // console.log(res2, "chat of users");
      //     // console.log(res2, "chat of users");
      //     const res1 = await axios.get(
      //       //         "/access-chat",
      //       `all-active-conversations`,
      //       // `/chat/:chatId`
      //       // `/chat/643f8cc8bd56f74606209cf7`,
      //       // { userId: selectUser._id },
      //       {
      //         headers: {
      //           authorization: token,
      //         },
      //       }
      //     );
      //     console.log(res1, "all user Chat");
      //     console.log(res1.data[0]._id, "user chat id");
      //     // "657f677159f74b3d651a5a3f"
      //     setSelectChatId(res1.data[0]._id);
      //     const res2 = await axios.get(`/chat/${res1.data[0]._id}`);
      //     setAllMessages(res2.data);
      //     console.log(res2, "chat of users");
    } catch (err) {
      console.log(err);
    }
  };

  const handleMessage = async (e) => {
    //    async (e) => {
    e.preventDefault();

    // const senderName = userName || "admin";
    // console.log(message);

    // const messageContent = {
    //   sendername: senderName,
    //   message: message,
    // };

    setMessage("");
    try {
      setMessage("");

      //step_04 send message
      const res0 = await axios.post(
        `/send-message`,
        {
          chatId: selectChatId,
          messageContent: message,
        },
        {
          headers: { authorization: token },
        }
      );

      // console.log(res0, "send chat");
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
      // fetchAllChats();
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    // fetchAllChats();
  }, [selectUser]);

  console.log(userList);

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
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userName
                )}&size=150`}
                alt="person avatar"
                className="enter_person_img"
              />
              <div className="enter_person_details">
                <h3 className="enter_person_name">
                  {userName || "Logan Gravic"}
                </h3>
              </div>
            </div>
            <button className="goback_home">
              <Link to={"/"}>
                <RiArrowGoBackFill className="icon_goback" />
              </Link>
            </button>
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
          {/* {isLoading */}
          {/* {Array(10)
            .fill(0)
            .map((_, j) => (
              <div key={j} className="parent_element">
                <div className="pulse"></div>
                <p className="pulse_parent">
                  <span className="pulse_child"></span>
                  <span className="pulse_child_2"></span>
                </p>
              </div>
            ))} */}

          {/* :  */}

          {/* // {users.map((user) => ( */}
          {/* {(userName === "admin" ? userList?.customers : userList?.admins).map(
          (user) => ( */}
          {/* {userList?.customers?.map((user) => ( */}
          {userList?.admins?.map((user) => (
            <React.Fragment key={user?._id}>
              <div
                // key={user._id}
                onClick={() => {
                  setSelectUser(user);
                }}
                className={"user_element"}
                // ; background-color: ;
                style={{
                  backgroundColor: "rgb(165 243 252)",
                  // user._id === selectUser?._id
                  //   ? "rgb(165 243 252)"
                  //   : "transparent",
                  ":hover": {
                    backgroundColor: "transparent",
                    // user._id === selectUser?._id
                    //   ? "transparent"
                    //   : "rgb(241 245 249)",
                  },
                }}
              >
                <div
                  style={{
                    // backgroundImage: `url(${user.profileImg})`,
                    backgroundImage: `url(${`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name
                    )}&size=150`})`,
                  }}
                  className="user_icon"
                ></div>
                <p className="user_containt">
                  <span className="user_name">{user.name}</span>
                  <span className="user_email">{user.email}</span>
                </p>
                <p className="user_type">
                  {user.userType.slice(0, user.userType.length - 1)}
                </p>
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
          {userList?.admins?.map((user) => (
            <section className="heading_area" key={user._id}>
              <AiOutlineArrowLeft
                onClick={() => setSelectUser({})}
                className="arrow_icon"
              />
              <div
                style={{
                  backgroundImage: `url(${
                    user.name
                      ? // selectUser
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          "Test Admin 01"
                        )}&size=150`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          "admin"
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
                {/* {selectUser.name} */}

                {user.name}
              </span>

              <p className="user_notation">
                {/* {selectUser?.userType?.slice(
                  0,
                  selectUser?.userType?.length - 1
                )} */}
                {user.userType}
              </p>
            </section>
          ))}
          {/* chat messages */}
          <section className="messages_container">
            <div style={{ marginTop: "1.25rem" }}>
              {/* {selectUser.name && */}
              {allMessages.map((message) => (
                <div
                  key={message?._id}
                  style={{
                    marginLeft:
                      message?.sender?.userId === userDetails.userId
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
