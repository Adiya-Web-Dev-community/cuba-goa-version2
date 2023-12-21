import React from "react";
import "./thingstodo.css";
import ChatOpeningButton from "../Chat/ChatOpeningButton";

const data = [
  {
    name: "Visit Calangute Beach",
    description:
      "Calangute is one of the most popular and largest beaches in Goa. Enjoy sunbathing, water sports, and beachside shacks offering delicious seafood",
    image:
      "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Explore Fort Aguada",
    description:
      "This well-preserved 17th-century Portuguese fort offers panoramic views of the Arabian Sea. It also houses a lighthouse and a prison that has been converted into a luxury hotel.",
    image:
      "https://images.pexels.com/photos/15261781/pexels-photo-15261781/free-photo-of-waves-splashing-on-shore-with-stone-fort.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Party at Baga Beach",
    description:
      "Baga Beach is famous for its lively nightlife and beach parties. It offers a range of water sports activities during the day and transforms into a party hub at night",
    image:
      "https://images.pexels.com/photos/625644/pexels-photo-625644.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Explore Anjuna Flea Market",
    description:
      "The Anjuna Flea Market is held every Wednesday and is a must-visit for shopaholics. You can find a wide variety of items like clothing, jewelry, handicrafts, and souvenirs.",
    image:
      "https://images.pexels.com/photos/1745747/pexels-photo-1745747.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Visit Chapora Fort",
    description:
      'Chapora Fort is known for its stunning views of the Vagator and Chapora beaches. It gained popularity after being featured in the Bollywood movie "Dil Chahta Hai.',
    image:
      "https://images.pexels.com/photos/1009898/pexels-photo-1009898.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Relax at Vagator Beach",
    description:
      "Vagator Beach is a scenic beach with red cliffs, golden sand, and crystal-clear water. It's an ideal spot for sunbathing, swimming, and enjoying mesmerizing sunsets.",
    image:
      "https://images.pexels.com/photos/1550913/pexels-photo-1550913.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Explore the Mapusa Market",
    description:
      "Mapusa Market is a bustling local market held every Friday. You can find a wide range of goods, including fresh produce, spices, textiles, clothing, and household items.",
    image:
      "https://images.pexels.com/photos/757432/pexels-photo-757432.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Visit the Basilica of Bom Jesus",
    description:
      "Located in Old Goa, the Basilica of Bom Jesus is a UNESCO World Heritage site and holds the mortal remains of St. Francis Xavier. It is an important religious and historical landmark",
    image:
      "https://images.pexels.com/photos/218480/pexels-photo-218480.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Enjoy Water Sports at Candolim Beach",
    description:
      "Candolim Beach offers a variety of water sports activities, including jet skiing, parasailing, banana boat rides, and dolphin spotting tours.",
    image:
      "https://images.pexels.com/photos/33046/jet-ski-water-sport-water-bike-water.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Experience the Dudhsagar Waterfalls",
    description:
      "Although not in North Goa itself, the Dudhsagar Waterfalls are a short trip away. These magnificent falls are located in the Mollem National Park and offer a breathtaking sight.",
    image:
      "https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const SouthGoa = () => {
  return (
    <div className="thingstodo-wrap">
      <h2>EXPLORE SOUTH GOA</h2>
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

export default SouthGoa;
