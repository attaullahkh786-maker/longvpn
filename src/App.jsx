import { useState, useEffect, useRef } from "react";

const servers = [
  { id: 1,  country: "United States",  city: "New York",      flag: "🇺🇸", ping: 12,  load: 34, premium: false },
  { id: 2,  country: "United Kingdom", city: "London",        flag: "🇬🇧", ping: 28,  load: 52, premium: false },
  { id: 3,  country: "Japan",          city: "Tokyo",         flag: "🇯🇵", ping: 89,  load: 21, premium: false },
  { id: 4,  country: "Germany",        city: "Frankfurt",     flag: "🇩🇪", ping: 35,  load: 67, premium: false },
  { id: 5,  country: "Singapore",      city: "Singapore",     flag: "🇸🇬", ping: 110, load: 45, premium: false },
  { id: 6,  country: "Canada",         city: "Toronto",       flag: "🇨🇦", ping: 22,  load: 29, premium: false },
  { id: 7,  country: "Australia",      city: "Sydney",        flag: "🇦🇺", ping: 145, load: 18, premium: false },
  { id: 8,  country: "Netherlands",    city: "Amsterdam",     flag: "🇳🇱", ping: 31,  load: 73, premium: false },
  { id: 9,  country: "France",         city: "Paris",         flag: "🇫🇷", ping: 33,  load: 41, premium: false },
  { id: 10, country: "Brazil",         city: "São Paulo",     flag: "🇧🇷", ping: 120, load: 38, premium: false },
  { id: 11, country: "India",          city: "Mumbai",        flag: "🇮🇳", ping: 95,  load: 55, premium: false },
  { id: 12, country: "South Korea",    city: "Seoul",         flag: "🇰🇷", ping: 98,  load: 30, premium: false },
  { id: 13, country: "Sweden",         city: "Stockholm",     flag: "🇸🇪", ping: 37,  load: 22, premium: false },
  { id: 14, country: "Switzerland",    city: "Zurich",        flag: "🇨🇭", ping: 36,  load: 48, premium: false },
  { id: 15, country: "Italy",          city: "Milan",         flag: "🇮🇹", ping: 40,  load: 60, premium: false },
  { id: 16, country: "Spain",          city: "Madrid",        flag: "🇪🇸", ping: 42,  load: 35, premium: false },
  { id: 17, country: "Mexico",         city: "Mexico City",   flag: "🇲🇽", ping: 55,  load: 27, premium: false },
  { id: 18, country: "Turkey",         city: "Istanbul",      flag: "🇹🇷", ping: 65,  load: 44, premium: false },
  { id: 19, country: "South Africa",   city: "Johannesburg",  flag: "🇿🇦", ping: 180, load: 15, premium: false },
  { id: 20, country: "Argentina",      city: "Buenos Aires",  flag: "🇦🇷", ping: 135, load: 20, premium: false },
  { id: 21, country: "Poland",         city: "Warsaw",        flag: "🇵🇱", ping: 44,  load: 33, premium: false },
  { id: 22, country: "Norway",         city: "Oslo",          flag: "🇳🇴", ping: 39,  load: 19, premium: false },
  { id: 23, country: "UAE",            city: "Dubai",         flag: "🇦🇪", ping: 80,  load: 50, premium: false },
  { id: 24, country: "Pakistan",       city: "Karachi",       flag: "🇵🇰", ping: 100, load: 26, premium: false },
  { id: 25, country: "Russia",         city: "Moscow",        flag: "🇷🇺", ping: 58,  load: 62, premium: false },
  { id: 26, country: "Indonesia",      city: "Jakarta",       flag: "🇮🇩", ping: 130, load: 37, premium: false },
  { id: 27, country: "Malaysia",       city: "Kuala Lumpur",  flag: "🇲🇾", ping: 115, load: 42, premium: false },
  { id: 28, country: "Egypt",          city: "Cairo",         flag: "🇪🇬", ping: 90,  load: 31, premium: false },
  { id: 29, country: "Nigeria",        city: "Lagos",         flag: "🇳🇬", ping: 195, load: 14, premium: false },
  { id: 30, country: "Thailand",       city: "Bangkok",       flag: "🇹🇭", ping: 125, load: 39, premium: false },
];

const tabs = ["Connect", "Servers", "Stats", "Settings"];

const GlobeIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <ellipse cx="40" cy="40" rx="20" ry="36" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <line x1="4" y1="40" x2="76" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <line x1="10" y1="22" x2="70" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <line x1="10" y1="58" x2="70" y2="58" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ShieldIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 6v6c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V6l-8-4z" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SpeedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2a10 10 0 1 0 10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M22 2l-10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const DataIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" fill="none" />
  </svg>
);

export default function LongVPN() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState("Connect");
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [sessionTime, setSessionTime] = useState(0);
  const [dataDown, setDataDown] = useState(0);
  const [dataUp, setDataUp] = useState(0);
  const [pingHistory, setPingHistory] = useState(Array(20).fill(0));
  const [killSwitch, setKillSwitch] = useState(true);
  const [autoConnect, setAutoConnect] = useState(false);
  const [protocol, setProtocol] = useState("WireGuard");
  const [ripple, setRipple] = useState(false);
  const intervalRef = useRef(null);
  const pingIntervalRef = useRef(null);

  useEffect(() => {
    if (connected) {
      intervalRef.current = setInterval(() => {
        setSessionTime(t => t + 1);
        setDataDown(d => d + Math.random() * 0.4 + 0.1);
        setDataUp(u => u + Math.random() * 0.1 + 0.02);
      }, 1000);
      pingIntervalRef.current = setInterval(() => {
        setPingHistory(prev => {
          const next = [...prev.slice(1), selectedServer.ping + Math.floor(Math.random() * 8 - 4)];
          return next;
        });
      }, 800);
    } else {
      clearInterval(intervalRef.current);
      clearInterval(pingIntervalRef.current);
      setSessionTime(0);
      setDataDown(0);
      setDataUp(0);
      setPingHistory(Array(20).fill(0));
    }
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(pingIntervalRef.current);
    };
  }, [connected, selectedServer]);

  const handleConnect = () => {
    if (connected) {
      setConnected(false);
      return;
    }
    setConnecting(true);
    setRipple(true);
    setTimeout(() => setRipple(false), 800);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2200);
  };

  const formatTime = (s) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const formatData = (mb) => mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(1)} MB`;

  const getLoadColor = (load) => {
    if (load < 40) return "#00ff9d";
    if (load < 70) return "#ffb800";
    return "#ff4757";
  };

  const maxPing = Math.max(...pingHistory, 1);
  const chartPoints = pingHistory.map((p, i) => {
    const x = (i / (pingHistory.length - 1)) * 100;
    const y = 100 - (p / maxPing) * 90;
    return `${x},${y}`;
  }).join(" ");

  const styles = {
    app: {
      minHeight: "100vh",
      background: "#080c14",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Courier New', monospace",
      padding: "20px",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      background: "linear-gradient(145deg, #0d1520, #111925)",
      borderRadius: "24px",
      border: "1px solid rgba(0,255,157,0.12)",
      boxShadow: connected
        ? "0 0 60px rgba(0,255,157,0.15), 0 0 120px rgba(0,255,157,0.05), 0 20px 60px rgba(0,0,0,0.8)"
        : "0 20px 60px rgba(0,0,0,0.8)",
      overflow: "hidden",
      transition: "box-shadow 0.8s ease",
    },
    header: {
      padding: "24px 24px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    logoText: {
      fontSize: "22px",
      fontWeight: "bold",
      letterSpacing: "0.15em",
      color: "#fff",
      fontFamily: "'Courier New', monospace",
    },
    logoAccent: {
      color: "#00ff9d",
    },
    badge: {
      fontSize: "10px",
      padding: "4px 10px",
      borderRadius: "20px",
      border: "1px solid rgba(0,255,157,0.4)",
      color: "#00ff9d",
      letterSpacing: "0.1em",
    },
    tabs: {
      display: "flex",
      padding: "20px 16px 0",
      gap: "4px",
    },
    tab: (active) => ({
      flex: 1,
      padding: "8px 4px",
      border: "none",
      background: active ? "rgba(0,255,157,0.1)" : "transparent",
      color: active ? "#00ff9d" : "rgba(255,255,255,0.35)",
      fontSize: "11px",
      letterSpacing: "0.08em",
      cursor: "pointer",
      borderRadius: "8px",
      borderBottom: active ? "2px solid #00ff9d" : "2px solid transparent",
      transition: "all 0.2s",
      fontFamily: "'Courier New', monospace",
    }),
    content: {
      padding: "24px",
    },
    // Connect tab
    globeWrap: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "8px",
      color: connected ? "#00ff9d" : "rgba(255,255,255,0.2)",
      transition: "color 0.8s ease",
      position: "relative",
    },
    statusText: {
      textAlign: "center",
      marginBottom: "4px",
    },
    statusLabel: {
      fontSize: "11px",
      letterSpacing: "0.15em",
      color: connecting ? "#ffb800" : connected ? "#00ff9d" : "rgba(255,255,255,0.3)",
      transition: "color 0.4s",
    },
    statusIp: {
      fontSize: "13px",
      color: connected ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
      marginTop: "4px",
      transition: "color 0.4s",
    },
    serverPill: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px",
      padding: "12px 16px",
      margin: "20px 0",
      cursor: "pointer",
      transition: "border-color 0.2s",
    },
    serverFlag: { fontSize: "22px" },
    serverInfo: { flex: 1 },
    serverName: { fontSize: "13px", color: "#fff", fontWeight: "600" },
    serverMeta: { fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" },
    chevron: { color: "rgba(255,255,255,0.2)", fontSize: "16px" },
    btnWrap: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
      position: "relative",
    },
    btn: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      border: connected
        ? "2px solid rgba(255,71,87,0.6)"
        : connecting
          ? "2px solid rgba(255,184,0,0.6)"
          : "2px solid rgba(0,255,157,0.4)",
      background: connected
        ? "radial-gradient(circle, rgba(255,71,87,0.15), rgba(255,71,87,0.05))"
        : connecting
          ? "radial-gradient(circle, rgba(255,184,0,0.1), transparent)"
          : "radial-gradient(circle, rgba(0,255,157,0.08), transparent)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "4px",
      transition: "all 0.4s ease",
      position: "relative",
      overflow: "visible",
      boxShadow: connected
        ? "0 0 30px rgba(255,71,87,0.2)"
        : connecting
          ? "0 0 30px rgba(255,184,0,0.2)"
          : "0 0 20px rgba(0,255,157,0.1)",
    },
    btnLabel: {
      fontSize: "10px",
      letterSpacing: "0.12em",
      color: connected ? "#ff4757" : connecting ? "#ffb800" : "#00ff9d",
      marginTop: "4px",
    },
    statsRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "10px",
    },
    statBox: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "10px",
      padding: "12px 10px",
      textAlign: "center",
    },
    statVal: {
      fontSize: "13px",
      color: connected ? "#fff" : "rgba(255,255,255,0.2)",
      fontWeight: "600",
      fontFamily: "'Courier New', monospace",
      transition: "color 0.4s",
    },
    statKey: {
      fontSize: "9px",
      color: "rgba(255,255,255,0.25)",
      letterSpacing: "0.1em",
      marginTop: "4px",
    },
    // Servers tab
    serverList: { display: "flex", flexDirection: "column", gap: "8px" },
    serverItem: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 14px",
      borderRadius: "12px",
      background: active ? "rgba(0,255,157,0.06)" : "rgba(255,255,255,0.02)",
      border: active ? "1px solid rgba(0,255,157,0.25)" : "1px solid rgba(255,255,255,0.05)",
      cursor: "pointer",
      transition: "all 0.2s",
    }),
    loadBar: (load) => ({
      width: "40px",
      height: "4px",
      background: "rgba(255,255,255,0.1)",
      borderRadius: "2px",
      overflow: "hidden",
      position: "relative",
    }),
    loadFill: (load) => ({
      height: "100%",
      width: `${load}%`,
      background: getLoadColor(load),
      borderRadius: "2px",
      transition: "width 0.3s",
    }),
    // Stats tab
    chartBox: {
      background: "rgba(0,0,0,0.3)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "16px",
    },
    chartTitle: { fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", marginBottom: "12px" },
    dataGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
    dataCard: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "12px",
      padding: "16px",
    },
    dataCardLabel: { fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: "8px" },
    dataCardVal: { fontSize: "18px", color: "#fff", fontWeight: "700" },
    dataCardSub: { fontSize: "10px", color: "rgba(255,255,255,0.25)", marginTop: "2px" },
    // Settings tab
    settingRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 0",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    },
    settingLabel: { fontSize: "13px", color: "rgba(255,255,255,0.7)" },
    settingDesc: { fontSize: "10px", color: "rgba(255,255,255,0.25)", marginTop: "3px" },
    toggle: (on) => ({
      width: "42px",
      height: "24px",
      borderRadius: "12px",
      background: on ? "rgba(0,255,157,0.3)" : "rgba(255,255,255,0.1)",
      border: on ? "1px solid rgba(0,255,157,0.5)" : "1px solid rgba(255,255,255,0.15)",
      position: "relative",
      cursor: "pointer",
      transition: "all 0.3s",
    }),
    toggleKnob: (on) => ({
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      background: on ? "#00ff9d" : "rgba(255,255,255,0.3)",
      position: "absolute",
      top: "2px",
      left: on ? "20px" : "2px",
      transition: "all 0.3s",
    }),
    select: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
      color: "#fff",
      padding: "6px 10px",
      fontSize: "12px",
      cursor: "pointer",
      fontFamily: "'Courier New', monospace",
    },
  };

  const rippleStyle = {
    position: "absolute",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "2px solid rgba(0,255,157,0.5)",
    animation: ripple ? "rippleOut 0.8s ease-out forwards" : "none",
    pointerEvents: "none",
  };

  return (
    <div style={styles.app}>
      <style>{`
        @keyframes rippleOut {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .server-item:hover { filter: brightness(1.1); }
        .tab-btn:hover { color: rgba(255,255,255,0.6) !important; }
        .connect-btn:hover { transform: scale(1.05); }
      `}</style>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <ShieldIcon size={20} />
            <span style={styles.logoText}>
              LONG<span style={styles.logoAccent}>VPN</span>
            </span>
          </div>
          <span style={styles.badge}>100% FREE</span>
        </div>

        <div style={styles.tabs}>
          {tabs.map(tab => (
            <button
              key={tab}
              className="tab-btn"
              style={styles.tab(activeTab === tab)}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={styles.content}>
          {activeTab === "Connect" && (
            <>
              <div style={styles.globeWrap}>
                <GlobeIcon />
                {connected && (
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                  }}>
                    <div style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      border: "1px solid rgba(0,255,157,0.2)",
                      animation: "pulse 2s ease-in-out infinite",
                    }} />
                  </div>
                )}
              </div>

              <div style={styles.statusText}>
                <div style={styles.statusLabel}>
                  {connecting ? "● ESTABLISHING TUNNEL..." : connected ? "● CONNECTED & SECURE" : "○ NOT PROTECTED"}
                </div>
                <div style={styles.statusIp}>
                  {connected ? `IP: 185.220.${selectedServer.id + 100}.${Math.floor(Math.random() * 50) + 10} (masked)` : "Your IP is exposed"}
                </div>
              </div>

              <div
                style={styles.serverPill}
                onClick={() => setActiveTab("Servers")}
              >
                <span style={styles.serverFlag}>{selectedServer.flag}</span>
                <div style={styles.serverInfo}>
                  <div style={styles.serverName}>{selectedServer.city}, {selectedServer.country}</div>
                  <div style={styles.serverMeta}>{selectedServer.ping}ms · {selectedServer.load}% load</div>
                </div>
                <span style={styles.chevron}>›</span>
              </div>

              <div style={styles.btnWrap}>
                <div style={rippleStyle} />
                <button
                  className="connect-btn"
                  style={{...styles.btn, transition: "all 0.4s ease"}}
                  onClick={handleConnect}
                >
                  <ShieldIcon size={28} />
                  <span style={styles.btnLabel}>
                    {connected ? "DISCONNECT" : connecting ? "CONNECTING" : "CONNECT"}
   </
