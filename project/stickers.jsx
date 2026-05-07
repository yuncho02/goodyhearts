// CSS/SVG sticker artwork — abstract shapes that read as stickers, no AI-slop drawings
// Each sticker is a self-contained SVG element with a chunky white border (sticker die-cut feel).

const StickerWrap = ({ children, rotate = 0, size = 220, peelable = true, style = {} }) => (
  <div
    className={"sticker " + (peelable ? "sticker-peel" : "")}
    style={{
      width: size,
      height: size,
      position: "relative",
      filter: "drop-shadow(0 8px 14px rgba(0,0,0,.18)) drop-shadow(0 2px 4px rgba(0,0,0,.08))",
      transform: `rotate(${rotate}deg)`,
      ...style,
    }}
  >
    {children}
  </div>
);

// Each sticker SVG uses viewBox 0 0 200 200 with a white "die-cut" outline outset

function PetalPop({ rotate, size }) {
  return (
    <StickerWrap rotate={rotate} size={size}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
        <defs>
          <filter id="pp-cut"><feMorphology operator="dilate" radius="6" /></filter>
        </defs>
        {/* white die-cut */}
        <g fill="#fff">
          <circle cx="100" cy="65" r="34" />
          <circle cx="135" cy="100" r="34" />
          <circle cx="100" cy="135" r="34" />
          <circle cx="65" cy="100" r="34" />
          <circle cx="100" cy="100" r="32" />
        </g>
        {/* coral petals */}
        <g>
          <circle cx="100" cy="68" r="28" fill="#F85C5E" />
          <circle cx="132" cy="100" r="28" fill="#F85C5E" />
          <circle cx="100" cy="132" r="28" fill="#F85C5E" />
          <circle cx="68" cy="100" r="28" fill="#F85C5E" />
          <circle cx="100" cy="100" r="20" fill="#FFF2E0" />
          <circle cx="100" cy="100" r="8" fill="#101010" />
        </g>
      </svg>
    </StickerWrap>
  );
}

function TreeHug({ rotate, size }) {
  return (
    <StickerWrap rotate={rotate} size={size}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
        <g fill="#fff">
          <rect x="40" y="36" width="120" height="138" rx="14" />
        </g>
        <rect x="46" y="42" width="108" height="126" rx="10" fill="#DCE4D9" />
        <circle cx="100" cy="86" r="38" fill="#3F6135" />
        <circle cx="74" cy="100" r="28" fill="#3F6135" />
        <circle cx="126" cy="100" r="28" fill="#3F6135" />
        <rect x="92" y="118" width="16" height="36" rx="3" fill="#5b3a1f" />
        <text x="100" y="160" textAnchor="middle" fontFamily="Yeseva One, serif" fontSize="14" fill="#101010">one tree</text>
      </svg>
    </StickerWrap>
  );
}

function HeartBeam({ rotate, size }) {
  return (
    <StickerWrap rotate={rotate} size={size}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
        <g fill="#fff">
          <path d="M100 28 L168 168 L32 168 Z" />
        </g>
        <path d="M100 38 L160 162 L40 162 Z" fill="#FFF2E0" />
        <g transform="translate(100,100)">
          <path d="M0 18 C -22 -2, -38 -22, -22 -36 C -10 -46, 0 -34, 0 -26 C 0 -34, 10 -46, 22 -36 C 38 -22, 22 -2, 0 18 Z" fill="#F85C5E" />
        </g>
        <g stroke="#101010" strokeWidth="3" strokeLinecap="round">
          <line x1="100" y1="58" x2="100" y2="48" />
          <line x1="78" y1="70" x2="70" y2="62" />
          <line x1="122" y1="70" x2="130" y2="62" />
        </g>
      </svg>
    </StickerWrap>
  );
}

function MoonRise({ rotate, size }) {
  return (
    <StickerWrap rotate={rotate} size={size}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
        <g fill="#fff">
          <circle cx="100" cy="100" r="78" />
        </g>
        <circle cx="100" cy="100" r="72" fill="#101010" />
        <path d="M 100,40 a 60,60 0 1 0 30,112 a 48,48 0 1 1 -30,-112" fill="#FFF2E0" />
        <circle cx="60" cy="64" r="2" fill="#FFF2E0" />
        <circle cx="146" cy="78" r="3" fill="#FFF2E0" />
        <circle cx="138" cy="140" r="2" fill="#FFF2E0" />
      </svg>
    </StickerWrap>
  );
}

function CitrusSlice({ rotate, size }) {
  return (
    <StickerWrap rotate={rotate} size={size}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
        <g fill="#fff">
          <circle cx="100" cy="100" r="78" />
        </g>
        <circle cx="100" cy="100" r="72" fill="#F09B7B" />
        <circle cx="100" cy="100" r="58" fill="#FFF2E0" />
        <g stroke="#F09B7B" strokeWidth="6" strokeLinecap="round">
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            return <line key={i} x1={100 + Math.cos(a) * 12} y1={100 + Math.sin(a) * 12} x2={100 + Math.cos(a) * 50} y2={100 + Math.sin(a) * 50} />;
          })}
        </g>
        <circle cx="100" cy="100" r="10" fill="#F09B7B" />
      </svg>
    </StickerWrap>
  );
}

function CloudClub({ rotate, size }) {
  return (
    <StickerWrap rotate={rotate} size={size}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
        <g fill="#fff">
          <ellipse cx="100" cy="118" rx="78" ry="44" />
          <circle cx="68" cy="92" r="26" />
          <circle cx="108" cy="78" r="32" />
          <circle cx="142" cy="96" r="22" />
        </g>
        <g fill="#cdd9ea">
          <ellipse cx="100" cy="118" rx="70" ry="38" />
          <circle cx="72" cy="96" r="20" />
          <circle cx="108" cy="84" r="26" />
          <circle cx="138" cy="98" r="16" />
        </g>
        <circle cx="86" cy="110" r="4" fill="#101010" />
        <circle cx="118" cy="110" r="4" fill="#101010" />
        <path d="M 88 124 Q 100 134 114 124" stroke="#101010" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </StickerWrap>
  );
}

function CherryDuo({ rotate, size }) {
  return (
    <StickerWrap rotate={rotate} size={size}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
        <g fill="#fff">
          <circle cx="74" cy="138" r="34" />
          <circle cx="130" cy="138" r="34" />
          <rect x="64" y="40" width="80" height="64" rx="20" />
        </g>
        <circle cx="74" cy="138" r="28" fill="#F85C5E" />
        <circle cx="130" cy="138" r="28" fill="#C6494B" />
        <circle cx="68" cy="130" r="6" fill="#FFF2E0" />
        <circle cx="124" cy="130" r="6" fill="#FFF2E0" />
        <path d="M 74 110 C 74 80, 110 70, 130 110" stroke="#3F6135" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M 100 78 C 110 60, 130 60, 138 70" stroke="#3F6135" strokeWidth="6" fill="none" strokeLinecap="round" />
        <ellipse cx="138" cy="68" rx="10" ry="6" fill="#3F6135" transform="rotate(-30 138 68)" />
      </svg>
    </StickerWrap>
  );
}

function StarLeaf({ rotate, size }) {
  return (
    <StickerWrap rotate={rotate} size={size}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
        <g fill="#fff">
          <path d="M100 18 l16 50 l54 4 l-42 32 l16 52 l-44 -30 l-44 30 l16 -52 l-42 -32 l54 -4 z" />
        </g>
        <path d="M100 28 l14 44 l48 4 l-36 28 l14 46 l-40 -28 l-40 28 l14 -46 l-36 -28 l48 -4 z" fill="#3F6135" />
        <path d="M100 28 l14 44 l48 4 l-36 28 l14 46 l-40 -28 z" fill="#5e8a52" />
        <circle cx="100" cy="100" r="8" fill="#FFF2E0" />
      </svg>
    </StickerWrap>
  );
}

const STICKERS = {
  petal:  { Comp: PetalPop,    name: "Petal Pop",     price: 3.0, color: "#F85C5E", trees: 12, blurb: "Five-petal grin. Bright coral on cream — a tiny burst of optimism that looks great on a laptop or thermos." },
  tree:   { Comp: TreeHug,     name: "Tree Hug",      price: 3.0, color: "#3F6135", trees: 28, blurb: "Our most-planted sticker. Every order plants a tree — this one has planted twenty-eight and counting." },
  heart:  { Comp: HeartBeam,   name: "Heart Beam",    price: 3.5, color: "#F85C5E", trees: 9,  blurb: "A heart at the center of a triangle of warmth. Looks like a postage stamp, sticks like a promise." },
  moon:   { Comp: MoonRise,    name: "Moon Rise",     price: 3.0, color: "#101010", trees: 6,  blurb: "Soft cream crescent on midnight. Goes well on dark surfaces — try the back of a phone." },
  citrus: { Comp: CitrusSlice, name: "Citrus Slice",  price: 3.0, color: "#F09B7B", trees: 14, blurb: "Half-orange, half-grin. Eight rays of pulp, one big breakfast energy." },
  cloud:  { Comp: CloudClub,   name: "Cloud Club",    price: 3.5, color: "#cdd9ea", trees: 4,  blurb: "Quiet days only. Soft greys, a small smile, and four rainstorms in their college fund." },
  cherry: { Comp: CherryDuo,   name: "Cherry Duo",    price: 3.0, color: "#C6494B", trees: 11, blurb: "Two cherries, one stem. Looks unreasonably good on a water bottle." },
  star:   { Comp: StarLeaf,    name: "Star Leaf",     price: 3.5, color: "#3F6135", trees: 7,  blurb: "Five points of forest green. The proceeds go straight to the planting partner." },
};

const STICKER_KEYS = ["petal", "tree", "heart", "moon", "citrus", "cloud", "cherry", "star"];

window.STICKERS = STICKERS;
window.STICKER_KEYS = STICKER_KEYS;
window.StickerArt = function StickerArt({ id, rotate = 0, size = 220 }) {
  const s = STICKERS[id];
  if (!s) return null;
  const { Comp } = s;
  return <Comp rotate={rotate} size={size} />;
};
