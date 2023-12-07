import React, { useEffect } from "react";
import "./EventPage.css";
import { Icon } from "react-icons-kit";
import { location2 } from "react-icons-kit/icomoon/location2";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import EnquiryForm from "../wedding-venue-details/EnquiryForm";

const EventPage = () => {
  const navigate = useNavigate();
  const eventArr = [
    {
      eventName: "GALA PARTY",
      eventTitle:
        "Step into a World of Glamour and Elegance at Our Spectacular Gala Party",
      eventDescription:
        "Experience the splendour of a romantic beach wedding at our magnificent resort. Our resort, which is tucked away on the picturesque coastline, offers the ideal setting for your big day. Imagine taking your vows as the sun is sinking over the dazzling ocean, with the sound of the waves gently breaking in the backdrop. From custom event planning to arranging stunning beachside ceremonies and celebrations, our committed wedding team will help you at every turn. Our resort offers opulent lodging, mouthwatering cuisine options, and unmatched service to ensure an amazing beach wedding experience whether you want a small gathering or a large celebration. Allow us to realise your idea and provide priceless memories that will last a lifetime. To begin planning, call us right now.",
      eventStartDate: "",
      eventEndDate: "",
      eventImage:
        "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      eventName: "BEACH WEDDINGS",
      eventTitle: " Celebrate Love by the Shore",
      eventDescription:
        "Our gala parties are hosted at the most prestigious venues, offering a captivating backdrop that sets the stage for an unforgettable evening. From luxurious ballrooms to stunning outdoor locations, our chosen venues exude elegance and sophistication, creating an ambiance that elevates the entire experience.Be captivated by world-class entertainment that takes center stage throughout the night. From captivating live bands and mesmerizing dance performances to awe-inspiring acrobats and renowned DJs, our gala party showcases talent that leaves you spellbound and ensures that the dance floor remains alive with energy.",
      eventStartDate: "",
      eventEndDate: "",
      eventImage:
        "https://images.pexels.com/photos/169211/pexels-photo-169211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },

    {
      eventName: "BIRTHDAY",
      eventTitle:
        "Celebrate Your Special Day in Style with Professional Birthday Organizers",
      eventDescription:
        "Our creative geniuses excel in designing personalized themes that reflect your personality and interests. From whimsical fairy tales to thrilling adventures, we can transform any concept into a captivating reality. Get ready to be dazzled by our extensive network of talented entertainers. From energetic DJs and live bands to mesmerizing magicians and acrobats, we'll ensure that your guests are thoroughly entertained throughout the event. Indulge your taste buds with our delectable culinary offerings. Whether you desire a gourmet feast, a trendy food truck experience, or a delightful dessert spread, our culinary experts will create a menu that satisfies your cravings and leaves a lasting impression on your guests.",
      eventStartDate: "",
      eventEndDate: "",
      eventImage:
        "https://images.pexels.com/photos/16930505/pexels-photo-16930505/free-photo-of-wood-restaurant-vacation-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },

    {
      eventName: "ANNIVERSARY",
      eventTitle:
        "Celebrate Your Love Story with an Unforgettable Anniversary Celebration",
      eventDescription:
        "We believe that it's the little details that make a celebration truly memorable. Surprise your partner with heartfelt gestures, such as personalized love notes, photo collages, or a special performance dedicated solely to them. Our team will help you plan these touching surprises that will make your anniversary celebration even more meaningful.From intimate candlelit dinners to grand soirées, we know how to set the stage for a romantic celebration. Our team of designers will transform the venue into a captivating haven, adorned with elegant decorations, soft lighting, and luxurious details, all tailored to your preferred style and theme.",
      eventStartDate: "",
      eventEndDate: "",
      eventImage:
        "https://images.pexels.com/photos/2072175/pexels-photo-2072175.jpeg?auto=compress&cs=tinysrgb&w=600",
    },

    {
      eventName: "CONFERENCE",
      eventTitle:
        "Ignite Inspiration and Drive Success at Our Remarkable Conference",
      eventDescription:
        "Engage in interactive sessions designed to foster collaboration and encourage lively discussions. Our panels and workshops cover a wide range of topics, addressing the latest trends, challenges, and opportunities in your industry. Gain practical skills, exchange ideas, and connect with like-minded professionals who share your passion for growth and innovation.Expand your professional network and forge meaningful connections with industry peers, potential collaborators, and mentors. Our conference provides ample networking opportunities, including dedicated networking sessions, cocktail receptions, and informal gatherings. Share experiences, exchange business cards, and build relationships that may open doors to exciting new ventures.",
      eventStartDate: "",
      eventEndDate: "",
      eventImage:
        "https://images.pexels.com/photos/1325766/pexels-photo-1325766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="event-wrap">
        {/* gala party */}
        {eventArr.map((event, index) => {
          return (
            <div
              className="outerwrap"
              data-aos="fade-down"
              key={index + 1}
              style={{
                background: `url(${event.eventImage})`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="innerwrap">
                <div className="wrap animate pop">
                  <div className="overlay">
                    <div className="overlay-content animate slide-left delay-2">
                      <h1 className="animate slide-left pop delay-4">
                        {event.eventName}
                      </h1>
                      <div
                        className="content"
                        style={{
                          color: "white",
                          marginBottom: "7rem",
                          width: "10rem",
                        }}
                      >
                        {/* <p className="animate slide-left pop delay-5" >
                          Starting Date:
                          <br />
                          <span>May 5, 2023</span>
                        </p>
                        <p className="animate slide-left pop delay-5" >
                          End Date:
                          <br />
                          <span>May 5, 2023</span>
                        </p> */}

                        <h5>{event.eventTitle}</h5>
                      </div>
                    </div>
                    <div
                      className="image-content animate slide delay-5"
                      style={{
                        background: `url(${event.eventImage})`,
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                    <div className="dots animate">
                      <div className="dot animate slide-up delay-6"></div>
                      <div className="dot animate slide-up delay-7"></div>
                      <div className="dot animate slide-up delay-8"></div>
                    </div>
                  </div>
                  <div className="text">
                    <h6>{event.eventName}</h6>
                    <p>{event.eventDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* gala party */}
      </div>
      <EnquiryForm />

      <div className="property-locations">
        <div className="location-header">
          <div>
            <Icon icon={location2} size={30} style={{ color: "orange" }}></Icon>
          </div>
          <h3 style={{}}>Cuba Goa Property Locations</h3>
        </div>
        <div className="dummy-border"></div>

        <div className="location-addresses">
          <section className="address-section">
            <h6>CUBA BEACH BUNGALOWS</h6>
            <div></div>
            <p>
              Center of Palolem Beach, Palolem Beach, Canacona, Goa - 403702
            </p>
          </section>
          <section className="address-section">
            <h6>CUBA PATNEM BEACH BUNGALOWS</h6>
            <div></div>
            <p>
              North side of Patnem Beach, Palolem-Patnem Road, Canacona, Goa -
              403702
            </p>
          </section>
          <section className="address-section">
            <h6>CUBA PREMIUM HUTS</h6>
            <div></div>
            <p>
              Center of Palolem Beach, Palolem Beach, Canacona, Goa - 403702
            </p>
          </section>
          <section className="address-section">
            <h6>PALOLEM BEACH RESORT</h6>
            <div></div>
            <p>
              Entrance of Palolem Beach, Besides car parking area, Palolem
              Beach, Canacona, Goa - 403702
            </p>
          </section>
          <section className="address-section">
            <h6>CUBA AGONDA</h6>
            <div></div>
            <p>Tambli Val, Agonda Beach Road, Agonda, Canacona, Goa - 403702</p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EventPage;
