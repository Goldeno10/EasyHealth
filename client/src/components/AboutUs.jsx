import React from "react";
import image from "../images/aboutimg.png";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
              style={{ height: 400, width: 500, resize: "cover" }}
            />
          </div>
          <div className="hero-content">
            <p>
              The hassle-free way to book doctor appointments online. Find your
              preferred doctor, check their availability, and book appointments
              with ease. Simplify your healthcare experience with easyHealth.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
