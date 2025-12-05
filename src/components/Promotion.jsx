// ============================================================
// PROMOTION COMPONENT — OPENROOT (MODERNIZED / HARDENED)
// PURPOSE: TOP NAV WITH COMPANY ABOUT MODAL + SAFE REDIRECT
// VERSION: 2026.1 — ES2023+ / CLEAN / PRODUCTION-READY
// ============================================================

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  memo,
} from "react";

import { motion, AnimatePresence } from "framer-motion";
import "./styles/Promotion.css";

// ============================================================
// CONSTANTS — EASY TO UPDATE / REUSE
// ============================================================

const CLASS_URL = "https://openroot-classes-firebase.web.app/";
const TARGET = "_blank";
const WINDOW_FEATURES = "noopener,noreferrer";

// ============================================================
// UTIL: SAFE WINDOW OPEN WITH ERROR HANDLING
// TIME COMPLEXITY: O(1)
// ============================================================

async function safeRedirect(url) {
  try {
    if (!url || typeof url !== "string") {
      throw new Error("INVALID REDIRECT URL");
    }

    const win = window.open(url, TARGET, WINDOW_FEATURES);

    // EDGE CASE: POPUP BLOCKED
    if (!win) {
      console.warn("POPUP BLOCKED: TRY MANUAL NAVIGATION");
      window.location.href = url; // FALLBACK
    }

  } catch (error) {
    console.error("REDIRECT ERROR:", error.message);
    alert("UNABLE TO REDIRECT. PLEASE TRY AGAIN.");
  }
}

// ============================================================
// UTIL: TOGGLE STATE BASED ON CURRENT VALUE
// TIME COMPLEXITY: O(1)
// ============================================================

const toggleValue = (current, target) => (
  current === target ? "none" : target
);

// ============================================================
// MODAL ANIMATION CONFIG — PRE-COMPUTED (DSA STYLE)
// PREVENTS UNNECESSARY OBJECT CREATION INSIDE RENDER
// ============================================================

const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.28 },
};

const contentMotion = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -40, opacity: 0 },
  transition: { duration: 0.33 },
};

// ============================================================
// MAIN COMPONENT (MEMOIZED FOR PERFORMANCE)
// ============================================================

const Promotion = memo(function Promotion() {

  const [activeSection, setActiveSection] = useState("none");
  const modalRef = useRef(null);

  // ============================================================
  // REDIRECT HANDLER — STABLE FUNCTION
  // ============================================================

  const handleRedirect = useCallback(async () => {
    await safeRedirect(CLASS_URL);
  }, []);

  // ============================================================
  // ABOUT TOGGLE — O(1) TIME COMPLEXITY
  // ============================================================

  const toggleAbout = useCallback(() => {
    setActiveSection(prev => toggleValue(prev, "about"));
  }, []);

  // ============================================================
  // CLOSE HANDLER
  // ============================================================

  const handleClose = useCallback(() => {
    setActiveSection("none");
  }, []);

  // ============================================================
  // CLOSE MODAL ON ESCAPE KEY (ACCESSIBILITY + UX)
  // TIME COMPLEXITY: O(1)
  // ============================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  // ============================================================
  // FOCUS MODAL FOR ACCESSIBILITY
  // ============================================================

  useEffect(() => {
    if (activeSection === "about" && modalRef.current) {
      modalRef.current.focus();
    }
  }, [activeSection]);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section
      id="about-company"
      className="promotion-container"
      aria-label="About and Classes Navigation"
    >

      {/* ============ NAVIGATION BAR ============ */}
      <nav className="promotion-nav" role="navigation">

        <button
          className={`promo-btn ${activeSection === "about" ? "active" : ""}`}
          onClick={toggleAbout}
          aria-expanded={activeSection === "about"}
          aria-controls="about-modal"
        >
          About Company
        </button>

        <button
          className="promo-btn"
          onClick={handleRedirect}
        >
          Openroot Classes
        </button>

      </nav>

      {/* ============ ABOUT MODAL ============ */}
      <AnimatePresence>
        {activeSection === "about" && (
          <motion.div
            id="about-modal"
            key="about-modal"
            className="about-modal-overlay"
            {...overlayMotion}
          >

            <motion.div
              className="about-modal-content"
              {...contentMotion}
              ref={modalRef}
              role="dialog"
              tabIndex={-1}
              aria-modal="true"
              aria-labelledby="promo-heading"
            >

              {/* CLOSE BUTTON */}
              <button
                className="close-btn"
                onClick={handleClose}
                aria-label="Close About Company"
              >
                &times;
              </button>

              {/* SEO + ACCESSIBILITY TITLE */}
              <h2
                id="promo-heading"
                className="promo-heading"
              >
                About Openroot
              </h2>

              {/* CONTENT */}
              <article className="about-company-promo">

                <p>
                  <strong>At Openroot</strong>, we build modern technology that
                  empowers people and small businesses.
                </p>

                <p>
                  We create{" "}
                  <strong>
                    free-to-use financial tools, AI utilities, and productivity apps
                  </strong>{" "}
                  that simplify everyday tasks.
                </p>

                <p>
                  We also build{" "}
                  <strong>custom software solutions</strong>{" "}
                  for <strong>MSMEs</strong> to help them scale affordably
                  and efficiently.
                </p>

                <p>
                  Beyond software, Openroot is a platform for{" "}
                  <strong>skill development</strong>.
                </p>

                <p>Our expert-led programs include:</p>

                <ul>
                  <li>
                    💡 <strong>Prompt Engineering</strong> — AI workflows & automation.
                  </li>

                  <li>
                    💰 <strong>Financial Investing</strong> — Wealth-building fundamentals.
                  </li>
                </ul>

                <p>
                  <strong>Goal:</strong>{" "}
                  Opening new roots of innovation, opportunity, and growth.
                </p>

                <p>
                  Welcome to the future of modern learning and technology.
                  <br />
                  <strong>Welcome to Openroot.</strong>
                </p>

              </article>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
});

export default Promotion;
