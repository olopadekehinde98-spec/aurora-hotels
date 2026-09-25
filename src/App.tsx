import { MotionConfig } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Overlays } from './components/Overlays'
import { UIContext, type Overlay, type UI } from './lib/ui'
import { Destinations } from './sections/Destinations'
import { Experiences } from './sections/Experiences'
import { Hero } from './sections/Hero'
import { Offers } from './sections/Offers'
import { Rooms } from './sections/Rooms'

export default function App() {
  const [overlay, setOverlay] = useState<Overlay>(null)
  const open = useCallback((o: Exclude<Overlay, null>) => setOverlay(o), [])
  const close = useCallback(() => setOverlay(null), [])
  const ui: UI = useMemo(() => ({ overlay, open, close }), [overlay, open, close])

  return (
    <MotionConfig reducedMotion="user">
      <UIContext.Provider value={ui}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-gold focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <Rooms />
          <Destinations />
          <Experiences />
          <Offers />
        </main>
        <Footer />
        <Overlays />
      </UIContext.Provider>
    </MotionConfig>
  )
}
