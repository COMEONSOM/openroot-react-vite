// ============================================================
// PROMOTION COMPONENT — OPENROOT (2026 EDITION)
// PURPOSE: NAVBAR WITH COMPANY ABOUT MODAL + CLASS REDIRECT
// VERSION: 2025.8 (CLEAN SEO-SAFE VERSION)
// src/components/Promotion.jsx
// ============================================================

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Promotion.css";

export default function Promotion() {
  const [activeSection, setActiveSection] = useState("none");

  // ✅ Safe Redirect Handler
  const handleRedirect = () => {
    window.location.href = "https://openroot-classes-firebase.web.app";
  };

  // Close modal
  const handleClose = () => setActiveSection("none");

  return (
    <section className="promotion-container">
      {/* ===================== NAVBAR ===================== */}
      <div className="promotion-nav">
        <button
          className={`promo-btn ${activeSection === "about" ? "active" : ""}`}
          onClick={() =>
            setActiveSection(
              activeSection === "about" ? "none" : "about"
            )
          }
        >
          About Company
        </button>

        <button className="promo-btn" onClick={handleRedirect}>
          Openroot Classes
        </button>
      </div>

      {/* ===================== ABOUT COMPANY MODAL ===================== */}
      <AnimatePresence>
        {activeSection === "about" && (
          <motion.div
            key="about-modal"
            className="about-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="about-modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <button className="close-btn" onClick={handleClose}>
                &times;
              </button>

              <div className="about-company-promo">
                <p>
                  <strong>At Openroot</strong>, we believe in building technology
                  that truly empowers people.
                </p>

                <p>
                  We create{" "}
                  <strong>innovative, free-to-use software tools</strong> designed
                  to make your personal and professional life easier — from{" "}
                  <strong>financial utilities</strong> to{" "}
                  <strong>unique productivity applications</strong> found nowhere
                  else on the internet.
                </p>

                <p>
                  We also develop{" "}
                  <strong>custom software solutions</strong> for{" "}
                  <strong>small businesses</strong> needing powerful, affordable,
                  scalable online systems — because great technology shouldn’t come
                  with a heavy price tag.
                </p>

                <p>
                  Beyond development, <strong>Openroot</strong> is a place for{" "}
                  <strong>learning and growth</strong>.
                </p>

                <p>We offer expert-led classes in two modern skill areas:</p>

                <ul>
                  <li>
                    💡 <strong>Prompt Engineering</strong> — Master AI efficiently
                    and automate your tasks.
                  </li>
                  <li>
                    💰 <strong>Financial Investing</strong> — Learn smart investing
                    from beginner to advanced levels.
                  </li>
                </ul>

                <p>
                  Our mission: <br />
                  <strong>
                    Opening new roots of innovation, knowledge, and opportunity for
                    everyone.
                  </strong>
                </p>

                <p>
                  Welcome to the future of technology and learning. <br />
                  <strong>Welcome to Openroot.</strong>
                </p>

                <p>
                  Other registered domains: <strong>ulvoxo.com</strong> &{" "}
                  <strong>xfactorial.online</strong>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
