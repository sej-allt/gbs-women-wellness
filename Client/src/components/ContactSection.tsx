import React from "react";
import "./ContactSection.css";

const ContactSection = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <div className="contact-details">
          <p>
            <strong>Address:</strong> 123,Rajpur Road,Dehradun, Uttarakhand, India
          </p>
          <p>
            <strong>Phone:</strong> +91 923 432 3892
          </p>
          <p>
            <strong>Alternate Phone:</strong> +91 923 432 3982
          </p>
          <p>
            <strong>Email:</strong> rawat96nikita@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
