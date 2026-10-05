import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../ui/Button'
import arrowRight from '../../assets/icons/arrow-right.svg'
import studentArrival from '../../assets/images/home-hero/student-arrival.jpg'
import campusLife from '../../assets/images/home-hero/campus-life.jpg'
import stemLearning from '../../assets/images/home-hero/stem-learning.jpg'

const AUTOPLAY_MS = 4000

const slides = [
  {
    image: studentArrival,
    alt: 'Vidya Peeth student smiling outside the school campus at sunrise',
    eyebrow: 'Welcome to Vidya Peeth Schools',
    heading: 'Stronger Values,',
    highlight: 'Brighter Futures',
    body: 'A CBSE-affiliated school in Karimnagar nurturing confident, compassionate learners from Nursery to Grade XII.',
  },
  {
    image: campusLife,
    alt: 'Students playing basketball, making music and painting on the Vidya Peeth campus',
    eyebrow: 'Beyond Academics',
    heading: 'Where Every Talent',
    highlight: 'Finds Its Stage',
    body: 'From the basketball court to the art studio, our students discover their passions through sports, music and the arts alongside academic excellence.',
  },
  {
    image: stemLearning,
    alt: 'Students building a robot together in a sunlit STEM classroom',
    eyebrow: 'Future-Ready Learning',
    heading: 'Ideas That',
    highlight: 'Lead to Change',
    body: 'Robotics, coding and hands-on STEM labs turn curiosity into innovation as students learn to explore, create, collaborate and solve.',
  },
]

function ArrowButton({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      className={`absolute top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent hover:text-brand focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:size-12 ${
        direction === 'prev' ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`size-5 ${direction === 'prev' ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  )
}

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length)
  }, [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [])
  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [])

  // Autoplay; restarts whenever the slide changes so manual navigation gets a full interval.
  useEffect(() => {
    if (paused) return
    const timer = window.setTimeout(next, AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [index, paused, next])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Vidya Peeth highlights"
      className="relative isolate h-[600px] overflow-hidden bg-brand sm:h-[640px] lg:h-[min(760px,calc(100vh-80px))] lg:min-h-[620px]"
      // Pause only for keyboard users; mouse clicks/taps on the arrows or dots shouldn't stop autoplay.
      onFocus={(event) => {
        if (event.target.matches(':focus-visible')) setPaused(true)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') prev()
        if (event.key === 'ArrowRight') next()
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return
        const delta = event.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(delta) > 50) (delta > 0 ? prev : next)()
        touchStartX.current = null
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${slides.length}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === index ? 'z-10 opacity-100' : 'z-0 opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            className={`size-full object-cover object-center transition-transform duration-[7000ms] ease-out motion-reduce:transition-none ${
              i === index ? 'scale-105' : 'scale-100'
            }`}
          />
        </div>
      ))}

      {/* Readability overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-brand/90 via-brand/55 to-brand/0 sm:via-brand/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-brand/70 to-transparent" />

      <div className="relative z-20 mx-auto flex h-full max-w-[1360px] items-center px-16 pt-16 sm:px-24 lg:px-28">
        <div key={index} className="flex max-w-[600px] flex-col items-start gap-5 animate-[hero-text-in_700ms_cubic-bezier(0.16,1,0.3,1)]">
          <span className="flex items-center gap-2 font-display text-xs font-extrabold tracking-[2.4px] text-accent uppercase">
            <span className="h-[2px] w-8 rounded-full bg-accent" />
            {slides[index].eyebrow}
          </span>
          <h1 className="font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-[64px]">
            {slides[index].heading}
            <br />
            <span className="text-accent">{slides[index].highlight}</span>
          </h1>
          <p className="max-w-[520px] text-base leading-relaxed text-slate-200 sm:text-lg">{slides[index].body}</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button as={NavLink} to="/admissions" icon={<img src={arrowRight} alt="" className="size-4" />}>
              Explore Admissions
            </Button>
            <NavLink
              to="/enquiry"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 font-display text-xs font-bold tracking-[0.6px] text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Book a Campus Visit
            </NavLink>
          </div>
        </div>
      </div>

      <ArrowButton direction="prev" onClick={prev} />
      <ArrowButton direction="next" onClick={next} />

      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2 sm:bottom-8">
        {slides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className="group flex h-6 items-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-10 bg-accent' : 'w-4 bg-white/50 group-hover:bg-white/80'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
