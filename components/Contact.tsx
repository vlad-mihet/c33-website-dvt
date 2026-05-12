import { ArrowUpRight } from './icons';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <section id="contact" className="relative px-[58px] py-[140px] dotted-bg">
      <Reveal className="max-w-[864px] mx-auto flex flex-col items-center text-center gap-8">
        <p className="font-medium text-[15px] tracking-[0.12em] uppercase text-mute-2">Contact</p>
        <h2 className="text-[44px] leading-[52px] text-ink">
          For mandates and partnerships
          <br />
          reach out to us directly
        </h2>

        <a
          href="mailto:hello@capital33.com"
          className="group mt-6 inline-flex items-center gap-2 bg-[rgba(17,16,18,0.9)] hover:bg-ink transition-colors text-white text-[12px] pl-[26px] pr-[13px] py-[11px] rounded-full"
        >
          Request a Consultation
          <ArrowUpRight className="size-[20px] text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </section>
  );
}
