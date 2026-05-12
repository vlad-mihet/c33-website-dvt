import { LinkedInIcon, LogoMark } from './icons';

export default function Footer() {
  return (
    <footer className="px-3 pb-3 bg-white">
      <div className="relative bg-black text-white rounded-[28px] overflow-hidden">
        {/* Glowing blue — Figma "Glowing blue" rectangle (node 407:649).
            Specs from /design-context: 558.679 × 129.925 rounded rect,
            blur 82px, rotated 165°, sat inside a 573 × 270 container offset
            (444.71, 176.65) from the panel top-left. plus-lighter blend so
            the glow purely adds light to the black underneath.
            Toned darker than spec: deep navy fill + 10% opacity so the
            highlight reads as ambient atmosphere rather than a literal blue
            wash. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute flex items-center justify-center"
          style={{
            left: '444.71px',
            top: '176.65px',
            width: '573.27px',
            height: '270.095px',
            mixBlendMode: 'plus-lighter',
          }}
        >
          <div className="rotate-[165deg]">
            <div
              className="rounded-[25.745px]"
              style={{
                width: '558.679px',
                height: '129.925px',
                background: '#1a35a0',
                opacity: 0.22,
                filter: 'blur(84px)',
              }}
            />
          </div>
        </div>

        {/* Globe — Figma "ggz_1 1" video (node 404:420). Position: left
            30.69%, right 28.19%, top 62px from panel; aspect 818/720;
            blend mode lighten (drops the black bg of the video so the
            footer reads through). */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: '30.69%',
            right: '28.19%',
            top: '62px',
            aspectRatio: '818 / 720',
            mixBlendMode: 'lighten',
          }}
        >
          <video
            aria-hidden="true"
            src="/assets/gg_1.mp4"
            poster="/assets/globe.png"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover select-none"
          />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 px-[58px] pt-[70px] pb-[50px]">
          <div>
            <LogoMark className="h-[22px] w-[122px] text-white" color="white" />

            <h3 className="mt-[100px] text-[24px] text-white">Get in Touch</h3>
            <a
              href="mailto:hello@capital33.com"
              className="mt-2 inline-block text-[14px] text-ink-soft hover:text-white transition-colors underline underline-offset-4"
            >
              hello@capital33.com
            </a>

            <div className="mt-[100px] text-[15px] leading-[24px]">
              <p className="text-white">Office</p>
              <div className="h-2" />
              <p className="text-white">26 Londra Street</p>
              <p className="text-white">Bucharest, Romania</p>
            </div>

            <div className="mt-[80px] flex items-center gap-3 text-[15px] text-white/60">
              <LinkedInIcon className="size-5 text-white/70" />
              <a href="https://www.linkedin.com/company/c33" className="hover:text-white transition-colors">
                Capital33
              </a>
            </div>
          </div>

          <div className="flex flex-col items-end justify-start text-right">
            <p className="text-[20px] text-white leading-[26px] max-w-[280px]">Engineered for scalable growth.</p>
          </div>
        </div>

        <div className="relative flex items-center justify-between px-[58px] pb-[36px] text-[12px] text-white/40">
          <p>Copyright: © 2026 Capital 33. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Terms and Conditions
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
