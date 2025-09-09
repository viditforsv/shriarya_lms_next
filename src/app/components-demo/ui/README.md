# Component Library Structure

This directory contains all reusable UI components for the ShriArya LMS platform, organized by category for better maintainability and scalability.

## 📁 Directory Structure

```
src/app/components-demo/ui/
├── course-components/           # Course-specific components
│   ├── mcq-question.tsx        # Multiple Choice Questions
│   └── index.ts               # Course component exports
├── layout-components/           # Layout & navigation
│   ├── sidebar.tsx            # Generic sidebar
│   ├── collapsible-sidebar.tsx # Collapsible sidebar
│   ├── lesson-right-sidebar.tsx # Right sidebar for lessons
│   ├── course-sidebar.tsx     # Course navigation sidebar
│   └── index.ts               # Layout component exports
├── form-components/             # Forms & inputs
│   ├── SignInForm.tsx         # Authentication forms
│   ├── SignUpForm.tsx         # User registration forms
│   └── index.ts               # Form component exports
├── ui-components/               # Basic UI elements
│   ├── button.tsx             # Button component
│   ├── card.tsx               # Card component
│   ├── badge.tsx               # Badge component
│   ├── input.tsx               # Input component
│   ├── label.tsx               # Label component
│   ├── progress.tsx            # Progress bar
│   └── index.ts                # UI component exports
└── index.ts                    # Main exports
```

## 🎯 Component Categories

### Course Components

Components specifically designed for educational content and course management:

- **MCQ Questions**: Interactive multiple choice questions with feedback
- **Quiz Builder**: (Future) Tool for creating quizzes
- **Lesson Player**: (Future) Video/content player
- **Progress Tracker**: (Future) Student progress visualization

### Layout Components

Components for page structure and navigation:

- **Sidebars**: Various sidebar implementations
- **Headers**: (Future) Page headers
- **Footers**: (Future) Page footers
- **Navigation**: (Future) Main navigation components

### Form Components

Components for user input and data collection:

- **Authentication**: Sign in/up forms
- **Course Creation**: (Future) Course builder forms
- **Profile Management**: (Future) User profile forms

### UI Components

Basic reusable interface elements:

- **Buttons**: Various button styles and states
- **Cards**: Content containers
- **Badges**: Status indicators
- **Inputs**: Form input elements
- **Progress**: Progress indicators

## 📦 Import Strategy

### Category-based Imports

```typescript
// Import from specific categories
import { MCQQuestion } from "@/app/components-demo/ui/course-components";
import { Sidebar } from "@/app/components-demo/ui/layout-components";
import { SignInForm } from "@/app/components-demo/ui/form-components";
import { Button } from "@/app/components-demo/ui/ui-components";
```

### Main Library Import

```typescript
// Import everything from main index
import {
  MCQQuestion,
  Sidebar,
  SignInForm,
  Button,
} from "@/app/components-demo/ui";
```

## 🚀 Adding New Components

### 1. Choose the Right Category

- **Course Components**: Educational content, assessments, learning tools
- **Layout Components**: Page structure, navigation, sidebars
- **Form Components**: User input, data collection, validation
- **UI Components**: Basic interface elements, buttons, cards

### 2. Create the Component

```typescript
// src/app/components-demo/ui/course-components/new-component.tsx
"use client";

interface NewComponentProps {
  // Define props
}

export function NewComponent({ ...props }: NewComponentProps) {
  // Component implementation
}
```

### 3. Export from Category Index

```typescript
// src/app/components-demo/ui/course-components/index.ts
export { NewComponent } from "./new-component";
```

### 4. Update Main Index (if needed)

```typescript
// src/app/components-demo/ui/index.ts
export * from "./course-components"; // Already includes new component
```

## 🎨 Naming Conventions

- **Course Components**: `Course[ComponentName]` or descriptive names
- **Layout Components**: `[Purpose]Sidebar`, `[Purpose]Layout`
- **Form Components**: `[Action]Form` (e.g., `SignInForm`, `CreateCourseForm`)
- **UI Components**: Simple descriptive names (e.g., `Button`, `Card`)

## 🔧 Maintenance

- Keep components focused on single responsibility
- Use TypeScript interfaces for props
- Follow consistent styling patterns
- Document component usage and examples
- Update index files when adding/removing components
