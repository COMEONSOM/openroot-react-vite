// src/App.jsx
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AboutCompany from "./components/AboutCompany";
import Elements from "./components/Elements";
import ContactFollow from "./components/ContactFollow";
import Footer from "./components/Footer";
import Promotion from "./components/Promotion";
import BackgroundAnimation from "./components/BackgroundAnimation";   // 👈 Add this import
import "./App.css";

export default function App() {
  return (
    <div className="app-wrapper">
      <BackgroundAnimation /> {/* ⭐ Global animated background */}
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
