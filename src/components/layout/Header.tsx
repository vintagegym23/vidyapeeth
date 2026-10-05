import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../ui/Button'
import logoMark from '../../assets/icons/logo-mark.svg'
import arrowRight from '../../assets/icons/arrow-right.svg'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Academics', to: '/academics' },
  { label: 'Beyond Academics', to: '/beyond-academics' },
  { label: 'Admission', to: '/admissions' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Mandatory Disclosure', to: '/mandatory-disclosure' },
]

function NavLinkItem({ label, to }: { label: string; to: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `relative flex flex-col items-start pt-[3.5px] pb-[3.75px] font-sans text-[13.5px] font-semibold whitespace-nowrap ${
          isActive ? 'text-brand' : 'text-slate-700 font-medium hover:text-brand'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-brand" />}
        </>
      )}
    </NavLink>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-[4px] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-20 max-w-[1360px] items-center justify-between px-6">
        <NavLink to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <span className="flex size-11 items-center justify-center">
            <img src={logoMark} alt="Vidya Peeth Schools" className="size-full" />
          </span>
          <span className="flex flex-col items-start">
            <span className="font-display text-[20px] font-extrabold tracking-[-0.5px] text-brand">
              VIDYA PEETH
            </span>
            <span className="pt-0.5 font-display text-[11px] font-semibold tracking-[2.75px] text-brand">
              SCHOOLS
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-4 xl:flex">
          {navItems.map((item) => (
            <NavLinkItem key={item.to} {...item} />
          ))}
        </nav>

        <div className="hidden xl:block">
          <Button as={NavLink} to="/enquiry" icon={<img src={arrowRight} alt="" className="size-3.5" />}>
            Enquiry
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex size-10 flex-col items-center justify-center gap-1.5 xl:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-brand transition-transform ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-6 bg-brand transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-6 bg-brand transition-transform ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-slate-100 bg-white px-6 py-4 xl:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 font-sans text-sm font-semibold ${
                  isActive ? 'bg-slate-100 text-brand' : 'text-slate-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button
            as={NavLink}
            to="/enquiry"
            onClick={() => setMobileOpen(false)}
            className="mt-3 justify-center"
            icon={<img src={arrowRight} alt="" className="size-3.5" />}
          >
            Enquiry
          </Button>
        </nav>
      )}
    </header>
  )
}
