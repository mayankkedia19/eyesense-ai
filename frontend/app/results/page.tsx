"use client"

import {
  Eye,
  Download,
  Share2,
  AlertTriangle,
  CheckCircle,
  Info,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Activity,
  Heart,
  Droplets,
  Sun,
} from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// ── Types ──────────────────────────────────────────────────────────────────────
interface Condition {
  name: string
  description: string
  risk: number
  status: string
  details: string
}

interface AnalysisData {
  overallScore: number
  overallStatus: string
  analyzedAt?: string
  conditions: Condition[]
  recommendations: string[]
}

// ── Icon map — maps condition name to a lucide icon ────────────────────────────
const conditionIconMap: Record<string, React.ElementType> = {
  Anemia: Droplets,
  Jaundice: Sun,
  Cataract: Eye,
  "Eye Infection": Activity,
  Glaucoma: Eye,
  "Macular Degeneration": Eye,
}

function getConditionIcon(name: string): React.ElementType {
  return conditionIconMap[name] ?? Activity
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function getRiskColor(risk: number): string {
  if (risk <= 20) return "text-green-600"
  if (risk <= 50) return "text-yellow-500"
  return "text-red-600"
}

function getRiskBgColor(risk: number): string {
  if (risk <= 20) return "bg-green-500"
  if (risk <= 50) return "bg-yellow-400"
  return "bg-red-500"
}

function getOverallStatusColor(status: string): string {
  if (["Good", "Excellent"].includes(status)) return "text-green-600"
  if (["Fair", "Moderate"].includes(status)) return "text-yellow-500"
  return "text-red-600"
}

function getStatusIcon(risk: number) {
  if (risk <= 20) return CheckCircle2
  if (risk <= 50) return AlertTriangle
  return XCircle
}

// ── Normalize backend response ─────────────────────────────────────────────────
function normalizeResult(raw: any): AnalysisData | null {
  if (!raw) return null
  const payload = raw.data ?? raw.result ?? raw
  if (!payload || typeof payload !== "object") return null

  return {
    overallScore: payload.overallScore ?? payload.overall_score ?? payload.score ?? 0,
    overallStatus: payload.overallStatus ?? payload.overall_status ?? payload.status ?? "Unknown",
    analyzedAt: payload.analyzedAt ?? new Date().toLocaleString(),
    conditions: Array.isArray(payload.conditions) ? payload.conditions : [],
    recommendations: Array.isArray(payload.recommendations) ? payload.recommendations : [],
  }
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ResultsPage() {
  // ✅ FIX 1: useState is now INSIDE the component (was outside before — fatal error)
  const [eyeImage, setEyeImage] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [parseError, setParseError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)

    const storedImage = sessionStorage.getItem("eyeImage")
    if (storedImage) setEyeImage(storedImage)

    // ✅ FIX 2: Real result is now normalized and stored in state, then used in UI
    const storedResult = sessionStorage.getItem("analysisResult")
    if (storedResult) {
      try {
        const parsed = JSON.parse(storedResult)
        const normalized = normalizeResult(parsed)
        if (normalized) setResult(normalized)
        else setParseError(true)
      } catch {
        setParseError(true)
      }
    } else {
      setParseError(true)
    }

    return () => clearTimeout(timer)
  }, [])

  // ── Download handler ─────────────────────────────────────────────────────────
  // ✅ FIX 3: Download button now works
  function handleDownload() {
    if (!result) return
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "eye-health-report.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── Share handler ────────────────────────────────────────────────────────────
  // ✅ FIX 4: Share button now works
  async function handleShare() {
    if (!result) return
    const text = `Eye Health Score: ${result.overallScore}/100 — ${result.overallStatus}`
    if (navigator.share) {
      await navigator.share({ title: "My Eye Health Results", text })
    } else {
      await navigator.clipboard.writeText(text)
      alert("Results copied to clipboard!")
    }
  }

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-primary/10">
            <Eye className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    )
  }

  // ── No Result / Error ────────────────────────────────────────────────────────
  if (parseError || !result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <XCircle className="h-12 w-12 text-red-500" />
        <h2 className="text-xl font-bold">No Results Found</h2>
        <p className="text-muted-foreground">
          {parseError
            ? "Could not read analysis results. The backend may not have returned data."
            : "Please complete a scan first."}
        </p>
        <Link href="/scan">
          <Button className="mt-2 bg-emerald-600 hover:bg-emerald-700">
            <RefreshCw className="mr-2 h-4 w-4" />
            Go to Scan
          </Button>
        </Link>
      </div>
    )
  }

  // ── Main UI ──────────────────────────────────────────────────────────────────
  // ✅ FIX 5: Everything now uses `result` (real data) instead of `mockResults`
  return (
    <div className="min-h-screen bg-background">
      <main className="px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Your Eye Health Results
            </h1>
            {/* ✅ FIX 6: Shows real analyzedAt from result, not hardcoded mockResults */}
            <p className="mt-2 text-muted-foreground">
              Analysis completed on {result.analyzedAt ?? new Date().toLocaleString()}
            </p>
          </div>

          {/* Eye Image */}
          {eyeImage && (
            <div className="mb-6 overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={eyeImage} alt="Scanned eye" className="h-64 w-full object-cover" />
            </div>
          )}

          {/* Overall Score */}
          <Card className="mb-6 border-border">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2">

                {/* Score Circle */}
                <div className="flex flex-col items-center justify-center bg-card p-8">
                  <div className="relative h-48 w-48">
                    <svg className="h-full w-full -rotate-90">
                      <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted" />
                      <circle
                        cx="96" cy="96" r="88"
                        stroke="currentColor" strokeWidth="8" fill="none"
                        strokeDasharray={`${(result.overallScore / 100) * 552} 552`}
                        className={`${getRiskColor(100 - result.overallScore)} transition-all duration-700`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-foreground">{result.overallScore}</span>
                      <span className="text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`text-2xl font-semibold ${getOverallStatusColor(result.overallStatus)}`}>
                      {result.overallStatus}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">Eye Health Status</p>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="flex flex-col justify-center p-8">
                  <div className="rounded-xl bg-background p-6">
                    <div className="mb-6 flex items-start gap-3">
                      <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">Important Disclaimer</h3>
                        <p className="text-sm text-muted-foreground">
                          This analysis is for preliminary screening only and does not replace professional
                          medical advice. Please consult a qualified healthcare professional for diagnosis.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-primary" />
                        <span className="text-sm text-foreground">Image analyzed using AI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-foreground">Analysis complete</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Conditions */}
          {result.conditions.length > 0 ? (
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold text-foreground">Detailed Assessment</h2>

              {result.conditions.map((condition, index) => {
                const StatusIcon = getStatusIcon(condition.risk)
                const ConditionIcon = getConditionIcon(condition.name)
                return (
                  <Card key={index} className="border-border">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <ConditionIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{condition.name}</CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">{condition.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <StatusIcon className={`h-5 w-5 ${getRiskColor(condition.risk)}`} />
                            <span className={`text-lg font-bold ${getRiskColor(condition.risk)}`}>
                              {condition.risk}%
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{condition.status}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Colored progress bar */}
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${getRiskBgColor(condition.risk)}`}
                          style={{ width: `${Math.min(condition.risk, 100)}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{condition.details}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="border-border">
              <CardContent className="p-6 text-center text-muted-foreground">
                No detailed condition data was returned from the server.
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <Card className="mt-6 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-500" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-sm text-muted-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/scan" className="flex-1">
              <Button size="lg" className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <RefreshCw className="h-5 w-5" />
                New Scan
              </Button>
            </Link>
            {/* ✅ FIX 7: Download and Share now have onClick handlers */}
            <Button
              size="lg"
              variant="outline"
              onClick={handleDownload}
              className="flex-1 gap-2 border-border text-foreground hover:bg-muted"
            >
              <Download className="h-5 w-5" />
              Download Report
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleShare}
              className="flex-1 gap-2 border-border text-foreground hover:bg-muted"
            >
              <Share2 className="h-5 w-5" />
              Share Results
            </Button>
          </div>

        </div>
      </main>
    </div>
  )
}