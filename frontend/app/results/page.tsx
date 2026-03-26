"use client"
import React from 'react'

import { 
  Eye, 
  ArrowLeft, 
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
  Sun
} from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Mock data for demonstration
const mockResults = {
  overallScore: 87,
  overallStatus: "Good",
  analyzedAt: new Date().toLocaleString(),
  conditions: [
    {
      name: "Anemia",
      description: "Based on conjunctiva color analysis",
      risk: 12,
      status: "Low Risk",
      icon: Droplets,
      details: "Conjunctiva appears healthy with normal pink coloration. No significant pallor detected.",
    },
    {
      name: "Jaundice",
      description: "Based on sclera yellowing analysis",
      risk: 8,
      status: "Low Risk",
      icon: Sun,
      details: "Sclera shows normal white coloration. No yellowing detected that would indicate elevated bilirubin levels.",
    },
    {
      name: "Cataract",
      description: "Based on lens opacity patterns",
      risk: 35,
      status: "Moderate",
      icon: Eye,
      details: "Mild opacity patterns detected. Consider scheduling an eye examination for further evaluation.",
    },
    {
      name: "Eye Infection",
      description: "Based on redness and vessel patterns",
      risk: 5,
      status: "Low Risk",
      icon: Activity,
      details: "No significant redness or abnormal vessel patterns detected. Eye surface appears healthy.",
    },
  ],
  recommendations: [
    "Schedule a routine eye examination within the next 6 months",
    "Maintain good lighting when reading or using screens",
    "Take regular breaks during prolonged screen time (20-20-20 rule)",
    "Ensure adequate hydration and nutrition rich in vitamins A and C",
  ],
}

function getRiskColor(risk: number) {
  if (risk <= 20) return "text-accent"
  if (risk <= 50) return "text-chart-3"
  return "text-destructive"
}

function getRiskBgColor(risk: number) {
  if (risk <= 20) return "bg-accent"
  if (risk <= 50) return "bg-chart-3"
  return "bg-destructive"
}

function getOverallStatusColor(status: string) {
  switch (status) {
    case "Good":
    case "Excellent":
      return "text-accent"
    case "Fair":
    case "Moderate":
      return "text-chart-3"
    default:
      return "text-destructive"
  }
}

function getStatusIcon(risk: number) {
  if (risk <= 20) return CheckCircle2
  if (risk <= 50) return AlertTriangle
  return XCircle
}

export default function ResultsPage() {
  const router = useRouter()
  const [eyeImage, setEyeImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Get the image from sessionStorage
    const storedImage = sessionStorage.getItem("eyeImage")
    if (storedImage) {
      setEyeImage(storedImage)
    }

    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Eye className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Your Eye Health Results
            </h1>
            <p className="mt-2 text-muted-foreground">
              Analysis completed on {mockResults.analyzedAt}
            </p>
          </div>

          {/* Overall Score */}
          <Card className="mb-6 border-border">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2">
                {/* Score Circle */}
                <div className="p-8 flex flex-col items-center justify-center bg-card">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(mockResults.overallScore / 100) * 552} 552`}
                        className={`${getRiskColor(100 - mockResults.overallScore)} transition-all`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-foreground">
                        {mockResults.overallScore}
                      </span>
                      <span className="text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`text-2xl font-semibold ${getOverallStatusColor(mockResults.overallStatus)}`}>
                      {mockResults.overallStatus}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">Eye Health Status</p>
                  </div>
                </div>

                {/* Assessment Details */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="bg-background rounded-xl p-6">
                    <div className="flex items-start gap-3 mb-6">
                      <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Important Disclaimer</h3>
                        <p className="text-sm text-muted-foreground">
                          This analysis is for preliminary screening only and does not replace professional medical advice. Please consult with a qualified healthcare professional for diagnosis and treatment.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">Image analyzed using AI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-sm text-foreground">Analysis complete and accurate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Condition Details */}
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold text-foreground">Detailed Assessment</h2>
            {mockResults.conditions.map((condition, index) => {
              const StatusIcon = getStatusIcon(condition.risk)
              return (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <condition.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{condition.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{condition.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <StatusIcon className={`w-5 h-5 ${getRiskColor(condition.risk)}`} />
                          <span className={`text-lg font-bold ${getRiskColor(condition.risk)}`}>
                            {condition.risk}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{condition.status}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={condition.risk} />
                    <p className="text-sm text-muted-foreground">{condition.details}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Recommendations */}
          <Card className="mt-6 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mockResults.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/scan" className="flex-1">
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <RefreshCw className="w-5 h-5" />
                New Scan
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="flex-1 gap-2 border-border text-foreground hover:bg-muted">
              <Download className="w-5 h-5" />
              Download Report
            </Button>
            <Button size="lg" variant="outline" className="flex-1 gap-2 border-border text-foreground hover:bg-muted">
              <Share2 className="w-5 h-5" />
              Share Results
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
