// ============================================================
// ABOUTCOMPANY COMPONENT — LAZY OBSERVER RESTORED (NO CONTENT CHANGE)
// Version: 2025.10 — Animations restored, performance kept
// ============================================================

import React, { memo } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

import bulletAnimation from "../animations/bulletpoints.json";
import "./styles/AboutCompany.css";

// ============================================================
// CONSTANT DATA (YOUR ORIGINAL TEXT — UNMODIFIED)
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
// PURE FUNCTION
// ============================================================
const renderParagraphs = (arr = []) =>
  arr.map(([label, text], i) => (
    <p key={i}>
      <strong>{label}</strong> {text}
    </p>
  ));

// ============================================================
// MAIN COMPONENT — EXACT CONTENT, ANIMATIONS RESTORED
// ============================================================
function AboutCompany() {
  return (
    <>
      <Helmet>
        <title>About Openroot | Empowering Students & Small Businesses</title>
        <meta
          name="description"
          content="Learn about Openroot — a technology and education platform helping students and MSMEs through affordable courses and powerful software solutions designed for real-world growth."
        />
        <meta
          name="keywords"
          content="Openroot, Openroot Hypersite, Travel Expense Manager, Openroot Classes, Software Solutions, MSME software, investing education, prompt engineering, business automation"
        />
      </Helmet>

      <section id="about-company" className="about-company-section">
        <motion.h2
          className="about-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
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
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <h3>{title}</h3>
              {renderParagraphs(desc)}
            </motion.div>
          ))}
        </div>

        <motion.div
          id="why-openroot"
          className="why-openroot"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Why Openroot Important?</h2>

          {HIGHLIGHTS.map(({ label, text }, i) => (
            <motion.div
              key={label}
              className="highlight-point"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
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
            At <strong>Openroot</strong>, we believe in transforming how people
            and small businesses use technology — through innovation, education,
            and accessibility. Thank you for joining us on this journey of
            growth and empowerment.
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
