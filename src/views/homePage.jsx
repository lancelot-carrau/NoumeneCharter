import React, { useState, useRef, useCallback } from "react";
import { useReveal, useStaggerReveal } from "../hooks/useReveal";
import Lightbox from "../components/Lightbox";

// Styles
import "../style/hero.scss";
import "../style/sections.scss";

// Images
import imageAccueil from "../assets/images/vueDrone.jpg";
import imageBora from "../assets/images/Bora_cover.jpg";
import imageSkyview from "../assets/images/Skyview_cover.png";
import pont from "../assets/images/pont.jpg";
import famille from "../assets/images/famille.jpg";
import avant from "../assets/images/vueAvant.jpg";
import cockpit from "../assets/images/cockpit2.jpg";
import cabine from "../assets/images/cabineDouble.jpg";
import cabineDuo from "../assets/images/cabineDuo.jpg";
import carte from "../assets/images/Map_Polynesia.png";

/* ── Data ──────────────────────────────────────────────── */
const cruises = [
  { name: "Les Îles au Vent", islands: "Tahiti · Moorea" },
  { name: "Les Îles sous le Vent", islands: "Huahine · Raiatea · Tahaa · Bora-Bora" },
  { name: "Les Tuamotu", islands: "Rangiroa · Fakarava" },
  { name: "Les Marquises", islands: "Nuku Hiva · Hiva Oa" },
];

const features = [
  { icon: "⛵", text: "4 grandes cabines doubles" },
  { icon: "🚿", text: "4 salles de bains" },
  { icon: "🛋️", text: "1 canapé convertible" },
  { icon: "⚓", text: "2 cabines équipage" },
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
const marqueeText = "Tahiti · Moorea · Bora-Bora · Raiatea · Huahine · Tahaa · Nuku Hiva · Hiva Oa · Rangiroa · Fakarava";

/* ── Component ─────────────────────────────────────────── */
function HomePage() {
  /* Gallery scroll arrows */
  const galleryRef = useRef(null);
  const scrollGallery = useCallback((dir) => {
    const el = galleryRef.current;
    if (!el) return;
    const amount = 440;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  /* Lightbox state */
  const [lbIndex, setLbIndex] = useState(-1);
  const openLightbox = (i) => setLbIndex(i);
  const closeLightbox = () => setLbIndex(-1);
  const prevImage = () => setLbIndex((prev) => (prev - 1 + boatImages.length) % boatImages.length);
  const nextImage = () => setLbIndex((prev) => (prev + 1) % boatImages.length);

  /* Reveal hooks */
  const [cruisesLeftRef, cruisesLeftVis] = useReveal(0.15);
  const cruiseCards = useStaggerReveal(cruises.length, 150);
  const [boatHeaderRef, boatHeaderVis] = useReveal(0.15);
  const [boatInfoRef, boatInfoVis] = useReveal(0.1);
  const [pricingRef, pricingVis] = useReveal(0.1);
  const pricingRows = useStaggerReveal(pricing.length, 100);
  const [contactRef, contactVis] = useReveal(0.15);
  const [imgBreakRef, imgBreakVis] = useReveal(0.15);

  return (
    <>
      {/* ════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════ */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          <img src={imageAccueil} alt="Noumène vue drone" />
        </div>

        <div className="hero__content">
          <p className="hero__eyebrow">Charter en Polynésie Française</p>
          <h1 className="hero__title">
            L'Aventure<br />
            <span className="hero__title-italic">Noumène</span>
          </h1>
          <p className="hero__desc">
            Embarquez à bord d'un catamaran d'exception pour une croisière
            inoubliable au cœur des lagons polynésiens.
          </p>
          <button className="hero__cta" onClick={() => document.getElementById('cruises')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="cta-line" />
            Découvrir
          </button>
        </div>

        <span className="hero__side">Polynésie Française — 2025</span>

        <div className="hero__scroll-hint">
          <div className="hero__scroll-dot" />
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────── */}
      <div className="marquee">
        <div className="marquee__track">
          {[...Array(4)].map((_, i) => (
            <span className="marquee__item" key={i}>{marqueeText}</span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          01 – CRUISES
          ════════════════════════════════════════════════ */}
      <section className="cruises" id="cruises">
        <span className="sec-num">01</span>

        <div className="cruises__inner">
          <div
            className={`cruises__left reveal-left${cruisesLeftVis ? " visible" : ""}`}
            ref={cruisesLeftRef}
          >
            <p className="cruises__label">Explorez</p>
            <h2 className="cruises__title">Nos Croisières</h2>
            <div className="cruises__map">
              <img src={carte} alt="Carte Polynésie" />
            </div>
          </div>

          <div className="cruises__right">
            {cruises.map((c, i) => (
              <div
                key={i}
                ref={cruiseCards.setRef(i)}
                className={`cruise-card reveal-right${cruiseCards.isVisible(i) ? " visible" : ""}`}
              >
                <span className="cruise-card__num">0{i + 1}</span>
                <h3 className="cruise-card__name">{c.name}</h3>
                <p className="cruise-card__islands">{c.islands}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image break ──────────────────────────────── */}
      <div
        className={`img-break reveal-scale${imgBreakVis ? " visible" : ""}`}
        ref={imgBreakRef}
      >
        <img src={imageBora} alt="Bora-Bora" />
        <div className="img-break__overlay">
          <p className="img-break__text">"Le paradis existe, il est en Polynésie."</p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          02 – BOAT
          ════════════════════════════════════════════════ */}
      <section className="boat" id="boat">
        <span className="sec-num" style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}>
          02
        </span>

        <div
          className={`boat__header reveal${boatHeaderVis ? " visible" : ""}`}
          ref={boatHeaderRef}
        >
          <div>
            <p className="boat__label">À bord</p>
            <h2 className="boat__title">Le Bateau</h2>
          </div>
          <p className="boat__subtitle">
            18 m de long, 9 m de large — un catamaran spacieux, confortable
            et sécurisant.
          </p>
        </div>

        {/* Horizontal scroll gallery */}
        <div className="boat__gallery-wrap">
          <div className="boat__gallery" ref={galleryRef}>
            {boatImages.map((src, i) => (
              <div className="boat__gallery-item" key={i} onClick={() => openLightbox(i)} style={{ cursor: "pointer" }}>
                <img src={src} alt={`Noumène ${i + 1}`} />
                <span className="boat__gallery-num">0{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="boat__gallery-controls">
            <button className="boat__arrow boat__arrow--left" onClick={() => scrollGallery(-1)} aria-label="Précédent">
              ←
            </button>
            <button className="boat__arrow boat__arrow--right" onClick={() => scrollGallery(1)} aria-label="Suivant">
              →
            </button>
          </div>
          <div className="boat__gallery-hint">
            <span>← Glisser pour explorer →</span>
          </div>
        </div>

        <div
          className={`boat__info reveal${boatInfoVis ? " visible" : ""}`}
          ref={boatInfoRef}
        >
          <p className="boat__desc">
            <em>Noumène</em> est le catamaran idéal pour explorer les lagons
            paradisiaques de Polynésie — spacieux, confortable et sécurisant.
          </p>
          <div className="boat__features">
            {features.map((f, i) => (
              <div className="feat" key={i}>
                <span className="feat__icon">{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image break ──────────────────────────────── */}
      <div className="img-break">
        <img src={imageSkyview} alt="Vue aérienne Polynésie" />
      </div>

      {/* ════════════════════════════════════════════════
          03 – PRICING
          ════════════════════════════════════════════════ */}
      <section className="pricing" id="pricing">
        <span className="sec-num">03</span>

        <div
          className={`pricing__inner reveal${pricingVis ? " visible" : ""}`}
          ref={pricingRef}
        >
          <div className="pricing__header">
            <div>
              <p className="pricing__label">Réservation</p>
              <h2 className="pricing__title">Tarifs</h2>
            </div>
            <p className="pricing__subtitle">
              Tous nos tarifs incluent le skipper et l'hôtesse à bord.
            </p>
          </div>

          <div className="pricing__list">
            {pricing.map((row, i) => (
              <div
                key={i}
                ref={pricingRows.setRef(i)}
                className={`pricing__row reveal${pricingRows.isVisible(i) ? " visible" : ""}`}
              >
                <span className="pricing__period">{row.period}</span>
                <span className="pricing__price">{row.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          04 – CONTACT
          ════════════════════════════════════════════════ */}
      <section
        className={`contact reveal${contactVis ? " visible" : ""}`}
        id="contact"
        ref={contactRef}
      >
        <p className="contact__big">
          Prêt à larguer les amarres&nbsp;?
        </p>

        <div className="contact__cards">
          <a href="mailto:elohim.carrau@gmail.com" className="contact-card">
            <span className="contact-card__icon">✉</span>
            <div className="contact-card__text">
              <span className="contact-card__label">Email</span>
              <span className="contact-card__value">elohim.carrau@gmail.com</span>
            </div>
          </a>
          <a href="tel:+33687847526" className="contact-card">
            <span className="contact-card__icon">☎</span>
            <div className="contact-card__text">
              <span className="contact-card__label">Téléphone</span>
              <span className="contact-card__value">+33 6 87 84 75 26</span>
            </div>
          </a>
        </div>
      </section>

      {lbIndex >= 0 && (
        <Lightbox
          images={boatImages}
          index={lbIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}

export default HomePage;