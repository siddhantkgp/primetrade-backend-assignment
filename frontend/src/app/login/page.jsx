"use client";

import { useState } from "react";
import API from "../../../lib/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.inner}>

        <div style={styles.brand} onClick={() => router.push("/")}>● taskly</div>

        <div style={styles.headingBlock}>
          <p style={styles.eyebrow}>Welcome back</p>
          <h1 style={styles.heading}>Good to see<br />you again.</h1>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            { label: "Email address", key: "email", type: "email", placeholder: "alex@example.com" },
            { label: "Password", key: "password", type: "password", placeholder: "your password" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key} style={styles.field}>
              <label style={styles.label}>{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                style={styles.input}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                onFocus={(e) => (e.target.style.borderBottomColor = "#111")}
                onBlur={(e) => (e.target.style.borderBottomColor = "#ccc")}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }}
            onMouseEnter={(e) => { e.target.style.background = "#333"; }}
            onMouseLeave={(e) => { e.target.style.background = "#111"; }}
          >
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>

        <p style={styles.switch}>
          Don&apos;t have an account?{" "}
          <span style={styles.switchLink} onClick={() => router.push("/register")}>
            Register
          </span>
        </p>
      </div>

      <div style={styles.strip} />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f4ef",
    display: "flex",
    alignItems: "stretch",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  strip: {
    width: "6px",
    background: "#111",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
  },
  inner: {
    margin: "auto",
    width: "100%",
    maxWidth: "400px",
    padding: "60px 24px",
  },
  brand: {
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.04em",
    color: "#111",
    marginBottom: "52px",
    cursor: "pointer",
  },
  headingBlock: {
    marginBottom: "40px",
  },
  eyebrow: {
    fontSize: "12px",
    color: "#aaa",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    margin: "0 0 10px",
  },
  heading: {
    fontSize: "38px",
    fontWeight: "800",
    color: "#111",
    lineHeight: 1.15,
    margin: 0,
    letterSpacing: "-0.02em",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  input: {
    border: "none",
    borderBottom: "1.5px solid #ccc",
    background: "transparent",
    padding: "10px 0",
    fontSize: "15px",
    color: "#111",
    outline: "none",
    transition: "border-bottom-color 0.2s",
  },
  btn: {
    marginTop: "12px",
    padding: "15px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.02em",
    transition: "background 0.2s",
  },
  switch: {
    marginTop: "28px",
    fontSize: "13px",
    color: "#888",
  },
  switchLink: {
    color: "#111",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
};