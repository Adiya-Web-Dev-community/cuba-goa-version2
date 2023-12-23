import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Suspense } from "react";
import Footer from "./components/Root-Component/Footer/Footer";
import PostSpaData from "./components/Root-Component/postSpaData/PostSpaData";
import SpaDetailes from "./components/Root-Component/postSpaData/detailedSpa";
import BookingForm from "./components/Root-Component/BookingForm/BookingForm";
import ViewPropertyDetails from "./components/Root-Component/OurProperties/Property-Details/PropertyDetails";
import ViewBooking from "./components/Root-Component/Bookings/view-bookings";
import ClientList from "./components/Client/Client-List";
import PreLoader from "./components/Preloader-Component/Preloader-Component";
import PublicRoute from "./routes/publicRoutes";
import PrivateRoute from "./routes/privateRoutes";

const Layout = React.lazy(() =>
  import("./components/Root-Component/UI/Layout.jsx")
);
const Header = React.lazy(() => import("./components/Header/Header"));
const Home = React.lazy(() => import("./components/Root-Component/Home/Home"));
const About = React.lazy(() =>
  import("./components/Root-Component/About/About")
);
const Spa = React.lazy(() => import("./components/Root-Component/spa/Spa"));

const Resorts = React.lazy(() =>
  import("./components/Root-Component/Resorts/Resorts")
);
const OurProperties = React.lazy(() =>
  import("./components/Root-Component/OurProperties/OurProperties")
);
const ContactUs = React.lazy(() =>
  import("./components/Root-Component/Contact/ContactUs")
);
const Gallery = React.lazy(() =>
  import("./components/Root-Component/Gallery/Gallery")
);
const BookingPage = React.lazy(() =>
  import("./components/Root-Component/BookingPage/BookingPage")
);
const LogIn2 = React.lazy(() =>
  import("./components/Root-Component/LogIn2/Login2")
);
const LandingPage = React.lazy(() =>
  import("./components/Landing-Page/LandingPage.js")
);
const ShowInfoOfRoomCart = React.lazy(() =>
  import("./components/Root-Component/Home/ShowInfoOfRoomCart")
);
const LearnMore = React.lazy(() =>
  import("./components/Root-Component/Home/LearnMore")
);
const ClientDetails = React.lazy(() =>
  import("./components/Client/client-details")
);

const ChatArea = React.lazy(() => import("./components/Chat/ChatArea.jsx"));

function App() {
  return (
    <div style={{ position: "relative" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<PreLoader />}>
                <Layout />
              </Suspense>
            }
          >
            {/* PublicRoutes => */}
            <Route element={<PublicRoute />}>
              <Route
                path="/landing-page"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <LandingPage />
                  </Suspense>
                }
              ></Route>
            </Route>

            {/* PrivateRoutes => */}
            <Route element={<PrivateRoute />}>
              <Route
                path="/bookings"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <>
                      <ViewBooking />
                    </>
                  </Suspense>
                }
              />

              <Route
                index
                element={
                  <Suspense fallback={<PreLoader />}>
                    <>
                      {/* <Header /> */}
                      <Home />
                      {/* <Footer /> */}
                    </>
                  </Suspense>
                }
              />

              <Route
                path="/about"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <>
                      <Header />
                      <About />
                      <Footer />
                    </>
                  </Suspense>
                }
              />

              <Route
                path="/spa"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <>
                      <Header />
                      <Spa />
                      <Footer />
                    </>
                  </Suspense>
                }
              />

              <Route
                path="/our-properties/:name/:id"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <>
                      <Header />
                      <BookingPage />
                      <Footer />
                    </>
                  </Suspense>
                }
              />

              <Route
                path="/resorts"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <>
                      <Resorts />
                    </>
                  </Suspense>
                }
              />

              <Route
                path="/our-properties"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <>
                      <OurProperties />
                    </>
                  </Suspense>
                }
              />

              <Route
                path="/:resortname/:id/rooms"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <>
                      <Header />
                      <ViewPropertyDetails />
                      <Footer />
                    </>
                  </Suspense>
                }
              />

              <Route
                path="/contact-us"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <>
                      <Header />
                      <ContactUs />
                      <Footer />
                    </>
                  </Suspense>
                }
              />

              <Route
                path="/gallery"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <>
                      <Gallery />
                      <Footer />
                    </>
                  </Suspense>
                }
              />

              <Route
                path="/view-room-info/:id/:idChild"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <ShowInfoOfRoomCart />
                  </Suspense>
                }
              />

              <Route
                path="/leran-More"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <LearnMore />
                  </Suspense>
                }
              />

              <Route
                path="/addSpa"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <PostSpaData />
                  </Suspense>
                }
              />

              <Route
                path="/spa-details/:id"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <SpaDetailes />
                  </Suspense>
                }
              />

              <Route
                path="/booking-form"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <BookingForm />
                  </Suspense>
                }
              />

              <Route
                path="/client-details/:clientId"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <ClientDetails />
                  </Suspense>
                }
              />

              <Route
                path="/our-clients"
                element={
                  <Suspense fallback={<PreLoader />}>
                    <ClientList />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/chat"
              element={
                <Suspense fallback={<PreLoader />}>
                  <ChatArea />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
