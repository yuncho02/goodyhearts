// ─────────────────────────────────────────────────────────────────
// Shared design-system components — buttons, inputs, icons, layout.
// All exposed to window so other Babel files can use them.
// ─────────────────────────────────────────────────────────────────

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ───────── Icons (line-art, single stroke) ─────────
const Icon = ({ d, size = 24, stroke = "currentColor", fill = "none", strokeWidth = 1.8, style }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
    {d}
  </svg>;

const IconMenu = (p) => <Icon {...p} d={<><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>} />;
const IconClose = (p) => <Icon {...p} d={<><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>} />;
const IconCart = (p) => <Icon {...p} d={<><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2.6 11.5a2 2 0 0 0 2 1.5h7.4a2 2 0 0 0 2-1.5L21 8H6" /></>} />;
const IconPlus = (p) => <Icon {...p} d={<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>} />;
const IconMinus = (p) => <Icon {...p} d={<line x1="5" y1="12" x2="19" y2="12" />} />;
const IconArrowR = (p) => <Icon {...p} d={<><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></>} />;
const IconArrowL = (p) => <Icon {...p} d={<><line x1="19" y1="12" x2="5" y2="12" /><polyline points="11 6 5 12 11 18" /></>} />;
const IconCheck = (p) => <Icon {...p} d={<polyline points="4 12 10 18 20 6" />} />;
const IconUpload = (p) => <Icon {...p} d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>} />;
const IconHeart = (p) => <Icon {...p} d={<path d="M12 21s-7-4.5-9.3-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.3 6C19 16.5 12 21 12 21z" />} />;
const IconLeaf = (p) => <Icon {...p} d={<><path d="M5 19c10 0 14-6 14-14C9 5 5 10 5 19z" /><path d="M5 19l8-8" /></>} />;
const IconSparkle = (p) => <Icon {...p} d={<path d="M12 3v6M12 15v6M3 12h6M15 12h6" />} />;
const IconStar = (p) => <Icon {...p} d={<polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" />} />;

// ───────── Button ─────────
const Button = ({ children, variant = "primary", size = "md", as: As = "button", icon, iconRight, full, ...rest }) => {
  const styles = {
    base: {
      fontFamily: "var(--font-body)",
      fontWeight: 500,
      letterSpacing: "-0.02em",
      borderRadius: "var(--radius-pill)",
      border: "1px solid transparent",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      transition: "transform .15s ease, background .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease",
      whiteSpace: "nowrap",
      width: full ? "100%" : undefined,
      cursor: "pointer"
    },
    sizes: {
      sm: { padding: "6px 16px", fontSize: 14, height: 32 },
      md: { padding: "8px 24px", fontSize: 16, height: 40 },
      lg: { padding: "12px 28px", fontSize: 17, height: 48 }
    },
    variants: {
      primary: { background: "var(--ink)", color: "#fff", borderColor: "var(--ink)" },
      coral: { background: "var(--coral)", color: "#fff", borderColor: "var(--coral)" },
      outline: { background: "transparent", color: "var(--ink)", borderColor: "var(--ink-4)" },
      ghost: { background: "transparent", color: "var(--ink)", borderColor: "transparent" },
      link: { background: "transparent", color: "var(--ink)", borderColor: "transparent", textDecoration: "underline", textUnderlineOffset: 4, padding: "4px 8px", height: "auto" }
    }
  };
  const s = { ...styles.base, ...styles.sizes[size], ...styles.variants[variant], ...(rest.style || {}) };
  const base = styles.variants[variant];
  const handleMouseEnter = (e) => {
    if (variant === "coral" || variant === "outline") {
      e.currentTarget.style.setProperty("background", "#C6494B");
      e.currentTarget.style.setProperty("border-color", "#C6494B");
      e.currentTarget.style.setProperty("color", "#fff");
    } else if (variant === "primary") {
      e.currentTarget.style.setProperty("background", "#333");
      e.currentTarget.style.setProperty("border-color", "#333");
    }
    rest.onMouseEnter && rest.onMouseEnter(e);
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.removeProperty("background");
    e.currentTarget.style.removeProperty("border-color");
    e.currentTarget.style.removeProperty("color");
    if (base.background) e.currentTarget.style.setProperty("background", base.background);
    if (base.borderColor) e.currentTarget.style.setProperty("border-color", base.borderColor);
    if (base.color)       e.currentTarget.style.setProperty("color", base.color);
    rest.onMouseLeave && rest.onMouseLeave(e);
  };
  return (
    <As {...rest} style={s} className={"gh-btn gh-btn-" + variant + " " + (rest.className || "")}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {icon ? <span style={{ display: "inline-flex" }}>{icon}</span> : null}
      <span>{children}</span>
      {iconRight ? <span style={{ display: "inline-flex" }}>{iconRight}</span> : null}
    </As>);

};

// ───────── Field / Input ─────────
const Field = ({ label, hint, required, children, error }) =>
<label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <span style={{ fontSize: 14, color: "var(--ink-2)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }}>
      {required ? <span style={{ color: "#cd1c18" }}>*</span> : null}
      {label}
    </span>
    {children}
    {hint ? <span style={{ fontSize: 13, color: error ? "#cd1c18" : "var(--ink-3)", fontWeight: 300 }}>{hint}</span> : null}
  </label>;


const Input = ({ ...rest }) =>
<input
  {...rest}
  style={{
    height: 48,
    padding: "0 16px",
    borderRadius: 6,
    border: "1px solid var(--hairline)",
    background: "var(--surface)",
    fontSize: 15,
    fontFamily: "var(--font-body)",
    letterSpacing: "-0.01em",
    color: "var(--ink)",
    outline: "none",
    transition: "border-color .15s, box-shadow .15s",
    ...rest.style
  }}
  onFocus={(e) => {e.currentTarget.style.borderColor = "var(--ink)";e.currentTarget.style.boxShadow = "0 0 0 3px rgba(248,92,94,.12)";rest.onFocus && rest.onFocus(e);}}
  onBlur={(e) => {e.currentTarget.style.borderColor = "var(--hairline)";e.currentTarget.style.boxShadow = "none";rest.onBlur && rest.onBlur(e);}} />;



const Textarea = ({ ...rest }) =>
<textarea
  {...rest}
  style={{
    minHeight: 100, padding: 14, borderRadius: 6, border: "1px solid var(--hairline)",
    background: "var(--surface)", fontSize: 15, fontFamily: "var(--font-body)", letterSpacing: "-0.01em",
    color: "var(--ink)", resize: "vertical", outline: "none", transition: "border-color .15s, box-shadow .15s",
    ...rest.style
  }}
  onFocus={(e) => {e.currentTarget.style.borderColor = "var(--ink)";e.currentTarget.style.boxShadow = "0 0 0 3px rgba(248,92,94,.12)";}}
  onBlur={(e) => {e.currentTarget.style.borderColor = "var(--hairline)";e.currentTarget.style.boxShadow = "none";}} />;



// ───────── Logo ─────────
const Logo = ({ height = 28, color = "var(--ink)" }) =>
<img src="assets/logo.png" alt="Goody Hearts Club" style={{ height: height, width: "auto", display: "block" }} />;


// ───────── Header / Top bar ─────────
function Header({ route, navigate, cartCount, onOpenCart, onOpenMenu }) {
  const linkStyle = (target) => ({
    fontSize: 15,
    color: route === target ? "var(--ink)" : "var(--ink-4)",
    fontWeight: route === target ? 600 : 500,
    padding: "8px 4px",
    position: "relative",
    cursor: "pointer"
  });
  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,.92)", backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--hairline)"
      }}
      data-screen-label="Header">
      
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",

        gap: 16, padding: "14px var(--page-px)"
      }}>
        {/* Logo — left */}
        <a onClick={() => navigate("home")} style={{ cursor: "pointer", display: "inline-flex" }}>
          <Logo height={28} />
        </a>

        {/* Desktop nav */}
        <nav className="gh-only-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <a onClick={() => navigate("upload")} style={linkStyle("upload")}>Upload Art</a>
          <a onClick={() => navigate("about")} style={linkStyle("about")}>About</a>
        </nav>

        {/* Mobile menu — right */}
        <button
          aria-label="Open menu"
          onClick={onOpenMenu}
          className="gh-only-mobile"
          style={{ background: "transparent", border: 0, padding: 0, color: "var(--ink)", display: "none" }}>
          <IconMenu size={26} />
        </button>
      </div>

      {/* Impact banner */}
      <div style={{
        background: "var(--coral-tint)",
        textAlign: "center",
        padding: "8px 16px",
        fontSize: 14,
        color: "var(--coral)",
        letterSpacing: "-0.01em",
        borderBottom: "1px solid rgba(248,92,94,.15)"
      }}>
        <IconLeaf size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />
        1 sticker = 1 tree planted &nbsp;·&nbsp; <strong style={{ fontWeight: 600 }}>27</strong> trees and growing
      </div>
    </header>);

}

// ───────── Mobile fullscreen menu ─────────
function MobileMenu({ open, onClose, navigate, route }) {
  if (!open) return null;
  const items = [
  { id: "upload", label: "Upload Art" },
  { id: "about", label: "About us" }];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "var(--bg)",
      animation: "fadeIn .2s ease both",
      display: "flex", flexDirection: "column"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px var(--page-px)", borderBottom: "1px solid var(--hairline)" }}>
        <Logo height={28} />
        <button onClick={onClose} aria-label="Close menu" style={{ background: "transparent", border: 0, padding: 0 }}>
          <IconClose size={26} />
        </button>
      </div>
      <nav style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 22 }}>
        {items.map((it, i) =>
        <a
          key={i}
          onClick={() => {navigate(it.id);onClose();}}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 36, color: "var(--ink)",
            cursor: "pointer", letterSpacing: "-0.03em",
            animation: `fadeUp .35s ease both`, animationDelay: `${i * 60}ms`
          }}>
          {it.label}</a>
        )}
      </nav>
      <div style={{ marginTop: "auto", padding: 28, color: "var(--ink-3)", fontSize: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        <span>© 2026 Goody Hearts Club</span>
        <span>Art for good, always free to submit.</span>
      </div>
    </div>);

}

// ───────── Cart drawer ─────────
function CartDrawer({ open, onClose, items, onChangeQty, onRemove, onCheckout }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const trees = items.reduce((sum, it) => sum + it.qty, 0);
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,.42)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .25s ease"
        }} />
      
      <aside
        aria-label="Cart"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 110,
          width: "min(420px, 100vw)",
          background: "var(--bg)",
          borderLeft: "1px solid var(--hairline)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .3s cubic-bezier(.2,.7,.2,1)",
          display: "flex", flexDirection: "column",
          boxShadow: "-20px 0 40px rgba(0,0,0,.08)"
        }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid var(--hairline)" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "-0.03em" }}>Your bag</span>
          <button onClick={onClose} aria-label="Close cart" style={{ background: "transparent", border: 0, padding: 6 }}>
            <IconClose size={24} />
          </button>
        </div>

        {items.length === 0 ?
        <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 32, textAlign: "center", color: "var(--ink-3)" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--ink)", marginBottom: 8, letterSpacing: "-0.03em" }}>Bag is empty</div>
              <div style={{ fontSize: 14 }}>Stickers, then trees. <br />Pick a few favorites.</div>
            </div>
          </div> :

        <>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
              {items.map((it) => {
              const sticker = STICKERS[it.id];
              return (
                <div key={it.id} style={{ display: "grid", gridTemplateColumns: "72px 1fr auto", gap: 16, alignItems: "center" }}>
                    <div style={{ width: 72, height: 72, background: "#fff", borderRadius: 8, border: "1px solid var(--hairline)", display: "grid", placeItems: "center" }}>
                      <StickerArt id={it.id} size={56} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{sticker.name}</div>
                      <div style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 8 }}>${it.price.toFixed(2)} each</div>
                      <QtyStepper value={it.qty} onChange={(q) => onChangeQty(it.id, q)} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                      <span style={{ fontWeight: 600, fontSize: 15 }}>${(it.price * it.qty).toFixed(2)}</span>
                      <button onClick={() => onRemove(it.id)} style={{ background: "transparent", border: 0, color: "var(--ink-3)", fontSize: 13, textDecoration: "underline", padding: 0 }}>remove</button>
                    </div>
                  </div>);

            })}
            </div>

            <div style={{ borderTop: "1px solid var(--hairline)", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "var(--mint)", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, color: "var(--forest-d)" }}>
                <IconLeaf size={18} />
                <span style={{ fontSize: 14 }}>This order plants <strong style={{ fontWeight: 700 }}>{trees}</strong> tree{trees === 1 ? "" : "s"}.</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                <span style={{ color: "var(--ink-3)" }}>Subtotal</span>
                <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
              </div>
              <Button variant="primary" size="lg" full onClick={onCheckout} iconRight={<IconArrowR size={18} />}>Checkout</Button>
              <button onClick={onClose} style={{ background: "transparent", border: 0, color: "var(--ink-3)", fontSize: 14, textDecoration: "underline", padding: 4 }}>Keep shopping</button>
            </div>
          </>
        }
      </aside>
    </>);

}

// ───────── Quantity stepper ─────────
function QtyStepper({ value, onChange, min = 1, max = 99, size = "sm" }) {
  const h = size === "lg" ? 44 : 32;
  const btn = {
    width: h, height: h, border: "1px solid var(--hairline)", background: "var(--surface)",
    borderRadius: "50%", display: "grid", placeItems: "center", color: "var(--coral)", cursor: "pointer"
  };
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12, height: h }}>
      <button style={btn} onClick={() => onChange(Math.max(min, value - 1))} aria-label="Decrease"><IconMinus size={16} /></button>
      <span style={{ minWidth: 20, textAlign: "center", fontSize: 15, fontWeight: 600 }}>{value}</span>
      <button style={btn} onClick={() => onChange(Math.min(max, value + 1))} aria-label="Increase"><IconPlus size={16} /></button>
    </div>);

}

// ───────── Footer ─────────
function Footer({ navigate }) {
  return (
    <footer style={{
      background: "#000", color: "#fff",
      padding: "64px 0px 50px", textAlign: "left"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 var(--page-px)" }}>
        <div style={{
          display: "grid", gap: 32,
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          marginBottom: 56
        }}>
          <div>
            <img src="assets/logo.png" alt="Goody Hearts Club" style={{ height: 28, width: "auto", marginBottom: 16, filter: "invert(1)" }} />
            <p style={{ color: "rgba(255,255,255,.65)", fontSize: 14, lineHeight: 1.6, maxWidth: 280, margin: 0 }}>
              Every sticker plants a tree. Submitted by artists, packed by people, delivered by post.
            </p>
          </div>

          {/* Footer nav hidden — re-enable when other pages are ready
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,.5)", marginBottom: 16 }}>Menu</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <li><a onClick={() => navigate("upload")} style={{ cursor: "pointer", color: "rgba(255,255,255,.85)", fontSize: 14 }}>Upload art</a></li>
              <li><a onClick={() => navigate("about")} style={{ cursor: "pointer", color: "rgba(255,255,255,.85)", fontSize: 14 }}>About us</a></li>
            </ul>
          </div>
          */}

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,.5)", marginBottom: 16 }}>Reach out</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <li><a href="https://www.instagram.com/goodyheartsclub/?hl=en" target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer", color: "rgba(255,255,255,.85)", fontSize: 14 }}>Instagram</a></li>

              <li><a href="mailto:goodyheartsclub@gmail.com" style={{ cursor: "pointer", color: "rgba(255,255,255,.85)", fontSize: 14 }}>goodyheartsclub@gmail.com</a></li>
            </ul>
          </div>

        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.1)",
          color: "rgba(255,255,255,.5)", fontSize: 13, flexWrap: "wrap", gap: 12
        }}>
          <span>© 2026 · Art for good, always free to submit.</span>
          <span>Made with care · ships from Seattle</span>
        </div>
      </div>
    </footer>);

}

// ───────── Tree counter (animated) ─────────
function TreeCounter({ target = 27, label = "trees", trigger = true, large = false }) {
  const [n, setN] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    if (!trigger) return;
    const from = fromRef.current;
    let raf, start;
    const dur = from === 0 ? 1400 : 800;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(from + (target - from) * eased);
      setN(current);
      if (p < 1) raf = requestAnimationFrame(step);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, trigger]);
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8, fontFamily: "var(--font-display)", letterSpacing: "-0.03em", lineHeight: 1 }}>
      <span style={{ fontSize: large ? "clamp(80px, 18vw, 180px)" : 56, color: "currentColor" }}>{n}</span>
      <span style={{ fontSize: large ? "clamp(28px, 6vw, 48px)" : 22, color: "currentColor", opacity: .85 }}>{label}</span>
    </span>);

}

// ───────── In-view trigger ─────────
function useInView(opts = {}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) setSeen(true);});
    }, { threshold: 0.3, ...opts });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
}

// ───────── Section divider with optional eyebrow ─────────
function SectionHeader({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <div style={{ textAlign: align, display: "flex", flexDirection: "column", gap: 12, alignItems: align === "center" ? "center" : "flex-start", marginBottom: 32 }}>
      {eyebrow ?
      <span style={{ fontSize: 13, color: "var(--coral)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>{eyebrow}</span> :
      null}
      <h2 style={{
        margin: 0, fontFamily: "var(--font-display)",
        fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.03em",
        color: "var(--ink)",
        textWrap: "balance"
      }}>{title}</h2>
      {subtitle ? <p style={{ margin: 0, color: "var(--ink-3)", fontSize: 17, maxWidth: 560, lineHeight: 1.5 }}>{subtitle}</p> : null}
    </div>);

}

// expose
Object.assign(window, {
  Icon, IconMenu, IconClose, IconCart, IconPlus, IconMinus, IconArrowR, IconArrowL, IconCheck, IconUpload, IconHeart, IconLeaf, IconSparkle, IconStar,
  Button, Field, Input, Textarea, Logo,
  Header, MobileMenu, CartDrawer, QtyStepper, Footer,
  TreeCounter, useInView, SectionHeader
});