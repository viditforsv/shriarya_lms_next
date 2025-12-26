# Design System

This directory contains all centralized design system files for the `app` (website).

## Structure

```
design-system/
├── globals.css          # Design tokens, CSS variables, base styles
└── components/          # Shared React components
    ├── ui/              # shadcn/ui base components
    ├── header.tsx       # Navigation header
    ├── footer.tsx       # Site footer
    ├── logo.tsx         # Brand logo
    └── ...
```

## Contents

### `globals.css`
The main CSS file containing:
- **Design Tokens**: Preppeo brand colors, spacing, typography
- **CSS Variables**: All theme variables (light/dark mode)
- **Base Styles**: Typography, layout, and utility classes
- **Tailwind Configuration**: Theme customization

### `components/`
All shared React components including:
- **UI Components**: Button, Card, Input, Dialog, etc. (shadcn/ui)
- **Brand Components**: Logo, MascotVideo
- **Layout Components**: Header, Footer
- **Utility Components**: WhatsAppWidget, StructuredData, etc.

## Usage

### Importing CSS
The app imports the design system CSS in its layout file:

```tsx
// app/layout.tsx
import "@/design-system/globals.css";
```

### Importing Components
Import components using the design-system path:

```tsx
// UI components
import { Button } from "@/design-system/components/ui/button";
import { Card } from "@/design-system/components/ui/card";

// Brand components
import { Logo } from "@/design-system/components/logo";
import { MascotVideo } from "@/design-system/components/mascot-video";

// Layout components
import { Header } from "@/design-system/components/header";
import { Footer } from "@/design-system/components/footer";
```

## Design Tokens

### Colors
- **Primary**: `#003153` (Dark Navy)
- **Success**: `#3bb273` (Green)
- **Accent**: `#f4b400` (Amber)
- **Destructive**: `#dc2626` (Red)

### Typography
- **Font Family**: Inter
- **Headings**: Bold (700) with specific sizes
- **Body**: Regular (400) at 16px base

### Spacing
- Uses Tailwind's spacing scale
- Consistent padding/margin patterns

## Card Component Standards

**All cards MUST use the following standard styling:**

```tsx
<Card className="border-2 hover:border-primary/50 transition-colors">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Required Classes
- `border-2` - Standard border width (2px)
- `hover:border-primary/50` - Hover effect (border color change)
- `transition-colors` - Smooth color transition

### DO NOT Use
- ❌ `hover:shadow-md` (use border hover instead)
- ❌ Custom padding overrides like `pt-6 pb-6` (use CardHeader/CardContent defaults)
- ❌ Different border widths (`border`, `border-4`, etc.)
- ❌ Shadow-based hover effects

### Standard Card Structure
1. **Card wrapper** with `border-2 hover:border-primary/50 transition-colors`
2. **CardHeader** for title and description
3. **CardContent** for main content
4. **CardFooter** (optional) for actions

This ensures visual consistency across the application.

### Button & Badge Standards

**All buttons and badges with `variant="outline"` use `border-2`:**

```tsx
// Buttons
<Button variant="outline">Button Text</Button>

// Badges
<Badge variant="outline">Badge Text</Badge>
```

**Required:**
- `border-2` - Standard border width (2px) for all outline variants
- Consistent with card border styling

## Updating the Design System

1. Edit files in this directory
2. Changes automatically apply to the app
3. Restart dev server if needed

## Related Files

- `design-system/components/` - UI components using these design tokens
- `components.json` - shadcn/ui configuration pointing to this CSS

