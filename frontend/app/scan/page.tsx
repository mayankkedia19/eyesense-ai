"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ScanPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError(null)
    const file = event.target.files?.[0]
    if (!file) return

    const validTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPG, PNG, or WEBP).")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB.")
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === "string") setPreview(result)
    }
    reader.onerror = () => setError("Failed to read the file. Please try again.")
    reader.readAsDataURL(file)
  }

  async function handleAnalyze() {
    if (!selectedFile || !preview) return
    setIsAnalyzing(true)
    setError(null)

    try {
      // ✅ Build FormData — key must be "file" (matches FastAPI UploadFile param)
      const formData = new FormData()
      formData.append("file", selectedFile)

      // ✅ Calls /api/analyze → proxied to FastAPI at localhost:8000
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
        // ⚠️ Do NOT set Content-Type header — browser sets it automatically with boundary
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData?.detail || errData?.error || `Server error: ${response.status}`)
      }

      const result = await response.json()

      // ✅ Validate the response has data before navigating
      if (!result?.data) {
        throw new Error("Backend returned an empty response. Please try again.")
      }

      // ✅ Save to sessionStorage for results page
      sessionStorage.setItem("eyeImage", preview)
      sessionStorage.setItem("analysisResult", JSON.stringify(result))

      router.push("/results")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Analysis failed. Please try again."
      setError(message)
      setIsAnalyzing(false)
    }
  }

  function handleReset() {
    setSelectedFile(null)
    setPreview(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-80px)] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-extrabold text-slate-900">Eye Health Screening</h1>
          <Link href="/" className="font-semibold text-slate-600 hover:text-slate-900">
            ← Back to Home
          </Link>
        </div>

        <p className="mb-8 text-lg text-slate-600">
          Upload an image of your eye for AI-powered analysis.
        </p>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            ⚠️ {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">

          {/* Upload / Preview */}
          <section className="space-y-4">
            {preview ? (
              <>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Selected eye" className="h-80 w-full object-cover" />
                </div>

                {selectedFile && (
                  <p className="text-xs text-slate-500">
                    📁 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={isAnalyzing}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Choose Different Image
                  </button>
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="rounded-xl bg-emerald-600 px-6 py-2 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 transition-transform active:scale-95"
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Analyzing...
                      </span>
                    ) : (
                      "Analyze Image"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <label
                htmlFor="eye-upload"
                className="flex min-h-[240px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition-colors hover:border-emerald-400 hover:bg-emerald-50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
                  📷
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">Click to upload an eye image</p>
                  <p className="mt-1 text-sm text-slate-500">Supports JPG, PNG, WEBP · Max 10MB</p>
                </div>
                <input
                  id="eye-upload"
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </section>

          {/* Tips */}
          <aside className="rounded-xl border border-emerald-100 bg-emerald-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">Tips for Best Results</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
              <li>Ensure good lighting — natural light works best</li>
              <li>Keep your eye wide open and look straight at the camera</li>
              <li>Position your eye to fill most of the frame</li>
              <li>Avoid using flash as it can cause glare</li>
              <li>Make sure the image is in focus and not blurry</li>
            </ol>
            <div className="mt-6 rounded-lg border border-emerald-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Privacy Note</p>
              <p className="mt-1 text-sm text-slate-600">
                Your image is only used for analysis and not stored on any server.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </main>
  )
}