// ============================================================
//  NAVBAR COMPONENT — MODERN, CLEAN, PRODUCTION-READY
//  VERSION: 2025.7 — STABLE UID REDIRECT HANDLER
//  src/components/Navbar.jsx
// ============================================================

import React from "react";
import "./styles/Navbar.css";

// ============================================================
// 🔹 LOGIN STATUS CHECK FUNCTION
// ============================================================
const isUserLoggedIn = () => {
  try {
    return localStorage.getItem("isLoggedIn") === "true";
  } catch {
    return false;
  }
};

// ============================================================
// 🔹 GET CURRENT USER UID
// ============================================================
const getCurrentUID = () => {
  try {
    return (
      sessionStorage.getItem("openrootUserUID") ||
      localStorage.getItem("openrootUserUID") ||
      null
    );
  } catch {
    return null;
  }
};

// ============================================================
// 🔹 ASYNC REDIRECT FUNCTION — UID INJECTION + SAFEGUARD
// ============================================================
const redirectTo = async (url) => {
  try {
    if (!isUserLoggedIn()) {
      alert("⚠️ Please log in first to access this tool.");
      return;
    }

    if (!url || typeof url !== "string") throw new Error("INVALID URL PROVIDED");

    let finalURL = new URL(url);

    // ✅ Get UID & safely append as query param
    const userUID = getCurrentUID();
    if (userUID && !finalURL.searchParams.has("uid")) {
      finalURL.searchParams.set("uid", encodeURIComponent(userUID));
    }

    // ✅ Open safely in new tab after short delay
    await new Promise((resolve) => setTimeout(resolve, 60));
    console.log("🔹 Redirecting to:", url);
    console.log("🔹 UID:", getCurrentUID());

    window.open(finalURL.toString(), "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error("REDIRECTION FAILED:", error.message);
    alert("⚠️ Failed to open link. Please try again later.");
  }
};

// ============================================================
// 🔹 ICON COMPONENTS
// ============================================================
const Icons = {
  stockAveraging: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="28" height="28" role="img" aria-labelledby="sa6">
      <title id="sa6">Stock Averaging — bars merging to average</title>
      <rect x="3" y="10" width="2" height="5" rx="0.4"/>
      <rect x="7" y="8" width="2" height="7" rx="0.4"/>
      <rect x="11" y="6" width="2" height="9" rx="0.4"/>
      <rect x="15" y="8" width="2" height="7" rx="0.4"/>
      <rect x="19" y="10" width="2" height="5" rx="0.4"/>
      <circle cx="12" cy="17.5" r="1.2"/>
    </svg>
  ),
  sipAnalyzer: (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
      <path d="M10 2a8 8 0 0 1 6.3 12.8l4.9 4.9-1.4 1.4-4.9-4.9A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-2 7v3h1.5v-3H8zm2.5-2v5H12v-5h-1.5zm2.5 1v4h1.5v-4H13z"/>
    </svg>
  ),
  goldJewel: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="30" height="30">
      <path d="M12 2 2 9l10 13 10-13Zm0 2.69 6.93 4.68L12 20.1 5.07 9.37Z" />
    </svg>
  ),
  creditEmi: (
    <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2"></rect>
      <rect x="3.5" y="9" width="6" height="2" rx="0.6" fill="#fff"></rect>
      <text x="16" y="14" fontSize="7" textAnchor="middle" fill="#fff" fontFamily="sans-serif">₹</text>
    </svg>
  ),
  travelExpense: (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
      <path d="M3 15h18v5H3v-5Zm2 2v1h14v-1H5Z" />
      <path d="M6 10h12l2 3H4l2-3Z" />
      <circle cx="8" cy="20" r="1" />
      <circle cx="16" cy="20" r="1" />
      <path d="M2 5h8v2H2V5Zm10 0h3v2h-3V5Zm5 0h5v2h-5V5Z" />
      <path d="M20 12l2-2-1.5-1.5-2 2L20 12Z" />
    </svg>
  ),
  gradeCalculator: (
    <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <circle cx="8" cy="9" r="1.2" fill="#fff"/>
      <circle cx="12" cy="9" r="1.2" fill="#fff"/>
      <circle cx="16" cy="9" r="1.2" fill="#fff"/>
      <circle cx="8" cy="13" r="1.2" fill="#fff"/>
      <rect x="11" y="12" width="6" height="2" fill="#fff"/>
      <rect x="11" y="15" width="6" height="2" fill="#fff"/>
    </svg>
  ),
  helpingHand: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor" role="img" aria-labelledby="sa2">
      <title id="sa2">Helping Hand — balancing arrows</title>
      <path d="M6 4a1 1 0 0 0-1 1v3h3l4 4 2-2-3-3h3V5a1 1 0 0 0-1-1H6zM18 20a1 1 0 0 0 1-1v-3h-3l-4-4-2 2 3 3H8v3a1 1 0 0 0 1 1h8z"/>
    </svg>
  ),
};

// ============================================================
// 🔹 SOFTWARE DATA
// ============================================================
const releasedSoftwares = Object.freeze([
  { name: "Stock Averaging", href: "https://openroot.in/stock-averaging/", icon: Icons.stockAveraging },
  { name: "SIP Return Analyzer", href: "https://openroot.in/return-analyzer/", icon: Icons.sipAnalyzer },
  { name: "Gold Jewel Price Indicator", href: "https://openroot.in/gold-jewel-price-indicator/", icon: Icons.goldJewel },
  { name: "Credit Card EMI Analyzer", href: "https://openroot.in/openroot-creditcard-emi-analyzer/", icon: Icons.creditEmi },
  { name: "Travel Expense Manager", href: "https://openroot.in/openroot-travel-expense-manager/", icon: Icons.travelExpense },
  { name: "Makaut Grade Calculator", href: "https://openroot.in/openroot-makaut_grade_and_percentage-calculator/", icon: Icons.gradeCalculator },
  { name: "Helping Hand (Job Updates)", href: "https://openroot.in/openroot-helping-hand/", icon: Icons.helpingHand },
]);

// ============================================================
// 🔹 MAIN NAVBAR COMPONENT
// ============================================================
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* SECTION TITLE */}
        <h2 className="navbar-title">Released Softwares</h2>

        {/* SOFTWARE BUTTONS GRID */}
        <div className="released-softwares">
          {releasedSoftwares.map((app, index) => (
            <button
              key={app.name || index}
              className="software-btn"
              onClick={() => redirectTo(app.href)}
              aria-label={`Open ${app.name}`}
            >
              <div className="software-icon">{app.icon}</div>
              <span className="software-name">{app.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
