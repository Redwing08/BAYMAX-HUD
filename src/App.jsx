import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// FORMAL, PROFESSIONAL SVG ICONS
const Model3DIcon = () => (
  <svg className="stark-hud-icon" viewBox="0 0 24 24">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const EncryptIcon = () => (
  <svg className="stark-hud-icon" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1" fill="#80e5ff" />
  </svg>
);

const SimulateIcon = () => (
  <svg className="stark-hud-icon" viewBox="0 0 24 24">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const CodeGenIcon = () => (
  <svg className="stark-hud-icon" viewBox="0 0 24 24">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const ImageEngineIcon = () => (
  <svg className="stark-hud-icon" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

// FORMAL SPEECH / CHAT BUBBLE ICON FOR THE CENTRAL REACTOR
const FormalSpeechIcon = () => (
  <svg className="arc-reactor-svg" viewBox="0 0 24 24">
    <path
      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
      fill="none"
      stroke="#00d2ff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="12" r="1" fill="#ffffff" />
    <circle cx="12" cy="12" r="1" fill="#ffffff" />
    <circle cx="15" cy="12" r="1" fill="#ffffff" />
  </svg>
);

const BaymaxMovieFace = () => (
  <svg className="baymax-face-svg" viewBox="0 0 100 40">
    <g className="baymax-eye-group">
      <circle cx="18" cy="20" r="11" fill="#000000" />
      <circle cx="82" cy="20" r="11" fill="#000000" />
      <line x1="18" y1="20" x2="82" y2="20" stroke="#000000" strokeWidth="4" />
    </g>
  </svg>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const [timeData, setTimeData] = useState({ main: '15:12', sec: '03', date: 'AUG 9, 2026' });
  const [deviceStats, setDeviceStats] = useState({ cpu: 36, memory: 4.9, network: 217 });
  const [activeIndex, setActiveIndex] = useState(0);

  const [dragOffset, setDragOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const canvasRef = useRef(null);
  const dragStartX = useRef(0);

  const [messages, setMessages] = useState([
    { sender: 'BAYMAX', text: 'Hello, I am Baymax. How may I assist your system today?' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const navItems = [
    { label: '3D Model Engine', icon: <Model3DIcon /> },
    { label: 'Encrypt / Decrypt', icon: <EncryptIcon /> },
    { label: 'System Simulator', icon: <SimulateIcon /> },
    { label: 'Code Generator', icon: <CodeGenIcon /> },
    { label: 'Image Engine', icon: <ImageEngineIcon /> }
  ];

  const totalItems = navItems.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5,
      alpha: Math.random(),
      speed: 0.005 + Math.random() * 0.015
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
        ctx.fillStyle = `rgba(0, 210, 255, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoading]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const monthStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();

      setTimeData({ main: `${hours}:${mins}`, sec: secs, date: monthStr });

      setDeviceStats({
        cpu: Math.floor(32 + Math.sin(now.getSeconds()) * 8),
        memory: +(4.8 + Math.cos(now.getSeconds()) * 0.2).toFixed(1),
        network: Math.floor(205 + Math.random() * 25)
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePointerDown = (e) => {
    setIsSwiping(true);
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handlePointerMove = (e) => {
    if (!isSwiping) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const delta = currentX - dragStartX.current;
    setDragOffset(delta);
  };

  const handlePointerUp = () => {
    if (!isSwiping) return;
    setIsSwiping(false);

    const threshold = 35;
    if (dragOffset < -threshold) {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    } else if (dragOffset > threshold) {
      setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
    setDragOffset(0);
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userPrompt = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'USER', text: userPrompt }]);
    setIsProcessing(true);

    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3',
          prompt: `System: You are Baymax acting as a system AI. Provide short, helpful responses.\nUser: ${userPrompt}`,
          stream: false
        })
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'BAYMAX', text: data.response }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'BAYMAX', text: 'Diagnostic link offline. Ready to assist locally.' }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const spacing = 95;

  if (isLoading) {
    return (
      <div className="holomat-loader-overlay">
        <div className="holomat-hud-box">
          <div className="holomat-bg-circles">
            <div className="circle-layer circle-1"></div>
            <div className="circle-layer circle-2"></div>
            <div className="circle-layer circle-3"></div>
          </div>

          <div className="holomat-corner corner-tl"></div>
          <div className="holomat-corner corner-tr"></div>
          <div className="holomat-corner corner-bl"></div>
          <div className="holomat-corner corner-br"></div>

          <div className="holomat-content">
            <div className="holomat-title">SAN FRANSOKYO</div>
            <div className="holomat-ai-tag">HEALTHCARE AI:</div>
            <div className="holomat-ai-name">B.A.Y.M.A.X</div>

            <div className="holomat-init-header">
              <span>SYSTEM INITIALIZATION</span>
              <span className="holomat-progress-val">{loadProgress}%</span>
            </div>
            <div className="holomat-divider"></div>

            <div className="holomat-diag-list">
              <div className={`holomat-diag-row ${loadProgress >= 25 ? 'active' : ''}`}>
                <span className="diag-label">CORE SYSTEMS</span>
                <span className="diag-status">• ONLINE</span>
              </div>
              <div className={`holomat-diag-row ${loadProgress >= 50 ? 'active' : ''}`}>
                <span className="diag-label">AI ROUTINES</span>
                <span className="diag-status">• ACTIVATED</span>
              </div>
              <div className={`holomat-diag-row ${loadProgress >= 75 ? 'active' : ''}`}>
                <span className="diag-label">INTERFACE</span>
                <span className="diag-status">• CALIBRATED</span>
              </div>
              <div className={`holomat-diag-row ${loadProgress >= 95 ? 'active' : ''}`}>
                <span className="diag-label">HOLOGRAPHIC SYSTEMS</span>
                <span className="diag-status">• READY</span>
              </div>
            </div>

            <div className="holomat-footer-tag">PERSONAL HEALTHCARE COMPANION</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hud-viewport">
      <canvas ref={canvasRef} className="starfield-canvas" />

      <div className="hud-corner top-left"></div>
      <div className="hud-corner top-right"></div>
      <div className="hud-corner bottom-left"></div>
      <div className="hud-corner bottom-right"></div>

      <div className="hud-header">
        <div className="system-op-tag">• SYSTEM OPERATIONAL •</div>
        <h1 className="main-title">B.A.Y.M.A.X</h1>
        <div className="subtitle-tag">Biomedical Automated Yield-Optimizing Medical Assistant eXperiment</div>
        <div className="title-underline"></div>
      </div>

      <div className="widget-telemetry">
        <div className="telemetry-date-row">
          <span>{timeData.date}</span>
          <span className="synced-tag">• SYNCED</span>
        </div>

        <div className="telemetry-time-row">
          <div className="clock-display">
            {timeData.main}
            <span>{timeData.sec}</span>
          </div>

          <div className="baymax-mini-wrapper">
            <div className="baymax-pulse-ring"></div>
            <div className="baymax-face-circle">
              <BaymaxMovieFace />
            </div>
          </div>
        </div>

        <div className="telemetry-stats">
          <div className="stat-row">
            <div className="stat-header"><span>CPU LOAD</span><span className="stat-val">{deviceStats.cpu}%</span></div>
            <div className="stat-bar-track"><div className="stat-bar-fill" style={{ width: `${deviceStats.cpu}%` }}></div></div>
          </div>
          <div className="stat-row">
            <div className="stat-header"><span>MEMORY</span><span className="stat-val">{deviceStats.memory} GB</span></div>
            <div className="stat-bar-track"><div className="stat-bar-fill" style={{ width: `${(deviceStats.memory / 16) * 100}%` }}></div></div>
          </div>
          <div className="stat-row">
            <div className="stat-header"><span>NETWORK</span><span className="stat-val">{deviceStats.network} KB/s</span></div>
            <div className="stat-bar-track"><div className="stat-bar-fill" style={{ width: `${(deviceStats.network / 500) * 100}%` }}></div></div>
          </div>
        </div>
      </div>

      <div className="nav-layout-container">
        <div className="top-audio-container">
          <div className="top-audio-orb" title="System Communication">
            <FormalSpeechIcon />
          </div>
        </div>

        <div
          className="bottom-carousel-viewport"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <div className="carousel-track">
            {navItems.map((item, index) => {
              let rawOffset = index - activeIndex;

              if (rawOffset > totalItems / 2) {
                rawOffset -= totalItems;
              } else if (rawOffset < -totalItems / 2) {
                rawOffset += totalItems;
              }

              const xPos = rawOffset * spacing + dragOffset;

              if (Math.abs(xPos) > spacing * 1.8) return null;

              const isCenter = Math.abs(xPos) < spacing / 2;
              const scale = isCenter ? 1.25 : 0.85;
              const opacity = isCenter ? 1 : 0.45;

              return (
                <div
                  key={item.label}
                  className={`carousel-node ${isCenter ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    transform: `translateX(${xPos}px) scale(${scale})`,
                    opacity: opacity,
                    transition: isSwiping ? 'none' : 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease'
                  }}
                >
                  <div className="node-circle">{item.icon}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="active-app-label">{navItems[activeIndex].label}</div>
      </div>

      <div className="pagination-dots">
        {navItems.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      <div className="chat-terminal-container">
        <div className="chat-history">
          {messages.slice(-4).map((m, i) => (
            <div key={i} className="chat-msg">
              <strong>[{m.sender}]:</strong> {m.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleQuery}>
          <input
            type="text"
            className="terminal-input"
            placeholder="Type a command or query Baymax..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>

      <div className="bottom-footer-tag">• 2026• SYSTEM ACTIVE •</div>
    </div>
  );
}