/**
 * ============================================================
 * HEADER COMPONENT — OPENROOT (2025.10)
 * SEO + PERFORMANCE OPTIMIZED + PROFESSIONAL STRUCTURE
 * ============================================================
 */

import { useState, useEffect, useCallback, memo, lazy, Suspense } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../lib/firebase";
import LoginModal from "./LoginModal";
import "./styles/Header.css";

// ⭐ Lazy-load Lottie (massive performance boost)
const Lottie = lazy(() => import("lottie-react"));
import loginAnimation from "../animations/login.json";

/**
 * ============================================================
 * SAFE AUTH LISTENER — prevents memory leaks
 * ============================================================
 */
const useSafeAuthListener = (setUser) => {
  useEffect(() => {
    let mounted = true;

    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (mounted) setUser(firebaseUser ?? null);
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, [setUser]);
};

/**
 * ============================================================
 * GET INITIAL LETTER (fallback avatar)
 * ============================================================
 */
const getUserInitial = (user) =>
  user?.displayName?.charAt(0)?.toUpperCase() ?? "U";

/**
 * ============================================================
 * USER AVATAR COMPONENT
 * ============================================================
 */
const UserAvatar = memo(({ user }) => {
  if (!user) return null;

  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt="User avatar"
        className="avatar"
        draggable="false"
        loading="lazy"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
    );
  }

  return <div className="avatar-fallback">{getUserInitial(user)}</div>;
});

/**
 * ============================================================
 * HEADER COMPONENT
 * ============================================================
 */
const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useSafeAuthListener(setUser);

  const handleLoginSuccess = useCallback((firebaseUser) => {
    if (firebaseUser) setUser(firebaseUser);
  }, []);

  const openProfile = useCallback(() => {
    sessionStorage.setItem("openrootOpenProfileDetails", "1");
    setIsLoginOpen(true);
  }, []);

  const openLogin = useCallback(() => setIsLoginOpen(true), []);

  return (
    <header className="header" role="banner">
      {/* ============================================================
          LEFT — LOGO WITH SEO-BOOSTING LINK
      ============================================================ */}
      <a href="/" className="logo" aria-label="Openroot Homepage">
        <img
          src="/assets/openroot-white-nobg.png"
          alt="Openroot Logo"
          className="logo-img"
          draggable="false"
          loading="eager"
        />
      </a>

      {/* ============================================================
          RIGHT — NAVIGATION ACTIONS (SEO BENEFIT)
      ============================================================ */}
      <nav className="auth-area" aria-label="User navigation">
        {!user ? (
          <button
            className="login-animation"
            onClick={openLogin}
            aria-label="Open login modal"
          >
            <Suspense fallback={<span className="login-hint">Login</span>}>
              <Lottie
                animationData={loginAnimation}
                loop
                autoplay
                className="login-lottie"
              />
            </Suspense>
            <span className="login-hint">LOGIN HERE →</span>
          </button>
        ) : (
          <button
            className="profile-button"
            onClick={openProfile}
            aria-label="Open profile menu"
          >
            <UserAvatar user={user} />
          </button>
        )}
      </nav>

      {/* ============================================================
          LOGIN MODAL
      ============================================================ */}
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
