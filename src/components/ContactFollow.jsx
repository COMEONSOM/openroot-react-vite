// ============================================================
// CONTACT-FOLLOW COMPONENT (SVG VERSION — SUPER LIGHTWEIGHT)
// AUTHOR: OPENROOT (2026 EDITION)
// VERSION: 2025.9 — PERFORMANCE OPTIMIZED
// ============================================================

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./styles/ContactFollow.css";

export default function ContactFollow() {
  const followRef = useRef(null);
  const contactRef = useRef(null);
  const clickSound = new Audio("/sounds/click.wav");

  useEffect(() => {
    // ENTRANCE ANIMATION (GSAP)
    [followRef, contactRef].forEach((ref) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current.children,
          { y: 30, opacity: 0, rotateX: 90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
          }
        );
      }
    });

    // CLICK SOUND
    const icons = document.querySelectorAll(".contact-icon");
    icons.forEach((icon) => {
      icon.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play();
      });
    });
  }, []);

  return (
    <section>
      <div className="contact-container">

        {/* ================= FOLLOW US ================= */}
        <div className="contact-box" ref={followRef}>
          <h2>Follow Us</h2>

          <div className="icon-row">

            {/* X (Twitter) */}
            <a
              href="https://x.com/comeonsom_"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon"
              aria-label="Follow on X"
            >
              <img src="/assets/x.svg" alt="X icon" className="contact-svg" />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/comeonsom"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon"
              aria-label="Follow on Facebook"
            >
              <img src="/assets/facebook.svg" alt="Facebook" className="contact-svg" />
            </a>

          </div>
        </div>

        {/* ================= CONTACT US ================= */}
        <div className="contact-box" ref={contactRef}>
          <h2>Contact Us</h2>

          <div className="icon-row">

            {/* WhatsApp */}
            <a
              href="https://wa.me/917866049865"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon"
              aria-label="WhatsApp"
            >
              <img src="/assets/whatsapp.svg" alt="WhatsApp" className="contact-svg" />
            </a>

            {/* Gmail */}
            <a
              href="mailto:connect.openroot@gmail.com"
              className="contact-icon"
              aria-label="Email"
            >
              <img src="/assets/gmail.svg" alt="Gmail" className="contact-svg" />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
