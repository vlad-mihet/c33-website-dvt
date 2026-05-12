import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { homeServices, type HomeServiceCard } from '@/lib/content/services';

function ServiceCard({ service }: { service: HomeServiceCard }) {
  // Figma component 509:699 (default) ↔ 509:700 (hover).
  //   Default: white card, title top-left, index bottom-RIGHT, no body.
  //   Hover:   dark navy card (#080914), white text, body fades in, index
  //            slides bottom-RIGHT → bottom-LEFT, soft diagonal "digital
  //            flare" sheen sweeps across with mix-blend-lighten.
  //
  // All transitions share one cubic-bezier curve (Reveal's easing) and an
  // 800ms duration with light staggering so the swap feels orchestrated
  // rather than rough. The index uses a transform-based slide (CSS can
  // smoothly interpolate translate, but not the {right→left} pair) so it
  // glides instead of cross-fading.
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
  return (
    <Link
      href="/services"
      aria-label={service.title.replace(/\n/g, ' ').trim()}
      className="group relative block h-[460px] w-full overflow-hidden rounded-[29px] border border-line-2 bg-white p-[40px] will-change-[background-color,transform,box-shadow] hover:-translate-y-[2px] hover:border-[#15182a] hover:bg-[#080914] hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
      style={{
        transitionProperty: 'background-color, border-color, transform, box-shadow',
        transitionDuration: '800ms',
        transitionTimingFunction: ease,
      }}
    >
      {/* Digital flare — diagonal sheen that only appears on hover. Two
          stacked linear-gradients give the metallic-glass look: a soft cool
          highlight in the top-right and a fainter one in the bottom-left.
          mix-blend-lighten on the dark hover bg leaves only the brightening. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          backgroundImage: [
            'linear-gradient(135deg, transparent 35%, rgba(160,180,235,0.30) 55%, rgba(120,150,220,0.10) 65%, transparent 78%)',
            'linear-gradient(135deg, transparent 8%, rgba(70,95,180,0.18) 18%, transparent 32%)',
            'radial-gradient(ellipse 80% 60% at 100% 0%, rgba(40,60,160,0.35) 0%, transparent 60%)',
            'radial-gradient(ellipse 70% 50% at 0% 100%, rgba(30,45,140,0.28) 0%, transparent 60%)',
          ].join(', '),
          mixBlendMode: 'lighten',
          transition: `opacity 900ms ${ease} 80ms`,
        }}
      />

      {/* Title — stays at top-left in both states. Color flips via hover. */}
      <h3
        className="relative text-[32px] leading-tight whitespace-pre-line text-ink group-hover:text-white"
        style={{ transition: `color 700ms ${ease}` }}
      >
        {service.title}
      </h3>

      {/* Body — wrapped so we can fade opacity (smoother than text alpha)
          and add a small lift so it doesn't just blink in. */}
      <div
        aria-hidden="true"
        className="relative mt-[28px] max-w-[330px] translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        style={{
          transition: `opacity 700ms ${ease} 120ms, transform 700ms ${ease} 120ms`,
        }}
      >
        <p className="text-[15px] leading-[24px] text-white/90">{service.body}</p>
      </div>

      {/* Index — rendered TWICE at the two end positions. Both fade in
          opposite directions under the same easing curve, which reads as
          a smooth slide because the glyphs are identical. CSS can't animate
          `auto` margins or {left↔right} swaps so this is the cleanest pure
          CSS solution. */}
      <span
        aria-hidden="true"
        className="absolute right-[40px] bottom-[40px] text-[52px] leading-none text-num-mute opacity-100 group-hover:opacity-0"
        style={{ transition: `opacity 700ms ${ease}` }}
      >
        {service.index}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-[40px] bottom-[40px] text-[52px] leading-none text-[#dedede] opacity-0 group-hover:opacity-100"
        style={{ transition: `opacity 700ms ${ease}` }}
      >
        {service.index}
      </span>
    </Link>
  );
}

export default function Services() {
  // Figma: cards at x=58, 541, 1022 → 124px gap. Section padding 261px above (tunnel ends y=1755, cards start y=2016).
  return (
    <section id="services" className="px-[58px] pt-[120px] pb-[120px]">
      <div className="max-w-[1323px] mx-auto">
        <Reveal className="flex flex-col items-center gap-8 mb-[80px]">
          <p className="font-medium text-[15px] tracking-[0.12em] uppercase text-mute-2">Our</p>
          <h2 className="text-[34px] leading-[40px] text-ink">Services</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 md:gap-[40px] lg:grid-cols-3 lg:gap-x-[124px] lg:gap-y-[40px]">
          {homeServices.map((service, i) => (
            <Reveal key={service.title} delay={i * 120}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
