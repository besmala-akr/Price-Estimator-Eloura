import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [eur, setEur] = useState("");
  const [finalPrice, setFinalPrice] = useState(null);

  const EURO_RATE = 290;

  const getProfitRate = (euro) => {
    if (euro <= 10) return 0.15;
    if (euro >= 16) return 0.10;
    return 0.13;
  };

  // Automatically calculate whenever the user types
  const handleChange = (e) => {
    const value = e.target.value;
    setEur(value);

    const euroValue = parseFloat(value);
    if (isNaN(euroValue) || euroValue <= 0) {
      setFinalPrice(null);
      return;
    }

    const base = euroValue * EURO_RATE;
    const profitRate = getProfitRate(euroValue);
    const final = Math.ceil((base + base * profitRate) / 5) * 5; // round up to 5
    setFinalPrice(final);
  };

  return (
    <div className="container">
      <div className="brand">E'LOURA</div>
      <div className="welcome">Hello ✨</div>

      <div className="title">Price Estimator</div>
      <div className="subtitle">Calculate your final price in Algerian Dinars</div>

      <div className="input-card">
        <label>PRODUCT PRICE</label>
        <div className="input-wrapper">
          <div className="currency">€</div>
          <input
            type="number"
            placeholder="0.00"
            value={eur}
            onChange={handleChange}
          />
        </div>

        <div className="hint">
          Please make sure you are using <strong>EURO</strong> <br />
          prices (Shein / Temu).
        </div>
      </div>

      {/* Final price appears automatically above the Instagram button */}
      {finalPrice && (
        <div className="result">
          <small>Your final price</small>
          <div className="final-price">{finalPrice.toLocaleString()} DZD</div>
        </div>
      )}

      {/* Instagram button */}
      <a
        href="https://www.instagram.com/e.loura_shop/"
        target="_blank"
        rel="noopener noreferrer"
        className="instagram-btn"
      >
        Contact us on Instagram
      </a>

      <div className="footer-note">E'loura · Prices updated automatically</div>
    </div>
  );
}
