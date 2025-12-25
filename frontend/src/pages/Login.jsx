import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.email || !form.password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser(form);

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      if (response.user && response.user.role === 'admin') {
        navigate('/admin/products');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || err.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <section className="section" style={{ display: "grid", placeItems: "center" }}>
        <div className="form-wrapper">
          <h2 className="form-title">Sign in to your account</h2>
          <p className="form-subtitle">
            Access your orders, prescriptions, and saved styles.
          </p>
          <form onSubmit={handleLogin}>
            {error && <div className="error">{error}</div>}

            <div className="field-group">
              <div>
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
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
                  autoComplete="current-password"
                  className="input"
                  required
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
