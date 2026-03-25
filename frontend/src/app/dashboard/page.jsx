"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [role, setRole] = useState("");
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      router.push("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setRole(decoded.role);
    } catch {
      router.push("/login");
    }

    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title) return;
    setAdding(true);
    await API.post("/tasks", { title });
    setTitle("");
    await fetchTasks();
    setAdding(false);
  };

  const deleteTask = async (id) => {
    setDeletingId(id);
    await API.delete(`/tasks/${id}`);
    await fetchTasks();
    setDeletingId(null);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") createTask(); };

  const done = 0;

  return (
    <div style={styles.page}>
      <div style={styles.strip} />

      {/* Nav */}
      <nav style={styles.nav}>
        <span style={styles.brand}>● taskly</span>

        {/* Role badge + sign out */}
        <div style={styles.navRight}>
          {role && (
            <span style={{
              ...styles.roleBadge,
              ...(role === "admin" ? styles.roleBadgeAdmin : styles.roleBadgeUser),
            }}>
              {role === "admin" ? "⬡ admin" : "○ user"}
            </span>
          )}
          <button
            style={styles.logoutBtn}
            onClick={() => { localStorage.removeItem("token"); router.push("/login"); }}
            onMouseEnter={(e) => (e.target.style.color = "#111")}
            onMouseLeave={(e) => (e.target.style.color = "#aaa")}
          >
            sign out
          </button>
        </div>
      </nav>

      <main style={styles.main}>

        {/* Page header */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>
            {role === "admin" ? "All tasks" : "Your tasks"}
          </h1>
          <span style={styles.taskCount}>{tasks.length} total</span>
        </div>

        {/* Admin notice banner */}
        {role === "admin" && (
          <div style={styles.adminBanner}>
            <span style={styles.adminBannerDot} />
            You are viewing all user tasks as an administrator
          </div>
        )}

        {/* Input row */}
        <div style={styles.inputRow}>
          <input
            placeholder="Add a new task and press Enter…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.taskInput}
            onFocus={(e) => (e.target.style.borderColor = "#111")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
          <button
            onClick={createTask}
            disabled={adding || !title}
            style={{
              ...styles.addBtn,
              opacity: adding || !title ? 0.4 : 1,
              cursor: adding || !title ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => { if (title && !adding) e.target.style.background = "#333"; }}
            onMouseLeave={(e) => { if (title && !adding) e.target.style.background = "#111"; }}
          >
            {adding ? "…" : "+ Add"}
          </button>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Task list */}
        {tasks.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyTitle}>Nothing here yet.</p>
            <p style={styles.emptyHint}>Add your first task above to get started.</p>
          </div>
        ) : (
          <ul style={styles.list}>
            {tasks.map((task, i) => (
              <li key={task.id} style={styles.taskRow}>
                <div style={styles.taskLeft}>
                  <span style={styles.taskIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <div style={styles.taskMeta}>
                    <span style={styles.taskText}>{task.title}</span>
                    {role === "admin" && task.user_id && (
                      <span style={styles.taskOwner}>uid: {task.user_id}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  disabled={deletingId === task.id}
                  style={{
                    ...styles.delBtn,
                    opacity: deletingId === task.id ? 0.3 : 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#e53e3e";
                    e.currentTarget.style.textDecorationColor = "#e53e3e";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#bbb";
                    e.currentTarget.style.textDecorationColor = "#bbb";
                  }}
                >
                  {deletingId === task.id ? "removing" : "remove"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f4ef",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#111",
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 48px 24px 54px",
    borderBottom: "1px solid #e8e4dd",
  },
  brand: {
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.04em",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  roleBadge: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "4px 10px",
    borderRadius: "4px",
    border: "1.5px solid",
  },
  roleBadgeUser: {
    color: "#888",
    borderColor: "#ddd",
    background: "#fff",
  },
  roleBadgeAdmin: {
    color: "#111",
    borderColor: "#111",
    background: "#111",
    color: "#f7f4ef",
  },
  logoutBtn: {
    background: "none",
    border: "none",
    fontSize: "13px",
    color: "#aaa",
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
    transition: "color 0.15s",
    padding: 0,
  },

  // Main
  main: {
    maxWidth: "640px",
    margin: "0 auto",
    padding: "52px 24px",
  },
  pageHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "16px",
    marginBottom: "20px",
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "800",
    letterSpacing: "-0.02em",
    margin: 0,
  },
  taskCount: {
    fontSize: "13px",
    color: "#aaa",
    fontWeight: "500",
  },

  // Admin banner
  adminBanner: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: "#888",
    background: "#fff",
    border: "1px solid #e8e4dd",
    borderLeft: "3px solid #111",
    borderRadius: "4px",
    padding: "10px 14px",
    marginBottom: "28px",
    letterSpacing: "0.01em",
  },
  adminBannerDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#111",
    flexShrink: 0,
  },

  // Input
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "28px",
  },
  taskInput: {
    flex: 1,
    padding: "12px 14px",
    border: "1.5px solid #ddd",
    borderRadius: "6px",
    background: "#fff",
    fontSize: "14px",
    color: "#111",
    outline: "none",
    transition: "border-color 0.2s",
  },
  addBtn: {
    padding: "12px 20px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.02em",
    transition: "background 0.2s",
    whiteSpace: "nowrap",
  },

  divider: {
    height: "1px",
    background: "#e8e4dd",
    marginBottom: "8px",
  },

  // List
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  taskRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #e8e4dd",
  },
  taskLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flex: 1,
    minWidth: 0,
  },
  taskMeta: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    minWidth: 0,
  },
  taskIndex: {
    fontSize: "11px",
    color: "#ccc",
    fontWeight: "700",
    letterSpacing: "0.06em",
    flexShrink: 0,
    fontVariantNumeric: "tabular-nums",
  },
  taskText: {
    fontSize: "15px",
    color: "#111",
    fontWeight: "400",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  taskOwner: {
    fontSize: "11px",
    color: "#bbb",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
  },
  delBtn: {
    background: "none",
    border: "none",
    color: "#bbb",
    fontSize: "12px",
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
    transition: "color 0.15s",
    flexShrink: 0,
    padding: 0,
  },

  // Empty
  empty: {
    paddingTop: "48px",
    textAlign: "center",
  },
  emptyTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ccc",
    margin: "0 0 8px",
  },
  emptyHint: {
    fontSize: "13px",
    color: "#ccc",
    margin: 0,
  },
};