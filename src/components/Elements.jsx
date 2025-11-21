// ============================================================
// ELEMENTS COMPONENT 
// AUTHOR: TEAM OPENROOT (2026 EDITION)
// VERSION: 2025.7
// src/components/Elements.jsx
// ============================================================
import { useEffect, useRef } from "react";
import "./styles/Elements.css";

export default function Elements() {
  const newTagRef2 = useRef(null);

  useEffect(() => {
    const pulse = (el) => {
      if (el) {
        el.animate(
          [
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(1.2)", opacity: 0.7 },
            { transform: "scale(1)", opacity: 1 },
          ],
          {
            duration: 1500,
            iterations: Infinity,
            easing: "ease-in-out",
          }
        );
      }
    };

    pulse(newTagRef2.current);
  }, []);

  return (
    <div className="elements-container">
      {/* Section 1 */}
      <div
        className="section-card"
        onClick={() =>
          window.open("https://www.facebook.com/openroothypersite", "_blank")
        }
      >
        <div className="text-group">
          <div className="section-title-container">
            <h2 className="section-title">Openroot Has A Heart</h2>
          </div>
          <div className="bio-container">
            <p className="bio emergency-bio">
              Openroot Has A Heart is where stories breathe—unfiltered,
              unpolished. It’s not a platform, not a brand—just a space where
              emotions are allowed to exist without explanation. We share
              moments of love, loss, hope, fear, and quiet courage. Some stories
              comfort, others ache—but all remind us that behind every face is a
              heart carrying something unseen. This isn’t about being perfect.
              It’s about being real.
            </p>
          </div>
        </div>
        <div className="cta-button">Join Us →</div>
      </div>
    </div>
  );
}
