"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ScanPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const router = useRouter()

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedFile(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  function handleAnalyze() {
    if (!selectedFile) return
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      sessionStorage.setItem("eyeImage", selectedFile)
      router.push("/results")
    }, 1200)
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-80px)] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-extrabold text-slate-900">Eye Health Screening</h1>
          <Link href="/" className="text-slate-600 hover:text-slate-900 font-semibold">← Back to Home</Link>
        </div>

        <p className="text-lg text-slate-600 mb-8">Upload or capture an image of your eye for AI analysis.</p>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <section className="space-y-4">
            {selectedFile ? (
              <>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <img src={selectedFile} alt="Selected eye" className="h-80 w-full object-cover" />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Choose Different Image
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="rounded-xl bg-emerald-600 px-4 py-3 text-white font-semibold hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                  </button>
                </div>
              </>
            ) : (
              <label className="flex min-h-[240px] items-center justify-center rounded-xl border-dashed border-2 border-slate-300 bg-slate-50 p-8 text-center hover:border-emerald-400 hover:bg-slate-100">
                <div>
                  <p className="text-xl font-semibold text-slate-700">Click to upload an eye image</p>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
              </label>
            )}
          </section>

          <aside className="rounded-xl border border-emerald-100 bg-emerald-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">Tips for Best Results</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
              <li>Ensure good lighting - natural light works best</li>
              <li>Keep your eye wide open and look straight at the camera</li>
              <li>Position your eye to fill most of the frame</li>
              <li>Avoid using flash as it can cause glare</li>
              <li>Make sure the image is in focus and not blurry</li>
            </ol>
          </aside>
        </div>
      </div>
    </main>
  )
}
