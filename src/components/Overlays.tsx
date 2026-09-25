import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { destinations, rooms } from '../data/content'
import { EASE_MASK, goTo, useUI } from '../lib/ui'

function useModal(onClose: () => void) {
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus?.({ preventScroll: true })
    }
  }, [onClose])
}

const field =
  'w-full border border-line bg-night px-3.5 py-3 text-[14px] text-ivory placeholder:text-mist/70 focus:border-gold focus:outline-none'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10.5px] tracking-[0.2em] text-mist uppercase">{label}</span>
      {children}
    </label>
  )
}

/** Booking drawer — dates, guests and the stay you are asking about. */
function Booking({ subject, onClose }: { subject?: string; onClose: () => void }) {
  useModal(onClose)
  const [sent, setSent] = useState(false)

  return (
    <motion.div className="fixed inset-0 z-[120]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <button type="button" aria-label="Close booking" onClick={onClose} className="absolute inset-0 bg-night/80 backdrop-blur-sm" tabIndex={-1} />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label="Book your stay"
        className="absolute inset-y-0 right-0 flex w-full max-w-[520px] flex-col overflow-y-auto border-l border-line bg-coal px-6 py-6 sm:px-10"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.7, ease: EASE_MASK }}
      >
        <div className="flex items-center justify-between">
          <p className="eyebrow">Reservations</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            autoFocus
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="sent" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="my-auto py-14" role="status">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold text-gold">
                <Check className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h2 className="display mt-7 text-[2.6rem]">Request received.</h2>
              <p className="mt-4 max-w-[380px] text-[14.5px] leading-[1.8] text-mist">
                A reservations host will confirm availability and hold your suite within the hour.
              </p>
              <button type="button" onClick={onClose} className="btn-line mt-9">
                Continue exploring
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              exit={{ opacity: 0 }}
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="mt-8 space-y-6 pb-8"
            >
              <div>
                <h2 className="display text-[clamp(2rem,5vw,2.8rem)]">Book your stay.</h2>
                <p className="mt-3 text-[14px] leading-[1.75] text-mist">Tell us when and where — we will take care of the rest.</p>
              </div>

              <Field label="Destination">
                <select name="destination" defaultValue={subject ?? destinations[0].city} className={`${field} appearance-none`}>
                  {destinations.map((d) => (
                    <option key={d.city} className="bg-coal">
                      {d.city}
                    </option>
                  ))}
                  <option className="bg-coal">{subject ?? 'Somewhere else'}</option>
                </select>
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Arrive">
                  <input required type="date" name="arrive" className={field} />
                </Field>
                <Field label="Depart">
                  <input required type="date" name="depart" className={field} />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Guests">
                  <select name="guests" defaultValue="2 adults" className={`${field} appearance-none`}>
                    {['1 adult', '2 adults', '2 adults · 1 child', 'Family (4+)'].map((g) => (
                      <option key={g} className="bg-coal">
                        {g}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Room">
                  <select name="room" defaultValue={rooms[0].name} className={`${field} appearance-none`}>
                    {rooms.map((r) => (
                      <option key={r.name} className="bg-coal">
                        {r.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name">
                  <input required name="name" autoComplete="name" className={field} placeholder="Your name" />
                </Field>
                <Field label="Email">
                  <input required type="email" name="email" autoComplete="email" className={field} placeholder="you@domain.com" />
                </Field>
              </div>

              <Field label="Anything we should arrange?">
                <textarea name="notes" rows={3} className={`${field} resize-none`} placeholder="Transfers, dining, celebrations…" />
              </Field>

              <button type="submit" className="btn-gold group w-full justify-center py-4">
                Request availability
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
              </button>
              <p className="text-[10.5px] leading-relaxed tracking-[0.14em] text-mist uppercase">Demo form · nothing is sent anywhere</p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.aside>
    </motion.div>
  )
}

/** Search overlay across destinations and rooms. */
function SearchOverlay({ onClose }: { onClose: () => void }) {
  useModal(onClose)
  const [q, setQ] = useState('')
  const all = useMemo(
    () => [
      ...destinations.map((d) => ({ title: d.city, meta: `${d.country} · ${d.hotels} hotels`, target: 'destinations' })),
      ...rooms.map((r) => ({ title: r.name, meta: `${r.note} · ${r.size}`, target: 'stays' })),
    ],
    [],
  )
  const results = q.trim() ? all.filter((r) => `${r.title} ${r.meta}`.toLowerCase().includes(q.trim().toLowerCase())) : all.slice(0, 6)

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Search stays"
      className="fixed inset-0 z-[120] overflow-y-auto bg-night/96 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="frame py-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            autoFocus
            className="grid h-12 w-12 place-items-center rounded-full border border-line text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>
        <div className="mx-auto mt-[8vh] max-w-[860px]">
          <p className="eyebrow mb-5">Find your stay</p>
          <form
            role="search"
            onSubmit={(e: FormEvent) => {
              e.preventDefault()
              if (results[0]) {
                onClose()
                window.setTimeout(() => goTo(results[0].target), 320)
              }
            }}
            className="flex items-center gap-5 border-b border-ivory/25 pb-4 focus-within:border-gold"
          >
            <Search className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.2} />
            <label htmlFor="stay-q" className="sr-only">
              Destination or room
            </label>
            <input
              id="stay-q"
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Destination, hotel or suite…"
              autoComplete="off"
              className="w-full bg-transparent font-serif text-[clamp(1.8rem,4.6vw,3.2rem)] font-light text-ivory placeholder:text-ivory/25 focus:outline-none"
            />
          </form>
          <ul className="mt-8 divide-y divide-line">
            {results.map((r, i) => (
              <motion.li key={r.title + r.meta} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}>
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    window.setTimeout(() => goTo(r.target), 320)
                  }}
                  className="group flex w-full items-center justify-between gap-5 py-4 text-left"
                >
                  <span>
                    <span className="block font-serif text-[1.5rem] text-ivory transition-colors group-hover:text-gold">{r.title}</span>
                    <span className="mt-0.5 block text-[11.5px] tracking-[0.16em] text-mist uppercase">{r.meta}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 -translate-x-2 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.4} />
                </button>
              </motion.li>
            ))}
            {!results.length && <li className="py-8 text-[14px] text-mist">Nothing matches “{q}” — our hosts can still help.</li>}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export function Overlays() {
  const { overlay, close } = useUI()
  return (
    <AnimatePresence>
      {overlay?.kind === 'booking' && <Booking key="booking" subject={overlay.subject} onClose={close} />}
      {overlay?.kind === 'search' && <SearchOverlay key="search" onClose={close} />}
    </AnimatePresence>
  )
}

