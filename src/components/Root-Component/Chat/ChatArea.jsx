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
  // const { width } = useWindowDimensions();
  const { userName, authorization: token } = JSON.parse(
    localStorage.getItem("user")
  );
  // const userName = localStorage.getItem("userName");
  // const userName = "userName";
  const [isLoading, setIsLoading] = useState(true);
  //   const [messagesLoading, setMessageLoading] = useState(true);
  //   const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState("");
  const [selectUser, setSelectUser] = useState({});
  const [selectAdmin, setSelectAdmin] = useState(false);
  const [userList, setUserList] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [selectChatId, setSelectChatId] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  // get admin details
  const [admin, setAdmin] = useState([]);

  /*
   {
    userId, userName, userEmail
   }
   
   */

  // console.log(userName, "users name");
  // const token = 0;
  // const getAdminData = async () => {
  //   try {
  //     // const resp = await axios.get("/admin-details");
  //     // search_user
  //     const resp1 = await axios.get(
  //       "/search-user",
  //       {
  //         params: {
  //           search_user: searchUser,
  //         },
  //       },
  //       { headers: { authorization: token } }
  //     );
  //     console.log(resp1, "searchUser");

  //     const resp2 = await axios.get(
  //       "/all-active-conversations",

  //       { headers: { authorization: token } }
  //     );
  //     const filterCoustemerData = resp2.data.filter(
  //       (user) => user.users[0].userType === "customer"
  //     );

  //     console.log(resp2);
  //     console.log(filterCoustemerData, "filter customer Data");

  //     // console.log("admin detail", resp.data[0]);
  //     // setAdmin(...filterCoustemerData);

  //     // const accessId = await axios.post(
  //     //   "/get-access-to-conversation",
  //     //   {
  //     //     receiverId: response.data.data.admins[0]._id,
  //     //     userType: response.data.data.admins[0].userType.slice(
  //     //       0,
  //     //       response.data.data.admins[0].userType.length - 1
  //     //     ),
  //     //   },
  //     //   {
  //     //     headers: { authorization: token },
  //     //   }
  //     // );
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // useEffect(() => {
  //   getAdminData();
  // }, []);
  //?search=${searchUser}
  // fetch users
  ///search-user?search_user=demo

  //   const fetchAcess =async()=>{
  //     try{

  // })
  //     }catch(){

  //     }
  //   }

  //for users
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

      // console.log(
      //   response.data.data.admins[0].userType.slice(
      //     0,
      //     response.data.data.admins[0].userType.length - 1
      //   )
      // );

      //for users
      // console.log(accessId.data.chat._id, "user chat Id with admin");

      setSelectChatId(accessId?.data?.chat?._id);

      console.log(accessId?.data?.chat?._id, "from get-acess api");

      // console.log(data, "people of chats");
      // const filterUser = await axios.get(
      //   `/search-user?search_user=${searchUser}`
      // );

      // console.log(filterUser.data);
      // setUserList(data);
      // setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      // setIsLoading(false);
    }
  };

  const fetchAllChats = async () => {
    try {
      //     // setAllMessages(res2.data);
      console.log(selectChatId, "from chat api");
      //step_03 get all chat by using chat id
      const res2 = await axios.get(`/chat/${selectChatId}`);
      setAllMessages(res2.data);
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
    } catch (err) {
      console.log(err);
    }

    fetchAllChats();
  };

  useEffect(() => {
    fetchData();
  }, [searchUser]);
  useEffect(() => {
    fetchAllChats();
  }, [selectUser]);
  //   useEffect(() => {
  //     dummyRef?.current?.scrollIntoView();
  //   }, [allMessages]);

  // const users = [
  //   {
  //     _id: "1",
  //     firstName: "John",
  //     lastName: "Doe",
  //     email: "john.doe@example.com",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcuNsgCIWPOs6hgEKQ3w_D6ehKS_IkcM_5u5f7x4qAGCJrOJVgkDFoBpytVa8wJY2l5O4&usqp=CAU",
  //   },
  //   {
  //     _id: "2",
  //     firstName: "Jane",
  //     lastName: "Smith",
  //     email: "jane.smith@example.com",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFA9bLSF5x5jPFcYFikCLaNrFel6C8FfJpeyQYhmG-Xuc3yhuTYprL3iQApDAoc-5nZ28&usqp=CAU",
  //   },
  //   {
  //     _id: "3",
  //     firstName: "Alice",
  //     lastName: "Johnson",
  //     email: "alice.johnson@example.com",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg5YRm43jkx-7W2Cp-EiUF4XJI-edcJbkSr72uNMNv4MKCNODaxv_a7x0sHUsAVcp31N8&usqp=CAU",
  //   },
  //   {
  //     _id: "4",
  //     firstName: "Bob",
  //     lastName: "Anderson",
  //     email: "bob.anderson@example.com",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpRfpo86SB6nHTlhI0FZFHPbdDb-y_QKJuvx6ugVdIEn1chvgrONhKsaG_spVs9sxjv84&usqp=CAU",
  //   },
  //   {
  //     _id: "5",
  //     firstName: "Eva",
  //     lastName: "Williams",
  //     email: "eva.williams@example.com",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf4kXNbNfsbtjpqJyzCJyGmOnzUdIJK2b_-UpxW4M900Yug_WqJO2UA2R9gYq8gTcLYlg&usqp=CAU",
  //   },
  //   {
  //     _id: "6",
  //     firstName: "Mike",
  //     lastName: "Taylor",
  //     email: "mike.taylor@example.com",
  //     profileImg:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGJPxvhV4u_WpRUlvawm9YpDkbtL0d8D2FlZ6HgC5JcoeHfqR-FmG0eWyeLfbATOv2EU&usqp=CAU",
  //   },
  // ];
  // console.log(userList, "users");
  // console.log(userList?.admins, "admins data");

  // const userName = "admin";

  // const message2 = allMessages.map((message) => {
  //   console.log(message._id);
  // });
  // const allMessages = [];

  // console.log(userList?.admins[0]?.name, "admin only user");

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
                  userName
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
          {/* {userName === "admin" && (
            <div className="search_input">
              

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

             
              <input
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                type="text"
                placeholder="Search user"
                className="search_user"
              />
            </div>
          )} */}
          {/* <FaWindowClose
           
            className="close_icon"
          /> */}
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
                  setSelectAdmin(false);
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
          <section className="heading_area">
            <AiOutlineArrowLeft
              onClick={() => setSelectUser({})}
              className="arrow_icon"
            />
            <div
              style={{
                backgroundImage: `url(${
                  selectUser
                    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
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
              {selectUser.name}
            </span>

            <p className="user_notation">
              {selectUser?.userType?.slice(0, selectUser?.userType?.length - 1)}
            </p>
          </section>
          {/* chat messages */}
          <section className="messages_container">
            <div style={{ marginTop: "1.25rem" }}>
              {selectUser.name &&
                allMessages.map((message) => (
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
