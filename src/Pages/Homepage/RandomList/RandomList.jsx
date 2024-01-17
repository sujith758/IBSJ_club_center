import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./RandomList.css";

const RandomizedList = () => {
  const menuItems = [
    "Business Squad",
    "Cognizance",
    "Communiqa",
    "EcoBiz",
    "Graffiti",
    "Ignited Minds",
    "Khel Ratna",
    "Market Mavens",
    "Money Matrix Club",
    "Navrang",
    "Pixel Club",
    "Prayaas",
    "Synchronize",
    "Techno Club",
    "Youth Vibes",
  ];

  const itemImages = {
    "Business Squad": "src/Assets/clublogos/Business Squad.jpg",
    "Cognizance": "src/Assets/clublogos/Cognizance.jpg",
    "Communiqa": "src/Assets/clublogos/Communiqa.jpg",
    "EcoBiz": "src/Assets/clublogos/EcoBiz.jpg",
    "Graffiti": "src/Assets/clublogos/Graffiti.jpg",
    "Ignited Minds": "src/Assets/clublogos/Ignited Minds.jpg",
    "Khel Ratna": "src/Assets/clublogos/Khel Ratna.jpg",
    "Market Mavens": "src/Assets/clublogos/Market Mavens.jpg",
    "Money Matrix Club": "src/Assets/clublogos/Money Matrix Club.jpg",
    "Navrang": "src/Assets/clublogos/Navrang.jpg",
    "Pixel Club": "src/Assets/clublogos/Pixel Club.jpg",
    "Prayaas": "src/Assets/clublogos/Prayaas.jpg",
    "Synchronize": "src/Assets/clublogos/Synchronize.jpg",
    "Techno Club": "src/Assets/clublogos/Techno Club.jpg",
    "Youth Vibes": "src/Assets/clublogos/Youth Vibes.jpg",
  };
  const [hoveredItem, setHoveredItem] = useState(null);


  useEffect(() => {
    const items = document.querySelectorAll(".randomized-element-item");

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const itemName = item.id;
        const imageUrl = itemImages[itemName];

        setHoveredItem({
          name: itemName,
          image: imageUrl,
        });

        gsap.to(item, {
          scale: 1.2,
          zIndex: 1,
          duration: 0.3,
        });

        items.forEach((otherItem) => {
          if (otherItem !== item) {
            gsap.to(otherItem, { opacity: 0, display: "none", duration: 0.3 });
          }
        });
      });

      item.addEventListener("mouseleave", () => {
        setHoveredItem(null);

        gsap.to(item, {
          scale: 1,
          zIndex: 0,
          duration: 0.3,
        });

        items.forEach((otherItem) => {
          gsap.to(otherItem, { opacity: 1, display: "block", duration: 0.3 });
        });
      });
    });
  }, []);
  useEffect(() => {
    const getRandomPosition = (max, size) =>
      Math.floor(Math.random() * (max - size));

    const maxHeight = window.innerHeight - 215;
    const maxWidth = window.innerWidth;

    const positions = {};

    const isOverlap = (x, y, width, height) => {
      for (const key in positions) {
        const pos = positions[key];
        if (
          x < pos.x + pos.width &&
          x + width > pos.x &&
          y < pos.y + pos.height &&
          y + height > pos.y
        ) {
          return true;
        }
      }
      return false;
    };

    menuItems.forEach((item) => {
      const element = document.getElementById(item);

      if (element) {
        const elementWidth = element.offsetWidth;
        const elementHeight = element.offsetHeight;

        let randomX, randomY;
        let attempts = 0;

        do {
          randomX = getRandomPosition(maxWidth * 0.9, elementWidth);
          randomY = getRandomPosition(maxHeight, elementHeight);
          attempts += 1;

          if (attempts > 100) {
            break;
          }
        } while (isOverlap(randomX, randomY, elementWidth, elementHeight));

        positions[item] = {
          x: randomX,
          y: randomY,
          width: elementWidth,
          height: elementHeight,
        };

        element.style.position = "absolute";
        element.style.left = `${randomX}px`;
        element.style.top = `${randomY}px`;
      }
    });
  }, []);

  return (
     <div className="randomized-element">
      {menuItems.map((item, index) => (
        <div key={index} id={item} className="randomized-element-item">
          <Link to={`/${item}`}>
            {item}
            {hoveredItem && hoveredItem.name === item && (
              <img src={hoveredItem.image} alt={`${item} Logo`}  style={{ marginLeft: "10px", width: "100px", height: "100px", borderRadius: "10px" }} />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RandomizedList;
