import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver hook – adds "visible" class when element enters viewport.
 * @param {number} threshold - 0-1
 * @param {string} rootMargin
 */
export function useReveal(threshold = 0.15, rootMargin = "0px 0px -60px 0px") {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}

/**
 * Staggered reveal – returns an array of [ref, visible] pairs.
 * @param {number} count
 * @param {number} staggerMs - ms delay between each
 */
export function useStaggerReveal(count, staggerMs = 120) {
  const refs = useRef([]);
  const [visibleSet, setVisibleSet] = useState(new Set());

  useEffect(() => {
    const observers = [];

    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleSet((prev) => new Set(prev).add(i));
            }, i * staggerMs);
            obs.unobserve(el);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [count, staggerMs]);

  const setRef = (i) => (el) => {
    refs.current[i] = el;
  };

  return { setRef, isVisible: (i) => visibleSet.has(i) };
}
