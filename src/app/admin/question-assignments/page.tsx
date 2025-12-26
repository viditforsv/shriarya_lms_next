"use client";

import QuestionAssignmentManager from "@/components/QuestionAssignmentManager";
import BulkAssignmentManager from "@/components/BulkAssignmentManager";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design-system/components/tabs";

export default function QuestionAssignmentsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Admin", href: "/admin/site-administration" },
            { label: "Question Assignments", isActive: true },
          ]}
        />
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Question Assignment Management</h1>
        <p className="text-muted-foreground mt-2">
          Assign questions to content managers for editing, review, or approval
        </p>
      </div>

      <Tabs defaultValue="bulk" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bulk">Bulk Assignment</TabsTrigger>
          <TabsTrigger value="individual">Individual Assignment</TabsTrigger>
        </TabsList>

        <TabsContent value="bulk">
          <BulkAssignmentManager />
        </TabsContent>

        <TabsContent value="individual">
          <QuestionAssignmentManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
