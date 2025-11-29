// ============================================================
// ABOUTCOMPANY COMPONENT — SEO OPTIMIZED (2026 PRODUCTION)
// Version: 2025.9 — Same Design, Better Structure
// No UI/Animation changes. Only SEO + production improvements.
// ============================================================

import React, { memo } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

import bulletAnimation from "../animations/bulletpoints.json";
import newTagAnimation from "../animations/newtaganimation.json";
import "./styles/AboutCompany.css";

// ============================================================
// CONSTANT DATA — PURE & IMMUTABLE
// ============================================================
const WORK_AREAS = Object.freeze([
  {
    title: "Openroot Classes",
    desc: [
      [
        "WHAT IT IS:",
        "A financial-literacy and investing-education platform for MSMEs and college students.",
      ],
      [
        "WHY IT EXISTS:",
        "High-quality, in-depth courses shouldn’t break the bank. OpenRoot offers affordable, ad-free, transparent education with deep practical focus.",
      ],
    ],
  },
  {
    title: "Software Solutions",
    desc: [
      [
        "WHAT IT IS:",
        "Custom-built digital tools and business automation services for small companies that need strong online systems at affordable prices.",
      ],
      [
        "WHY IT EXISTS:",
        "To empower micro and small enterprises with scalable, data-driven software systems designed for real-world challenges.",
      ],
    ],
  },
]);

const HIGHLIGHTS = Object.freeze([
  {
    label: "USER-FIRST PHILOSOPHY:",
    text: "No Ads, No Gimmicks-ever. We reinvest every rupee back into improvement.",
  },
  {
    label: "TRANSPARENT PRICING:",
    text: "We help small businesses with high-value solutions at low cost, focusing on trust and long-term partnerships.",
  },
  {
    label: "SMALL TEAM, BIG IMPACT:",
    text: "A passionate team that builds unique software to help individuals and businesses grow digitally.",
  },
  {
    label: "EDUCATION & EMPOWERMENT:",
    text: "Through our classes, we teach prompt engineering and investing methods to equip learners for the future.",
  },
]);

// ============================================================
// PURE RENDERER (No re-renders unless props change)
// ============================================================
const renderParagraphs = (arr = []) =>
  Array.isArray(arr)
    ? arr.map(([label, text], idx) => (
        <p key={idx}>
          <strong>{label}</strong> {text}
        </p>
      ))
    : null;

// ============================================================
// MAIN COMPONENT (SEO-BOOSTED, CLEAN, NO UI CHANGES)
// ============================================================
function AboutCompany() {
  return (
    <>
      {/* 🔥 SEO FOR THIS SECTION ONLY */}
      <Helmet>
        <title>About Openroot | Empowering Students & MSMEs</title>
        <meta
          name="description"
          content="Openroot develops powerful software tools, financial utilities, and modern education programs for students and MSMEs. Discover our mission, values, and work areas."
        />
        <meta
          name="keywords"
          content="Openroot, fintech, MSME tools, education platform, prompt engineering, investing classes, software development"
        />
        <link rel="canonical" href="https://openroot.in/#about-company" />
      </Helmet>

      <section
        id="about-company"
        className="about-company-section"
        aria-labelledby="about-company-heading"
      >
        {/* ====================================================== */}
        {/* WORK AREAS */}
        {/* ====================================================== */}
        <motion.h2
          id="about-company-heading"
          className="about-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Areas Of Working
        </motion.h2>

        <div className="work-grid">
          {WORK_AREAS.map(({ title, desc }, idx) => (
            <motion.div
              key={title}
              className="work-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              {/* Optional NEW badge */}
              {title.toUpperCase().includes("UPDATE") && (
                <div className="new-badge-animation">
                  <Lottie
                    animationData={newTagAnimation}
                    loop
                    autoplay
                    style={{
                      width: 50,
                      height: 50,
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  />
                </div>
              )}

              <h3>{title}</h3>
              {renderParagraphs(desc)}
            </motion.div>
          ))}
        </div>

        {/* ====================================================== */}
        {/* WHY OPENROOT STANDS OUT */}
        {/* ====================================================== */}
        <motion.div
          id="why-openroot"
          className="why-openroot"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Why Openroot Important?</h2>

          {HIGHLIGHTS.map(({ label, text }, i) => (
            <motion.div
              key={label}
              className="highlight-point"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="bullet-animation">
                <Lottie animationData={bulletAnimation} loop autoplay />
              </div>

              <p>
                <strong>{label}</strong> {text}
              </p>
            </motion.div>
          ))}

          <div className="why-openroot-final">
            At <strong>OpenRoot</strong>, we believe in transforming how people
            and small businesses use technology—through innovation, education,
            and accessibility.
          </div>

          <p className="join-openroot">
            Join Us And Experience The <strong>Openroot</strong> Difference!
          </p>
        </motion.div>
      </section>
    </>
  );
}

export default memo(AboutCompany);
