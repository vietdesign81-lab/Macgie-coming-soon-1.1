import imgSection01 from "./229a3ac2758f4e00dad9f8cccc988df955a8da9c.png";

function Frame6() {
  return (
    <div className="h-[86px] relative shrink-0 w-full">
      <p className="[word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] leading-[32px] left-[calc(50%-46px)] not-italic text-[#f2efec] text-[24px] top-[calc(50%-16px)] whitespace-nowrap">Macgie</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Poppins:Bold',sans-serif] leading-[92px] not-italic relative shrink-0 text-[#f2efec] text-[96px] text-center tracking-[-7px] w-[728px]">{`You don't need more clothes`}</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-center not-italic relative shrink-0 text-center text-white w-full">
      <p className="font-['Poppins:Light',sans-serif] leading-[40px] relative shrink-0 text-[32px] tracking-[6px] w-full">We believe getting dressed should feel effortless.</p>
      <p className="font-['Poppins:Light',sans-serif] leading-[24px] relative shrink-0 text-[16px] tracking-[0.64px] w-full">Fashion apps help you buy more. We want to help you use more.</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-white content-stretch flex items-center px-[15px] py-[18px] relative shrink-0 w-[388px]">
      <div aria-hidden className="absolute border border-[#dddbdc] border-solid inset-[-1px] pointer-events-none" />
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[16.8px] not-italic relative shrink-0 text-[#737373] text-[14px] tracking-[1.4px] whitespace-nowrap">Email Address</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#262626] relative shrink-0">
      <div className="content-stretch flex gap-[10px] items-center overflow-clip px-[14px] py-[14.5px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[16.8px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[1.4px] whitespace-nowrap">Join Waitlist</p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="ArrowRight">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Vector" />
          </svg>
          <div className="absolute bottom-1/2 left-[15.63%] right-[15.63%] top-1/2" data-name="Vector">
            <div className="absolute inset-[-0.5px_-3.03%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 1">
                <path d="M0.5 0.5H17" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[21.88%_15.63%_21.88%_56.25%]" data-name="Vector">
            <div className="absolute inset-[-3.7%_-7.41%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.75 14.5">
                <path d="M0.5 0.5L7.25 7.25L0.5 14" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#262626] border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-start p-[20px] relative shrink-0">
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[53px] items-center left-[374px] top-[143.5px] w-[632px]">
      <Frame1 />
      <Frame7 />
      <div className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[0.64px] w-full">
        <p className="leading-[24px] mb-0">No spam.</p>
        <p className="leading-[24px] mb-0">No daily emails.</p>
        <p className="leading-[24px]">Just product updates and early access.</p>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="h-[910px] relative shrink-0 w-full" data-name="Section 01">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgSection01} />
        <div className="absolute bg-gradient-to-b from-[20.673%] from-black inset-0 to-[rgba(102,102,102,0.3)] via-[71.635%] via-[rgba(51,51,51,0.65)]" />
      </div>
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center pl-[32px] pr-[632px] py-[275px] relative size-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="bg-[#070707] content-stretch flex flex-col items-start relative size-full" data-name="Landing">
      <Frame6 />
      <Section />
    </div>
  );
}