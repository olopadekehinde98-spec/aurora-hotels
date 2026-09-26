import { AnimatePresence, motion, useTransform } from 'framer-motion'
import { ArrowRight, MapPin, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Img } from '../components/Img'
import { SplitLines } from '../components/SplitLines'
import { heroChapters, heroSlides } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { EASE, goTo, useUI } from '../lib/ui'

const DWELL = 7000

export function Hero() {
  const { open } = useUI()
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start start', 'end start'])
  const [i, setI] = useState(0)

  const bgY = useTransform(p, [0, 1], ['0%', '20%'])
  const fade = useTransform(p, [0, 0.75], [1, 0])

  useEffect(() => {
    if (!motionOK) return
    const t = window.setTimeout(() => setI((v) => (v + 1) % heroSlides.length), DWELL)
    return () => window.clearTimeout(t)
  }, [i, motionOK])

  const slide = heroSlides[i]

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[720px] flex-col justify-end overflow-hidden bg-night h-[100svh]">
      {/* Slides */}
      <motion.div className="absolute inset-0 -z-20" style={motionOK ? { y: bgY } : undefined}>
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.6 }, scale: { duration: 8, ease: 'linear' } }}
          >
            <Img photo={slide.photo} priority={i === 0} widths={[828, 1280, 1600]} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/92 via-night/55 to-night/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/25 to-night/45" />

      <motion.div className="frame relative flex-1 pt-32 pb-10" style={motionOK ? { opacity: fade } : undefined}>
        <div className="flex h-full max-w-[640px] flex-col justify-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="eyebrow mb-6">
            A world of exceptional hospitality
          </motion.p>

          <SplitLines
            as="h1"
            play
            delay={0.15}
            stagger={0.12}
            className="display text-[clamp(2.7rem,6.4vw,5.4rem)]"
            lines={['Extraordinary Stays', 'For Extraordinary', 'People']}
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
            className="mt-7 max-w-[430px] text-[15px] leading-[1.75] text-ivory/75"
          >
            Discover breathtaking destinations, world-class comfort, and unforgettable experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <button type="button" onClick={() => goTo('destinations')} className="btn-gold group">
              Explore Our Hotels
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
            </button>
            <button type="button" onClick={() => open({ kind: 'booking' })} className="group flex items-center gap-3.5 text-[13px] text-ivory">
              <span className="relative grid h-11 w-11 place-items-center rounded-full border border-ivory/35 transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
                <Play className="ml-0.5 h-4 w-4 fill-current" strokeWidth={1} />
                <span className="absolute inset-0 rounded-full border border-gold/40" style={{ animation: 'soft-ping 3s ease-out infinite' }} />
              </span>
              Watch the Film
            </button>
          </motion.div>
        </div>

        {/* Chapter index */}
        <motion.ol
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
          className="absolute top-1/2 right-0 hidden -translate-y-1/2 flex-col gap-6 pr-2 lg:flex"
        >
          {heroChapters.map((c) => (
            <li key={c.n}>
              <a href={c.href} className="group flex items-start gap-3 text-right">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full border border-gold/60 transition-colors group-hover:bg-gold" />
                <span>
                  <span className="block text-[12px] tracking-[0.2em] text-ivory/80 transition-colors group-hover:text-gold">{c.n}</span>
                  <span className="block font-serif text-[1.05rem] text-ivory/60 transition-colors group-hover:text-ivory">{c.label}</span>
                </span>
              </a>
            </li>
          ))}
        </motion.ol>
      </motion.div>

      {/* Slide counter + location */}
      <div className="frame relative flex items-end justify-between pb-8">
        <div className="flex items-center gap-4">
          {heroSlides.map((s, k) => (
            <button
              key={s.resort}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show ${s.resort}`}
              className="group flex items-center gap-3 py-2.5"
            >
              <span className={`text-[12px] tracking-[0.18em] transition-colors ${k === i ? 'text-ivory' : 'text-ivory/40 group-hover:text-ivory/70'}`}>
                0{k + 1}
              </span>
              <span className="relative block h-px w-6 bg-ivory/25 sm:w-14">
                {k === i && (
                  <motion.span
                    key={`bar-${i}`}
                    className="absolute inset-y-0 left-0 bg-gold"
                    initial={{ width: motionOK ? '0%' : '100%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: motionOK ? DWELL / 1000 : 0, ease: 'linear' }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.resort}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-3 text-right whitespace-nowrap"
          >
            <MapPin className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
            <span>
              <span className="block text-[13px] text-ivory">{slide.place}</span>
              <span className="hidden text-[10.5px] sm:block tracking-[0.22em] text-mist uppercase">{slide.resort}</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
