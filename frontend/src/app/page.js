// app/page.jsx
"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div style={styles.page}>
      <div style={styles.strip} />

      {/* Nav */}
      <nav style={styles.nav}>
        <span style={styles.brand}>● taskly</span>
      </nav>

      {/* Hero */}
      <main style={styles.main}>
        <div style={styles.hero}>
          <p style={styles.eyebrow}>JWT Auth · RBAC · Task Management</p>
          <h1 style={styles.heading}>
            The simplest way<br />to manage your tasks.
          </h1>
          <p style={styles.subtext}>
            A backend assignment <br /> built clean, deployed right.
          </p>

          <div style={styles.btnRow}>
            <button
              style={styles.primaryBtn}
              onClick={() => router.push("/login")}
              onMouseEnter={(e) => (e.target.style.background = "#333")}
              onMouseLeave={(e) => (e.target.style.background = "#111")}
            >
              Sign in →
            </button>
            <button
              style={styles.secondaryBtn}
              onClick={() => router.push("/register")}
              onMouseEnter={(e) => {
                e.target.style.background = "#111";
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#111";
              }}
            >
              Create account
            </button>
          </div>
        </div>

        {/* Feature pills */}
        <div style={styles.pills}>
          {["JWT Authentication", "Role-Based Access", "Task CRUD", "Protected Routes"].map((f) => (
            <span key={f} style={styles.pill}>{f}</span>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <span>Built for submission · 2026</span>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f4ef",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#111",
    display: "flex",
    flexDirection: "column",
  },
  strip: {
    width: "6px",
    background: "#111",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 10,
  },

  // Nav
  nav: {
    padding: "24px 48px 24px 54px",
    borderBottom: "1px solid #e8e4dd",
  },
  brand: {
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.04em",
  },

  // Hero
  main: {
    flex: 1,
    maxWidth: "640px",
    margin: "0 auto",
    padding: "80px 24px 48px",
    width: "100%",
  },
  hero: {
    marginBottom: "64px",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    margin: "0 0 20px",
  },
  heading: {
    fontSize: "52px",
    fontWeight: "800",
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    color: "#111",
    margin: "0 0 20px",
  },
  subtext: {
    fontSize: "16px",
    color: "#888",
    margin: "0 0 40px",
    lineHeight: 1.6,
  },
  btnRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "14px 28px",
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
  secondaryBtn: {
    padding: "14px 28px",
    background: "transparent",
    color: "#111",
    border: "1.5px solid #111",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
  },

  // Pills
  pills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  pill: {
    padding: "7px 14px",
    border: "1px solid #ddd",
    borderRadius: "999px",
    fontSize: "12px",
    color: "#888",
    fontWeight: "500",
    background: "#fff",
    letterSpacing: "0.02em",
  },

  // Footer
  footer: {
    padding: "20px 48px 20px 54px",
    borderTop: "1px solid #e8e4dd",
    fontSize: "12px",
    color: "#bbb",
  },
};