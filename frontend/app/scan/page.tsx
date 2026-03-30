"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ScanPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
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
    setAnalysisProgress(0)
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + Math.random() * 30
      })
    }, 200)

    setTimeout(() => {
      setAnalysisProgress(100)
      setIsAnalyzing(false)
      clearInterval(interval)
      sessionStorage.setItem("eyeImage", selectedFile)
      router.push("/results")
    }, 1200)
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-80px)] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-extrabold text-slate-900 animate-scaleIn">Eye Health Screening</h1>
          <Link href="/" className="text-slate-600 hover:text-slate-900 font-semibold transition-colors">← Back to Home</Link>
        </div>

        <p className="text-lg text-slate-600 mb-8">Upload or capture an image of your eye for AI analysis.</p>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <section className="space-y-4">
            {selectedFile ? (
              <>
                <div className="overflow-hidden rounded-xl border border-slate-200 shadow-md animate-scaleIn">
                  <img src={selectedFile} alt="Selected eye" className="h-80 w-full object-cover" />
                </div>
                
                {isAnalyzing && (
                  <div className="rounded-lg bg-gradient-to-r from-slate-50 to-emerald-50 p-4 border border-slate-200 shadow-sm animate-fadeInUp">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-700">AI Analysis in Progress</p>
                      <span className="text-sm font-semibold text-emerald-600 tabular-nums">{Math.round(analysisProgress)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${analysisProgress}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-3">Scanning for conditions...</p>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-3 stagger-item">
                  <button
                    onClick={() => setSelectedFile(null)}
                    disabled={isAnalyzing}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Choose Different Image
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-2 text-white font-semibold hover:shadow-lg transform transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Image"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <label className="flex min-h-[240px] items-center justify-center rounded-xl border-dashed border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-emerald-50 p-8 text-center hover:border-emerald-400 hover:from-emerald-50 hover:to-emerald-100 transition-all duration-300 cursor-pointer group">
                <div className="transform group-hover:scale-110 transition-transform">
                  <div className="mb-3 text-5xl animate-float">👁️</div>
                  <p className="text-xl font-semibold text-slate-700">Click to upload an eye image</p>
                  <p className="text-xs text-slate-500 mt-1">or drag and drop</p>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
              </label>
            )}
          </section>

          <aside className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold animate-pulse-glow">✓</div>
              <h2 className="text-xl font-bold text-slate-900">Tips for Best Results</h2>
            </div>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-700">
              <li className="text-sm stagger-item">Ensure good lighting - natural light works best</li>
              <li className="text-sm stagger-item">Keep your eye wide open and look straight at the camera</li>
              <li className="text-sm stagger-item">Position your eye to fill most of the frame</li>
              <li className="text-sm stagger-item">Avoid using flash as it can cause glare</li>
              <li className="text-sm stagger-item">Make sure the image is in focus and not blurry</li>
            </ol>
            
            <div className="mt-6 pt-6 border-t border-emerald-200 stagger-item" style={{ animationDelay: '0.5s' }}>
              <h3 className="font-semibold text-slate-900 text-sm mb-3">Image Requirements</h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 hover:text-emerald-600 transition-colors">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Format: JPEG, PNG, or WebP</span>
                </div>
                <div className="flex items-center gap-2 hover:text-emerald-600 transition-colors">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Size: Up to 10MB</span>
                </div>
                <div className="flex items-center gap-2 hover:text-emerald-600 transition-colors">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Resolution: 800x600px or higher</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
