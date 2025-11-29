// ============================================================
// APP ROOT — OPENROOT FINANCIAL SYSTEMS
// GLOBAL SEO + LAZY BACKGROUND + ALL COMPONENTS
// VERSION: 2025.10 — FULL SEO + PERFORMANCE BUILD
// src/App.jsx
// ============================================================

import { Helmet } from "react-helmet-async";
import React, { Suspense } from "react"; // ⭐ Needed for lazy loading

// COMPONENTS
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AboutCompany from "./components/AboutCompany";
import Elements from "./components/Elements";
import ContactFollow from "./components/ContactFollow";
import Footer from "./components/Footer";
import Promotion from "./components/Promotion";

// ⭐ Lazy-loaded animation (major performance improvement)
const BackgroundAnimation = React.lazy(() =>
  import("./components/BackgroundAnimation")
);

import "./App.css";

// ============================================================
// MAIN APP COMPONENT
// ============================================================
export default function App() {
  return (
    <div className="app-wrapper">

      {/* 🔥 GLOBAL SEO FOR THE ENTIRE WEBSITE */}
      <Helmet>

        {/* ============================
            TITLE (Strong SEO weight)
        ============================ */}
        <title>Openroot Financial Systems</title>

        {/* ============================
            META TAGS (Ranking Boost)
        ============================ */}
        <meta
          name="description"
          content="Openroot offers modern financial tools, AI-powered utilities, business automation, and practical education for students & MSMEs. Explore calculators, SIP analyzers, stock averaging tools, and fintech utilities."
        />

        <meta
          name="keywords"
          content="Openroot, Openroot Financial Systems, fintech tools, AI tools, financial calculators, SIP analyzer, stock averaging calculator, MSME software, prompt engineering courses"
        />

        <meta name="author" content="Openroot" />
        <meta name="robots" content="index, follow" />

        {/* ============================
            CANONICAL URL
        ============================ */}
        <link rel="canonical" href="https://openroot.in" />

        {/* ============================
            OPEN GRAPH (Facebook / LinkedIn)
        ============================ */}
        <meta property="og:title" content="Openroot Financial Systems" />
        <meta
          property="og:description"
          content="Modern fintech & AI-powered financial tools for students, professionals, and MSMEs. Stock tools, calculators, and automation utilities."
        />
        <meta property="og:url" content="https://openroot.in" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://openroot.in/assets/company-icon.avif"
        />

        {/* ============================
            TWITTER CARDS
        ============================ */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Openroot Financial Systems" />
        <meta
          name="twitter:description"
          content="Explore modern fintech tools and AI utilities from Openroot."
        />
        <meta
          name="twitter:image"
          content="https://openroot.in/assets/company-icon.avif"
        />

        {/* ============================
            MOBILE VIEWPORT
        ============================ */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* ============================
            THEME COLOR (Android top bar)
        ============================ */}
        <meta name="theme-color" content="#0f172a" />

        {/* ============================
            ORGANIZATION SCHEMA (JSON-LD)
        ============================ */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Openroot Financial Systems",
              "url": "https://openroot.in",
              "logo": "https://openroot.in/assets/company-icon.avif",
              "description": "Modern fintech and AI-powered tools for students, professionals, and MSMEs.",
              "sameAs": [
                "https://www.facebook.com/openroothypersite"
              ]
            }
          `}
        </script>
      </Helmet>

      {/* ========================================
          LAZY-LOADED BACKGROUND ANIMATION
          ⚡ Boosts FCP / LCP / TBT massively!
      ========================================== */}
      <Suspense fallback={null}>
        <BackgroundAnimation />
      </Suspense>

      {/* 🔹 Main Sections */}
      <Header />
      <Promotion />
      <Navbar />
      <AboutCompany />
      <Elements />
      <ContactFollow />
      <Footer />
    </div>
  );
}
