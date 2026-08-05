import React, { useState, useRef, useCallback, useEffect } from "react";
import { useReveal, useStaggerReveal } from "../hooks/useReveal";
import Lightbox from "../components/Lightbox";

// Styles
import "../style/hero.scss";
import "../style/sections.scss";

// Images
import imageAccueil from "../assets/images/vueDrone.jpg";
import imageBora from "../assets/images/banner1.jpeg";
import imageSkyview from "../assets/images/banner2.jpeg";
import pont from "../assets/images/pont.jpg";
import famille from "../assets/images/famille.jpg";
import avant from "../assets/images/vueAvant.jpg";
import cockpit from "../assets/images/cockpit2.jpg";
import cabine from "../assets/images/cabineDouble.jpg";
import cabineDuo from "../assets/images/cabineDuo.jpg";
import carte from "../assets/images/Map_Polynesia.png";
import vueArriere from "../assets/images/vueArriere.jpg";
import interieur from "../assets/images/interieur.jpg";
import sunset from "../assets/images/sunset.jpg";
import cockpitAlt from "../assets/images/cockpit.jpg";
import img1 from "../assets/images/20211114_111118.jpg";
import img2 from "../assets/images/20211210_103505.jpg";
import img3 from "../assets/images/20211216_115559.jpg";
import img4 from "../assets/images/20220203_173602.jpg";
import img5 from "../assets/images/20220320_181004.jpg";
import img6 from "../assets/images/20220320_181059.jpg";
import img7 from "../assets/images/20220320_181149.jpg";
import img8 from "../assets/images/20220320_181216.jpg";
import imgEC from "../assets/images/EC-2203-3762.jpg";
import img5668 from "../assets/images/IMG_5668.jpg";
import img7192463 from "../assets/images/img-7192463.jpg";
import img7232518 from "../assets/images/img-7232518.jpg";
import img7232599 from "../assets/images/img-7232599.jpg";
import imageFlore from "../assets/images/imageFlore.jpg";
import imageLagon from "../assets/images/imageLagon.jpg";
import skipperPhoto from "../assets/images/picture-skipper.jpg";
import whatsapp1 from "../assets/images/WhatsApp Image 2026-03-31 at 11.53.30 (2).jpeg";
import whatsapp2 from "../assets/images/WhatsApp Image 2026-03-31 at 11.53.31.jpeg";
import galerie10716 from "../assets/images/galerie-10716.jpg";
import galerie10823 from "../assets/images/galerie-10823.jpg";
import galerie10881 from "../assets/images/galerie-10881.jpg";
import galerie10897 from "../assets/images/galerie-10897.jpg";
import galerie10987 from "../assets/images/galerie-10987.jpg";
import galerie10991 from "../assets/images/galerie-10991.jpg";
import galerie10819Poster from "../assets/images/galerie-10819-poster.jpg";
import galerie10819Video from "../assets/videos/galerie-10819.mp4";

/* ── Data ──────────────────────────────────────────────── */
const cruises = [
  { 
    name: "Les Marquises", 
    islands: "Nuku Hiva · Hiva Oa · Fatu Hiva . . .",
    description: "Une nature puissante, envoûtante et luxuriante. Un peuple épris de ses traditions ancestrales. Un voyage loin du monde et hors du temps."
  },
  { 
    name: "Les Tuamotu", 
    islands: "Rangiroa · Fakarava · Tikehau · Ahe",
    description: "Là, vous y êtes. Les atols, le bleu turquoise des lagons, les poissons multicolores. Un pointillé de corail magique au milieu d'un Océan."
  },
  { 
    name: "Les Îles de la Société", 
    islands: "Tahiti · Moorea · Huahine · Raiatea · Tahaa · Bora-Bora · Maupiti",
    description: "Tahiti, des baleines, des lagons, des montagnes. Toute la Polynésie en concentrée. L'incontournable Bora Bora."
  },
  { 
    name: "À la carte", 
    islands: "Votre itinéraire personnalisé",
    description: "Créez votre voyage sur mesure, d'une semaine à trois mois. Composez l'itinéraire de vos rêves selon vos envies : plongée, snorkeling, randonnée, navigation, immersion culturelle ou farniente. Après tout, ce sont vos vacances !"
  },
];

const features = [
  { icon: "⛵", text: "4 grandes cabines doubles + 1 lit enfant" },
  { icon: "🚿", text: "4 salles de bains" },
  { icon: "🛋️", text: "1 canapé convertible" },
  { icon: "⚓", text: "2 cabines équipage" },
  { icon: "🚤", text: "1 zodiac" },
  { icon: "🏄", text: "1 paddle + 2 kayaks" },
];

const pricing = [
  { period: "1 semaine", price: "12 000 €" },
  { period: "10 jours", price: "16 000 €" },
  { period: "2 semaines", price: "20 000 €" },
  { period: "3 semaines", price: "30 000 €" },
  { period: "1 mois", price: "40 000 €" },
];

const boatImages = [
  pont, 
  avant, 
  cabine, 
  cockpit, 
  cabineDuo,
  vueArriere,
  interieur,
  sunset,
  cockpitAlt,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  imgEC,
  img5668,
  img7192463,
  img7232518,
  img7232599,
  whatsapp1,
  whatsapp2,
  galerie10716,
  galerie10823,
  galerie10881,
  galerie10897,
  galerie10987,
  galerie10991,
  { type: "video", src: galerie10819Video, poster: galerie10819Poster }
];

/* ── Component ─────────────────────────────────────────── */
function HomePage() {
  /* Gallery scroll arrows */
  const galleryRef = useRef(null);
  const galleryLoopRef = useRef(null);

  const renderGalleryMedia = (item, i) =>
    typeof item === "object" ? (
      <>
        <video src={item.src} poster={item.poster} muted loop autoPlay playsInline />
        <span className="boat__gallery-play">▶</span>
      </>
    ) : (
      <img src={item} alt={`Noumène ${i + 1}`} />
    );
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

  /* Auto-scroll gallery */
  useEffect(() => {
    const gallery = galleryRef.current;
    const loopMarker = galleryLoopRef.current;
    if (!gallery || !loopMarker) return;

    let scrollPosition = gallery.scrollLeft;
    const speed = 0.3; // pixels par frame (environ 18 pixels/seconde à 60fps)
    let animationId;

    const scroll = () => {
      if (!gallery || !loopMarker) return;

      // La deuxième série d'images commence exactement à cette position :
      // on boucle là plutôt qu'à scrollWidth/2, car ce dernier ne tient pas
      // compte de la largeur variable des cartes (responsive) et provoquait un saut visible.
      const loopWidth = loopMarker.offsetLeft;

      scrollPosition += speed;

      // Une fois la première série entièrement défilée, on revient au début :
      // grâce au spacer dupliqué en tête de chaque série, la position 0 et
      // la position loopWidth sont visuellement identiques → boucle sans couture.
      if (scrollPosition >= loopWidth) {
        scrollPosition -= loopWidth;
      }

      gallery.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  /* Reveal hooks */
  const [cruisesLeftRef, cruisesLeftVis] = useReveal(0.15);
  const cruiseCards = useStaggerReveal(cruises.length, 150);
  const [boatHeaderRef, boatHeaderVis] = useReveal(0.15);
  const [boatInfoRef, boatInfoVis] = useReveal(0.1);
  const [skipperRef, skipperVis] = useReveal(0.15);
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
            Embarquez à bord d'un catamaran spacieux à 2 ou à 10 pour une croisière
            inoubliable au cœur des lagons polynésiens.
          </p>
        </div>

        <span className="hero__side">Polynésie Française — 2025</span>

        <div className="hero__scroll-hint">
          <div className="hero__scroll-dot" />
          <div className="hero__scroll-line" />
        </div>
      </section>

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
                <p className="cruise-card__description">{c.description}</p>
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
            et sécurisant. Pour 2 ou 10 convives
          </p>
        </div>

        {/* Horizontal scroll gallery */}
        <div className="boat__gallery-wrap">
          <div className="boat__gallery" ref={galleryRef}>
            {/* Première série d'images */}
            <div className="boat__gallery-spacer" aria-hidden="true" />
            {boatImages.map((item, i) => (
              <div className="boat__gallery-item" key={`original-${i}`} onClick={() => openLightbox(i)} style={{ cursor: "pointer" }}>
                {renderGalleryMedia(item, i)}
                <span className="boat__gallery-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
            ))}
            {/* Duplication pour boucle sans couture — même spacer en tête que la 1ère série */}
            <div className="boat__gallery-spacer" aria-hidden="true" ref={galleryLoopRef} />
            {boatImages.map((item, i) => (
              <div className="boat__gallery-item" key={`duplicate-${i}`} onClick={() => openLightbox(i)} style={{ cursor: "pointer" }}>
                {renderGalleryMedia(item, i)}
                <span className="boat__gallery-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
            ))}
            <div className="boat__gallery-spacer" aria-hidden="true" />
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
            paradisiaques de Polynésie — un bateau spacieux, hors-norme, confortable et sécurisant.
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
          03 – SKIPPER
          ════════════════════════════════════════════════ */}
      <section 
        className={`skipper reveal${skipperVis ? " visible" : ""}`} 
        id="skipper"
        ref={skipperRef}
      >
        <span className="sec-num" style={{ color: "transparent", WebkitTextStroke: "1px rgba(0,100,100,0.15)" }}>
          03
        </span>

        <div className="skipper__inner">
          <div className="skipper__header">
            <p className="skipper__label">Votre capitaine</p>
            <h2 className="skipper__title">Elohim</h2>
          </div>
          <div className="skipper__content">
            <div className="skipper__photo">
              <img src={skipperPhoto} alt="Elohim - Skipper" />
            </div>
            <p className="skipper__text">
              Salut à tous ! Je porte d'autres casquettes que celle du skipper : aventurier, photographe, scientifique dans l'âme et bricoleur invétéré. On me dit voyageur infatigable ; à vrai dire, il est fort possible que le monde ait fini par tourner un peu moins vite que moi. Mon carburant ? Un enthousiasme permanent et une énergie à revendre, le tout emballé dans un calme olympien. Que ce soit pour du grand reportage, des expéditions scientifiques ou des traversées sportives de la Méditerranée au Pacifique en passant par l'Atlantique, j'ai passé ma vie à régler des voiles et sourire à la vie. Après deux tours du monde à la voile et des miliers de milliers de miles, j'ai compris que tous les chemins mènent en Polynésie. Et, elle a fini par avoir raison de moi (pour l'instant !). C'est ici que j'ai posé mon sac, et cela fait maintenant plus de dix ans que je sillonne ce paradis sans jamais m'en lasser. Chaque matin ici ressemble à mon premier jour. Je me suis donné comme mission de vous faire partager ce jardin d'Éden avec mon expérience de pro et ma passion de gamin. On ne se contente pas de flotter, on s'immerge. Je vous attends avec impatience.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          04 – PRICING
          ════════════════════════════════════════════════ */}
      <section className="pricing" id="pricing">
        <span className="sec-num">04</span>

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
              Tous nos tarifs incluent le skipper , une hôtesse, le gasoil et la nourriture pour 4.
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
          05 – CONTACT
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
              <span className="contact-card__label">WhatsApp</span>
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
