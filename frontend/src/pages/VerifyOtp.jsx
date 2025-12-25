import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp as verifyOtpAPI } from "../services/authServices";

function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const registerEmail = localStorage.getItem("registerEmail");
    if (!registerEmail) {
      navigate("/register");
    } else {
      setEmail(registerEmail);
    }
  }, [navigate]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await verifyOtpAPI({ email, otp });

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      localStorage.removeItem("registerEmail");

      alert("OTP verified successfully! You are now registered.");
      navigate("/home");
    } catch (err) {
      console.log("Verification Error: ", err);
      setError(err.message || err.error || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    navigate("/register");
  };

  return (
    <div className="page">
      <section className="section" style={{ display: "grid", placeItems: "center" }}>
        <div className="form-wrapper">
          <h2 className="form-title">Verify OTP</h2>
          <p className="form-subtitle">
            We&apos;ve sent a 6-digit code to <strong>{email}</strong>
          </p>

          <form onSubmit={handleVerifyOtp}>
            {error && <div className="error">{error}</div>}

            <div className="field-group">
              <label htmlFor="otp">OTP</label>
              <input
                id="otp"
                name="otp"
                type="text"
                maxLength="6"
                className="input otp-input"
                required
                placeholder="000000"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(value);
                  setError("");
                }}
              />
            </div>

            <button
              type="submit"
              className="btn"
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <p className="helper-text" style={{ marginTop: "1rem" }}>
              Didn&apos;t receive OTP?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                className="link"
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                Resend OTP
              </button>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default VerifyOtp;