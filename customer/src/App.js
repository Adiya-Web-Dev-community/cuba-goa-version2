import "./App.css";

import { Routes, Route } from "react-router-dom";
import React from "react";
import { useState } from "react";
import Register from "./components/Root-Component/Register/Register";
import RatingForm from "./components/Root-Component/rating-form/RatingForm";
import MyBookings from "./components/Root-Component/my-bookings/MyBookings";
import ViewDetails from "./components/Root-Component/view-details/ViewDetails";
import Header from "./components/Header/Header";
import SpaDetails from "./components/Root-Component/spa/Spa-details";
import About from "./components/Root-Component/About/About";
import BookingPage from "./components/Root-Component/view-details/BookingPage/BookingPage";
import Gallary from "./components/Root-Component/Gallary/Gallary";
import TermsConditions from "./components/Root-Component/terms-conditions/TermsConditions";
import ViewRoomDetails from "./components/Root-Component/view-details/View-Room-Details/View-Room-Details";
import EventPage from "./components/Root-Component/event-page/EventPage";
import Spa from "./components/Root-Component/spa/Spa";
import Home from "./components/Root-Component/Home/Home";
//dates reducer , taking dates from home page
import { createStore } from "redux";
import { Provider } from "react-redux";

import OurProperties from "./components/Root-Component/OurProperties/OurProperties";
import ContactUs from "./components/Root-Component/Contact/ContactUs";
import SignIn from "./components/Root-Component/signin/Signin";
import WeddingDetails from "./components/Root-Component/wedding-venue-details/WeddingDetails";

import NorthGoa from "./components/Root-Component/things-to-do/NorthGoa";
import SouthGoa from "./components/Root-Component/things-to-do/SouthGoa";
import Activity from "./components/Root-Component/things-to-do/Activity";
import Wedding from "./components/Root-Component/destination-wedding/Wedding";
import { Toaster } from "react-hot-toast";
import RoomTable from "./components/Root-Component/view-details/RoomTable-With-Aminities/RoomTable";
import ChatArea from "./components/Root-Component/Chat/ChatArea";
import Layout from "./ui/Layout";
import { store } from "./components/reducer/store";

function App() {
  return (
    // <ChatArea />
    <Provider store={store}>
      <div style={{ position: "relative" }}>
        <Toaster position="top-center" reverseOrder={false} />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/:resortId/:roomType/:roomId/details"
              element={<ViewRoomDetails />}
            />
            <Route path="/rating-form/:resortId" element={<RatingForm />}>
              {" "}
            </Route>
            <Route path="/my-bookings" element={<MyBookings />}>
              {" "}
            </Route>
            <Route path="/aboutus" element={<About />}></Route>
            <Route
              path="/booking-summary/:resortname/:id"
              element={<BookingPage />}
            ></Route>
            <Route path="/gallery" element={<Gallary />}></Route>
            <Route path="/events" element={<EventPage />}></Route>
            <Route path="/spa" element={<Spa />}></Route>
            <Route path="/our-properties" element={<OurProperties />}></Route>
            <Route
              path="/:resortname/:id/rooms"
              element={<ViewDetails />}
            ></Route>
            <Route
              path="/:resortname/:id/rooms-table"
              element={<RoomTable />}
            ></Route>
            <Route path="/spa-details/:spaId" element={<SpaDetails />}></Route>
            <Route path="/contactus" element={<ContactUs />}></Route>
            <Route
              path="/terms-conditions"
              element={<TermsConditions />}
            ></Route>

            {/* things to do */}
            <Route path="/north-goa" element={<NorthGoa />}></Route>
            <Route path="/south-goa" element={<SouthGoa />}></Route>
            <Route path="/activity" element={<Activity />}></Route>
            <Route path="/activity" element={<Activity />}></Route>
            <Route path="/destination-wedding" element={<Wedding />}></Route>
            <Route
              path="/wedding-venue-details/:resortID/:resortName"
              element={<WeddingDetails />}
            ></Route>
            <Route path="/chat" element={<ChatArea />}></Route>
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
