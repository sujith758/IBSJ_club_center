// Import necessary libraries
import React, { useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./ScrollMenu.css";

const ScrollMenu = () => {
  // State to track selected menu item
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to handle menu item click
  const handleMenuItemClick = (item) => {
    setSelectedItem(item);

    // Add animation or other effects using gsap if needed
    // Example: gsap.fromTo(".selected-image", { opacity: 0 }, { opacity: 1, duration: 1 });
  };

  // Function to handle image click
  const handleImageClick = () => {
    // Navigate to another page when image is clicked
    // You need to define the route for this page in your React Router setup
    // Example: history.push("/another-page");
  };

  // Sample menu items
  const menuItems = ["Business Squad", "Cognizance", "Communiqa", "EcoBiz","Graffiti","Ignited Minds","Khel Ratna", "Market Mavens", "Money Matrix Club", "Navrang", "Pixel Club","Prayaas","Synchronize","Techno Club","Youth Vibes"];

  return (
    <div className="scroll-menu-container">
      {/* Left side scroll menu */}
      <div className="scroll-menu">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} onClick={() => handleMenuItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side box for rendering images */}
      <div className="image-container">
        {!selectedItem ? (
          <p style={{fontSize: "2rem"}}>Select a CLub</p>
         ) : (
          <Link to={`${selectedItem}`}>
          <img
            className="selected-image"
            src={`src/Assets/clublogos/${selectedItem}.jpg`}
            alt={selectedItem}
            onClick={handleImageClick}
          />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ScrollMenu;
