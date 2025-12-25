import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authServices";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await registerUser(form);
      localStorage.setItem("registerEmail", form.email);
      alert("OTP sent to your email for verification.");
      navigate("/verify-otp");
    } catch (err) {
      console.log("Registration Error: ", err);
      setError(
        err.message || err.error || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <section className="section" style={{ display: "grid", placeItems: "center" }}>
        <div className="form-wrapper">
          <h2 className="form-title">Create your account</h2>
          <p className="form-subtitle">
            Start with your details so we can tailor the perfect pair.
          </p>

          <form onSubmit={handleRegister}>
            {error && <div className="error">{error}</div>}

            <div className="field-group">
              <div>
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="input"
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="input"
                  required
                  placeholder="Password (min 6 characters)"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="helper-text" style={{ marginTop: "1rem" }}>
              Already have an account?{" "}
              <a className="link" href="/login">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Register;
