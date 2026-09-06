import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, Github, Linkedin, MapPin, ArrowUpRight } from "lucide-react";


const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  "C++", "Python", "MySQL", "MS SQL Server", "ADO.NET", "Entity Framework",
  "OOP", "DSA", "SOLID", "Design Patterns", "SDLC", "Agile / Scrum",
  "Git & GitHub", "Postman", "SSMS", "draw.io", "HTML5", "CSS3",
  "JavaScript", "Bootstrap 5",
];

const INTERNSHIP = [
  {
    n: "01",
    title: "Doctor Appointment Management System",
    stack: "C++ · MySQL · File Handling · OOP",
    points: [
      "Multi-role platform (Admin, Doctor, Patient) with full CRUD and role-based access — zero data loss across restarts.",
      "OOP-driven modular codebase cut redundancy by roughly 35% versus a procedural equivalent.",
      "End-to-end testing across all three roles confirmed no cross-role data access.",
    ],
  },
  {
    n: "02",
    title: "Library Management System",
    stack: "C++ · MySQL · OOP",
    points: [
      "Console system managing 500+ book records — issue, return, member tracking, automated late fines.",
      "Replaced three manual paper registers with a structured MySQL backend.",
      "Normalized three-table schema improved retrieval speed by around 60%.",
    ],
  },
  {
    n: "03",
    title: "Clothing Recycling & Sustainability Analysis",
    stack: "Python · Pandas · Matplotlib · MySQL",
    points: [
      "Cleaned a 10,000+ row recycling dataset — nulls, duplicates, inconsistencies resolved.",
      "Surfaced five key environmental trends across eight visualizations.",
      "Persisted output to MySQL, cutting stakeholder review time by around 40%.",
    ],
  },
  {
    n: "04",
    title: "Trading Data Analysis",
    stack: "Python · Pandas · Matplotlib",
    points: [
      "Time-series analysis on 5+ years of historical data — 1,800+ trading sessions.",
      "Computed moving averages, trend indicators, volatility metrics; six visualizations produced.",
      "Packaged findings into a report translating patterns into business-relevant insight.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Hotel Booking System",
    stack: "HTML5 · CSS3 · Bootstrap · JS · MySQL",
    desc: "Responsive booking web app — room selection, reservation, cancellation, live availability, tested for concurrent access.",
    link: "https://github.com/Ajay-lodhii/hotel-booking-system-naman-digitat",
  },
  {
    title: "School Management System",
    stack: "C++ · MySQL",
    desc: "Unified console app for enrollment, attendance and fees across 300+ records with automated fee-defaulter detection.",
    link: "https://github.com/Ajay-lodhii",
  },
  {
    title: "Task Manager (Windows)",
    stack: "C++ · Windows API",
    desc: "Real-time system monitor showing live process, CPU and memory data for 20+ processes via native Windows API calls.",
    link: "https://github.com/Ajay-lodhii",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function MagneticText({ text, className = "" }) {
  const wrapRef = useRef(null);
  const letterRefs = useRef([]);
  letterRefs.current = [];

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let frame;
    function onMove(e) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        letterRefs.current.forEach((el) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 130;
          if (dist < radius) {
            const power = (1 - dist / radius) * 16;
            const angle = Math.atan2(dy, dx);
            el.style.transform = `translate(${-Math.cos(angle) * power}px, ${-Math.sin(angle) * power}px)`;
          } else {
            el.style.transform = "translate(0,0)";
          }
        });
      });
    }
    function onLeave() {
      letterRefs.current.forEach((el) => el && (el.style.transform = "translate(0,0)"));
    }
    window.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={wrapRef} className={className} style={{ display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          ref={(el) => (letterRefs.current[i] = el)}
          style={{
            display: "inline-block",
            transition: "transform 0.18s cubic-bezier(.2,.8,.2,1)",
            whiteSpace: "pre",
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function Portfolio() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + "px";
        cursorRef.current.style.top = my + "px";
      }
    }
    function loop() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      requestAnimationFrame(loop);
    }
    window.addEventListener("mousemove", onMove);
    const raf = requestAnimationFrame(loop);

    function onEnter() {
      ringRef.current && ringRef.current.classList.add("cursor-hover");
    }
    function onLeave() {
      ringRef.current && ringRef.current.classList.remove("cursor-hover");
    }
    const hoverables = document.querySelectorAll("[data-cursor]");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  useEffect(() => {
    function onScroll() {
      const offsets = NAV.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top - 100) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        background: "#0e1512",
        color: "#f4f1e8",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        cursor: "none",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        a, button { cursor: none; }
        ::selection { background: #23b37c; color: #0e1512; }
        .serif { font-family: 'Fraunces', serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .cursor-dot {
          position: fixed; top: 0; left: 0; width: 8px; height: 8px;
          background: #23b37c; border-radius: 50%; pointer-events: none;
          transform: translate(-50%, -50%); z-index: 9999; mix-blend-mode: difference;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0; width: 36px; height: 36px;
          border: 1px solid rgba(244,241,232,0.5); border-radius: 50%; pointer-events: none;
          transform: translate(-50%, -50%); z-index: 9998; transition: width .25s, height .25s, border-color .25s, background .25s;
        }
        .cursor-ring.cursor-hover {
          width: 64px; height: 64px; background: rgba(35,179,124,0.14); border-color: #23b37c;
        }
        @media (hover:none) { .cursor-dot, .cursor-ring { display:none; } body,a,button{cursor:auto !important;} }
        .marquee-track {
          display: flex; gap: 14px; width: max-content;
          animation: marquee 32s linear infinite;
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .nav-link { position: relative; padding-bottom: 3px; }
        .nav-link::after {
          content: ''; position: absolute; left: 0; bottom: 0; height: 1px; width: 0;
          background: #23b37c; transition: width .25s ease;
        }
        .nav-link.active::after, .nav-link:hover::after { width: 100%; }
        .proj-card { transition: transform .25s ease, border-color .25s ease; will-change: transform; }
        .btn-fill { position:relative; overflow:hidden; z-index:1; }
        .btn-fill::before {
          content:''; position:absolute; inset:0; background:#23b37c; transform: translateX(-101%);
          transition: transform .3s ease; z-index:-1;
        }
        .btn-fill:hover::before { transform: translateX(0); }
        .fade-line { animation: fadeLine 1s ease .2s both; }
        @keyframes fadeLine { from { opacity:0; transform: translateY(14px);} to {opacity:1; transform:translateY(0);} }
      `}</style>

      <div ref={cursorRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      {/* NAV */}
      <nav
        style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(14,21,18,0.82)", backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(244,241,232,0.1)",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="mono" style={{ fontSize: 14, letterSpacing: "0.02em" }}>
            AJAY<span style={{ color: "#23b37c" }}>.</span>LODHI
          </span>
          <div style={{ display: "flex", gap: 28, fontSize: 14 }}>
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                data-cursor
                className={`nav-link ${active === n.id ? "active" : ""}`}
                style={{ color: active === n.id ? "#f4f1e8" : "rgba(244,241,232,0.6)" }}
              >
                {n.label}
              </a>
            ))}
          </div>
          <a href="mailto:ajayelen2004@gmail.com" data-cursor className="btn-fill" style={{ border: "1px solid rgba(244,241,232,0.3)", padding: "9px 18px", fontSize: 13 }}>
            Hire me
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "90px 32px 100px", maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ maxWidth: 720 }}>
          <div>
            <div className="mono fade-line" style={{ fontSize: 13, color: "#23b37c", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 22, height: 1, background: "#23b37c", display: "inline-block" }} />
              B.Tech CSE, 2026 — Open to work
            </div>
            <h1 className="serif fade-line" style={{ fontSize: "clamp(38px,5.2vw,60px)", lineHeight: 1.05, fontWeight: 600, margin: 0 }}>
              <MagneticText text="Ajay Kumar" />
              <br />
              <MagneticText text="Lodhi" />{" "}
              <em style={{ fontStyle: "italic", color: "#23b37c", fontWeight: 500 }}>
                <MagneticText text="builds" />
              </em>
              <br />
              <MagneticText text="working systems." />
            </h1>
            <p className="fade-line" style={{ marginTop: 18, fontSize: 18, color: "rgba(244,241,232,0.75)", maxWidth: "52ch" }}>
              Software Developer with hands-on experience across C++, Python, MySQL and .NET — four end-to-end
              projects shipped during a summer internship, each solving a real operational problem.
            </p>
            <p className="fade-line mono" style={{ marginTop: 20, fontSize: 14, color: "rgba(244,241,232,0.55)", borderLeft: "2px solid rgba(244,241,232,0.2)", paddingLeft: 16, maxWidth: "44ch" }}>
              "Systems that solve real problems, not just pass assignments."
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
              <a href="mailto:ajayelen2004@gmail.com" data-cursor className="btn-fill" style={{ background: "#f4f1e8", color: "#0e1512", padding: "13px 24px", fontSize: 14.5, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 8 }}>
                Email Ajay <ArrowUpRight size={16} />
              </a>
              <a href="https://github.com/Ajay-lodhii" target="_blank" rel="noreferrer" data-cursor style={{ border: "1px solid rgba(244,241,232,0.3)", padding: "13px 24px", fontSize: 14.5 }}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ajaykumarlodhii2004/" target="_blank" rel="noreferrer" data-cursor style={{ border: "1px solid rgba(244,241,232,0.3)", padding: "13px 24px", fontSize: 14.5 }}>
                LinkedIn
              </a>
            </div>
            <div style={{ display: "flex", gap: 26, marginTop: 44, flexWrap: "wrap" }}>
              {[["4", "Internship projects"], ["500+", "Records managed"], ["~60%", "Faster retrieval"], ["10k+", "Rows analyzed"]].map(([num, label]) => (
                <div key={label}>
                  <div className="serif" style={{ fontSize: 26, fontWeight: 600 }}>{num}</div>
                  <div style={{ fontSize: 13, color: "rgba(244,241,232,0.55)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "80px 32px", borderTop: "1px solid rgba(244,241,232,0.1)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 40 }}>
              <span className="mono" style={{ color: "#23b37c", fontSize: 13 }}>01</span>
              <h2 className="serif" style={{ fontSize: "clamp(26px,3.2vw,32px)", margin: 0, fontWeight: 600 }}>About</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 56 }}>
            <Reveal delay={80}>
              <p style={{ fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.7, color: "rgba(244,241,232,0.8)", maxWidth: "72ch" }}>
                A Computer Science graduate comfortable across the full SDLC — from requirement gathering and system
                design through to implementation, testing and deployment. Strong in OOP, data structures and SOLID
                principles, with practical exposure to .NET (C#, ASP.NET MVC, WinForms) and relational database
                design in SQL Server and MySQL. Comfortable working independently or inside a cross-functional
                Agile team, with a track record of shipping things that actually get used.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div style={{ borderLeft: "1px solid rgba(244,241,232,0.15)", paddingLeft: 28, display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  ["Location", "Ashoka Garden, Bhopal, M.P."],
                  ["Phone", "+91 83496 43544"],
                  ["Email", "ajayelen2004@gmail.com"],
                  ["Looking for", "Software Developer roles"],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div className="mono" style={{ fontSize: 12, color: "#c98a3b", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14.5 }}>{val}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SKILLS - marquee */}
      <section id="skills" style={{ padding: "80px 0", borderTop: "1px solid rgba(244,241,232,0.1)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 40 }}>
              <span className="mono" style={{ color: "#23b37c", fontSize: 13 }}>02</span>
              <h2 className="serif" style={{ fontSize: "clamp(26px,3.2vw,32px)", margin: 0, fontWeight: 600 }}>Technical skills</h2>
            </div>
          </Reveal>
        </div>
        <div style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
          <div className="marquee-track">
            {[...SKILLS, ...SKILLS].map((s, i) => (
              <span
                key={i}
                className="mono"
                style={{ fontSize: 14, padding: "10px 20px", border: "1px solid rgba(244,241,232,0.18)", borderRadius: 999, whiteSpace: "nowrap", color: "rgba(244,241,232,0.85)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "80px 32px", borderTop: "1px solid rgba(244,241,232,0.1)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 12 }}>
              <span className="mono" style={{ color: "#23b37c", fontSize: 13 }}>03</span>
              <h2 className="serif" style={{ fontSize: "clamp(26px,3.2vw,32px)", margin: 0, fontWeight: 600 }}>Internship experience</h2>
            </div>
            <p style={{ fontSize: 15, color: "rgba(244,241,232,0.6)", marginLeft: 32 }}>
              Software Developer Intern at <b style={{ color: "#f4f1e8" }}>Naman Digital</b> — June to August 2025
            </p>
          </Reveal>

          <div style={{ marginTop: 40 }}>
            {INTERNSHIP.map((item, i) => (
              <Reveal key={item.n} delay={i * 90}>
                <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 28, padding: "30px 0", borderTop: "1px solid rgba(244,241,232,0.12)" }}>
                  <div className="mono" style={{ color: "#23b37c", fontSize: 13, paddingTop: 4 }}>{item.n}</div>
                  <div>
                    <h3 className="serif" style={{ fontSize: 19, fontWeight: 600, margin: "0 0 6px" }}>{item.title}</h3>
                    <div className="mono" style={{ fontSize: 12, color: "#c98a3b", marginBottom: 12 }}>{item.stack}</div>
                    <ul style={{ paddingLeft: 18, margin: 0, color: "rgba(244,241,232,0.72)", fontSize: 14.5 }}>
                      {item.points.map((p, j) => (
                        <li key={j} style={{ marginBottom: 7 }}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "80px 32px", borderTop: "1px solid rgba(244,241,232,0.1)", background: "rgba(244,241,232,0.02)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 40 }}>
              <span className="mono" style={{ color: "#23b37c", fontSize: 13 }}>04</span>
              <h2 className="serif" style={{ fontSize: "clamp(26px,3.2vw,32px)", margin: 0, fontWeight: 600 }}>Independent projects</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(244,241,232,0.12)" }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div
                  data-cursor
                  className="proj-card"
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width - 0.5;
                    const py = (e.clientY - r.top) / r.height - 0.5;
                    e.currentTarget.style.transform = `perspective(700px) rotateX(${py * -8}deg) rotateY(${px * 8}deg) scale(1.02)`;
                  }}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                  style={{ background: "#0e1512", padding: "30px 28px", height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <h3 className="serif" style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px" }}>{p.title}</h3>
                  <div className="mono" style={{ fontSize: 11.5, color: "#23b37c", marginBottom: 14 }}>{p.stack}</div>
                  <p style={{ fontSize: 14, color: "rgba(244,241,232,0.6)", flex: 1, marginBottom: 16 }}>{p.desc}</p>
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 500, color: "#f4f1e8", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    View project <ArrowUpRight size={14} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding: "80px 32px", borderTop: "1px solid rgba(244,241,232,0.1)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 40 }}>
              <span className="mono" style={{ color: "#23b37c", fontSize: 13 }}>05</span>
              <h2 className="serif" style={{ fontSize: "clamp(26px,3.2vw,32px)", margin: 0, fontWeight: 600 }}>Education & certifications</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
            <Reveal delay={80}>
              <div>
                {[
                  ["B.Tech — Computer Science Engineering", "SAGE University, Bhopal (M.P.)", "2022–2026 · CGPA 7.51"],
                  ["Higher Secondary (12th)", "Bright Model H.S. School, Ashok Nagar", "2021 · 62%"],
                  ["High School (10th)", "Maharshi Ramkrishna Paramhans H.S. School", "2019 · 63%"],
                ].map(([deg, school, meta]) => (
                  <div key={deg} style={{ padding: "20px 0", borderTop: "1px solid rgba(244,241,232,0.12)" }}>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{deg}</div>
                    <div style={{ color: "rgba(244,241,232,0.6)", fontSize: 14, marginTop: 4 }}>{school}</div>
                    <div className="mono" style={{ fontSize: 12, color: "#23b37c", marginTop: 6 }}>{meta}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={160}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "MySQL Project — Infosys Springboard",
                  "API Design & Development — Infosys Springboard",
                  "OOP in C++ — Infosys Springboard",
                  "Fundamentals of C++ — Infosys Springboard",
                ].map((c) => (
                  <li key={c} style={{ padding: "16px 0", borderTop: "1px solid rgba(244,241,232,0.12)", display: "flex", alignItems: "center", gap: 14, fontSize: 14.5 }}>
                    <span style={{ width: 7, height: 7, background: "#c98a3b", flexShrink: 0 }} />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "90px 32px", borderTop: "1px solid rgba(244,241,232,0.1)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Reveal>
            <h2 className="serif" style={{ fontSize: "clamp(32px,5.6vw,54px)", maxWidth: "14ch", lineHeight: 1.08, margin: 0, fontWeight: 600 }}>
              Let's build the <em style={{ fontStyle: "italic", color: "#23b37c", fontWeight: 500 }}>next thing</em> together.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32, marginTop: 40 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="mailto:ajayelen2004@gmail.com" data-cursor style={{ fontSize: 16, color: "rgba(244,241,232,0.8)", display: "flex", alignItems: "center", gap: 10 }}>
                  <Mail size={16} color="#c98a3b" /> ajayelen2004@gmail.com
                </a>
                <a href="tel:+918349643544" data-cursor style={{ fontSize: 16, color: "rgba(244,241,232,0.8)", display: "flex", alignItems: "center", gap: 10 }}>
                  <Phone size={16} color="#c98a3b" /> +91 83496 43544
                </a>
                <a href="https://www.linkedin.com/in/ajaykumarlodhii2004/" target="_blank" rel="noreferrer" data-cursor style={{ fontSize: 16, color: "rgba(244,241,232,0.8)", display: "flex", alignItems: "center", gap: 10 }}>
                  <Linkedin size={16} color="#c98a3b" /> /in/ajaykumarlodhii2004
                </a>
                <a href="https://github.com/Ajay-lodhii" target="_blank" rel="noreferrer" data-cursor style={{ fontSize: 16, color: "rgba(244,241,232,0.8)", display: "flex", alignItems: "center", gap: 10 }}>
                  <Github size={16} color="#c98a3b" /> /Ajay-lodhii
                </a>
              </div>
              <a href="mailto:ajayelen2004@gmail.com" data-cursor className="btn-fill" style={{ background: "#23b37c", color: "#0e1512", padding: "16px 28px", fontSize: 15, fontWeight: 500 }}>
                Send an email
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer style={{ padding: "24px 32px", borderTop: "1px solid rgba(244,241,232,0.1)", color: "rgba(244,241,232,0.45)", fontSize: 12.5 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={13} /> Ajay Kumar Lodhi — Bhopal, Madhya Pradesh
          </div>
          <div>Built 2026</div>
        </div>
      </footer>
    </div>
  );
}
