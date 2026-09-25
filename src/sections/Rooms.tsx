import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { rooms } from '../data/content'
import { EASE, useUI } from '../lib/ui'

/** Rooms & suites: one large photograph with a quiet list of the others beside it. */
export function Rooms() {
  const { open } = useUI()
  const [i, setI] = useState(0)
  const step = (d: 1 | -1) => setI((v) => (v + d + rooms.length) % rooms.length)
  const room = rooms[i]

  return (
    <section id="stays" className="relative border-t border-line bg-night py-20 md:py-24">
      <div className="frame grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)_minmax(0,0.75fr)] lg:items-center lg:gap-8">
        {/* Copy */}
        <div>
          <p className="eyebrow mb-5">Our rooms & suites</p>
          <SplitLines className="display text-[clamp(2.2rem,4.4vw,3.6rem)]" lines={['Spaces', 'Designed', 'for You']} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[330px] text-[14.5px] leading-[1.8] text-mist">
              Elegant rooms, private pools, and panoramic views. Every detail is crafted for your comfort and peace of mind.
            </p>
            <button type="button" onClick={() => open({ kind: 'booking', subject: room.name })} className="btn-line group mt-8">
              View Rooms & Suites
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.6} />
            </button>
          </Reveal>
        </div>

        {/* Stage */}
        <div className="relative aspect-[16/11] overflow-hidden bg-coal lg:aspect-[16/12]">
          <AnimatePresence initial={false}>
            <motion.div
              key={room.name}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <Img photo={room.photo} sizes="(min-width: 1024px) 52vw, 100vw" widths={[640, 1024, 1440]} />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6">
            <div>
              <AnimatePresence mode="wait">
                <motion.div key={room.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <h3 className="font-serif text-[1.8rem] leading-tight font-light">{room.name}</h3>
                  <p className="mt-1.5 max-w-[360px] text-[13.5px] leading-relaxed text-ivory/70">{room.blurb}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="flex gap-4 text-[11px] tracking-[0.18em] text-ivory/70 uppercase">
              <span>{room.size}</span>
              <span className="text-gold">·</span>
              <span>{room.guests}</span>
            </p>
          </div>
        </div>

        {/* List */}
        <div className="flex min-w-0 flex-col gap-3">
          <ul className="no-scrollbar -mx-5 min-w-0 flex gap-3 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {rooms.map((r, idx) => {
              const on = idx === i
              return (
                <li key={r.name} className="w-[72vw] shrink-0 sm:w-[44vw] lg:w-auto">
                  <button
                    type="button"
                    onClick={() => setI(idx)}
                    aria-pressed={on}
                    className={`flex w-full items-center gap-3 border p-2.5 text-left transition-colors duration-300 ${
                      on ? 'border-gold bg-coal' : 'border-line hover:border-ivory/30'
                    }`}
                  >
                    <span className="h-12 w-16 shrink-0 overflow-hidden bg-ash">
                      <Img photo={r.photo} decorative sizes="64px" widths={[160]} noPreview />
                    </span>
                    <span className="min-w-0">
                      <span className={`block truncate text-[13px] ${on ? 'text-gold' : 'text-ivory'}`}>{r.name}</span>
                      <span className="block truncate text-[11.5px] text-mist">{r.note}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="hidden justify-end gap-2 lg:flex">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous room"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next room"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowDown className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
