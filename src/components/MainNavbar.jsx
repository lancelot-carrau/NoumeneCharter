import React, { useState, useEffect } from "react";
import "../style/navbar.scss";
import { Link } from "react-scroll";

const MainNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const navItems = [
    { to: "croisieres", label: "Croisières" },
    { to: "bateau", label: "Le Bateau" },
    { to: "tarifs", label: "Tarifs" },
    { to: "contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`navbar${scrolled ? " scrolled" : ""}`}>
        <Link to="hero" smooth duration={600} className="navbar__logo">
          Noumène<span>.</span>
        </Link>

        <nav className="navbar__links">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              smooth
              duration={600}
              offset={-60}
              className="navbar__link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className={`navbar__burger${mobileOpen ? " open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile overlay menu */}
      <div className={`navbar__mobile${mobileOpen ? " open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            smooth
            duration={600}
            offset={-60}
            className="navbar__mobile-link"
            onClick={closeMobile}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
};

export default MainNavbar;