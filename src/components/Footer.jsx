import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="footer__logo">
      Noumène<span className="footer__dot">.</span>
    </div>
    <p className="footer__copy">
      © {new Date().getFullYear()} Noumène Charter — Polynésie Française
    </p>
  </footer>
);

export default Footer;
