const WHATSAPP_NUMBER = '919346002121'
const DEFAULT_MESSAGE = 'Hello Vidya Peeth Schools, I would like to know more about admissions.'

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed right-6 bottom-6 z-[60] flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#1ebe5b] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.35)] focus-visible:ring-4 focus-visible:ring-[#25d366]/40 focus-visible:outline-none sm:right-8 sm:bottom-8 sm:size-16 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span
        className="absolute inset-0 rounded-full bg-[#25d366] opacity-60 motion-safe:animate-ping [animation-duration:2.5s] group-hover:hidden"
        aria-hidden
      />
      <svg viewBox="0 0 32 32" className="relative size-7 sm:size-8" fill="currentColor" aria-hidden>
        <path d="M16.004 3C8.832 3 3 8.83 3 16c0 2.293.6 4.533 1.74 6.507L3 29l6.66-1.707A12.95 12.95 0 0 0 16.004 29C23.17 29 29 23.17 29 16S23.17 3 16.004 3Zm0 23.64c-1.96 0-3.88-.527-5.553-1.52l-.4-.24-3.953 1.013 1.053-3.853-.26-.4A10.6 10.6 0 0 1 5.36 16c0-5.867 4.773-10.64 10.644-10.64 5.866 0 10.64 4.773 10.64 10.64 0 5.867-4.774 10.64-10.64 10.64Zm5.833-7.967c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.506-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.214-.373.24-.693.08-.32-.16-1.353-.5-2.573-1.586-.95-.847-1.594-1.894-1.78-2.214-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.214.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.624-.524-.54-.72-.55l-.614-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.306.16.214 2.256 3.444 5.466 4.83.764.33 1.36.527 1.825.674.767.244 1.465.21 2.017.127.615-.092 1.893-.774 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.134-.293-.214-.613-.374Z" />
      </svg>
    </a>
  )
}
