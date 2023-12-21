import React from "react";
import "./thingstodo.css";
import ChatOpeningButton from "../Chat/ChatOpeningButton";

const data = [
  {
    name: "Jet Skiing",
    description:
      "Experience the thrill of riding a Jet Ski and zoom across the waves of Goa's beaches",
    image:
      "https://images.pexels.com/photos/33046/jet-ski-water-sport-water-bike-water.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Parasailing",
    description:
      "Soar high in the sky with parasailing and enjoy panoramic views of the coastline and the Arabian Sea",
    image:
      "https://images.pexels.com/photos/163341/parasailing-start-beach-coast-163341.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Banana Boat Rides",
    description:
      "Enjoy a fun-filled ride on an inflatable banana-shaped boat as it's towed by a speedboat",
    image:
      "https://towno.in/system/concepts/concept_images/000/001/499/original/banana-ride-header.jpg?1509015767",
  },
  {
    name: "Snorkeling",
    description:
      "Put on a snorkel mask and dive into the clear waters to witness the colorful marine life up close.",
    image:
      "https://images.pexels.com/photos/2744596/pexels-photo-2744596.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Kayaking",
    description:
      "Paddle through the calm backwaters, mangroves, and rivers of Goa on a kayak and enjoy the serene surroundings.",
    image:
      "https://images.pexels.com/photos/8711871/pexels-photo-8711871.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Stand-Up Paddleboarding (SUP)",
    description:
      "Try your balancing skills and glide over the water while standing on a paddleboard, enjoying the scenic views",
    image:
      "https://images.pexels.com/photos/4823474/pexels-photo-4823474.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Dolphin Spotting",
    description:
      "Embark on a boat trip and witness the playful dolphins as they swim alongside and jump in and out of the water",
    image:
      "https://images.pexels.com/photos/225869/pexels-photo-225869.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Flyboarding",
    description:
      "Experience the thrill of flyboarding, where water propulsion lifts you above the water, providing an exhilarating experience",
    image:
      "https://images.pexels.com/photos/5113343/pexels-photo-5113343.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: " Scuba Diving",
    description:
      "Explore the vibrant underwater world of Goa through scuba diving and discover beautiful coral reefs and marine life.",
    image:
      "https://images.pexels.com/photos/1645028/pexels-photo-1645028.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: " Fishing Trips",
    description:
      "EEnjoy a relaxing fishing trip and try your hand at catching some local fish species in the Arabian Sea.",
    image:
      "https://images.pexels.com/photos/4381653/pexels-photo-4381653.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const Activity = () => {
  return (
    <div className="thingstodo-wrap">
      <h2>ENJOY WATER ACITIVITIES IN GOA</h2>
      <div className="thingstodo-cards-wrap">
        {data.map((data, i) => {
          return (
            <article className="thingcard">
              <img className="thingcard__background" src={data.image} alt="" />
              <div className="thingcard__content | flow">
                <div className="thingcard__content--container | flow">
                  <h4 className="thingcard__title" style={{ color: "orange" }}>
                    {data.name}
                  </h4>
                  <p
                    className="thingcard__description"
                    style={{ marginBottom: "1rem" }}
                  >
                    {data.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <ChatOpeningButton />
    </div>
  );
};

export default Activity;
