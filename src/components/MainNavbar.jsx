import React, { useState, useEffect, useCallback } from "react";
import "../style/navbar.scss";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const MainNavbar = () => {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleClick = useCallback((id) => {
    setMobileOpen(false);
    scrollTo(id);
  }, []);

  const items = [
    { to: "cruises", label: "Croisières" },
    { to: "boat", label: "Le Bateau" },
    { to: "pricing", label: "Tarifs" },
    { to: "contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`nav${solid ? " nav--solid" : ""}`}>
        <span className="nav__logo" onClick={() => scrollTo("hero")}>
          Noumène<span className="nav__logo-dot">.</span>
        </span>

        <nav className="nav__links">
          {items.map((it) => (
            <span
              key={it.to}
              className="nav__link"
              onClick={() => handleClick(it.to)}
            >
              {it.label}
            </span>
          ))}
        </nav>

        <button
          className={`nav__burger${mobileOpen ? " open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`nav__overlay${mobileOpen ? " open" : ""}`}>
        {items.map((it) => (
          <span
            key={it.to}
            className="nav__overlay-link"
            onClick={() => handleClick(it.to)}
          >
            {it.label}
          </span>
        ))}
      </div>
    </>
  );
};

export default MainNavbar;