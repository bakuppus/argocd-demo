import { useState, useEffect } from "react";

const appVersion = import.meta.env.VITE_APP_VERSION || "v1.0.0";
const appEnv = import.meta.env.VITE_APP_ENV || "dev";
const appColor = (import.meta.env.VITE_APP_COLOR || "blue").toLowerCase();

// From Kubernetes Downward API (wired via env in Deployment)
const podName = import.meta.env.VITE_K8S_POD_NAME || "demo-pod-xyz";
const podNamespace = import.meta.env.VITE_K8S_NAMESPACE || "demo-namespace";
const podNodeName = import.meta.env.VITE_K8S_NODE_NAME || "demo-node-1";

// Build metadata (set in CI/CD)
const buildTimestamp =
  import.meta.env.VITE_BUILD_TIMESTAMP || "2025-01-01T00:00:00Z";
const gitCommit = import.meta.env.VITE_GIT_COMMIT || "abcdef1";

// Light gradients
const colorToGradientLight = {
  blue: "linear-gradient(135deg, #fdfefeff 0%, #046df7ff 100%)",
  green: "linear-gradient(135deg, #ffffffff 0%, #5bd27a 100%)",
  canary: "linear-gradient(135deg, #ffffffff 0%, #ffd76b 100%)",
};

// Dark gradients
const colorToGradientDark = {
  blue: "linear-gradient(135deg, #020617 0%, #1e40af 100%)",
  green: "linear-gradient(135deg, #022c22 0%, #16a34a 100%)",
  canary: "linear-gradient(135deg, #111827 0%, #facc15 100%)",
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const cardGradient = darkMode
    ? colorToGradientDark[appColor] || colorToGradientDark.blue
    : colorToGradientLight[appColor] || colorToGradientLight.blue;

  const pageBg = darkMode ? "#1e1f22ff" : "#d7dbe7ff";

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = pageBg;
  }, [pageBg]);

  const isCanary = appColor === "canary";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: pageBg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ---------------- HEADER ---------------- */}
<header
  style={{
    width: "100%",
    padding: "28px 40px",
    background: "linear-gradient(90deg, #f65707ff, #a106efff)", // blue → purple gradient
    color: "#fff",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  }}
>
  <div
    style={{
      fontSize: "40px",
      fontWeight: 900,
      letterSpacing: "2px",
      textAlign: "center",
      fontFamily: "Goodbye, sans-serif",
      textTransform: "uppercase",
    }}
  >
    Welcome To KUBELANCER LABS
  </div>

  {/* Dark Mode Toggle Button */}
  <button
    onClick={() => setDarkMode((v) => !v)}
    style={{
      position: "absolute",
      right: "40px",
      top: "50%",
      transform: "translateY(-50%)",
      border: "none",
      borderRadius: "999px",
      padding: "10px 22px",
      fontSize: "16px",
      fontWeight: 600,
      cursor: "pointer",
      background: darkMode ? "#facc15" : "#111827",
      color: darkMode ? "#111827" : "#f9fafb",
      fontFamily: "ubuntu, sans-serif",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    }}
  >
    {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
  </button>
</header>



      {/* ---------------- MAIN ---------------- */}
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "28px",
            alignItems: "stretch",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {/* ---------- SIDEBAR ---------- */}
          <Sidebar
            darkMode={darkMode}
            appColor={appColor}
            podName={podName}
            podNamespace={podNamespace}
            podNodeName={podNodeName}
            buildTimestamp={buildTimestamp}
            gitCommit={gitCommit}
          />

          {/* ---------- MAIN CARD ---------- */}
          <section
            style={{
              flex: 1,
              padding: "50px 60px",
              borderRadius: "40px",
              background: cardGradient,
              boxShadow: "0 25px 80px rgba(0,0,0,0.3)",
              backdropFilter: "blur(20px)",
            }}
          >
            <h1
              style={{
                fontSize: "52px",
                margin: "0 0 12px 0",
                fontWeight: 800,
                color: darkMode ? "#f9fafb" : "#111",
              }}
            >
              ArgoCD Demo App
            </h1>

            <p
              style={{
                margin: "0 0 32px 0",
                fontSize: "22px",
                fontWeight: 500,
                color: darkMode ? "#e5e7eb" : "#333",
              }}
            >
              Kubernetes · GitOps
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                marginBottom: "32px",
              }}
            >
              <Info label="VERSION" value={appVersion} />
              <Info label="ENVIRONMENT" value={appEnv} />
              <Info label="DEPLOYMENT COLOR" value={appColor.toUpperCase()} />
            </div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: 600,
                marginBottom: "26px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                color: "#fa7f04ff",
              }}
            >
              <span
                style={{
                  width: "16px",
                  height: "16px",
                  background: "#f90505ff",
                  borderRadius: "50%",
                }}
              />
              Live on ArgoCD!
{(appColor === "canary" || appColor === "blue" || appColor === "green") && (
  <span
    className={`${appColor}-pulse`}
    style={{
      position: "relative",
      padding: "6px 14px",
      borderRadius: "999px",
      background:
        appColor === "canary"
          ? "#facc15"
          : appColor === "blue"
          ? "#60a5fa"
          : "#4ade80", // green
      color: appColor === "canary" ? "#422006" : "#0f172a",
      fontSize: "14px",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    }}
  >
    {appColor.charAt(0).toUpperCase() + appColor.slice(1)} Release
  </span>
)}

            </div>

<p
  style={{
    fontSize: "20px",
    color: darkMode ? "#f1f5f9" : "#333",
    lineHeight: "1.6",
  }}
>
  Change{" "}
  <code
    style={{
      background: darkMode ? "#1e293b" : "#e2e8f0",
      color: darkMode ? "#f8fafc" : "#1e293b",
      padding: "4px 10px",
      borderRadius: "8px",
      fontWeight: "700",
    }}
  >
    VITE_APP_VERSION
  </code>
  ,{" "}
  <code
    style={{
      background: darkMode ? "#1e293b" : "#e2e8f0",
      color: darkMode ? "#f8fafc" : "#1e293b",
      padding: "4px 10px",
      borderRadius: "8px",
      fontWeight: "700",
    }}
  >
    VITE_APP_ENV
  </code>
  , or{" "}
  <code
    style={{
      background: darkMode ? "#1e293b" : "#e2e8f0",
      color: darkMode ? "#f8fafc" : "#1e293b",
      padding: "4px 10px",
      borderRadius: "8px",
      fontWeight: "700",
    }}
  >
    VITE_APP_COLOR
  </code>{" "}
  in your Kubernetes manifest and let ArgoCD sync to see live
  changes. Pod, node and build information are injected
  automatically via the Kubernetes Downward API and CI pipeline.
</p>

          </section>
        </div>
      </main>

      {/* ---------------- FOOTER ---------------- */}
<footer
  style={{
    width: "100%",
    padding: "26px 20px",
    textAlign: "center",
    background: "linear-gradient(90deg, #047aacff, #550470ff)", // refined gradient
    color: "#fff",
    fontSize: "20px",
    fontWeight: 500,
    borderTop: "1px solid rgba(255,255,255,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }}
>
  <div
    style={{
      fontSize: "22px",
      fontWeight: 700,
      fontFamily: "Arial, sans-serif",
      letterSpacing: "0.5px",
    }}
  >

    
  </div>

  <a
    href="https://labs.kubelancer.com"
    target="_blank"
    rel="noopener noreferrer"
    className="blink-link"
    style={{
      color: "#fbfcfeff",
      textDecoration: "none",
      fontWeight: 900,
      fontSize: "26px",
      letterSpacing: "3px",
      textTransform: "lowercase",
      fontFamily: "Helvetica, sans-serif",
      background: "rgba(247, 51, 7, 1)",
      padding: "6px 14px",
      borderRadius: "12px",
      display: "inline-block",
    }}
  >
    Cloud, Devops, Gitops, DevSecOps, Kubernetes, Service Mesh  & More! 
  </a>
</footer>


    </div>
  );
}

function Sidebar({
  darkMode,
  appColor,
  podName,
  podNamespace,
  podNodeName,
  buildTimestamp,
  gitCommit,
}) {
  const bg = darkMode ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.85)";
  const text = darkMode ? "#e5e7eb" : "#111827";
  const muted = darkMode ? "#9ca3af" : "#4b5563";

  return (
    <aside
      style={{
        width: "320px",
        borderRadius: "32px",
        padding: "26px 24px",
        background: bg,
        color: text,
        boxShadow: "0 18px 50px rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "4px",
          }}
        >
          Deployment Details
        </div>
        <div style={{ fontSize: "14px", color: muted }}>
          Color: <strong>{appColor.toUpperCase()}</strong>
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: 700,
            marginBottom: "6px",
          }}
        >
          Kubernetes Info
        </div>
        <SidebarRow label="Pod name" value={podName} />
        <SidebarRow label="Namespace" value={podNamespace} />
        <SidebarRow label="Node" value={podNodeName} />
      </div>

      <div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: 700,
            marginBottom: "6px",
          }}
        >
          Build Info
        </div>
        <SidebarRow label="Built at" value={buildTimestamp} />
        <SidebarRow label="Git commit" value={gitCommit} />
      </div>

      <div
        style={{
          marginTop: "8px",
          fontSize: "12px",
          color: muted,
          lineHeight: "1.5",
        }}
      >
        This panel reads values from Kubernetes env vars (Downward API) and CI
        metadata, making it perfect for ArgoCD sync & rollback demos.
      </div>
    </aside>
  );
}

function SidebarRow({ label, value }) {
  return (
    <div style={{ marginBottom: "6px", fontSize: "13px" }}>
      <div style={{ opacity: 0.7 }}>{label}</div>
      <div style={{ fontWeight: 600, wordBreak: "break-all" }}>{value}</div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.7)",
        padding: "26px",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          fontSize: "18px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          color: "#444",
          marginBottom: "8px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "32px",
          fontWeight: 800,
          color: "#111",
        }}
      >
        {value}
      </div>
    </div>
  );
}
