// ============================================================
// PROMOTION COMPONENT — OPENROOT (2026 EDITION)
// PURPOSE: MINIMAL NAVBAR WITH ABOUT COMPANY (MODAL) + CLASS REDIRECT
// VERSION: 2025.5
// ============================================================

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Promotion.css";

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Promotion() {
  const [activeSection, setActiveSection] = useState("none");

  const handleRedirect = () => {
    // 👉 Replace with your actual route or external URL
    window.location.href = "https://openroot-classes.web.app/";
  };

  const handleClose = () => setActiveSection("none");

  return (
    <section className="promotion-container">
      {/* ===================== NAV-LIKE HEADER ===================== */}
      <div className="promotion-nav">
        <button
          className={`promo-btn ${
            activeSection === "about" ? "active" : ""
          }`}
          onClick={() =>
            setActiveSection(activeSection === "about" ? "none" : "about")
          }
        >
          About Company
        </button>

        <button className="promo-btn" onClick={handleRedirect}>
          Openroot Classes
        </button>
      </div>

      {/* ===================== MODAL FOR ABOUT COMPANY ===================== */}
      <AnimatePresence>
        {activeSection === "about" && (
          <motion.div
            key="about-modal"
            className="about-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="about-modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
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
                  We create <strong>innovative, free-to-use software tools</strong>{" "}
                  designed to make your personal and professional life easier — from{" "}
                  <strong>financial utilities</strong> to{" "}
                  <strong>unique productivity applications</strong> that you won’t
                  find anywhere else on the internet.
                </p>

                <p>
                  But we don’t stop there. We also provide{" "}
                  <strong>custom software solutions</strong> for{" "}
                  <strong>small businesses</strong> that need powerful, affordable,
                  and scalable online platforms — because great technology shouldn’t
                  come with a heavy price tag.
                </p>

                <p>
                  Beyond development, <strong>OpenRoot</strong> is also a place for{" "}
                  <strong>learning and growth</strong>.
                </p>

                <p>We offer expert-led classes in two key areas shaping the future:</p>

                <ul>
                  <li>
                    💡 <strong>Prompt Engineering:</strong> Master how to work
                    efficiently with AI and automate your everyday tasks.
                  </li>
                  <li>
                    💰 <strong>Financial Investing:</strong> Learn how to invest
                    smartly — from beginner basics to advanced wealth strategies.
                  </li>
                </ul>

                <p>
                  Our mission is simple:
                  <br />
                  <strong>
                    To open new roots of innovation, knowledge, and opportunity for
                    everyone.
                  </strong>
                </p>

                <p>
                  Welcome to the future of technology and learning.
                  <br />
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
