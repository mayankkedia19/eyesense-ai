import Link from "next/link"
import { Particles } from "@/components/Particles"

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-600">AI-Powered Smartphone Screening</p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Early Eye Disease Detection with <span className="text-emerald-600">AI Technology</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-600">
              Transform your smartphone into a preliminary diagnostic tool. EyeSense uses advanced AI to analyze eye images and detect potential health conditions early.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/scan"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transform transition-transform hover:scale-105"
              >
                Start Free Scan
              </Link>
              <a
                href="#features"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Learn More
              </a>
            </div>
            <div className="mt-6 flex gap-4 text-sm font-semibold text-emerald-600">
              <span className="rounded-full bg-emerald-50 px-3 py-1">✓ Free to use</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1">✓ No signup required</span>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
              <div className="mx-auto flex h-48 w-48 items-center justify-center">
                <img src="/logo-1-eye-scan.svg" alt="EyeSense Logo" className="h-48 w-48" />
              </div>
              <p className="mt-6 text-center text-sm font-bold text-slate-900">EyeSense Branding</p>
              <h3 className="mt-2 text-center text-4xl font-extrabold text-emerald-700">AI Vision</h3>
              <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-4 text-center text-xs font-semibold text-slate-700">
                Deep learning eye-screening for early detection and actionable insights
              </div>
            </div>
          </div>
        </div>

        <div id="features" className="grid gap-6 lg:grid-cols-4">
          {[
            { title: "Multi-Disease Detection", copy: "Screen for anemia, glaucoma, cataracts, and more conditions from a single image" },
            { title: "Real-Time Analysis", copy: "AI powered instant analysis with detailed risk assessment" },
            { title: "Early Warning Alerts", copy: "Get notified about potential abnormalities before they become serious" },
            { title: "Health Tracking", copy: "Maintain history of scans to track changes and trends over time" },
          ].map((item) => (
            <article key={item.title} className="stagger-item rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-slate-600">{item.copy}</p>
            </article>
          ))}
        </div>

        <section id="conditions" className="relative mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm overflow-hidden">
          <div className="particle-container absolute inset-0 pointer-events-none">
            <Particles count={15} color="rgba(16, 185, 129, 0.1)" size={2} speed={1} />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-extrabold text-slate-900">Detect Multiple Conditions from a Single Scan</h2>
            <p className="mt-2 text-slate-600">Our AI analyzes several eye indicators to screen for conditions quickly and confidently.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { title: "Anemia", desc: "Conjunctiva color analysis detects blood-related deficiencies." },
                { title: "Glaucoma", desc: "Optic nerve analysis detects elevated intraocular pressure patterns." },
                { title: "Cataract", desc: "Lens opacity patterns are evaluated for early cataract risk." },
                { title: "& Many More", desc: "Comprehensive AI screening for additional eye conditions and abnormalities." },
              ].map((card) => (
                <div key={card.title} className="stagger-item rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-emerald-300 transition-all">
                  <h3 className="font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-1 text-slate-600">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mt-10 rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-8 shadow-sm">
          <h2 className="text-3xl font-extrabold text-slate-900">How EyeSense Works</h2>
          <p className="mt-3 text-slate-600">Get your eye health assessment in three simple steps</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { step: "01", label: "Capture Image", detail: "Take a clear shot of your eye using your smartphone or upload existing photo" },
              { step: "02", label: "AI Analysis", detail: "Advanced AI analyzes the image for health indicators and abnormalities" },
              { step: "03", label: "Get Results", detail: "Receive a detailed health score and recommendations within seconds" },
            ].map((item) => (
              <div key={item.step} className="stagger-item group rounded-xl border border-slate-200 p-6 text-center bg-white hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white hover:shadow-lg transition-all">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white flex items-center justify-center font-bold group-hover:scale-110 transition-transform">{item.step}</div>
                <h3 className="text-xl font-bold text-slate-900">{item.label}</h3>
                <p className="mt-2 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/scan" className="inline-flex rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transform transition-transform hover:scale-105">
              Get Started Free
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}
