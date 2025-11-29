// ===============================================
// PURE INTERSECTION OBSERVER HOOK (REACT 19 SAFE)
// ===============================================
import { useState, useEffect, useRef } from "react";

export default function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);

          // 🔥 Unobserve after first trigger for performance
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, ...options }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, inView];
}
