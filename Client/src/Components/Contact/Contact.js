import React from "react";
import developerPng from "./images/developer-png.png";

const Contact = () => {
  return (
    <div className="contactUs-main-container">
      <div className="contactUs-left-para">
        <h3>Let's get in touch</h3>
        <i class="fa fa-envelope"></i>
        <a class="mail-links" href="mailto:softdev.niyas@gmail.com">
          softdev.niyas@gmail.com
        </a>

        <i class="fa fa-linkedin"></i>
        <a class="mail-links" href="www.linkedin.com/in/softdev-niyas">
          User Name: softdev-niyas
        </a>

        <i class="fa fa-github"></i>
        <a class="mail-links" href="https://github.com/niyas-softdev">
          Niyas
        </a>

        <i class="fa fa-instagram"></i>
        <a class="mail-links" href="https://www.instagram.com/sid._.ns/">
          @sid._.ns
        </a>

        <i class="fa fa-phone"></i>
        <a class="mail-links" href="tel:+923019583959">
          +91 9360478392
        </a>
      </div>
      <div className="contactUs-pic">
        <img src={developerPng} alt="Profile"/>
      </div>
    </div>
  );
};

export default Contact;
