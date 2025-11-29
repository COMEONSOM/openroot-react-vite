// ============================================================
// PROMOTION COMPONENT — OPENROOT (2026 EDITION)
// PURPOSE: TOP NAV WITH COMPANY ABOUT MODAL + CLASS REDIRECT
// VERSION: 2025.10 — SEO + PERFORMANCE ENHANCED
// src/components/Promotion.jsx
// ============================================================

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Promotion.css";

export default function Promotion() {
  const [activeSection, setActiveSection] = useState("none");

  // ============================================================
  // SAFE REDIRECT — Prevents blank redirects / JS blocking
  // ============================================================
  const handleRedirect = useCallback(() => {
    window.open(
      "https://openroot-classes-firebase.web.app/",
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  // ============================================================
  // HANDLE ABOUT TOGGLE
  // ============================================================
  const toggleAbout = useCallback(() => {
    setActiveSection((prev) => (prev === "about" ? "none" : "about"));
  }, []);

  const handleClose = useCallback(() => {
    setActiveSection("none");
  }, []);

  return (
    <section
      id="about-company"
      className="promotion-container"
      aria-label="About and Classes Navigation"
    >
      {/* ===================== NAVBAR ===================== */}
      <div className="promotion-nav">
        <button
          className={`promo-btn ${activeSection === "about" ? "active" : ""}`}
          onClick={toggleAbout}
          aria-expanded={activeSection === "about"}
          aria-controls="about-modal"
        >
          About Company
        </button>

        <button className="promo-btn" onClick={handleRedirect}>
          Openroot Classes
        </button>
      </div>

      {/* ===================== ABOUT MODAL ===================== */}
      <AnimatePresence>
        {activeSection === "about" && (
          <motion.div
            id="about-modal"
            key="about-modal"
            className="about-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <motion.div
              className="about-modal-content"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.33 }}
            >
              {/* CLOSE BUTTON */}
              <button
                className="close-btn"
                onClick={handleClose}
                aria-label="Close about company section"
              >
                &times;
              </button>

              {/* SEO Heading */}
              <h2 className="promo-heading">About Openroot</h2>

              {/* CONTENT */}
              <div className="about-company-promo">
                <p>
                  <strong>At Openroot</strong>, we build modern technology that
                  empowers people and small businesses.
                </p>

                <p>
                  We create{" "}
                  <strong>free-to-use financial tools, AI utilities, and unique productivity apps</strong>{" "}
                  that simplify everyday tasks.
                </p>

                <p>
                  We also build{" "}
                  <strong>custom software solutions</strong> for{" "}
                  <strong>MSMEs</strong> to help them scale affordably and
                  efficiently.
                </p>

                <p>
                  Beyond software, Openroot is a platform for{" "}
                  <strong>skill development</strong>.
                </p>

                <p>Our expert-led programs include:</p>

                <ul>
                  <li>
                    💡 <strong>Prompt Engineering</strong> — Learn AI workflow
                    optimization and automation.
                  </li>
                  <li>
                    💰 <strong>Financial Investing</strong> — Master personal
                    finance and wealth-building fundamentals.
                  </li>
                </ul>

                <p>
                  <strong>Goal: </strong>  
                   opening new roots of innovation, opportunity, and growth.
                </p>

                <p>
                  Welcome to the future of modern learning and technology.  
                  <strong>Welcome to Openroot.</strong>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
