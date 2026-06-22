import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import faviconSvg from "@/imports/m-lg.svg";
import imgHero from "@/imports/Landing/229a3ac2758f4e00dad9f8cccc988df955a8da9c.png";

function TallyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white flex flex-col"
        style={{ height: "min(90vh, 700px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-[#737373] hover:text-[#262626] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
        <iframe
          src="https://tally.so/r/WOQKMj"
          title="Get Early Access"
          className="w-full flex-1 border-0"
          allow="camera; microphone; autoplay; encrypted-media;"
        />
      </div>
    </div>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const link: HTMLLinkElement =
      document.querySelector("link[rel~='icon']") ||
      (() => {
        const el = document.createElement("link");
        el.rel = "icon";
        document.head.appendChild(el);
        return el;
      })();
    link.type = "image/svg+xml";
    link.href = faviconSvg;
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "#070707", fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Nav */}
      <header className="w-full flex items-center justify-center h-[86px] shrink-0">
        <span
          className="text-[#f2efec] text-[24px] leading-[32px]"
          style={{ fontWeight: 600 }}
        >
          Macgie
        </span>
      </header>

      {/* Hero */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[824px]">
        {/* Background image + overlays */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <img
            src={imgHero}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-[rgba(102,102,102,0.3)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-12 px-6 py-24 max-w-[760px] mx-auto text-center">
          {/* Headline */}
          <h1
            className="text-[#f2efec]"
            style={{
              fontWeight: 700,
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: 1,
              letterSpacing: "-4px",
            }}
          >
            You don&apos;t need more clothes
          </h1>

          {/* Sub-copy + CTA */}
          <div className="flex flex-col items-center gap-5 w-full">
            <p
              className="text-white w-full"
              style={{
                fontWeight: 300,
                fontSize: "clamp(20px, 3vw, 32px)",
                lineHeight: "40px",
                letterSpacing: "6px",
              }}
            >
              We believe getting dressed should feel effortless.
            </p>
            <p
              className="text-white"
              style={{
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0.64px",
              }}
            >
              Fashion apps help you buy more. We want to help you use more.
            </p>

            {/* CTA button */}
            <button
              onClick={() => setModalOpen(true)}
              className="mt-2 bg-[#262626] hover:bg-black transition-colors text-white text-[14px] tracking-[1.4px] px-[24px] py-[16px] flex items-center gap-2 border border-[#262626] cursor-pointer rounded-[12px]"
              style={{ fontWeight: 400, fontFamily: "'Poppins', sans-serif" }}
            >
              Get Early Access
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Footnote */}
          <p
            className="text-white text-[16px] leading-[24px] tracking-[0.64px]"
            style={{ fontWeight: 400 }}
          >
            No spam.<br />
            No daily emails.<br />
            Just product updates and early access.
          </p>
        </div>
      </section>

      {/* Tally modal */}
      {modalOpen && <TallyModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
