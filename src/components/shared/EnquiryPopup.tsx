import { useEffect, useRef, useState, type FormEvent } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import heroImage from '../../assets/images/enquiry/hero.jpg'
import phoneIcon from '../../assets/icons/phone.svg'

const STORAGE_KEY = 'vp-enquiry-popup-seen'
const OPEN_DELAY_MS = 6000

const grades = ['Nursery', 'LKG', 'UKG', 'Grade I–V', 'Grade VI–VIII', 'Grade IX–X', 'Grade XI–XII']

const inputClasses =
  'h-11 w-full rounded-sm bg-[#f0f3ff] px-3 text-sm text-brand placeholder:text-slate-400 outline-none ring-1 ring-transparent focus:ring-2 focus:ring-brand'
const labelClasses = 'font-sans text-sm font-semibold text-brand'
const errorClasses = 'text-xs font-semibold text-[#ba1a1a]'

function hasSeenPopup() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function markPopupSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // storage unavailable (private mode etc.) – popup simply may show again
  }
}

export default function EnquiryPopup() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ parentName: '', phone: '', grade: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const pathnameRef = useRef(pathname)
  pathnameRef.current = pathname

  // Show once per browser session, shortly after the site is opened.
  // Skipped on the enquiry page itself, which already has the full form.
  useEffect(() => {
    if (hasSeenPopup()) return
    const timer = window.setTimeout(() => {
      if (pathnameRef.current === '/enquiry') return
      markPopupSeen()
      setOpen(true)
    }, OPEN_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const next: typeof errors = {}
    if (!form.parentName.trim()) next.parentName = 'Please enter your name.'
    if (!/^\d{10}$/.test(form.phone.trim())) next.phone = 'Enter a valid 10-digit mobile number.'
    if (!form.grade) next.grade = 'Please select a grade.'
    setErrors(next)
    if (Object.keys(next).length === 0) setSubmitted(true)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-brand/60 p-4 backdrop-blur-sm animate-[popup-fade_300ms_ease-out]"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-popup-title"
        onClick={(event) => event.stopPropagation()}
        className="relative grid w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] animate-[popup-rise_350ms_cubic-bezier(0.16,1,0.3,1)] md:grid-cols-5"
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Close enquiry popup"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-brand shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-accent hover:ring-accent focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-brand p-7 md:col-span-2 md:flex">
          <img src={heroImage} alt="" className="absolute inset-0 size-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/80 to-brand/40" />
          <div className="absolute -right-16 -bottom-16 size-48 rounded-xl bg-accent/20 blur-3xl" />

          <div className="relative flex flex-col gap-3">
            <span className="font-display text-xs font-extrabold tracking-[2.4px] text-accent uppercase">
              Admissions Open
            </span>
            <p className="font-display text-2xl leading-tight font-extrabold text-white">
              Academic Session 2025&ndash;26
            </p>
            <p className="text-sm leading-relaxed text-slate-200">
              Nursery to Grade XII &bull; CBSE Affiliation No. 3630436
            </p>
          </div>

          <div className="relative flex items-center gap-3 rounded-lg bg-white/10 p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded bg-accent">
              <img src={phoneIcon} alt="" className="size-[18px]" />
            </span>
            <div className="flex flex-col">
              <span className="font-sans text-[11px] font-semibold tracking-[0.6px] text-accent-light uppercase">
                Counselor Hotline
              </span>
              <a href="tel:09346002121" className="font-display text-lg font-bold text-white">
                09346002121
              </a>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="relative p-7 sm:p-8 md:col-span-3">
          <span
            className="absolute inset-x-8 top-0 h-1.5 rounded-b bg-gradient-to-r from-brand via-accent to-brand"
            aria-hidden
          />

          {submitted ? (
            <div className="flex min-h-[340px] flex-col items-center justify-center gap-3 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-accent/30 text-3xl text-brand">
                &#10003;
              </span>
              <h2 id="enquiry-popup-title" className="font-display text-2xl font-bold text-brand">
                Thank You!
              </h2>
              <p className="max-w-xs text-sm text-slate-600">
                {form.parentName.split(' ')[0]}, our admissions team will call you within 2 working
                hours.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-2 font-sans text-sm font-semibold text-brand underline"
              >
                Continue browsing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 pr-8">
                <span className="flex w-fit items-center gap-1 rounded-full bg-[#e7eeff] px-3 py-0.5 md:hidden">
                  <span className="size-2 rounded-full bg-accent" />
                  <span className="font-sans text-[11px] font-semibold tracking-[0.6px] text-brand uppercase">
                    Admissions Open 2025&ndash;26
                  </span>
                </span>
                <h2 id="enquiry-popup-title" className="font-display text-2xl font-bold text-brand">
                  Admission Enquiry
                </h2>
                <p className="text-sm text-slate-600">
                  Share a few details and our counselor will reach out to you.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label className={labelClasses} htmlFor="popup-parentName">
                  Parent / Guardian Name <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  id="popup-parentName"
                  className={inputClasses}
                  placeholder="e.g. Ramesh Chandra"
                  value={form.parentName}
                  onChange={(e) => update('parentName', e.target.value)}
                />
                {errors.parentName && <p className={errorClasses}>{errors.parentName}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className={labelClasses} htmlFor="popup-phone">
                  Mobile Number <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="flex h-11 overflow-hidden rounded-sm ring-1 ring-transparent focus-within:ring-2 focus-within:ring-brand">
                  <span className="flex items-center bg-[#e7eeff] px-3 text-sm font-semibold text-slate-500">
                    +91
                  </span>
                  <input
                    id="popup-phone"
                    inputMode="numeric"
                    className="h-full w-full bg-[#f0f3ff] px-3 text-sm text-brand placeholder:text-slate-400 outline-none"
                    placeholder="98765 43210"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
                  />
                </div>
                {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className={labelClasses} htmlFor="popup-grade">
                  Admission Sought For <span className="text-[#ba1a1a]">*</span>
                </label>
                <select
                  id="popup-grade"
                  className={inputClasses}
                  value={form.grade}
                  onChange={(e) => update('grade', e.target.value)}
                >
                  <option value="">Select target grade</option>
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
                {errors.grade && <p className={errorClasses}>{errors.grade}</p>}
              </div>

              <button
                type="submit"
                className="mt-1 flex h-12 items-center justify-center gap-2 rounded-sm bg-accent font-display text-base font-bold text-brand shadow-sm transition-colors hover:bg-accent-dark"
              >
                SUBMIT ENQUIRY <span aria-hidden>&rarr;</span>
              </button>

              <NavLink
                to="/enquiry"
                onClick={() => setOpen(false)}
                className="text-center font-sans text-xs font-semibold text-slate-500 underline-offset-2 hover:text-brand hover:underline"
              >
                Prefer the detailed form? Open full enquiry page
              </NavLink>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
