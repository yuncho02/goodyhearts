// ─────────────────────────────────────────────────────────────────
// App root — routing, cart state, tweaks, responsive CSS
// ─────────────────────────────────────────────────────────────────

const { useState: useS, useEffect: useEf, useMemo: useMe, useCallback: useCb } = React;

// Tweak defaults — host can persist edits via __edit_mode_set_keys
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "coral",
  "displayFont": "Wonder",
  "density": "cozy",
  "showImpactBanner": true,
  "gridColumns": "auto",
  "treesPlanted": 27
}/*EDITMODE-END*/;

const ACCENTS = {
  coral:  { primary: "#F85C5E", deep: "#C6494B", tint: "#FFF2F2" },
  forest: { primary: "#3F6135", deep: "#285D42", tint: "#E5EBE0" },
  ink:    { primary: "#101010", deep: "#000000", tint: "#EBEBEB" },
  orange: { primary: "#F09B7B", deep: "#C66E4F", tint: "#FFF2E0" },
};

const FONTS = ["Yeseva One", "Fraunces", "Caveat", "Gaegu", "Playfair Display"];


function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useS("upload");
  const [productId, setProductId] = useS("petal");
  const [menuOpen, setMenuOpen] = useS(false);
  const [cartOpen, setCartOpen] = useS(false);
  const [payOpen, setPayOpen] = useS(false);
  const [cart, setCart] = useS([]);
  const [toast, setToast] = useS(null);
  const [trees, setTrees] = useS(tweaks.treesPlanted || 27);

  // Apply accent tokens
  useEf(() => {
    const a = ACCENTS[tweaks.accent] || ACCENTS.coral;
    document.documentElement.style.setProperty("--coral", a.primary);
    document.documentElement.style.setProperty("--coral-d", a.deep);
    document.documentElement.style.setProperty("--coral-tint", a.tint);
  }, [tweaks.accent]);

  // Apply display font
  useEf(() => {
    document.documentElement.style.setProperty("--font-display", `"${tweaks.displayFont}", Georgia, serif`);
    if (tweaks.displayFont !== "Wonder") {
      const id = "gh-font-" + tweaks.displayFont.replace(/\s+/g, "-");
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id; link.rel = "stylesheet";
        link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(tweaks.displayFont)}:wght@400;700&display=swap`;
        document.head.appendChild(link);
      }
    }
  }, [tweaks.displayFont]);

  // Lock scroll when overlays open
  useEf(() => {
    const lock = menuOpen || cartOpen || payOpen;
    document.body.classList.toggle("lock", lock);
  }, [menuOpen, cartOpen, payOpen]);

  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  const addToCart = (id, qty = 1) => {
    setCart((curr) => {
      const found = curr.find((it) => it.id === id);
      if (found) return curr.map((it) => it.id === id ? { ...it, qty: it.qty + qty } : it);
      return [...curr, { id, qty, price: STICKERS[id].price }];
    });
    showToast(`Added ${STICKERS[id].name} to bag`);
  };
  const changeQty = (id, qty) => setCart((c) => c.map((it) => it.id === id ? { ...it, qty } : it));
  const removeItem = (id) => setCart((c) => c.filter((it) => it.id !== id));

  const showToast = (msg) => {
    setToast({ msg, id: Date.now() });
    setTimeout(() => setToast(null), 2200);
  };

  const navigate = (r) => {
    setRoute(r);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openProduct = (id) => {
    setProductId(id);
    setRoute("product");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const onCheckout = () => { setCartOpen(false); setTimeout(() => setPayOpen(true), 280); };
  const onPayComplete = () => {
    const justBought = cart.reduce((s, it) => s + it.qty, 0);
    setTrees((t) => t + justBought);
    setCart([]);
    setPayOpen(false);
    showToast(`Order placed · ${justBought} tree${justBought === 1 ? "" : "s"} planted!`);
  };

  return (
    <>
      {/* Header hidden — re-enable when site is ready to go public
      <Header
        route={route} navigate={navigate}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
      />
      */}

      <main>
        {route === "home"    && <HomePage navigate={navigate} onAddToCart={addToCart} openProduct={openProduct} treesPlanted={trees} />}
        {route === "shop"    && <ShopPage onAddToCart={addToCart} openProduct={openProduct} />}
        {route === "product" && <ProductPage id={productId} onAddToCart={addToCart} openProduct={openProduct} navigate={navigate} />}
        {route === "about"   && <AboutPage navigate={navigate} treesPlanted={trees} />}
        {route === "upload"  && <UploadPage navigate={navigate} />}
        {route === "gallery" && <GalleryPage />}
      </main>

      <Footer navigate={navigate} />

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} navigate={navigate} route={route} />
      <CartDrawer
        open={cartOpen} onClose={() => setCartOpen(false)}
        items={cart} onChangeQty={changeQty} onRemove={removeItem}
        onCheckout={onCheckout}
      />
      <VenmoSheet open={payOpen} onClose={() => setPayOpen(false)} items={cart} onComplete={onPayComplete} />

      {toast ? (
        <div role="status" style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: "var(--ink)", color: "#fff",
          padding: "12px 20px", borderRadius: "var(--radius-pill)",
          fontSize: 14, zIndex: 300,
          boxShadow: "0 12px 24px rgba(0,0,0,.18)",
          animation: "fadeUp .25s ease both",
          display: "inline-flex", alignItems: "center", gap: 8,
        }}>
          <IconCheck size={16} stroke="var(--coral)" strokeWidth={2.5} />
          {toast.msg}
        </div>
      ) : null}

      {/* TWEAKS PANEL */}
      <TweaksPanel title="Tweaks">
        <TweakSection title="Brand">
          <TweakRadio
            label="Accent"
            value={tweaks.accent}
            onChange={(v) => setTweak("accent", v)}
            options={[
              { value: "coral",  label: "Coral" },
              { value: "forest", label: "Forest" },
              { value: "ink",    label: "Ink" },
              { value: "orange", label: "Orange" },
            ]}
          />
          <TweakSelect
            label="Display font"
            value={tweaks.displayFont}
            onChange={(v) => setTweak("displayFont", v)}
            options={FONTS.map((f) => ({ value: f, label: f }))}
          />
        </TweakSection>
        <TweakSection title="Content">
          <TweakNumber label="Trees counter" value={trees} min={0} max={9999} onChange={(v) => { setTrees(Number(v)); setTweak("treesPlanted", Number(v)); }} />
          <TweakButton onClick={() => setTrees((t) => t + 1)}>+1 tree (live!)</TweakButton>
        </TweakSection>
        <TweakSection title="Demo">
          <TweakButton onClick={() => { addToCart("petal", 1); }}>Add Petal Pop to bag</TweakButton>
          <TweakButton onClick={() => setCartOpen(true)}>Open cart</TweakButton>
          <TweakButton onClick={() => navigate("upload")}>Go to Upload</TweakButton>
          <TweakButton onClick={() => navigate("about")}>Go to About</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// Responsive helpers via CSS-in-page
const responsiveCSS = `
.gh-btn-coral:hover,
.gh-btn-outline:hover {
  background: #C6494B !important;
  border-color: #C6494B !important;
  color: #fff !important;
}
.gh-btn-primary:hover {
  background: #333 !important;
  border-color: #333 !important;
}

@media (max-width: 720px) {
  .gh-only-mobile  { display: inline-flex !important; }
  .gh-only-desktop { display: none !important; }
  .gh-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
  .gh-grid > * { min-width: 0; overflow: hidden; }
  .gh-gallery-card { padding: 16px !important; }
  .gh-hero { padding-top: 48px !important; padding-bottom: 40px !important; }
  .gh-impact-grid { grid-template-columns: 1fr !important; }
  .gh-form-actions { flex-direction: column !important; }
  .gh-form-actions > * { width: 100% !important; justify-content: center !important; }
}
@media (max-width: 480px) {
  .gh-grid { grid-template-columns: 1fr !important; }
}
@media (min-width: 721px) and (max-width: 1023px) {
  .gh-grid { grid-template-columns: repeat(2, 1fr) !important; }
}
@media (min-width: 720px) {
  .gh-hero { grid-template-columns: 1.1fr 1fr !important; }
  .gh-product { grid-template-columns: 1.05fr 1fr !important; }
  .gh-show-md { display: block !important; }
}
@media (min-width: 1024px) {
  .gh-hero { grid-template-columns: 1.2fr 1fr !important; gap: 80px !important; }
}
`;
const style = document.createElement("style");
style.textContent = responsiveCSS;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
document.getElementById("root").removeAttribute("aria-busy");
