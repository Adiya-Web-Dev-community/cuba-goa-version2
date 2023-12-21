import React from "react";
import "./thingstodo.css";
import ChatOpeningButton from "../Chat/ChatOpeningButton";

const data = [
  {
    name: "Visit Palolem Beach",
    description:
      "Palolem Beach is a picturesque and serene beach known for its calm waters and scenic beauty. It offers opportunities for swimming, sunbathing, and relaxing in the hammocks",
    image:
      "https://media.istockphoto.com/id/535168027/photo/india-goa-palolem-beach.jpg?s=612x612&w=0&k=20&c=iGV1Ue0Efj87dQirWnUpZVG1dNobUjfVvMGdKHTJ7Qg=",
  },
  {
    name: "Explore Colva Beach",
    description:
      "Colva Beach is one of the longest beaches in Goa, offering a vibrant atmosphere and various water sports activities. It's also known for its beach shacks and seafood restaurants.",
    image:
      "https://i.pinimg.com/originals/cd/77/13/cd7713764846804f5bcc21fcbe5e4bb8.jpg",
  },
  {
    name: "Visit Dudhsagar Falls",
    description:
      "Dudhsagar Falls, located on the border of Goa and Karnataka, is one of the tallest waterfalls in India. Witnessing the gushing white water amidst the lush green surroundings is a breathtaking experience.",
    image:
      "https://images.pexels.com/photos/831062/pexels-photo-831062.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Discover Cotigao Wildlife Sanctuary",
    description:
      "Cotigao Wildlife Sanctuary is home to diverse flora and fauna, including rare bird species and wild animals like leopards and sloth bears. Explore the nature trails and enjoy the tranquil ambiance",
    image:
      "https://images.pexels.com/photos/16015159/pexels-photo-16015159/free-photo-of-close-up-of-an-eagle.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Visit Margao Market",
    description:
      'Margao Market, also known as the "Madgaon Market," is a bustling local market where you can find a variety of goods, including fresh produce, spices, clothing, and Goan handicrafts.',
    image:
      "https://images.pexels.com/photos/1009898/pexels-photo-1009898.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: " Explore Old Goa",
    description:
      "Old Goa, a UNESCO World Heritage site, is famous for its magnificent churches and cathedrals. Visit the Basilica of Bom Jesus, Se Cathedral, and other historical landmarks that reflect Goa's Portuguese influence.",
    image:
      "https://media.istockphoto.com/id/473627748/photo/se-cathedral-in-old-goa-capital-of-former-portuguese-colony.jpg?s=612x612&w=0&k=20&c=ZDDlawwtuweBgFmNfmAQNnZJl0lEEFhi7mYCG4RNzqs=",
  },
  {
    name: "Relax at Benaulim Beach",
    description:
      "Benaulim Beach is a tranquil and less-crowded beach in South Goa. It offers a peaceful atmosphere, water sports activities, and beach shacks serving delicious Goan cuisine.",
    image:
      "https://images.pexels.com/photos/1550913/pexels-photo-1550913.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Visit Cabo de Rama Fort",
    description:
      "Located in Old Goa, the Basilica of Bom Jesus is a UNESCO World Heritage site and holds the mortal remains of St. Francis Xavier. It is an important religious and historical landmark",
    image:
      "https://images.pexels.com/photos/13970869/pexels-photo-13970869.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Explore Galgibaga Beach",
    description:
      "Galgibaga Beach, also known as Turtle Beach, is a nesting site for Olive Ridley turtles. The serene beach is known for its untouched beauty and is ideal for long walks and birdwatching",
    image:
      "https://images.pexels.com/photos/1974521/pexels-photo-1974521.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Visit the Naval Aviation Museum",
    description:
      "The Naval Aviation Museum in Vasco da Gama showcases the history and evolution of the Indian Naval Air Arm. It exhibits various aircraft, engines, weapons, and artifacts related to naval aviation.",
    image:
      "https://images.pexels.com/photos/11712064/pexels-photo-11712064.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const NorthGoa = () => {
  return (
    <div className="thingstodo-wrap">
      <h2>EXPLORE NORTH GOA</h2>
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

export default NorthGoa;
