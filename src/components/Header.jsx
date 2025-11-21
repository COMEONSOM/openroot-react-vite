/**
 * ============================================================
 * HEADER COMPONENT — OPENROOT
 * MODERNIZED VERSION (ES2023+, OPTIMIZED, PRODUCTION-READY)
 * VERSION: 2025.7
 * src/components/Header.jsx
 * ============================================================
 * FEATURES:
 * FIREBASE AUTH — ROBUST SESSION SYNC
 * ERROR HANDLING — EDGE-CASE SAFE
 * TIME COMPLEXITY — O(1) OPERATIONS
 * PERFORMANCE — MINIMAL RE-RENDERS
 * ============================================================
 */

import { useState, useEffect, useCallback, memo } from "react";
import Lottie from "lottie-react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../lib/firebase";
import LoginModal from "./LoginModal";
import loginAnimation from "../animations/login.json";
import "./styles/Header.css";

/**
 * ============================================================
 * UTILITY FUNCTION: SAFE SET USER
 * ENSURES COMPONENT DOESN’T SET STATE ON UNMOUNT
 * ============================================================
 */
const useSafeAuthListener = (setUser) => {
  useEffect(() => {
    let isMounted = true;

    // LISTEN TO FIREBASE AUTH CHANGES
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (isMounted) {
        setUser(firebaseUser ?? null); // ✅ NULL COALESCING
      }
    });

    // CLEANUP TO AVOID MEMORY LEAKS
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [setUser]);
};

/**
 * ============================================================
 * UTILITY FUNCTION: FALLBACK AVATAR CHARACTER
 * GETS FIRST CHARACTER FROM DISPLAY NAME OR DEFAULT 'U'
 * ============================================================
 */
const getUserInitial = (user) =>
  user?.displayName?.charAt(0)?.toUpperCase() ?? "U";

/**
 * ============================================================
 * COMPONENT: USER AVATAR
 * SHOWS IMAGE IF AVAILABLE, OTHERWISE FALLBACK CHARACTER
 * ============================================================
 */
const UserAvatar = memo(({ user }) => {
  if (!user) return null;

  // RENDER AVATAR IMAGE IF AVAILABLE
  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt="User avatar"
        className="avatar"
        onError={(e) => {
          // ✅ HANDLE IMAGE LOAD FAILURE
          e.currentTarget.style.display = "none";
        }}
        loading="lazy" // ✅ PERFORMANCE OPTIMIZATION
        draggable="false"
      />
    );
  }

  // OTHERWISE SHOW FALLBACK CHARACTER
  return <div className="avatar-fallback">{getUserInitial(user)}</div>;
});

/**
 * ============================================================
 * COMPONENT: HEADER
 * MAIN ENTRY — HANDLES LOGIN STATE, UI, AND USER SESSION
 * ============================================================
 */
const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ HOOK TO KEEP FIREBASE SESSION SYNCED
  useSafeAuthListener(setUser);

  /**
   * ============================================================
   * HANDLER: LOGIN SUCCESS CALLBACK
   * SETS USER AFTER MODAL LOGIN COMPLETION
   * ============================================================
   */
  const handleLoginSuccess = useCallback((firebaseUser) => {
    try {
      if (!firebaseUser) throw new Error("Invalid user data.");
      setUser(firebaseUser);
    } catch (err) {
      console.error("LOGIN ERROR:", err);
    }
  }, []);

  /**
   * ============================================================
   * HANDLER: PROFILE CLICK
   * OPEN PROFILE SECTION (LOCAL SESSION FLAG)
   * ============================================================
   */
  const handleProfileClick = useCallback(() => {
    try {
      sessionStorage.setItem("openrootOpenProfileDetails", "1"); // 🔥 UPDATED KEY
      setIsLoginOpen(true);
    } catch (err) {
      console.error("PROFILE SESSION ERROR:", err);
    }
  }, []);

  /**
   * ============================================================
   * HANDLER: LOGIN BUTTON CLICK
   * OPEN LOGIN MODAL SAFELY
   * ============================================================
   */
  const handleLoginClick = useCallback(() => {
    setIsLoginOpen(true);
  }, []);

  return (
    <header className="header" role="banner">
      {/* ============================================================
           LEFT SIDE: COMPANY LOGO
           ============================================================ */}
      <div className="logo">
        <img
          src="/assets/openroot-white-nobg.png"
          alt="Openroot Logo"
          className="logo-img"
          draggable="false"
          loading="eager" // ✅ PRIORITY LOAD
        />
      </div>

      {/* ============================================================
           RIGHT SIDE: AUTH / PROFILE AREA
           ============================================================ */}
      <div className="auth-area relative">
        {!user ? (
          <button
            className="login-animation"
            onClick={handleLoginClick}
            aria-label="Open login"
          >
            <Lottie
              animationData={loginAnimation}
              loop
              autoplay
              className="login-lottie"
            />
            <span className="login-hint">LOGIN HERE →</span>
          </button>
        ) : (
          <button
            className="profile-button"
            onClick={handleProfileClick}
            aria-label="Open profile"
          >
            <UserAvatar user={user} />
          </button>
        )}
      </div>

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLoginSuccess}
        />
      )}
    </header>
  );
};

export default memo(Header);
