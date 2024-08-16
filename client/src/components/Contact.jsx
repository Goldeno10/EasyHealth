import React, { useState } from "react";
import "../styles/contact.css";
// import React from 'react';
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("xzzprgwy");
  // const [state, handleSubmit] = useForm(process.env.REACT_APP_FORMIK_SECRET);
 

  return (
    <section className="register-section flex-center" id="contact">
      <div className="contact-container flex-center contact">
        <h2 className="form-heading">Contact Us</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            id="name"
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter your name"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your registration number"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <textarea
            id="message"
            type="text"
            name="message"
            className="form-input"
            placeholder="Enter your message"
            rows="8"
            cols="12"
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />

          <button
            type="submit"
            disabled={state.submitting}
            className="btn form-btn contact-btn"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
