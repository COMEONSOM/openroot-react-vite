// ============================================================
// ABOUTCOMPANY COMPONENT — SIMPLIFIED (WORK AREAS + WHY STAND OUT)
// AUTHOR: TEAM OPENROOT (2026 EDITION)
// VERSION: 2025.5
// ============================================================

import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import bulletAnimation from "../animations/bulletpoints.json";
import newTagAnimation from "../animations/newtaganimation.json";
import "./styles/AboutCompany.css";

// ============================================================
// CONSTANT DATA
// ============================================================
const WORK_AREAS = Object.freeze([
  {
    title: "OpenRoot Classes",
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
    text: "No Ads, No Gimmicks-ever. We Reinvest Every Rupee Back Into Improvement.",
  },
  {
    label: "TRANSPARENT PRICING:",
    text: "We Help Small Businesses With High-value Solutions at Low Cost, Focusing on Trust and Long-term Partnerships.",
  },
  {
    label: "SMALL TEAM, BIG IMPACT:",
    text: "A Passionate Team that Builds Different Softwares to Help People and Businesses Grow Digitally.",
  },
  {
    label: "EDUCATION & EMPOWERMENT:",
    text: "Through Our Classes, We Teach Prompt Engineering and Investing Methods to Equip Learners for the Future.",
  },
]);

// ============================================================
// PURE FUNCTION — RENDERS PARAGRAPHS SAFELY
// ============================================================
const renderParagraphs = (descArray = []) =>
  Array.isArray(descArray)
    ? descArray.map(([label, text], i) => (
        <p key={i}>
          <strong>{label}</strong> {text}
        </p>
      ))
    : null;

// ============================================================
// MAIN COMPONENT (SIMPLIFIED)
// ============================================================
export default function AboutCompany() {
  return (
    <section className="about-company-section">
      {/* ====================================================== */}
      {/* WORK AREA GRID */}
      {/* ====================================================== */}
      <motion.h2
        className="about-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Our Areas Of Working
      </motion.h2>

      <div className="work-grid">
        {WORK_AREAS.map(({ title, desc }, index) => (
          <motion.div
            key={title || index}
            className="work-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
          >
            {/* NEW TAG ANIMATION (OPTIONAL) */}
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
        className="why-ulvoxo"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2>Why Openroot Important?</h2>

        {HIGHLIGHTS.map(({ label, text }, i) => (
          <motion.div
            key={label || i}
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

        <div className="why-ulvoxo-final">
          At <strong>OpenRoot</strong>, we believe in transforming how people and
          small businesses use technology — through innovation, education, and
          accessibility. Thank you for joining us on this journey of growth and
          empowerment.
        </div>

        <p className="join-ulvoxo">
          Join Us And Experience The <strong>Openroot</strong> Difference!
        </p>
      </motion.div>
    </section>
  );
}

// ============================================================
// NOTES:
// • Removed intro + growth chart for modular separation
// • Component only renders “Work Area” + “Why Stand Out”
// • Still optimized for smooth animations and O(N) traversal
// ============================================================
