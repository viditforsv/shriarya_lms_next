"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Users2 } from "lucide-react"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function CoursesPage() {
  const curricula = [
    {
      id: "cbse",
      name: "CBSE",
      fullName: "Central Board of Secondary Education",
      description: "Indian national curriculum with comprehensive subject coverage and practical applications",
      color: "bg-[#1e293b]",
      logo: "/images/CBSE Logo.svg",
      subjects: ["Mathematics", "Science", "English", "Social Studies", "Computer Science"],
      href: "/courses/cbse",
      features: ["Board Exam Focus", "Practical Applications", "Comprehensive Coverage"],
      students: "50K+",
      duration: "4 Years"
    },
    {
      id: "icse-isc",
      name: "ICSE/ISC",
      fullName: "Indian Certificate of Secondary Education / Indian School Certificate",
      description: "Rigorous curriculum with emphasis on analytical thinking, comprehensive learning, and advanced specialized subjects",
      color: "bg-[#1e293b]",
      logo: "/images/ICSE Logo.svg",
      subjects: ["Mathematics", "Science", "English Literature", "History", "Geography", "Physics", "Chemistry", "Biology"],
      href: "/courses/icse",
      features: ["Analytical Thinking", "Problem Solving", "Concept Clarity", "Advanced Concepts", "Specialized Focus"],
      students: "60K+",
      duration: "4 Years"
    },
    {
      id: "ibdp",
      name: "IBDP",
      fullName: "International Baccalaureate Diploma Programme",
      description: "Global curriculum with specialized subject groups for different learning goals",
      color: "bg-[#e27447]",
      logo: "/images/IBDP Logo.svg",
      subjects: ["Group 1: Language & Literature", "Group 2: Language Acquisition", "Group 3: Individuals & Societies", "Group 4: Sciences", "Group 5: Mathematics", "Group 6: Arts"],
      href: "/courses/ibdp",
      features: ["Global Recognition", "Six Subject Groups", "International Standards", "University Preparation"],
      students: "20K+",
      duration: "2 Years"
    },
    {
      id: "igcse",
      name: "IGCSE",
      fullName: "International General Certificate of Secondary Education",
      description: "International curriculum with Cambridge standards across multiple subjects",
      color: "bg-[#1e293b]",
      logo: "/images/IGCSE Logo.svg",
      subjects: ["Mathematics", "English", "Sciences", "Languages", "Humanities", "Creative Arts"],
      href: "/courses/igcse",
      features: ["Cambridge Standards", "International Focus", "University Preparation"],
      students: "30K+",
      duration: "4 Years"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#feefea] via-[#fffefd] to-[#feefea] border-b border-[#feefea]">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-[#1e293b] mb-6 leading-tight">
              Choose Your
              <span className="text-[#e27447] block">Educational Board</span>
            </h1>
            <p className="text-xl text-[#1e293b] mb-8 leading-relaxed">
              Select from leading Indian and international curricula including CBSE, ICSE/ISC, IBDP, and IGCSE. 
              Each board offers comprehensive subject coverage designed to prepare you for academic success.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[#1e293b]">
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4" />
                <span>160K+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Curriculum Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {curricula.map((curriculum) => (
            <Link key={curriculum.id} href={curriculum.href}>
              <Card className="group hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#feefea] hover:border-[#e27447]">
                <CardHeader className="pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${curriculum.color} p-4 rounded-sm group-hover:scale-110 transition-transform duration-300 shadow-lg min-w-[80px] min-h-[80px] flex items-center justify-center bg-white`}>
                      <Image 
                        src={curriculum.logo} 
                        alt={`${curriculum.name} Logo`}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-[#e27447] transition-colors">
                      {curriculum.name}
                    </CardTitle>
                    <CardDescription className="text-base text-[#1e293b] mb-3">
                      {curriculum.fullName}
                    </CardDescription>
                    <p className="text-sm text-[#1e293b] leading-relaxed">
                      {curriculum.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-[#1e293b]">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {curriculum.features.map((feature, index) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="text-xs px-2 py-1 bg-[#fffefd] border-[#feefea] text-[#1e293b]"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-[#1e293b]">Available Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {curriculum.subjects.slice(0, 3).map((subject, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-[#e27447]/10 text-[#e27447] px-3 py-1 rounded-sm font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                      {curriculum.subjects.length > 3 && (
                        <span className="text-xs bg-[#e27447]/10 text-[#e27447] px-3 py-1 rounded-sm font-medium">
                          +{curriculum.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#feefea]">
                    <div className="flex items-center gap-4 text-sm text-[#1e293b]">
                      <div className="flex items-center gap-1">
                        <Users2 className="w-4 h-4" />
                        <span>{curriculum.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{curriculum.duration}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="group-hover:bg-[#e27447] group-hover:text-white group-hover:border-[#e27447] transition-all duration-300"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Course Structure Overview */}
        <div className="bg-white p-12 rounded-sm border border-[#feefea] shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e293b] mb-4">Comprehensive Learning Structure</h2>
            <p className="text-lg text-[#1e293b] max-w-2xl mx-auto">
              Our curriculum structure is designed to provide progressive learning experiences 
              that build upon previous knowledge and prepare students for future challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#1e293b] mb-6">Indian Curricula</h3>
              <div className="space-y-4">
                {[
                  { name: "CBSE", desc: "National curriculum with practical applications and board exam focus" },
                  { name: "ICSE/ISC", desc: "Comprehensive education emphasizing analytical thinking, problem-solving, and advanced specialized subjects" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-[#fffefd] rounded-sm border border-[#feefea]">
                    <div className="w-3 h-3 bg-[#e27447] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-[#1e293b] mb-1">{item.name}</h4>
                      <p className="text-sm text-[#1e293b]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#1e293b] mb-6">International Curricula</h3>
              <div className="space-y-4">
                {[
                  { name: "IBDP", desc: "Global diploma programme with six subject groups and international recognition" },
                  { name: "IGCSE", desc: "Cambridge international standards preparing students for university-level studies" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-[#fffefd] rounded-sm border border-[#feefea]">
                    <div className="w-3 h-3 bg-[#e27447] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-[#1e293b] mb-1">{item.name}</h4>
                      <p className="text-sm text-[#1e293b]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
