# Components Library

This directory contains all reusable components for both Preppeo.com website and LMS, shared via the design system.

## Structure

```
design-system/components/
├── ui/              # shadcn/ui base components
├── logo.tsx         # Preppeo logo component
├── mascot-video.tsx # Preppeo mascot video component
└── index.ts         # Central export file
```

## Usage

### Importing Components

You can import components from the central index file:

```tsx
import { Button, Card, Logo, MascotVideo } from "@/design-system/components"
```

Or import directly:

```tsx
import { Button } from "@/design-system/components/ui/button"
import { Logo } from "@/design-system/components/logo"
```

## UI Components (shadcn/ui)

All base UI components are located in `design-system/components/ui/`:

- **Button** - Button component with variants
- **Card** - Card container component
- **Input** - Input field component
- **Label** - Form label component
- **Textarea** - Textarea component
- **Select** - Select dropdown component
- **Dropdown Menu** - Dropdown menu component
- **Navigation Menu** - Navigation menu component
- **Avatar** - Avatar component
- **Badge** - Badge component
- **Separator** - Separator line component
- **Skeleton** - Loading skeleton component
- **Dialog** - Modal dialog component
- **Sheet** - Side sheet component
- **Sonner** - Toast notification component

## Preppeo-Specific Components

### Logo

Preppeo logo component with multiple variants and sizes.

```tsx
import { Logo } from "@/design-system/components"

// Basic usage
<Logo />

// With variants
<Logo variant="horizontal" size="lg" />
<Logo variant="mascot" size="md" />
<Logo variant="icon" size="sm" />

// Without background
<Logo showBackground={false} />
```

**Props:**
- `variant`: "color" | "horizontal" | "mascot" | "icon" (default: "color")
- `size`: "sm" | "md" | "lg" | "xl" (default: "md")
- `className`: Additional CSS classes
- `showBackground`: boolean (default: true)

### MascotVideo

Preppeo mascot animated video component.

```tsx
import { MascotVideo } from "@/design-system/components"

// Basic usage
<MascotVideo />

// With variant
<MascotVideo variant="celebration" />
<MascotVideo variant="explaining" />
<MascotVideo variant="thinking" />
```

**Props:**
- `variant`: "celebration" | "explaining" | "thinking" (default: "thinking")
- `className`: Additional CSS classes
- `autoplay`: boolean (default: true)
- `loop`: boolean (default: true)
- `muted`: boolean (default: true)

## Adding New Components

### Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

### Creating Custom Components

1. Create your component file in the appropriate directory
2. Export it from `design-system/components/index.ts`
3. Follow the existing component patterns
4. Use TypeScript for type safety
5. Use the `cn()` utility from `@/lib/utils` for className merging

## Best Practices

- Use the `cn()` utility for className merging
- Export all components from `design-system/components/index.ts` for easy imports
- Use TypeScript interfaces for props
- Follow the shadcn/ui component patterns
- Keep components focused and reusable
- Use Preppeo brand colors from CSS variables in `design-system/globals.css`

