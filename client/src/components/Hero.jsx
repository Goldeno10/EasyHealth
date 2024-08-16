import React from "react";
import image from "../images/heroimg.png";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
        Your easy path to health
        </h1>
        <p>
          The hassle-free way to book doctor appointments online. 
          Find your preferred doctor, check their availability, 
          and book appointments with ease. Simplify your healthcare 
          experience with easyHealth.
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
