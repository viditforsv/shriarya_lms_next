# ShriArya LMS Design System

## Colors

- **Primary**: `#1e293b` (Dark Blue)
- **Accent**: `#e27447` (Orange)
- **White**: `#ffffff`
- **Cream**: `#feefea` (Borders/Backgrounds)
- **Pale**: `#fffefd` (Subtle backgrounds)

## Typography

- **Headings (h1, h2)**: Cardo font
- **Body (h3-h6, p)**: DM Sans font
- **Base size**: 16px
- **Border radius**: `rounded-sm` (2px) everywhere

## Components

### Button

```tsx
<Button variant="primary" size="default" showArrow>
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `coral`, `loadMore`, `destructive`
**Sizes**: `sm`, `default`, `lg`, `icon`
**Props**: `showArrow`, `showChevron`

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Badge

```tsx
<Badge variant="default">Label</Badge>
```

**Variants**: `default`, `secondary`, `destructive`, `outline`

## Layout

- **Container**: `max-w-6xl mx-auto px-8 py-8`
- **Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- **Spacing**: 4px, 8px, 16px, 24px increments

## Interactive States

- **Hover**: Scale, shadow, color transitions
- **Focus**: Ring with primary color
- **Transitions**: 200ms duration
- **Animations**: Arrow movements, chevron rotations

## Usage

- All borders use cream colors
- Consistent spacing and padding
- Mobile-first responsive design
- Accessibility-focused interactions
