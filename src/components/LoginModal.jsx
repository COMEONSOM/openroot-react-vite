// ============================================================
// HANDLES OAUTH (GOOGLE/FACEBOOK/GITHUB), PROFILE VIEW, LOGOUT
// ALWAYS RETURNS RAW FIREBASE USER VIA onLogin(user)
// VERSION: 2025.5
// ============================================================

import { useState, useEffect, useRef } from "react";
import "./styles/LoginModal.css";
import gsap from "gsap";
import Lottie from "lottie-react";
import successAnimation from "../animations/successfullogin.json";
import failedAnimation from "../animations/failedlogin.json";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from "../lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export default function LoginModal({ onClose, onLogin, onLogout }) {
  // ============================================================
  // LOCAL STATE
  // ============================================================
  const [step, setStep] = useState("loading");
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("guest@ulvoxo");
  const [showDetails, setShowDetails] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");

  const modalRef = useRef(null);

  // ============================================================
  // HELPERS
  // ============================================================
  const getUsername = (user) => {
    if (user?.email) return user.email.split("@")[0] + "@ulvoxo";
    if (user?.phoneNumber)
      return user.phoneNumber.replace(/[^0-9]/g, "") + "@ulvoxo";
    return "guest@ulvoxo";
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");
  const safe = (value, fallback = "Not specified") => value || fallback;

  // ============================================================
  // ENTRY ANIMATION (FADE/SLIDE IN, GSAP)
  // ============================================================
  useEffect(() => {
    if (step !== "loading" && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }
      );
    }
  }, [step]);

  // ============================================================
  // FIREBASE AUTH SUBSCRIPTION
  // NOTE: DO NOT OVERRIDE success/error SCREENS
  // ============================================================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const wantDetails =
        typeof window !== "undefined" &&
        sessionStorage.getItem("ulvoxoOpenProfileDetails") === "1";

      if (user) {
        setUserData(user);
        const uName = getUsername(user);
        setUsername(uName);
        sessionStorage.setItem("ulvoxoUser", uName);

        // Only move to profile if not in success/error
        setStep((prev) =>
          prev === "success" || prev === "error" ? prev : "profile"
        );
        setShowDetails(wantDetails ? true : false);
        if (wantDetails) {
          try {
            sessionStorage.removeItem("ulvoxoOpenProfileDetails");
          } catch {}
        }

        onLogin?.(user); // RAW USER OBJECT
      } else {
        setUserData(null);
        setUsername("guest@ulvoxo");
        sessionStorage.removeItem("ulvoxoUser");
        setShowDetails(false);
        setStep((prev) =>
          prev === "success" || prev === "error" ? prev : "initial"
        );
      }
    });
    return unsubscribe;
  }, [onLogin]);

  // ============================================================
  // CHECK SESSION FLAG WHEN MODAL OPENS
  // ============================================================
  useEffect(() => {
    if (step === "profile") {
      const wantDetails =
        typeof window !== "undefined" &&
        sessionStorage.getItem("ulvoxoOpenProfileDetails") === "1";

      if (wantDetails) {
        setShowDetails(true);
        try {
          sessionStorage.removeItem("ulvoxoOpenProfileDetails");
        } catch {}
      }
    }
  }, [step]);

  // ============================================================
  // SUCCESS → COUNTDOWN → REDIRECT
  // ============================================================
  useEffect(() => {
    if (step === "success") {
      setCountdown(5);
      const interval = setInterval(() => setCountdown((s) => s - 1), 1000);

      const timeout = setTimeout(() => {
        onClose?.();
        const MAIN_SITE_URL = window.location.origin;
        window.location.assign(MAIN_SITE_URL);
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [step, onClose]);

  // ============================================================
  // OAUTH LOGIN HANDLER
  // ============================================================
  const handleOAuthLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const uName = getUsername(user);

      setUserData(user);
      setUsername(uName);
      sessionStorage.setItem("ulvoxoUser", uName);

      setStep("success"); // Show SUCCESS state
      onLogin?.(user);
    } catch (error) {
      console.error("OAUTH LOGIN ERROR:", error);

      let msg = "Login failed. Please try again.";
      if (error?.code === "auth/popup-closed-by-user") {
        msg = "Login was cancelled before completion.";
      } else if (
        error?.code === "auth/account-exists-with-different-credential"
      ) {
        msg =
          "This email is already registered with a different provider. Please sign in using that provider.";
      } else if (error?.message) {
        msg = error.message;
      }

      setErrorMessage(msg);
      setStep("error");
    }
  };

  // ============================================================
  // LOGOUT HANDLER
  // ============================================================
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      setUsername("guest@ulvoxo");
      sessionStorage.removeItem("ulvoxoUser");
      setShowDetails(false);
      setStep("initial");

      if (onLogout) onLogout();
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
      setErrorMessage(error.message || "Logout failed. Please try again.");
      setStep("error");
    }
  };

  // ============================================================
  // AUTO-APPEND ?user=<username> TO SELECT DOMAINS
  // ============================================================
  useEffect(() => {
    const targetLinks = [
      "https://www.xfactorial.online/",
      "https://xfactorialdi.web.app/",
      "https://comeonsom.github.io/X-by-ForLoop.com/",
      "https://comeonsom.github.io/Ulvoxo-Update/",
    ];
    const anchors = document.querySelectorAll("a");

    anchors.forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (href && targetLinks.some((link) => href.startsWith(link))) {
        const url = new URL(href, window.location.origin);
        if (!url.searchParams.has("user")) {
          url.searchParams.set("user", username);
          anchor.setAttribute("href", url.toString());
        }
      }
    });
  }, [username]);

  // ============================================================
  // LOADING SCREEN
  // ============================================================
  if (step === "loading") {
    return (
      <div
        className="modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Authenticating"
      >
        <div className="modal-container modal-loader" ref={modalRef}>
          <p>Authenticating…</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN RENDER
  // ============================================================
  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Authentication Modal"
      onMouseDown={(e) => {
        if (e.target.classList.contains("modal-overlay")) onClose?.();
      }}
    >
      <div className="modal-container" ref={modalRef} tabIndex={-1}>
        {/* CLOSE BUTTON */}
        {step !== "success" && step !== "error" && (
          <button
            className="modal-close"
            aria-label="Close"
            onClick={() => (showDetails ? setShowDetails(false) : onClose?.())}
          >
            &times;
          </button>
        )}

        {/* INITIAL LOGIN OPTIONS */}
        {step === "initial" && (
          <div className="modal-content">
            <h2>Welcome Back</h2>
            <p>Continue with your preferred account:</p>

            <div className="oauth-buttons">
              <button
                onClick={() => handleOAuthLogin(googleProvider)}
                className="oauth-btn google"
              >
                Continue with Google
              </button>
              <button
                onClick={() => handleOAuthLogin(facebookProvider)}
                className="oauth-btn facebook"
              >
                Continue with Facebook
              </button>
              <button
                onClick={() => handleOAuthLogin(githubProvider)}
                className="oauth-btn github"
              >
                Continue with GitHub
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {step === "success" && (
          <div className="success-container">
            <Lottie
              animationData={successAnimation}
              loop={false}
              autoplay
              style={{ width: 200, height: 200 }}
            />
            <p className="success-text">Login successful!</p>
            <p className="success-subtext" style={{ marginTop: 6 }}>
              Taking you to the site in{" "}
              <strong>{Math.max(countdown, 0)}s</strong>…
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {step === "error" && (
          <div className="success-container">
            <Lottie
              animationData={failedAnimation}
              loop={false}
              autoplay
              style={{ width: 200, height: 200 }}
            />
            <p className="error-text">Login unsuccessful</p>
            <p className="error-subtext" style={{ marginTop: 6 }}>
              {errorMessage}
            </p>
            <div style={{ marginTop: 12 }}>
              <button
                className="retry-btn"
                onClick={() => {
                  setErrorMessage("");
                  setStep("initial");
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* PROFILE SUMMARY */}
        {step === "profile" && userData && !showDetails && (
          <div
            className="profile-summary"
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation(); // prevent overlay click close
              setShowDetails(true);
            }}
            onKeyDown={(e) => e.key === "Enter" && setShowDetails(true)}
          >

            {userData.photoURL ? (
              <img src={userData.photoURL} alt="User avatar" className="avatar" />
            ) : (
              <div className="avatar-fallback" aria-hidden="true">
                {getInitial(userData.displayName)}
              </div>
            )}
            <div className="profile-summary-text">
              <p>{safe(userData.displayName, "Guest")}</p>
              <small>Username: {username}</small>
            </div>
          </div>
        )}

        {/* PROFILE DETAILS */}
        {showDetails && userData && step === "profile" && (
          <div
            className="profile-details"
            onClick={(e) => e.stopPropagation()} // ✅ correct place
          >
            {userData.photoURL ? (
              <img
                src={userData.photoURL}
                alt="User avatar"
                className="avatar-lg"
              />
            ) : (
              <div className="avatar-fallback-lg" aria-hidden="true">
                {getInitial(userData.displayName)}
              </div>
            )}

            <div className="profile-field">Name: {safe(userData.displayName)}</div>
            <div className="profile-field">Email: {safe(userData.email)}</div>
            <div className="profile-field">Phone: {safe(userData.phoneNumber)}</div>
            <div className="profile-field">Username: {username}</div>

            <div className="logout-confirm">
              <button
                className="logout-btn"
                onClick={() => setStep("confirmLogout")}
              >
                Log out
              </button>
            </div>
          </div>
        )}


        {/* LOGOUT CONFIRMATION */}
        {step === "confirmLogout" && (
          <div className="logout-confirmation">
            <h3>Confirm Logout</h3>
            <div className="confirmation-actions">
              <button className="btn-yes" onClick={handleLogout}>
                Yes, Logout
              </button>
              <button className="btn-no" onClick={() => setStep("profile")}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
