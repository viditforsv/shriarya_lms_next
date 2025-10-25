"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Breadcrumb } from "@/app/components-demo/ui/breadcrumb";
import { Plus, Edit, Trash2, Eye, BookOpen, Settings } from "lucide-react";
import { CourseTemplate } from "@/types/course-templates";

export default function CourseTemplatesPage() {
  const [templates, setTemplates] = useState<CourseTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching templates...");
      const response = await fetch("/api/course-templates");
      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Templates data:", data);
        setTemplates(data.templates || []);
      } else {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        setError(`Failed to fetch templates: ${response.status}`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error fetching templates");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTemplate = () => {
    // TODO: Implement create template modal/page
    alert("Create template functionality coming soon!");
  };

  const handleViewTemplate = (templateId: string) => {
    // TODO: Implement view template modal/page
    alert(`View template ${templateId} functionality coming soon!`);
  };

  const handleEditTemplate = (templateId: string) => {
    // TODO: Implement edit template modal/page
    alert(`Edit template ${templateId} functionality coming soon!`);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    try {
      const response = await fetch(`/api/course-templates?id=${templateId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTemplates(templates.filter((t) => t.id !== templateId));
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete template");
      }
    } catch {
      alert("Error deleting template");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading templates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="space-y-2">
            <Button onClick={fetchTemplates}>Try Again</Button>
            <div className="text-sm text-muted-foreground">
              <p>If you&apos;re seeing this page, you may need to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Log in with an admin account</li>
                <li>Check your user permissions</li>
                <li>Contact your administrator</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Admin", href: "/admin/site-administration" },
              { label: "Course Templates", isActive: true },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
                Course Templates
              </h1>
              <p className="text-muted-foreground">
                Manage course templates for dynamic course creation
              </p>
            </div>
            <Button
              className="bg-[#e27447] hover:bg-[#d1653a]"
              onClick={handleCreateTemplate}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>
        </div>

        {/* Templates Grid */}
        {templates.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                Create your first course template to get started
              </p>
              <Button
                className="bg-[#e27447] hover:bg-[#d1653a]"
                onClick={handleCreateTemplate}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg line-clamp-2">
                      {template.name}
                    </CardTitle>
                    <Badge
                      variant={template.is_active ? "default" : "secondary"}
                    >
                      {template.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {template.description || "No description available"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Template Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{template.curriculum}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings className="w-4 h-4" />
                        <span>{template.subject}</span>
                      </div>
                    </div>

                    {/* Template Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Fields:</span>
                        <span className="font-medium ml-1">
                          {template.fields?.length || 0}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sections:</span>
                        <span className="font-medium ml-1">
                          {template.structure?.sections?.length || 0}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {template.curriculum}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {template.subject}
                      </Badge>
                      {template.grade && (
                        <Badge variant="outline" className="text-xs">
                          {template.grade}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewTemplate(template.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEditTemplate(template.id)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
