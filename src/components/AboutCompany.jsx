// ============================================================
// ABOUT COMPANY — OPENROOT 2026 CLEAN LAYOUT EDITION
// Simplified structure • Subtle animations • Story-first UX
// ============================================================

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import "./styles/AboutCompany.css";

// ============================================================
// ANIMATION CONFIG
// ============================================================

const sectionFade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.6 },
};

const smallStagger = (idx) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, delay: idx * 0.06 },
});

// ============================================================
// MAIN COMPONENT
// ============================================================

function AboutCompany() {
  return (
    <>
      {/* =================== SEO =================== */}
      <Helmet>
        <title>About Openroot | Empowering Students & Small Businesses</title>
        <meta
          name="description"
          content="Openroot builds free finance utilities, AI tools, and custom software solutions for students and MSMEs — with a focus on transparency, education, and long-term growth."
        />
        <meta
          name="keywords"
          content="Openroot, Openroot Hypersite, Travel Expense Manager, Openroot Classes, Software Solutions, MSME software, investing education, prompt engineering, business automation, AI utilities"
        />
      </Helmet>

      {/* =================== ABOUT COMPANY =================== */}
      <section id="about-company" className="about-company">
        <div className="about-company__inner">
          {/* ========== WHO WE ARE ========== */}
          <motion.section
            className="about-section about-section--hero"
            initial={sectionFade.initial}
            whileInView={sectionFade.whileInView}
            viewport={sectionFade.viewport}
            transition={sectionFade.transition}
          >
            <p className="about-section__eyebrow">About Openroot</p>
            <h1 className="about-section__title">Who We Are</h1>

            <div className="about-section__content">
              <p>
                At <strong>Openroot</strong>, we build modern digital technology
                that empowers people and small businesses to do more with less
                effort.
              </p>

              <p>
                We create{" "}
                <strong>
                  free-to-use financial utilities, AI-powered tools, and
                  productivity apps
                </strong>{" "}
                that simplify everyday tasks — from managing expenses and
                planning investments to automating workflows and staying
                organized.
              </p>

              <p>
                We also build <strong>custom software solutions</strong> for{" "}
                <strong>MSMEs</strong>, helping them scale affordably and
                efficiently with practical, real-world systems instead of
                over-engineered complexity.
              </p>

              <p>
                Beyond software, Openroot is a platform for{" "}
                <strong>skill development and empowerment</strong>. Through our
                classes and resources, we help students, working professionals,
                and small business owners become confident in using technology,
                AI, and finance to improve their lives.
              </p>
            </div>
          </motion.section>

          {/* ========== WHAT WE OFFER ========== */}
          <motion.section
            className="about-section"
            initial={sectionFade.initial}
            whileInView={sectionFade.whileInView}
            viewport={sectionFade.viewport}
            transition={sectionFade.transition}
          >
            <h2 className="about-section__title">What We Offer</h2>

            <div className="offer-grid">
              {/* -------- Openroot Classes -------- */}
              <motion.article
                className="offer-card"
                initial={smallStagger(0).initial}
                whileInView={smallStagger(0).whileInView}
                viewport={smallStagger(0).viewport}
                transition={smallStagger(0).transition}
              >
                <div className="offer-card__tag">Openroot Classes</div>
                <h3 className="offer-card__title">Learn Skills That Actually Help</h3>

                <p className="offer-card__intro">
                  <strong>Openroot Classes</strong> is our education arm — a
                  financial-literacy and investing-education initiative for{" "}
                  <strong>students, beginners, and MSMEs</strong> who want
                  practical skills, not just theory.
                </p>

                <p>
                  We believe high-quality, in-depth learning shouldn’t break the
                  bank. That’s why our programs are{" "}
                  <strong>affordable, ad-free, and transparent</strong>, with a
                  deep focus on real-life application instead of textbook-style
                  content.
                </p>

                <div className="offer-card__subheading">
                  Our expert-led programs include:
                </div>

                <ul className="offer-card__list">
                  <li>
                    <strong>Prompt Engineering</strong> — Learn how to design{" "}
                    <strong>AI workflows and automations</strong> that can help
                    in content creation, data handling, business operations, and
                    day-to-day productivity.
                  </li>
                  <li>
                    <strong>Financial Investing</strong> — Understand{" "}
                    <strong>
                      wealth-building fundamentals, risk management, and
                      long-term investing strategies
                    </strong>{" "}
                    so you can make confident financial decisions instead of
                    guessing or following hype.
                  </li>
                </ul>

                <p className="offer-card__note">
                  Our goal is simple — to make people{" "}
                  <strong>future-ready</strong> by combining technology,
                  financial literacy, and practical skill-building in one place.
                </p>
              </motion.article>

              {/* -------- Software Solutions -------- */}
              <motion.article
                className="offer-card"
                initial={smallStagger(1).initial}
                whileInView={smallStagger(1).whileInView}
                viewport={smallStagger(1).viewport}
                transition={smallStagger(1).transition}
              >
                <div className="offer-card__tag">
                  Software Solutions
                </div>
                <h3 className="offer-card__title">
                  Software Built for Real-World Businesses
                </h3>

                <p className="offer-card__intro">
                  Under <strong>Software Solutions</strong>, we design and build{" "}
                  <strong>
                    custom digital tools, web apps, and automation systems
                  </strong>{" "}
                  for micro and small enterprises that need strong online
                  systems at practical, sustainable pricing.
                </p>

                <p>
                  Our work is focused on enabling businesses that often don’t
                  have access to expensive software, in-house tech teams, or
                  complex tools — but still need{" "}
                  <strong>reliable, long-term digital systems</strong> to grow.
                </p>

                <div className="offer-card__subheading">
                  We help MSMEs with:
                </div>

                <ul className="offer-card__list">
                  <li>
                    <strong>Business automation</strong> to reduce repetitive
                    manual tasks and save time.
                  </li>
                  <li>
                    <strong>Custom applications & portals</strong> built
                    specifically for their workflows instead of forcing them to
                    adjust to generic tools.
                  </li>
                  <li>
                    <strong>Practical, scalable architectures</strong> designed
                    to grow with the business without unnecessary complexity.
                  </li>
                </ul>

                <p className="offer-card__note">
                  Every solution is meant to be{" "}
                  <strong>understandable, maintainable, and truly helpful</strong>{" "}
                  — not just impressive on paper.
                </p>
              </motion.article>
            </div>
          </motion.section>

          {/* ========== WHY CHOOSE OPENROOT ========== */}
          <motion.section
            className="about-section"
            initial={sectionFade.initial}
            whileInView={sectionFade.whileInView}
            viewport={sectionFade.viewport}
            transition={sectionFade.transition}
          >
            <h2 className="about-section__title">Why Choose Openroot?</h2>

            <div className="reasons-grid">
              {[
                {
                  title: "User-First Always",
                  body: "No ads. No gimmicks. No dark patterns. We focus on building trust by respecting user time, data, and attention.",
                },
                {
                  title: "Transparent & Accessible Pricing",
                  body: "We design high-value solutions for students and small businesses at prices that make sense for them, not just for big companies.",
                },
                {
                  title: "Small Team, Big Impact",
                  body: "We are a lean, focused team that loves building tools that solve concrete problems instead of chasing trends.",
                },
                {
                  title: "Education & Empowerment",
                  body: "We don’t just give tools — we teach people how to use technology, AI, and investing methods to create real change in their own lives.",
                },
              ].map((item, idx) => (
                <motion.article
                  key={item.title}
                  className="reason-card"
                  initial={smallStagger(idx).initial}
                  whileInView={smallStagger(idx).whileInView}
                  viewport={smallStagger(idx).viewport}
                  transition={smallStagger(idx).transition}
                >
                  <div className="reason-card__icon" aria-hidden="true">
                    <span>✔</span>
                  </div>
                  <div className="reason-card__body">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* ========== OUR MISSION & CTA ========== */}
          <motion.section
            className="about-section about-section--mission"
            initial={sectionFade.initial}
            whileInView={sectionFade.whileInView}
            viewport={sectionFade.viewport}
            transition={sectionFade.transition}
          >
            <h2 className="about-section__title">Our Mission</h2>

            <div className="mission-block">
              <p>
                Our mission is to{" "}
                <strong>
                  open new roots of innovation, opportunity, and digital
                  independence
                </strong>{" "}
                for people and small businesses.
              </p>

              <p>
                We believe that everyone deserves access to{" "}
                <strong>smart technology, financial knowledge, and future-ready skills</strong>{" "}
                — regardless of income, background, or location.
              </p>

              <p>
                Whether it’s through a simple finance tool, a powerful AI
                workflow, or an in-depth class,{" "}
                <strong>Openroot exists to remove barriers</strong> and make
                growth more achievable. Let’s grow together,{" "}
                <strong>Let's choose Openroot.</strong>
              </p>
            </div>

            <div className="cta-block">

              {/* Optional CTA buttons — link these to real routes if available */}
              <div className="cta-block__actions">
                <a href="/tools" className="cta-btn">
                  Explore Our Tools
                </a>
                <a href="https://openroot-classes-firebase.web.app/" className="cta-btn cta-btn--ghost">
                  Learn with Openroot Classes
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </section>
    </>
  );
}

export default memo(AboutCompany);
