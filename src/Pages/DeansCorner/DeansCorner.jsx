import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./DeansCorner.css";
import { motion as m } from "framer-motion";
import gsap from "gsap";

const DeansCorner = ({ socketForFiles }) => {
  useEffect(() => {
    gsap.from(".kanban-combined-text", {
      y: -500,
      opacity: 0,
      duration: 0.9,
      // delay: 0./5,
      ease: "power3.inOut",
    });
    gsap.from(".document-combined-text", {
      y: -1000,
      opacity: 1,
      duration: 0.9,
      // delay: 0,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <m.main
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      
    >
      <div className="deans-corner">
        <button>
          <Link to="/homepage" className="home-link-dean">
            Home
          </Link>
        </button>

        <div className="deans-main-div">
          <div className="kanban-combined">
            <Link to="/kanbancombined" className="kanban-combined-text">
              Kanban Boards
            </Link>
          </div>
          <div className="document-combined">
            <Link to="/documentupload" className="document-combined-text">
              Document Zone
            </Link>
          </div>
        </div>
      </div>
    </m.main>
  );
};

export default DeansCorner;
