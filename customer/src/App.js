import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
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
import Testimonials from "./components/Root-Component/Home/Testimonials";
import FarmServices from './components/Root-Component/Services/Services';
import Payment from "./components/Root-Component/Payment/Payment";
import BentoGuestPage from "./components/Root-Component/Guest/GuestPage";
// import bgImage from "../src/assets/alpine-hut-3225908_1280.jpg"
const SplashScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-container">
            <video className="splash-video" autoPlay loop muted playsInline>
                <source src="https://cdn.pixabay.com/video/2022/06/10/119885-719283332_large.mp4" type="video/mp4" />
            </video>
            <div className="splash-overlay"></div>
            <div className="splash-content">
                <h1 className="splash-title">Happy Day at Mayi Farms</h1>
                    <p className="splash-text">Growing Sustainably, Living Naturally</p>
                    <p className="splash-text">From Our Farm to Your Family</p>
            </div>
        </div>
    );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <div style={{ position: "relative" }}>
        <Toaster position="top-center" reverseOrder={false} />

        {showSplash ? (
          <SplashScreen />
        ) : (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/:resortId/:roomType/:roomId/details"
                element={<ViewRoomDetails />}
              />
              <Route path="/rating-form/:resortId" element={<RatingForm />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/aboutus" element={<About />} />
              <Route
                path="/booking-summary/:resortname/:id"
                element={<BookingPage />}
              />
              <Route path="/gallery" element={<Gallary />} />
              <Route path="/events" element={<EventPage />} />
              <Route path="/spa" element={<Spa />} />
              <Route path="/our-properties" element={<OurProperties />} />
              <Route path="/:resortname/:id/rooms" element={<ViewDetails />} />
              <Route
                path="/:resortname/:id/rooms-table"
                element={<RoomTable />}
              />
              <Route path="/spa-details/:spaId" element={<SpaDetails />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/servies" element={<FarmServices />} />
              <Route path="/guestex" element={<BentoGuestPage />} />
              {/* Things to do */}
              <Route path="/north-goa" element={<NorthGoa />} />
              <Route path="/south-goa" element={<SouthGoa />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/" element={<Wedding />} />
              <Route
                path="/wedding-venue-details/:resortID/:resortName"
                element={<WeddingDetails />}
              />
              <Route path="/chat" element={<ChatArea />} />

              <Route path="/payment" element={<Payment />} />
            </Route>
          </Routes>
        )}
      </div>
    </Provider>
  );
}

export default App;
