import { motion, useTransform } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { useRef } from 'react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { offer } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { EASE, useUI } from '../lib/ui'

/** Special offers — the closing band, with one package card. */
export function Offers() {
  const { open } = useUI()
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start end', 'end start'])
  const y = useTransform(p, [0, 1], ['-8%', '8%'])
  const scale = useTransform(p, [0, 1], [1.12, 1])

  return (
    <section id="offers" ref={ref} className="relative isolate flex min-h-[560px] items-center overflow-hidden border-t border-line bg-night py-20 md:py-24">
      <motion.div className="absolute inset-x-0 -top-[10%] -bottom-[10%] -z-20" style={motionOK ? { y, scale } : undefined}>
        <Img photo={offer.photo} widths={[828, 1280, 1600]} />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/70 to-night/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/80 to-transparent" />

      <div className="frame relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow mb-5">Special offers</p>
          <SplitLines className="display text-[clamp(2.2rem,5vw,4rem)]" lines={['Escape to Extraordinary']} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[440px] text-[15px] leading-[1.8] text-ivory/75">
              Exclusive packages, seasonal offers, and bespoke experiences made for your next getaway.
            </p>
            <button type="button" onClick={() => open({ kind: 'booking', subject: 'Offers' })} className="btn-line group mt-8">
              View Offers
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.6} />
            </button>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="card w-full max-w-[420px] justify-self-start p-6 backdrop-blur-md lg:justify-self-end"
        >
          <h3 className="font-serif text-[1.7rem] leading-tight font-light">{offer.title}</h3>
          <p className="mt-1.5 text-[12.5px] tracking-[0.1em] text-mist">{offer.detail}</p>

          <ul className="mt-5 space-y-2.5">
            {offer.includes.map((inc) => (
              <li key={inc} className="flex items-start gap-2.5 text-[13px] text-ivory/75">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.8} />
                {inc}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
            <p>
              <span className="block text-[11px] tracking-[0.18em] text-mist uppercase">{offer.from}</span>
              <span className="font-serif text-[2rem] leading-none text-gold">{offer.price}</span>
            </p>
            <button type="button" onClick={() => open({ kind: 'booking', subject: offer.title })} className="btn-gold group py-3">
              View Package
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
