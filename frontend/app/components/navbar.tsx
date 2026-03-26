"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"

const sections = [
  { id: "features", label: "Features" },
  { id: "conditions", label: "Conditions" },
  { id: "how-it-works", label: "How It Works" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    if (pathname !== "/") {
      setActive("")
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.1 }
    )

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [pathname])

  const sectionLinks = useMemo(
    () => sections.map((section) => ({ ...section, href: `#${section.id}` })),
    []
  )

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#008973] text-white text-lg">👁</div>
          <span className="text-2xl font-extrabold text-slate-900">EyeSense</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {sectionLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                active === link.id ? "text-[#008973]" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/scan"
            className="hidden rounded-lg bg-[#008973] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#006e63] md:inline-flex"
          >
            Start Screening
          </Link>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md border border-slate-200 p-2 text-slate-700 md:hidden"
            aria-label="Toggle menu"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="space-y-2 px-4 py-3">
            {sectionLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2 text-base font-medium ${
                  active === link.id ? "bg-emerald-100 text-[#008973]" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/scan"
              className="block rounded-lg bg-[#008973] px-3 py-2 text-base font-bold text-white hover:bg-[#006e63]"
              onClick={() => setIsOpen(false)}
            >
              Start Screening
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
