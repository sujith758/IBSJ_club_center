import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { gsap, Power3 } from "gsap";
import WavingHand from "../../public/WavingHand.json";
import MagicDots from "./MagicDots";
import "./LandingPage.css";

const LandingPage = () => {
  const bottomContainerRef = useRef(null);
  const containerRef = useRef(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const mouseCircleRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: -1000,
      },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: Power3.inOut,
      }
    );
    gsap.from(bottomContainerRef.current.children, {
      opacity: 0,
      y: -100, // Adjust as needed
      delay: 1,
      duration: 1,
      ease: Power3.out,
    });
    gsap.to(bottomContainerRef.current.children, {
      opacity: 1,
      y: 0, // Adjust as needed
      delay: 1,
      duration: 1,
      ease: Power3.out,
    });

    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });

      // Add trail effect to the mouse circle
      gsap.to(mouseCircleRef.current, {
        left: event.clientX,
        top: event.clientY - 2,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

    
  const handleMouseEnter = () => {
    setIsHovered(true);
    setDisplayText("ENTER"); // Set the text you want to display
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setDisplayText("");
  };
  
  useEffect(() => {
    if (isHovered) {
      gsap.to(".mouse-circle", {
        width: 180,
        height: 180,
        duration: 0.2,
      });
    } else {
      gsap.to(".mouse-circle", {
        width: 15,
        height: 15,
        duration: 0.2,
      });
    }
  }, [isHovered]);

  // Render the rest of the elements once loading is complete
  return (
    <div ref={containerRef} className="landing-page">
      <div className="landing-page-logo">
        <img src="src/public/IBS_Jaipur_logo.png" alt="college logo" />
      </div>
      <MagicDots className="magic-dots" />
      <div className="header-container">
        <Link to="/homepage" style={{ textDecoration: "none", color: "white" }}>
          <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            IBS JAIPUR
          </h1>
        </Link>
        <Link to="/homepage" style={{ textDecoration: "none", color: "white" }}>
          <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            CLUB CENTER
          </h1>
        </Link>
      </div>
      <div className="bottom-container" ref={bottomContainerRef}>
        <div className="left-content">
          <p>WELCOME TO</p>
          <p>IBS JAIPUR CLUB CENTER</p>
          <p>FUN BEGINS HERE</p>
        </div>
        <div className="lottie-container">
          <Lottie
            animationData={WavingHand}
            loop={true}
            className="waving-hand"
          />
        </div>
      </div>
      <div>
        <div className="mouse-circle" ref={mouseCircleRef}>
          {isHovered && (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "70px",
                fontSize: "25px",
              }}
            >
              {displayText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
