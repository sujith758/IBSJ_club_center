import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import "./ScrollMenu.css";
import BS from "../../../public/clublogos/Business Squad.jpg"
import Cog from "../../../public/clublogos/Cognizance.jpg";
import Comm from "../../../public/clublogos/Communiqa.jpg";
import Eco from "../../../public/clublogos/EcoBiz.jpg";
import Grafitti from "../../../public/clublogos/Graffiti.jpg";
import IGM from "../../../public/clublogos/Ignited Minds.jpg";
import KheR from "../../../public/clublogos/Khel Ratna.jpg";
import Mar from "../../../public/clublogos/Market Mavens.jpg";
import Mon from "../../../public/clublogos/Money Matrix Club.jpg";
import Navrang from "../../../public/clublogos/Navrang.jpg";
import Pixel from "../../../public/clublogos/Pixel Club.jpg";
import Prayaas from "../../../public/clublogos/Prayaas.jpg";
import Sync from "../../../public/clublogos/Synchronize.jpg";
import Techno from "../../../public/clublogos/Techno Club.jpg";
import YV from "../../../public/clublogos/Youth Vibes.jpg";

export const ScrollMenu = () => {
  return (
    <section className="p-section"> 
      <div className="link-list"> 
        <Link
          heading="Business Squad"
          subheading="Learn what we do here"
          imgSrc={BS}
          href="#/Business Squad"
        />
        <Link
          heading="Cognizance"
          subheading="Learn what we do here"
          imgSrc={Cog}
          href="#/Cognizance"
        />
        <Link
          heading="Communiqa"
          subheading="Learn what we do here"
          imgSrc={Comm}
          href="#/Communiqa"
        />
        <Link
          heading="EcoBiz"
          subheading="Learn what we do here"
          imgSrc={Eco}
          href="#/EcoBiz"
        />
        <Link
          heading="Graffiti"
          subheading="Learn what we do here"
          imgSrc={Grafitti}
          href="#/Graffiti"
        />
        <Link
          heading="Ignited Minds"
          subheading="Learn what we do here"
          imgSrc={IGM}
          href="#/Ignited Minds"
        />
        <Link
          heading="Khel Ratna"
          subheading="Learn what we do here"
          imgSrc={KheR}
          href="#/Khel Ratna"
        />
        <Link
          heading="Market Mavens"
          subheading="Learn what we do here"
          imgSrc={Mar}
          href="#/Market Mavens"
        />
        <Link
          heading="Money Matrix Club"
          subheading="Learn what we do here"
          imgSrc={Mon}
          href="#/Money Matrix"
        />
        <Link
          heading="Navrang"
          subheading="Learn what we do here"
          imgSrc={Navrang}
          href="#/Navrang"
        />
        <Link
          heading="Pixel Club"
          subheading="Learn what we do here"
          imgSrc={Pixel}
          href="#/Pixel Club"
        />
        <Link
          heading="Prayaas"
          subheading="Learn what we do here"
          imgSrc={Prayaas}
          href="#/Prayaas"
        />
        <Link
          heading="SyncHRonize"
          subheading="Learn what we do here"
          imgSrc={Sync}
          href="#/Synchronize"
        />
        <Link
          heading="Techno Club"
          subheading="Learn what we do here"
          imgSrc={Techno}
          href="#/Techno Club"
        />
        <Link
          heading="Youth Vibes"
          subheading="Learn what we do here"
          imgSrc={YV}
          href="#/Youth Vibes"
        />

      </div>
    </section>
  );
};

const Link = ({ heading, imgSrc, subheading, href }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="heading-motion" 
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="span-motion"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="heading-split"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="sub-heading-motion">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="image-motion"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="div-motion"
      >
        <FiArrowRight className="arrow-motion" />
      </motion.div>
    </motion.a>
  );
};

export default ScrollMenu;
