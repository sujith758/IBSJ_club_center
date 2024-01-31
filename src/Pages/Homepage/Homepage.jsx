import React, { useEffect, useRef} from "react";
import gsap from "gsap";
import JP from "../../public/WorldMapFinal.jpeg";
import KP from "../../public/pin.png";
import "./Homepage.css";
import ScrollMenu from "./ScrollMenu/ScrollMenu";
import NavbarHP from "./Navbar/NavbarHP";
import { motion as m } from "framer-motion";

const Homepage = () => {
  const BodyBottomContentRef = useRef(null);
  const ContentHomepageContentRef = useRef(null);
  const PinPointRef = useRef(null);

  useEffect(() => {
    // Add stagger to create a downward arrow animation
    gsap.fromTo(
      ".down-arrow",
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        repeat: -1,
        repeatDelay: 0.5,
        ease: "power1.inOut",
      }
    );
  }, []);
  useEffect(() => {
    // Set initial state for content
    gsap.set(BodyBottomContentRef.current.children, { opacity: 0 });
    gsap.set(ContentHomepageContentRef.current.children, { opacity: 0 });
    gsap.set(PinPointRef.current, { opacity: 0 });

    // Animation for floating lottie
    gsap.from(".floating-lottie", {
      opacity: 1,
      duration: 1.5,
      scale: 0.5,
      ease: "back.out(1.7)", // Popping motion
      onComplete: () => {
        gsap.from(".pin-point-img", {
          opacity: 0,
          scale: 0,
          ease: "back.out(1.7)",
        });
        gsap.to(".pin-point-img", {
          opacity: 1,
          scale: 1,
          ease: "back.out(1.7)",
        });
        // Animation to make the floating lottie disappear
        gsap.to(".floating-lottie", {
          opacity: 0.2,
          duration: 0.5,
          ease: "power1.inOut",
          delay: 0.5, // Delay before content appears
          onComplete: () => {
            gsap.from(ContentHomepageContentRef.current.children, {
              opacity: 0,
              duration: 1,
            });
            gsap.to(ContentHomepageContentRef.current.children, {
              opacity: 1,
              duration: 1,
            });
            // Animation for content to appear
            gsap.from(BodyBottomContentRef.current.children, {
              x: -500,
              opacity: 0,
              duration: 1,
            });
            gsap.to(BodyBottomContentRef.current.children, {
              x: 0,
              opacity: 1,
              duration: 1.5,
            });
          },
        });
      },
    });
  }, []);

  return (
    <m.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
    >
      <div className="homepage__div">
        <NavbarHP />

        <div className="floating-lottie">
          <img
            src={KP}
            alt="pin-point-img"
            className="pin-point-img"
            ref={PinPointRef}
          />

          <img src={JP} alt="IBS JAIPUR" className="shooting-star" />
        </div>
        <div className="content-homepage" ref={ContentHomepageContentRef}>
          <div className="to-center">
            <div className="homepage_title">
              <h1>IBS JAIPUR</h1>
              <h1>CLUB CENTER</h1>
            </div>
          </div>
          <div className="bodybottom-content" ref={BodyBottomContentRef}>
            <p>WELCOME TO</p>
            <p>IBS JAIPUR CLUB CENTER</p>
            <p>FUN BEGINS HERE</p>
            <div className="down-arrow">&#9660;</div>
          </div>
        </div>
        <h2>CLUBS</h2>
        <ScrollMenu style={{ position: "relative" }} />
      </div>
    </m.main>
  );
};

export default Homepage;
