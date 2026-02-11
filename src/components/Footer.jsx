import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="footer__pattern" />
    <div className="footer__logo">
      Noumène<span>.</span>
    </div>
    <p className="footer__copy">
      © {new Date().getFullYear()} Noumène Charter — Polynésie Française
    </p>
  </footer>
);

export default Footer;
