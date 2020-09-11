import React, { useEffect, useState } from "react";
import "./Nav.css";
import logo from "./assets/logo.png";

function Nav() {
  //this code allows us to add a class on scroll of 100px
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={logo} alt="netflix logo"></img>
      <img
        className="nav__avatar"
        src="https://startupcan.ch/wp-content/uploads/2019/04/profile-pictures-avatars-9.png"
        alt="netflix avatar"
      ></img>
    </div>
  );
}

export default Nav;
