import { ArrowUpRight } from './icons';

export default function Hero() {
  return (
    <section id="top" className="relative pt-[260px] pb-[120px] px-[58px] overflow-hidden">
      {/* Full-width Hand animation video — Figma "Hand animation 1" at x=0,
          y=0, 1440×810. Sits behind the headline content as the top hero's
          atmospheric backdrop. The video already has a white background so
          it composites cleanly against the page's white surface.
          Intentionally NOT looped — plays the hands-meeting motion once and
          rests on the final frame, which doubles as a strong still image. */}
      <video
        aria-hidden="true"
        src="/assets/Hand%20animation%20.mp4"
        autoPlay
        muted
        playsInline
        preload="metadata"
        className="pointer-events-none absolute inset-x-0 top-0 h-[810px] w-full object-cover select-none"
      />
      {/* Soft animated halo behind the headline. Figma "circle" at x=180,y=125 w=1068 h=600. */}
      <div
        aria-hidden="true"
        className="hero-halo pointer-events-none absolute left-1/2 top-[125px] -translate-x-1/2 w-[1068px] h-[600px] max-w-none rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(120,140,255,0.22) 0%, rgba(85,107,230,0.10) 30%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="relative max-w-[1323px] mx-auto">
        {/* Headline area — Figma: headline at y=373, CTA at y=517 (144px gap below headline) */}
        <div className="flex flex-col items-center text-center mb-[40px]">
          <p className="font-medium text-[15px] tracking-[0.12em] uppercase text-mute-2 mb-[40px]">A new era</p>
          {/* Figma "Mask group" (node 570:8890): blue glow rectangle masked
              to the headline's letterforms. We achieve the same visual with
              a CSS gradient clipped to the text — blue concentrates in the
              upper-left and falls off to ink toward the lower-right, which
              matches the Figma 165° rotated, blurred Glowing-blue overlay. */}
          <h1
            className="text-[62px] font-medium leading-[60px] tracking-[-0.02em] max-w-[572px] bg-clip-text"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #0a1170 0%, #1a2a8a 25%, #2a3aa5 50%, #1a2360 70%, #111012 95%)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Capital for Complex
            <br />
            Growth
          </h1>
          <a
            href="#services"
            className="group mt-[60px] inline-flex items-center gap-2 bg-[rgba(17,16,18,0.9)] hover:bg-ink transition-colors text-white text-[12px] pl-[26px] pr-[13px] py-[11px] rounded-full h-[38px]"
          >
            Explore Services
            <ArrowUpRight className="size-[20px] text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Intro paragraph — Figma: y=730, width 426, height 62 (left-aligned in container) */}
        <div className="max-w-[426px] mt-[140px]">
          <p className="text-[15px] leading-[20px] text-ink">
            Capital33 is a next-generation merchant bank focused on capital raising and{' '}
            <span className="text-mute">AI-powered</span> direct lending for mid-market and large enterprises.
          </p>
        </div>

        {/* Tunnel visual — tunel2.mp4 plays the "FAST" reveal once and rests
            on its final frame (no `loop` attribute). Figma: x=11, w=1418,
            h=855. Hero section uses px-[58px] so we extend -47px on each
            side to land at 11px page margin. The video burns its own "FAST"
            type treatment into the centre, so no HTML overlay is needed. */}
        <div className="mt-[108px] relative h-[855px] -mx-[47px] rounded-[28px] overflow-hidden bg-[#050610]">
          <video
            aria-hidden="true"
            src="/assets/tunel2.mp4"
            autoPlay
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover select-none"
          />
        </div>
      </div>
    </section>
  );
}
