import React from "react";
import { Link } from "react-scroll";

// Styles
import "../style/hero.scss";
import "../style/sections.scss";

// Images
import imageAccueil from "../assets/images/vueDrone.jpg";
import imageLagon from "../assets/images/imageLagon.jpg";
import imageFlore from "../assets/images/imageFlore.jpg";
import pont from "../assets/images/pont.jpg";
import famille from "../assets/images/famille.jpg";
import avant from "../assets/images/vueAvant.jpg";
import cockpit from "../assets/images/cockpit2.jpg";
import cabine from "../assets/images/cabineDouble.jpg";
import cabineDuo from "../assets/images/cabineDuo.jpg";
import carte from "../assets/images/carte-polynesie.png";

/* ── Data ──────────────────────────────────────────────── */
const cruises = [
  { name: "Les Îles au Vent", islands: "Tahiti · Moorea" },
  { name: "Les Îles sous le Vent", islands: "Huahine · Raiatea · Tahaa · Bora-Bora" },
  { name: "Les Tuamotu", islands: "Rangiroa · Fakarava" },
  { name: "Les Marquises", islands: "Nuku Hiva · Hiva Oa" },
];

const features = [
  { icon: "🛏", text: "4 grandes cabines doubles" },
  { icon: "🚿", text: "4 salles de bains" },
  { icon: "🛋", text: "1 canapé convertible" },
  { icon: "⚓", text: "2 cabines équipage séparées" },
  { icon: "🚤", text: "1 zodiac" },
  { icon: "🏄", text: "1 paddle + 2 kayaks" },
];

const pricing = [
  { period: "1 semaine", price: "12 000 €" },
  { period: "10 jours", price: "15 000 €" },
  { period: "2 semaines", price: "20 000 €" },
  { period: "3 semaines", price: "28 000 €" },
  { period: "1 mois", price: "35 000 €" },
];

const boatImages = [pont, famille, avant, cabine, cockpit, cabineDuo];

/* ── Component ─────────────────────────────────────────── */
function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────── */}
      <section className="hero" id="hero">
        <img src={imageAccueil} alt="Vue drone Noumène" className="hero__image" />
        <div className="hero__overlay" />

        <div className="hero__content">
          <p className="hero__subtitle">Charter en Polynésie Française</p>
          <h1 className="hero__title">L'Aventure Noumène</h1>
          <Link to="croisieres" smooth duration={600} offset={-60}>
            <button className="hero__cta">Découvrir nos croisières ↓</button>
          </Link>
        </div>

        {/* Decorative wave */}
        <div className="hero__wave">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path
              d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
              fill="var(--color-bg)"
            />
          </svg>
        </div>
        <div className="hero__pattern" />

        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ─── Cruises ──────────────────────────────────── */}
      <section className="section" id="croisieres">
        <div className="section__header">
          <span className="section__label">Explorez</span>
          <h2 className="section__title">Nos Croisières</h2>
          <div className="section__divider" />
        </div>

        <div className="cruises">
          <div className="cruises__grid">
            <div className="cruises__list">
              {cruises.map((c, i) => (
                <div className="cruise-card" key={i}>
                  <h3 className="cruise-card__name">{c.name}</h3>
                  <p className="cruise-card__islands">{c.islands}</p>
                </div>
              ))}
            </div>
            <div className="cruises__map">
              <img src={carte} alt="Carte de la Polynésie Française" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Image Divider ────────────────────────────── */}
      <div className="image-divider">
        <img src={imageLagon} alt="Lagon polynésien" />
      </div>

      {/* ─── Boat ─────────────────────────────────────── */}
      <section className="section section--alt" id="bateau">
        <div className="section__header">
          <span className="section__label">À bord</span>
          <h2 className="section__title">Le Bateau</h2>
          <div className="section__divider" />
        </div>

        <div className="boat">
          <div className="boat__grid">
            <div className="boat__gallery">
              {boatImages.map((src, i) => (
                <img src={src} alt={`Noumène photo ${i + 1}`} key={i} />
              ))}
            </div>

            <div className="boat__info">
              <p className="boat__description">
                <em>Noumène</em> est le catamaran idéal pour explorer les lagons
                paradisiaques de Polynésie — spacieux, confortable et
                sécurisant. 18 mètres de long pour 9 mètres de large.
              </p>

              <div className="boat__features">
                {features.map((f, i) => (
                  <div className="feature" key={i}>
                    <span className="feature__icon">{f.icon}</span>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Image Divider ────────────────────────────── */}
      <div className="image-divider">
        <img src={imageFlore} alt="Flore polynésienne" />
      </div>

      {/* ─── Pricing ──────────────────────────────────── */}
      <section className="section" id="tarifs">
        <div className="section__header">
          <span className="section__label">Réservation</span>
          <h2 className="section__title">Tarifs</h2>
          <div className="section__divider" />
        </div>

        <div className="pricing">
          <table className="pricing__table">
            <thead>
              <tr>
                <th>Durée</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((row, i) => (
                <tr key={i}>
                  <td>{row.period}</td>
                  <td className="price">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Contact ──────────────────────────────────── */}
      <section className="section section--alt" id="contact">
        <div className="section__header">
          <span className="section__label">Parlons-en</span>
          <h2 className="section__title">Contact</h2>
          <div className="section__divider" />
        </div>

        <div className="contact">
          <div className="contact__cards">
            <div className="contact-card">
              <div className="contact-card__icon">✉</div>
              <span className="contact-card__label">Email</span>
              <a href="mailto:elohim.carrau@gmail.com" className="contact-card__value">
                elohim.carrau@gmail.com
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-card__icon">☎</div>
              <span className="contact-card__label">Téléphone</span>
              <a href="tel:+33687847526" className="contact-card__value">
                +33 6 87 84 75 26
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;