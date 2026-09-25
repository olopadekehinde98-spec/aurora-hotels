import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { destinations } from '../data/content'
import { EASE, useUI } from '../lib/ui'

/** Iconic destinations, as a row of tall cards you can page through. */
export function Destinations() {
  const { open } = useUI()
  const rail = useRef<HTMLUListElement>(null)

  const page = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    el.scrollBy({ left: ((card?.offsetWidth ?? 300) + 16) * dir, behavior: 'smooth' })
  }

  return (
    <section id="destinations" className="relative border-t border-line bg-coal py-20 md:py-24">
      <div className="frame">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5">Iconic destinations</p>
            <SplitLines className="display text-[clamp(2.2rem,4.6vw,3.8rem)]" lines={['Unforgettable Places', 'Around the World']} />
          </div>
          <Reveal delay={0.1} className="lg:pb-2">
            <p className="max-w-[420px] text-[14.5px] leading-[1.8] text-mist">
              From tropical beaches to vibrant cities, our hotels are located in the world’s most exceptional destinations.
            </p>
            <button
              type="button"
              onClick={() => open({ kind: 'booking' })}
              className="group mt-5 inline-flex items-center gap-2.5 text-[12px] tracking-[0.14em] text-gold uppercase"
            >
              View All Destinations
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.6} />
            </button>
          </Reveal>
        </div>

        <div className="relative mt-12 min-w-0">
          <ul ref={rail} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {destinations.map((d, i) => (
              <motion.li
                key={d.city}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                className="w-[76vw] shrink-0 snap-center sm:w-[44vw] lg:w-[calc((100%-4rem)/5)]"
              >
                <button
                  type="button"
                  onClick={() => open({ kind: 'booking', subject: `${d.city} — ${d.country}` })}
                  className="group relative block aspect-[3/4] w-full overflow-hidden bg-ash text-left"
                >
                  <Img
                    photo={d.photo}
                    sizes="(min-width: 1024px) 19vw, 76vw"
                    widths={[400, 700, 1000]}
                    className="transition-transform duration-[1400ms] ease-cine group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-serif text-[1.5rem] leading-tight font-light">{d.city}</h3>
                    <p className="mt-1 text-[11.5px] tracking-[0.16em] text-gold uppercase">{d.country}</p>
                    <p className="mt-2 max-h-0 overflow-hidden text-[12.5px] leading-relaxed text-ivory/70 transition-all duration-500 group-hover:max-h-16">
                      {d.note}
                    </p>
                    <p className="mt-3 text-[11px] tracking-[0.14em] text-ivory/50 uppercase">{d.hotels} hotels</p>
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => page(-1)}
            aria-label="Previous destinations"
            className="absolute top-1/2 -left-3 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-night/80 text-ivory backdrop-blur transition-colors hover:border-gold hover:text-gold xl:grid"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            aria-label="Next destinations"
            className="absolute top-1/2 -right-3 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-night/80 text-ivory backdrop-blur transition-colors hover:border-gold hover:text-gold xl:grid"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </section>
  )
}
