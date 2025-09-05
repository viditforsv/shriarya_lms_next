'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Play, FileText, Download, Clock, CheckCircle, BookOpen } from "lucide-react"
import { Button } from "@/app/components-demo/ui/button"
import { Badge } from "@/app/components-demo/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/card"

export default function RealNumbersIntroTestPage() {
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'practice'>('notes')
  const [isCompleted, setIsCompleted] = useState(false)
  const [pdfViewerReady, setPdfViewerReady] = useState(false)

  const handleMarkComplete = () => {
    setIsCompleted(true)
  }

  // Disable right-click on the page
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    return false
  }

  // Initialize Adobe PDF Embed API
  useEffect(() => {
    // Load Adobe PDF Embed API script
    const script = document.createElement('script')
    script.src = 'https://acrobatservices.adobe.com/view-sdk/viewer.js'
    script.async = true
    document.head.appendChild(script)

    // Initialize viewer when script is loaded
    script.onload = () => {
      document.addEventListener("adobe_dc_view_sdk.ready", function() {
        setPdfViewerReady(true)
        
        if (window.AdobeDC) {
          const adobeDCView = new window.AdobeDC.View({
            clientId: "5cbce8a79d014658854c05273a5b7514", 
            divId: "adobe-dc-view"
          })
          
          adobeDCView.previewFile({
            content: {
              location: {
                url: "https://www.torontomu.ca/sciencerendezvous/SR2021/A_Brief_Introduction_To_AI.pdf"
              }
            },
            metaData: {
              fileName: "IBDP_aahl_2021_tz0_nov_paper1_Solutions by Shrividhya Classes"
            }
          }, {
            showAnnotationTools: false, 
            showDownloadPDF: false, 
            showPrintPDF: false
          })
        }
      })
    }

    return () => {
      // Cleanup script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background" onContextMenu={handleContextMenu}>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Link 
            href="/courses/cbse/mathematics/class-10" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Lesson Header */}
            <div className="bg-white rounded-sm border border-[#feefea] p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-[#e27447] text-white mb-2">
                    Lesson 1
                  </Badge>
                  <h1 className="text-2xl font-bold text-[#1e293b] mb-2">
                    Introduction to Real Numbers
                  </h1>
                  <p className="text-muted-foreground">
                    Learn the fundamental concepts of real numbers, including rational and irrational numbers.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">30 min</span>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="bg-white rounded-sm border border-[#feefea] mb-6">
              <div className="border-b border-[#feefea]">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'video'
                        ? 'border-[#e27447] text-[#e27447]'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Play className="w-4 h-4 inline mr-2" />
                    Video
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'notes'
                        ? 'border-[#e27447] text-[#e27447]'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <FileText className="w-4 h-4 inline mr-2" />
                    Notes
                  </button>
                  <button
                    onClick={() => setActiveTab('practice')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'practice'
                        ? 'border-[#e27447] text-[#e27447]'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Practice
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'video' && (
                  <div>
                    <div className="text-center py-12">
                      <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Video content will be available soon</p>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div>
                    <div className="prose max-w-none">
                      <h3>Lesson Notes</h3>
                      <p>Real numbers are the foundation of mathematics. They include all rational and irrational numbers.</p>
                      
                      <h4>Key Concepts:</h4>
                      <ul>
                        <li>Real numbers include all rational and irrational numbers</li>
                        <li>Every real number can be represented on the number line</li>
                        <li>Real numbers are closed under addition, subtraction, multiplication, and division</li>
                      </ul>
                      
                      <h4>Important Formulas:</h4>
                      <ul>
                        <li>For any two positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 &le; r &lt; b</li>
                      </ul>
                    </div>

                    {/* Test PDF File */}
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Previous Year Questions:</h4>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-3 rounded-sm">
                          <div className="flex items-center mb-3">
                            <FileText className="w-4 h-4 text-[#e27447] mr-2" />
                            <span className="text-sm font-medium">IBDP Maths PYQs Marking Scheme - AAHL November 2021 Paper 1 TZ0</span>
                          </div>
                          
                          {/* Adobe PDF Embed API Viewer */}
                          <div className="w-full h-96 border border-gray-200 rounded-sm overflow-hidden">
                            <div id="adobe-dc-view" className="w-full h-full"></div>
                          </div>
                          
                          <div className="mt-3 text-xs text-gray-500">
                            <p>• Secure PDF viewing with Adobe PDF Embed API</p>
                            <p>• Download and print options are disabled</p>
                            <p>• Professional-grade content protection</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'practice' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Practice Problems</h3>
                    
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Question 1</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-3">Use Euclid&apos;s division algorithm to find the HCF of 135 and 225.</p>
                          <div className="bg-gray-50 p-3 rounded-sm">
                            <p className="text-sm text-muted-foreground">Solution:</p>
                            <p className="text-sm">225 = 135 × 1 + 90</p>
                            <p className="text-sm">135 = 90 × 1 + 45</p>
                            <p className="text-sm">90 = 45 × 2 + 0</p>
                            <p className="text-sm font-medium">Therefore, HCF(135, 225) = 45</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Question 2</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-3">Show that any positive odd integer is of the form 6q + 1, or 6q + 3, or 6q + 5, where q is some integer.</p>
                          <Button variant="outline" size="sm">View Solution</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mark Complete Button */}
            <div className="text-center">
              <Button 
                onClick={handleMarkComplete}
                disabled={isCompleted}
                className="bg-[#e27447] hover:bg-[#e27447]/90"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-lg">Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#e27447] h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>• 15 of 59 lessons completed</p>
                    <p>• Current chapter: Real Numbers</p>
                    <p>• Next lesson: Euclid&apos;s Division Lemma</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
