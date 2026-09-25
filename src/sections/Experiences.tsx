import { motion } from 'framer-motion'
import { ArrowRight, CalendarHeart, Compass, Flower2, UtensilsCrossed } from 'lucide-react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { experiences } from '../data/content'
import { EASE, useUI } from '../lib/ui'

const icons = [UtensilsCrossed, Flower2, Compass, CalendarHeart]

/** Curated experiences — what the stay is actually made of. */
export function Experiences() {
  const { open } = useUI()

  return (
    <section id="experiences" className="relative border-t border-line bg-night py-20 md:py-24">
      <div className="frame grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:items-center">
        <div>
          <p className="eyebrow mb-5">Curated experiences</p>
          <SplitLines className="display text-[clamp(2.2rem,4.4vw,3.6rem)]" lines={['More Than a Stay', 'A Collection of Moments']} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[380px] text-[14.5px] leading-[1.8] text-mist">
              Indulge in world-class dining, rejuvenating spa treatments, private excursions, and unique local experiences crafted just for you.
            </p>
            <button type="button" onClick={() => open({ kind: 'booking', subject: 'Experiences' })} className="btn-line group mt-8">
              Explore Experiences
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.6} />
            </button>
          </Reveal>
        </div>

        <ul className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {experiences.map((e, i) => {
            const Icon = icons[i]
            return (
              <motion.li
                key={e.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={() => open({ kind: 'booking', subject: e.title })}
                  className="group relative block aspect-[4/5] w-full overflow-hidden bg-ash text-left xl:aspect-[3/4]"
                >
                  <Img
                    photo={e.photo}
                    sizes="(min-width: 1280px) 18vw, (min-width: 640px) 40vw, 90vw"
                    widths={[400, 700, 1000]}
                    className="transition-transform duration-[1400ms] ease-cine group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/92 via-night/25 to-transparent" />
                  <span className="absolute top-4 left-4 grid h-9 w-9 place-items-center rounded-full border border-ivory/30 bg-night/50 text-gold backdrop-blur-sm">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-serif text-[1.35rem] leading-tight font-light">{e.title}</h3>
                    <p className="mt-1 text-[11px] tracking-[0.16em] text-gold uppercase">{e.note}</p>
                    <p className="mt-2 max-h-0 overflow-hidden text-[12.5px] leading-relaxed text-ivory/70 transition-all duration-500 group-hover:max-h-20">
                      {e.blurb}
                    </p>
                  </div>
                </button>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
