import { useRef, useEffect, useState, type ReactNode } from "react";
import svgPaths from "@/imports/Frame29/svg-q3azi135n5";
import imgImage9 from "@/imports/Frame29/543cb606c07d57a26c649f410e973100a29972ad.png";
import imgImage10 from "@/imports/Frame29/23fbadcf6848d21b267fa7128aa410fbd54bc739.png";
import imgImage7 from "@/imports/Frame29/0fa767bff5c98f55e4a1dd395d789ed7d584592d.png";
import imgImage11 from "@/imports/Frame29/816f71dd591a1f5e8322cb542e1f457560126407.png";
import imgImage12 from "@/imports/Frame29/a3e058167ba0c5bda705c54afa5b56ac1bcd2ff7.png";
import imgImage13 from "@/imports/Frame29/be029d8587e1d339055cee481883f5411b4bcdc7.png";
import imgImage14 from "@/imports/Frame29/2276c2f0146991ee20418737e3cd48cd9e15064d.png";
import imgImage8 from "@/imports/Frame29/d859637353a975317128aade1d23fdf039a7db15.png";
import imgHero1 from "@/imports/Frame29/9e8aedc9b7317392c16f9db2b9fe739ee4ab85c2.png";
import imgHero2 from "@/imports/Frame29/e913bea9990963967af1da764f9a56586ce0b75b.png";
import imgImage6 from "@/imports/Frame29/3b184e0f47601dc47bd4e6458f7b795a630d62cd.png";
import imgImage15 from "@/imports/Frame29/d52eb2b3a5c4af795a569b99e23827b995b12e52.png";

// Height of the fixed header (FloatingBanner + Nav)
const HEADER_H = 86;

/* ─── AUTO HORIZONTAL SCROLL SECTION ─── *
 * Outer div is tall enough so that scrolling through it
 * drives the inner content from translateX(0) to translateX(-maxScroll).
 * No manual horizontal scrolling needed.
 */
function HorizontalScrollSection({
  children,
  contentWidth,
  extraBottom = 0,
  bg = "transparent",
}: {
  children: ReactNode;
  contentWidth: number;
  extraBottom?: number;
  bg?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [stickyHeight, setStickyHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight - HEADER_H : 700
  );

  // Keep sticky height in sync with viewport
  useEffect(() => {
    const update = () => setStickyHeight(window.innerHeight - HEADER_H);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Convert vertical scroll progress → horizontal translateX
  useEffect(() => {
    const onScroll = () => {
      if (!outerRef.current) return;
      const maxScroll = Math.max(0, contentWidth - window.innerWidth);
      const progress = HEADER_H - outerRef.current.getBoundingClientRect().top;
      setTranslateX(Math.max(0, Math.min(progress, maxScroll)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [contentWidth]);

  const maxScroll =
    typeof window !== "undefined"
      ? Math.max(0, contentWidth - window.innerWidth)
      : Math.max(0, contentWidth - 1400);

  // extraBottom adds section-colored space below the sticky panel,
  // creating visual bottom padding without affecting the scroll drive.
  return (
    <div ref={outerRef} style={{ height: stickyHeight + maxScroll + extraBottom, backgroundColor: bg }}>
      <div
        style={{
          position: "sticky",
          top: HEADER_H,
          height: stickyHeight,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            transform: `translateX(-${translateX}px)`,
            width: contentWidth,
            height: "100%",
            willChange: "transform",
            transition: "transform 0.04s linear",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── FIXED FLOATING HEADER ─── */

function FloatingBanner() {
  return (
    <div className="bg-black w-full flex items-center justify-center px-[30px] py-[7px]">
      <div className="flex items-center gap-[4px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[12px] text-white whitespace-nowrap">
          Get early access on launches and offers.
        </p>
        <a
          href="https://tally.so/r/WOQKMj"
          target="_blank"
          rel="noopener noreferrer"
          className="font-['Poppins:Regular',sans-serif] leading-[16px] text-[12px] text-white tracking-[0.2px] underline decoration-solid whitespace-nowrap"
        >
          Join the waitlist{" "}
        </a>
        <div className="overflow-clip relative shrink-0 size-[14px]">
          <div className="absolute bottom-1/2 left-[15.63%] right-[15.63%] top-1/2">
            <div className="absolute inset-[-0.5px_-5.19%]">
              <svg className="block size-full" fill="none" viewBox="0 0 10.625 1">
                <path d="M0.5 0.5H10.125" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[21.88%_15.63%_21.88%_56.25%]">
            <div className="absolute inset-[-6.35%_-12.7%]">
              <svg className="block size-full" fill="none" viewBox="0 0 4.9375 8.875">
                <path d={svgPaths.pe224fa0} stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type NavTab = "home" | "features" | "why";

function NavTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-[18px] items-start pt-[20px] px-[12px] pb-0 bg-transparent border-none cursor-pointer"
    >
      <p className="font-['Poppins:Regular',sans-serif] leading-[16px] text-[#262626] text-[12px] tracking-[0.2px] whitespace-nowrap">
        {label}
      </p>
      <div
        className="h-[2px] w-full transition-opacity duration-200"
        style={{ backgroundColor: "#262626", opacity: active ? 1 : 0 }}
      />
    </button>
  );
}

function Nav() {
  const [active, setActive] = useState<NavTab>("home");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_H;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Scroll-spy: update active tab based on which section is in view
  useEffect(() => {
    const onScroll = () => {
      const features = document.getElementById("section-features");
      const why = document.getElementById("section-why");
      const offset = HEADER_H + 20;
      if (why && window.scrollY >= why.getBoundingClientRect().top + window.scrollY - offset) {
        setActive("why");
      } else if (features && window.scrollY >= features.getBoundingClientRect().top + window.scrollY - offset) {
        setActive("features");
      } else {
        setActive("home");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-white border-b border-[#dddbdc] w-full">
      <div className="relative flex items-center justify-between px-[68px]">
        <div className="flex items-start">
          <NavTab
            label="Home"
            active={active === "home"}
            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setActive("home"); }}
          />
          <NavTab
            label="Features"
            active={active === "features"}
            onClick={() => { scrollTo("section-features"); setActive("features"); }}
          />
          <NavTab
            label="Why sample wardrobe"
            active={active === "why"}
            onClick={() => { scrollTo("section-why"); setActive("why"); }}
          />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[25.368px] w-[87.594px]">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 87.5944 25.368">
              <g>
                <path d={svgPaths.p35d6f500} fill="#070707" />
                <path d={svgPaths.p3717c930} fill="#070707" />
                <path d={svgPaths.p1a766380} fill="#070707" />
                <path d={svgPaths.p1f52c100} fill="#070707" />
                <path d={svgPaths.p2f757800} fill="#070707" />
                <path d={svgPaths.p2a8a6600} fill="#070707" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── HERO ─── */

function Hero() {
  return (
    <div className="relative h-[816px] overflow-hidden w-full">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[115.6%] left-0 max-w-none top-[-0.02%] w-full object-cover" src={imgHero1} />
      </div>
      <div className="absolute overflow-clip size-[24px]" style={{ left: 773, top: 551 }}>
        <div className="absolute bottom-1/2 left-[15.63%] right-[15.63%] top-1/2">
          <div className="absolute inset-[-0.5px_-3.03%]">
            <svg className="block size-full" fill="none" viewBox="0 0 17.5 1">
              <path d="M0.5 0.5H17" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[21.88%_15.63%_21.88%_56.25%]">
          <div className="absolute inset-[-3.7%_-7.41%]">
            <svg className="block size-full" fill="none" viewBox="0 0 7.75 14.5">
              <path d="M0.5 0.5L7.25 7.25L0.5 14" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <p
  class="absolute left-1/2 top-[59px] -translate-x-1/2 w-[728px]
         text-center font-['Poppins:Bold',sans-serif]
         text-[96px] leading-[92px] tracking-[-7px]
         text-[#070707] break-words"
>
  You don't need more clothes
</p>
      <div className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgHero2} />
      </div>
    </div>
  );
}

/* ─── SECTION 2: WHY MACGIE FEELS DIFFERENT ─── */

function WhyMacgieContent() {
  return (
    <div className="relative bg-white w-[2133px] h-full overflow-hidden">
      <div className="absolute h-[576px] left-[50px] top-[187px] w-[253px] overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-0.09%] max-w-none top-0 w-[404.53%]" src={imgImage6} />
      </div>
      <div className="absolute h-[576px] left-[772px] top-[188px] w-[200px] overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-116.16%] max-w-none top-0 w-[511.73%]" src={imgImage6} />
      </div>
      <div className="absolute h-[576px] left-[1437px] top-[209px] w-[200px] overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-302.76%] max-w-none top-0 w-[511.73%]" src={imgImage6} />
      </div>
      <p
        className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Light',sans-serif] leading-[109px] not-italic text-[#17181c] text-[32px] text-center top-[60px] w-[632px]"
        style={{ left: 700 }}
      >
        Why Macgie feels different
      </p>
      <div className="[word-break:break-word] absolute flex gap-[280px] items-center not-italic left-[333px] top-[340px]">
        <div className="flex flex-col gap-[20px] items-start shrink-0 w-[392px]">
          <div className="font-['Poppins:ExtraBold',sans-serif] leading-[0] min-w-full text-[#17181c] text-[48px]">
            <p className="leading-[54px] mb-0">Instant</p>
            <p className="leading-[54px]">Experience</p>
          </div>
          <p className="font-['Poppins:Light',sans-serif] leading-[28px] text-[#262626] text-[16px] w-[350px]">
            No empty wardrobe.<br aria-hidden />
            Explore outfit recommendations immediately using our sample wardrobe.
          </p>
        </div>
        <div className="flex flex-col gap-[20px] items-start shrink-0 w-[392px]">
          <p className="font-['Poppins:ExtraBold',sans-serif] leading-[54px] min-w-full text-[#17181c] text-[48px] w-[min-content]">Built Around Your Closet</p>
          <p className="font-['Poppins:Light',sans-serif] leading-[28px] text-[#262626] text-[16px] w-[350px]">Replace the sample wardrobe with your own clothes at your own pace.</p>
        </div>
        <div className="flex flex-col gap-[20px] items-start shrink-0 w-[392px]">
          <p className="font-['Poppins:ExtraBold',sans-serif] leading-[54px] min-w-full text-[#17181c] text-[48px] w-[min-content]">Learns Your Style</p>
          <p className="font-['Poppins:Light',sans-serif] leading-[28px] text-[#262626] text-[16px] w-[350px]">Macgie continuously learns your preferences and recommends better outfits every day.</p>
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION 3: FROM DOWNLOAD TO FIRST OUTFIT ─── */

function AppIcon() {
  return (
    <div className="absolute left-[72px] overflow-clip rounded-[24px] size-[112px] top-[445px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[73.537px] left-[calc(50%+0.28px)] top-[calc(50%-0.23px)] w-[70.564px]">
        <div className="absolute inset-[0.33%_1.6%_0.11%_0.67%]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 68.9639 73.2196">
            <g>
              <path d={svgPaths.p1d6617f0} fill="url(#icon_r1)" />
              <path d={svgPaths.p21792700} fill="url(#icon_l1)" />
              <path d={svgPaths.p31ce6600} fill="url(#icon_l2)" />
            </g>
            <defs>
              <radialGradient cx="0" cy="0" gradientTransform="matrix(-58.1646 32.3942 -23.9226 -44.7637 58.1645 23.4175)" gradientUnits="userSpaceOnUse" id="icon_r1" r="1">
                <stop stopColor="#FDC146" />
                <stop offset="0.584881" stopColor="#FF4567" />
                <stop offset="1" stopColor="#6B4CCD" />
              </radialGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="icon_l1" x1="37.6163" x2="21.883" y1="33.0342" y2="48.7124">
                <stop stopColor="#D6D6D6" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="icon_l2" x1="62.3809" x2="55.3549" y1="35.5376" y2="46.741">
                <stop stopColor="#D6D6D6" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function FromDownloadContent() {
  return (
    <div className="relative bg-[#17181c] w-[1758px] h-full overflow-hidden">
      <p
        className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Light',sans-serif] leading-[109px] not-italic text-[#f2efec] text-[32px] text-center top-[100px] w-[794px]"
        style={{ left: 700 }}
      >
        From download to first outfit in under a minute
      </p>
      <div className="[word-break:break-word] absolute flex gap-[120px] items-start not-italic text-[#f2efec] left-[72px] top-[249px]">
        <div className="flex flex-col gap-[12px] items-start shrink-0 whitespace-nowrap">
          <p className="font-['Poppins:Light',sans-serif] leading-[28px] text-[16px]">Step 1</p>
          <p className="font-['Poppins:ExtraBold',sans-serif] leading-[54px] text-[48px]">Open</p>
        </div>
        <div className="flex flex-col gap-[12px] items-start shrink-0">
          <p className="font-['Poppins:Light',sans-serif] leading-[28px] text-[16px] w-[350px]">Step 2</p>
          <p className="font-['Poppins:ExtraBold',sans-serif] leading-[54px] text-[48px] w-[366px]">Discover your perfect outfit</p>
        </div>
        <div className="flex flex-col gap-[12px] items-start shrink-0 w-[368px]">
          <p className="font-['Poppins:Light',sans-serif] leading-[28px] text-[16px] w-[350px]">Step 3</p>
          <p className="font-['Poppins:ExtraBold',sans-serif] leading-[54px] min-w-full text-[48px] w-[min-content]">Save the looks you love</p>
        </div>
        <div className="flex flex-col gap-[12px] items-start shrink-0 w-[368px]">
          <p className="font-['Poppins:Light',sans-serif] leading-[28px] text-[16px] w-[350px]">Step 4</p>
          <p className="font-['Poppins:ExtraBold',sans-serif] leading-[54px] min-w-full text-[48px] w-[min-content]">See yourself wearing them</p>
        </div>
      </div>
      <AppIcon />
      {/* Cards row 1 */}
      <div className="absolute bg-[#f2efec] h-[168px] left-[328px] overflow-clip rounded-[12px] shadow-[3px_4px_22.8px_0px_rgba(0,0,0,0.1)] top-[445px] w-[126px]">
        <div className="absolute h-[164px] left-0 top-0 w-[131px] overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[70.79%] left-[5.15%] max-w-none top-[14.41%] w-[88.62%]" src={imgImage9} />
        </div>
      </div>
      <div className="absolute bg-[#f2efec] h-[168px] left-[465px] overflow-clip rounded-[12px] shadow-[3px_4px_22.8px_0px_rgba(0,0,0,0.1)] top-[445px] w-[126px]">
        <div className="absolute h-[136px] left-[12px] top-[11px] w-[102px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} />
        </div>
      </div>
      <div className="absolute bg-[#f2efec] h-[168px] left-[811px] overflow-clip rounded-[12px] shadow-[3px_4px_22.8px_0px_rgba(0,0,0,0.1)] top-[445px] w-[126px]">
        <div className="absolute h-[140px] left-[10px] top-[12px] w-[112px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage10} />
        </div>
      </div>
      <div className="absolute bg-[#f2efec] h-[168px] left-[948px] overflow-clip rounded-[12px] shadow-[3px_4px_22.8px_0px_rgba(0,0,0,0.1)] top-[445px] w-[126px]">
        <div className="absolute h-[122px] left-[17px] top-[23px] w-[86px] overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[113.16%] left-0 max-w-none top-[-5.51%] w-full" src={imgImage14} />
        </div>
      </div>
      <div className="absolute bg-[#f2efec] h-[112px] left-[1309px] overflow-clip rounded-[12px] shadow-[3px_4px_22.8px_0px_rgba(0,0,0,0.1)] top-[445px] w-[84px]">
        <div className="absolute h-[93px] left-[5px] top-[9px] w-[74px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage10} />
        </div>
      </div>
      <div className="absolute bg-[#f2efec] h-[352px] left-[1401px] overflow-clip rounded-[12px] shadow-[3px_4px_22.8px_0px_rgba(0,0,0,0.1)] top-[445px] w-[196px]">
        <div className="absolute h-[347px] left-[30px] top-[5px] w-[136px] overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[100.01%] left-[-352.94%] max-w-none top-0 w-[452.94%]" src={imgImage7} />
        </div>
      </div>
      {/* Cards row 2 */}
      <div className="absolute bg-[#f2efec] h-[168px] left-[328px] overflow-clip rounded-[12px] shadow-[3px_4px_22.8px_0px_rgba(0,0,0,0.1)] top-[625px] w-[126px]">
        <div className="absolute h-[161px] left-[5px] top-[7px] w-[121px] overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[79.3%] left-[-3.07%] max-w-none top-[7.7%] w-[105.94%]" src={imgImage13} />
        </div>
      </div>
      <div className="absolute bg-[#f2efec] h-[168px] left-[811px] overflow-clip rounded-[12px] shadow-[3px_4px_22.8px_0px_rgba(0,0,0,0.1)] top-[625px] w-[126px]">
        <div className="absolute h-[155px] left-[8px] top-[4px] w-[116px] overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[99.95%] left-[0.08%] max-w-none top-[0.05%] w-[99.88%]" src={imgImage11} />
        </div>
      </div>
      <div className="absolute bg-[#f2efec] h-[168px] left-[948px] overflow-clip rounded-[12px] shadow-[3px_4px_22.8px_0px_rgba(0,0,0,0.1)] top-[625px] w-[126px]">
        <div className="absolute h-[143px] left-[12px] top-[10px] w-[108px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage12} />
        </div>
      </div>
      <div className="absolute bg-[#f2efec] h-[112px] left-[1309px] overflow-clip rounded-[12px] shadow-[3px_4px_22.8px_0px_rgba(0,0,0,0.1)] top-[565px] w-[84px]">
        <div className="absolute h-[98px] left-[8px] top-[4px] w-[73px] overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[99.95%] left-[0.08%] max-w-none top-[0.05%] w-[99.88%]" src={imgImage11} />
        </div>
      </div>
      <div className="absolute bg-[#f2efec] h-[112px] left-[1309px] overflow-clip rounded-[12px] shadow-[3px_4px_22.8px_0px_rgba(0,0,0,0.1)] top-[685px] w-[84px]">
        <div className="absolute h-[89px] left-[8px] top-[11px] w-[67px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage12} />
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION 4: EVERYTHING YOU NEED ─── */

function EverythingYouNeedSection() {
  return (
    <div className="relative bg-white w-[1401px] h-[951px] overflow-hidden">
      <p className="left-1/2 -translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Light',sans-serif] leading-[109px] text-[#17181c] text-[32px] text-center top-[60px] w-[708px]">
        Everything you need to get dressed smarter
      </p>
      <div className="absolute flex flex-col gap-[80px] items-start left-[69px] top-[257px] w-[1344px]">
        <div className="flex gap-[72px] items-start w-full">
          <div className="flex flex-col gap-[20px] items-start shrink-0 w-[392px]">
            <p className="font-['Poppins:ExtraBold',sans-serif] leading-[54px] min-w-full text-[#17181c] text-[48px] w-[min-content] whitespace-pre-wrap">{`Outfit \nCanvas`}</p>
            <p className="font-['Poppins:Light',sans-serif] leading-[28px] text-[#262626] text-[16px] w-[350px]">Mix, match and create unlimited outfit combinations</p>
          </div>
          <div className="flex flex-col gap-[20px] items-start shrink-0 w-[392px]">
            <p className="font-['Poppins:ExtraBold',sans-serif] leading-[54px] min-w-full text-[#17181c] text-[48px] w-[min-content]">Outfit Scheduler</p>
            <div className="font-['Poppins:Light',sans-serif] leading-[0] text-[#262626] text-[16px] w-[350px]">
              <p className="leading-[28px] mb-0">Plan your week ahead.</p>
              <p className="leading-[28px]">Reduce decision fatigue every morning.</p>
            </div>
          </div>
          <div className="flex flex-col gap-[20px] items-start shrink-0 w-[392px]">
            <p className="font-['Poppins:ExtraBold',sans-serif] leading-[54px] min-w-full text-[#17181c] text-[48px] w-[min-content]">Learns Your Habits</p>
            <div className="font-['Poppins:Light',sans-serif] leading-[0] text-[#262626] text-[16px] w-[350px]">
              <p className="leading-[28px] mb-0">Macgie remembers what you wear, what you love and what you ignore.</p>
              <p className="leading-[28px]">Recommendations become smarter over time.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-[72px] items-start w-full">
          <div className="flex flex-col gap-[20px] items-start shrink-0 w-[392px]">
            <p className="font-['Poppins:ExtraBold',sans-serif] leading-[54px] min-w-full text-[#17181c] text-[48px] w-[min-content]">Instant Outfit Suggestions</p>
            <p className="font-['Poppins:Light',sans-serif] leading-[28px] text-[#262626] text-[16px] w-[350px]">Get outfit ideas based on weather, occasion and your wardrobe.</p>
          </div>
          <div className="flex flex-col gap-[20px] items-start shrink-0 w-[392px]">
            <p className="font-['Poppins:ExtraBold',sans-serif] leading-[54px] min-w-full text-[#17181c] text-[48px] w-[min-content]">Ready-to-use Sample Wardrobe</p>
            <div className="font-['Poppins:Light',sans-serif] leading-[0] text-[#262626] text-[16px] w-[350px]">
              <p className="leading-[28px] mb-0">Experience the app immediately.</p>
              <p className="leading-[28px]">No empty screens.</p>
            </div>
          </div>
          <div className="flex flex-col gap-[20px] items-start shrink-0 w-[392px]">
            <p className="font-['Poppins:ExtraBold',sans-serif] leading-[54px] min-w-full text-[#17181c] text-[48px] w-[min-content]">Auto Background Removal</p>
            <div className="font-['Poppins:Light',sans-serif] leading-[0] text-[#262626] text-[16px] w-[350px]">
              <p className="leading-[28px] mb-0">Just upload.</p>
              <p className="leading-[28px]">Macgie automatically removes the background.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION 5: WHY WE START WITH A SAMPLE WARDROBE ─── */

function WhySampleSection() {
  return (
    <div className="relative bg-[#17181c] w-[1401px] h-[819px] overflow-hidden">
      <p
        className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Light',sans-serif] leading-[109px] not-italic text-[#f2efec] text-[32px] text-center top-[72px] w-[794px]"
        style={{ left: "calc(50% - 283.5px)" }}
      >
        Why we start with a sample wardrobe
      </p>
      <div className="absolute flex h-[675px] items-center justify-center left-[79px] top-[72px] w-[1202px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[675px] opacity-55 relative w-[1202px]">
            <div className="absolute inset-0 mix-blend-darken overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-full left-[0.23%] max-w-none top-0 w-[99.62%]" src={imgImage7} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[117px] top-[159px]">
        <div className="[word-break:break-word] font-['Poppins:ExtraBold',sans-serif] leading-[0] not-italic text-[#f2efec] text-[48px] w-[1012px] whitespace-pre-wrap">
          <p className="leading-[54px] mb-0">Most wardrobe apps ask you to upload everything before you can do anything.</p>
          <p className="leading-[54px] mb-0">Macgie works differently.</p>
          <p className="leading-[54px] mb-0">&#8203;</p>
          <p className="leading-[54px] mb-0">We include a sample wardrobe so you can experience recommendations immediately.</p>
          <p className="leading-[54px] mb-0">&#8203;</p>
          <p className="leading-[54px]">{`When you're ready, replace it with your own clothes for personalized styling.`}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION 6: DESIGNED FOR EVERYDAY DECISIONS ─── */

function DesignedForSection() {
  return (
    <div className="relative bg-white w-[1401px] h-[980px] overflow-hidden">
      <div className="absolute left-[247px] top-0 w-[866px]">
        <div className="[word-break:break-word] font-['Poppins:ExtraBold',sans-serif] leading-[0] not-italic text-[#17181c] text-[48px] text-center w-full">
          <p className="leading-[54px] mb-0">Designed for</p>
          <p className="leading-[54px]">everyday decisions</p>
        </div>
      </div>
      <div className="absolute flex h-[109.244px] items-center justify-center left-[201px] top-[178px] w-[255.632px]">
        <div className="flex-none rotate-[-12.18deg]">
          <div className="bg-[#070707] flex items-center justify-center p-[15px]">
            <p className="font-['Poppins:Light',sans-serif] leading-[28px] not-italic text-[#f2efec] text-[16px] whitespace-nowrap">{`"What should I wear today?"`}</p>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[119.865px] items-center justify-center left-[533px] top-[167px] w-[381.023px]">
        <div className="flex-none rotate-[9.58deg]">
          <div className="bg-[#070707] flex items-center justify-center p-[15px]">
            <p className="font-['Poppins:Light',sans-serif] leading-[28px] not-italic text-[#f2efec] text-[16px] w-[346.622px]">{`"Something professional but comfortable."`}</p>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[81.764px] items-center justify-center left-[987px] top-[184px] w-[269.141px]">
        <div className="flex-none rotate-[5.2deg]">
          <div className="bg-[#070707] flex items-center justify-center p-[15px]">
            <p className="font-['Poppins:Light',sans-serif] leading-[28px] not-italic text-[#f2efec] text-[16px] w-[234.977px]">{`"Plan outfits before packing."`}</p>
          </div>
        </div>
      </div>
      <div className="absolute h-[653px] left-[219px] top-[327px] w-[980px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage15} />
      </div>
      <div className="absolute flex h-[172.474px] items-center justify-center left-[745px] top-[592px] w-[242.481px]">
        <div className="flex-none rotate-[-29.74deg]">
          <div className="bg-[#070707] flex items-center justify-center p-[15px]">
            <p className="font-['Poppins:Light',sans-serif] leading-[28px] not-italic text-[#f2efec] text-[16px] w-[216.135px]">{`"Use clothes I rarely wear."`}</p>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[106.711px] items-center justify-center left-[426px] top-[625px] w-[226.743px]">
        <div className="flex-none rotate-[13.25deg]">
          <div className="bg-[#070707] flex items-center justify-center p-[15px]">
            <p className="font-['Poppins:Light',sans-serif] leading-[28px] not-italic text-[#f2efec] text-[16px] w-[189.287px]">{`"Make it a little smarter."`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FIXED FLOATING FOOTER ─── */

function FloatingFooter() {
  return (
    <div className="bg-black w-full flex flex-col items-center px-[42px] py-[20px]">
      <div className="flex flex-col md:flex-row gap-4 items-center md:items-center justify-center w-full">
        <div className="font-['Poppins:Regular',sans-serif] leading-[0] not-italic text-[#f2efec] text-center md:text-right">
  <p className="font-['Poppins:Bold',sans-serif] leading-[24px] mb-0 text-[16px]">
    We believe getting dressed should feel effortless.
  </p>
  <p className="leading-[24px] text-[16px]">
    Fashion apps help you buy more. We want to help you use more.
  </p>
</div>
        <a
          href="https://testflight.apple.com/join/34jn3uvU"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-[20px] shrink-0 no-underline"
        >
          <div className="bg-[#f2efec] relative rounded-[12px]">
            <div className="flex gap-[10px] items-center overflow-clip px-[24px] py-[14.5px] rounded-[inherit]">
              <p className="font-['Poppins:Regular',sans-serif] leading-[16.8px] not-italic text-[#17181c] text-[16px] text-center tracking-[1.4px] whitespace-nowrap">Become a Beta Tester</p>
              <div className="overflow-clip relative size-[24px]">
                <div className="absolute bottom-1/2 left-[15.63%] right-[15.63%] top-1/2">
                  <div className="absolute inset-[-0.5px_-3.03%]">
                    <svg className="block size-full" fill="none" viewBox="0 0 17.5 1">
                      <path d="M0.5 0.5H17" stroke="#17181C" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-[21.88%_15.63%_21.88%_56.25%]">
                  <div className="absolute inset-[-3.7%_-7.41%]">
                    <svg className="block size-full" fill="none" viewBox="0 0 7.75 14.5">
                      <path d="M0.5 0.5L7.25 7.25L0.5 14" stroke="#17181C" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden className="absolute border border-[#262626] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
          </div>
        </a>
      </div>
    </div>
  );
}

/* ─── ROOT ─── */

const FAVICON_SVG = `<svg width="77" height="80" viewBox="0 0 77 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.511963 14.2978C0.512036 -1.70207 10.6711 -2.12716 19.4475 3.66007L35.0852 14.7275C41.3174 18.7232 48.5735 18.7232 54.5491 14.2978L66.2444 6.21281C70.1454 3.14471 75.7659 3.91521 75.7659 10.8935V59.83C75.7658 68.9798 71.2793 74.7251 63.97 75.4218L19.4475 79.8359C9.29413 80.8036 0.512314 72.8174 0.511963 62.6152V14.2978Z" fill="black"/>
<path d="M33.9092 29.4766C38.1064 29.4767 41.5485 36.1413 41.8984 44.6309C41.2215 43.8596 40.2871 43.3828 39.2559 43.3828C37.1888 43.3831 35.5137 45.2991 35.5137 47.6621C35.5138 50.0251 37.1889 51.9402 39.2559 51.9404C40.1261 51.9404 40.9268 51.6007 41.5625 51.0312C40.5405 57.7585 37.5006 62.6386 33.9092 62.6387C29.4795 62.6387 25.8888 55.2149 25.8887 46.0576C25.8887 36.9002 29.4794 29.4766 33.9092 29.4766Z" fill="url(#a)"/>
<path d="M63.8525 30.4404C66.7627 30.4404 69.1729 35.9353 69.5928 43.1016C69.0738 42.4453 68.3769 42.0431 67.6094 42.043C66.0065 42.043 64.7072 43.7951 64.707 45.957C64.707 48.1192 66.0064 49.8721 67.6094 49.8721C68.3251 49.872 68.9803 49.5227 69.4863 48.9434C68.8576 55.4251 66.5734 60.2275 63.8525 60.2275C60.6468 60.2269 58.0479 53.5591 58.0479 45.334C58.0479 37.109 60.6468 30.441 63.8525 30.4404Z" fill="url(#b)"/>
<defs>
<linearGradient id="a" x1="41.5608" y1="36.1991" x2="24.4449" y2="53.3081" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6D6D6"/><stop offset="1" stop-color="white"/>
</linearGradient>
<linearGradient id="b" x1="68.5838" y1="38.9217" x2="60.9508" y2="51.1312" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6D6D6"/><stop offset="1" stop-color="white"/>
</linearGradient>
</defs>
</svg>`;

export default function App() {
  useEffect(() => {
    const encoded = `data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}`;
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = encoded;
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Fixed floating header — always on top */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <FloatingBanner />
        <Nav />
      </div>

      {/* Scrollable content — padded for fixed header + footer */}
      <div className="pt-[86px] pb-[86px]">
        <Hero />

        {/* Section 2 — auto horizontal scroll on vertical scroll */}
        <HorizontalScrollSection contentWidth={2133}>
          <WhyMacgieContent />
        </HorizontalScrollSection>

        {/* Section 3 — auto horizontal scroll on vertical scroll */}
        <HorizontalScrollSection contentWidth={1758} extraBottom={80} bg="#17181c">
          <FromDownloadContent />
        </HorizontalScrollSection>

        <div id="section-features" className="flex justify-center">
          <EverythingYouNeedSection />
        </div>

        <div id="section-why" className="flex justify-center">
          <WhySampleSection />
        </div>

        <div className="flex justify-center">
          <DesignedForSection />
        </div>
      </div>

      {/* Fixed floating footer — always at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <FloatingFooter />
      </div>
    </div>
  );
}
