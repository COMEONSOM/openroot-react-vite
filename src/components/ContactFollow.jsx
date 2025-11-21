// ============================================================
// CONTACT-FOLLOW COMPONENT
// AUTHOR: TEAM OPENROOT (2026 EDITION)
// VERSION: 2025.7
// src/components/ContactFollow.jsx
// ============================================================
import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";
import "./styles/ContactFollow.css";

// Import your Lottie JSON files
import twitterAnim from "../animations/twitter.json";
import facebookAnim from "../animations/facebook.json";
import whatsappAnim from "../animations/whatsapp.json";
import gmailAnim from "../animations/gmail.json";

export default function ContactFollow() {
  const followRef = useRef(null);
  const contactRef = useRef(null);
  const clickSound = new Audio("/sounds/click.wav");

  useEffect(() => {
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
        {/* FOLLOW US */}
        <div className="contact-box" ref={followRef}>
          <h2>Follow Us</h2>
          <div className="icon-row">
            <a
              href="https://x.com/comeonsom_"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon"
            >
              <div className="lottie-wrapper">
                <Lottie animationData={twitterAnim} loop={true} style={{ width: 40, height: 40 }}/>
              </div>
            </a>
            <a
              href="https://www.facebook.com/comeonsom"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon"
            > 
              <div className="lottie-wrapper">
                <Lottie className= "facebookanimation" animationData={facebookAnim} loop={true} style={{ width: 50, height: 50 }} />
              </div>
            </a>
          </div>
        </div>

        {/* CONTACT US */}
        <div className="contact-box" ref={contactRef}>
          <h2>Contact Us</h2>
          <div className="icon-row">
            <a
              href="https://wa.me/917866049865"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon"
            >
              <div className="lottie-wrapper">
                <Lottie animationData={whatsappAnim} loop={true} style={{ width: 50, height: 50 }} />
              </div>
            </a>
            <a
              href="mailto:xuserplatform@gmail.com"
              className="contact-icon"
            >
              <div className="lottie-wrapper">
                <Lottie animationData={gmailAnim} loop={true} style={{ width: 50, height: 50 }} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
