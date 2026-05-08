const StickerWrap = ({ children, rotate = 0, size = 220, style = {} }) => (
  <div style={{
    width: size, height: size, maxWidth: "100%", maxHeight: "100%", position: "relative",
    filter: "drop-shadow(0 8px 14px rgba(0,0,0,.18)) drop-shadow(0 2px 4px rgba(0,0,0,.08))",
    transform: `rotate(${rotate}deg)`,
    ...style,
  }}>
    {children}
  </div>
);

function ImgSticker({ src, alt, rotate, size }) {
  return (
    <StickerWrap rotate={rotate} size={size}>
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
    </StickerWrap>
  );
}

const STICKERS = {
  mouse:    { src: "assets/A21E01B2-D637-4A03-B748-9B15637579A1.png",    name: "Little Mouse",   price: 3.0, color: "#888",    trees: 1, blurb: "A wide-eyed little mouse ready to be your sticker bestie." },
  knight:   { src: "assets/610FD400-A57F-432D-9AC9-8E7760ACF2E1.png",    name: "Knight Bunny",   price: 3.0, color: "#222",    trees: 1, blurb: "A bunny in full armor — cute but ready for battle." },
  overload: { src: "assets/71845A4F-A6AF-4C6F-B357-22B7F2E39585.png",    name: "Overload",       price: 3.0, color: "#888",    trees: 1, blurb: "We've all been there. Grumpy cat energy, maximum relatability." },
  froggy:   { src: "assets/49748408-06A0-435A-81FC-36567C8F0046.png",    name: "So Much Heart",  price: 3.5, color: "#6a9c6a", trees: 1, blurb: "A frog carrying a bowl of hearts. That's just love." },
  together: { src: "assets/9AD0AEF5-1C0B-4B15-A9A3-D11E1114FDBE.png",    name: "Together",       price: 3.0, color: "#89acd0", trees: 1, blurb: "Three figures floating in a circle — connection, always." },
  koi:      { src: "assets/6402A670-9F37-44DD-A965-2300775E5637.png",    name: "Koi",            price: 3.5, color: "#5ab4f0", trees: 1, blurb: "Two koi in perfect harmony. Printmaking vibes, Pacific soul." },
  liberty:  { src: "assets/ADCB42D4-A317-4215-A8DA-DF9746A4DBF4.png",   name: "Liberty",        price: 3.0, color: "#aaa",    trees: 1, blurb: "She's tired. She's still holding the torch. We get it." },
};

const STICKER_KEYS = ["mouse", "knight", "overload", "froggy", "together", "koi", "liberty"];

window.STICKERS = STICKERS;
window.STICKER_KEYS = STICKER_KEYS;
window.StickerArt = function StickerArt({ id, rotate = 0, size = 220 }) {
  const s = STICKERS[id];
  if (!s) return null;
  return <ImgSticker src={s.src} alt={s.name} rotate={rotate} size={size} />;
};
