# 🛡️ Text Escape Helper Functions

## **Overview**
Helper functions to prevent React linting errors with special characters like apostrophes, quotes, and HTML entities.

## **Available Functions**

### **1. `safeApostropheText(text: string)`**
**Use for:** Simple text that may contain apostrophes
```tsx
import { safeApostropheText } from '@/lib/utils'

// ❌ Wrong - will cause linting error
<p>We'll send you an email</p>
<p>Don't forget to check</p>

// ✅ Correct - automatically escapes apostrophes
<p>{safeApostropheText("We'll send you an email")}</p>
<p>{safeApostropheText("Don't forget to check")}</p>
```

### **2. `safeText(text: string)`**
**Use for:** Text that may contain any special characters
```tsx
import { safeText } from '@/lib/utils'

// ✅ Safely escapes all HTML entities
<p>{safeText("We'll send you an email & don't forget to check!")}</p>
<p>{safeText('Text with "quotes" and apostrophes')}</p>
```

### **3. `escapeApostrophes(text: string)`**
**Use for:** Direct control over apostrophe escaping
```tsx
import { escapeApostrophes } from '@/lib/utils'

const message = escapeApostrophes("We'll send you an email")
// Result: "We&apos;ll send you an email"
```

### **4. `escapeHtmlEntities(text: string)`**
**Use for:** Complete HTML entity escaping
```tsx
import { escapeHtmlEntities } from '@/lib/utils'

const text = escapeHtmlEntities('Text with "quotes" & apostrophes')
// Result: "Text with &quot;quotes&quot; &amp; apostrophes"
```

## **Best Practices**

### **When Creating New Components:**
```tsx
// ✅ Always use helper functions for text content
export function MyComponent() {
  return (
    <div>
      <h1>{safeApostropheText("Welcome to our platform!")}</h1>
      <p>{safeText("We'll help you succeed & don't worry about anything!")}</p>
    </div>
  )
}
```

### **For Dynamic Content:**
```tsx
// ✅ Safe for user-generated content
const userMessage = "I don't know what to do & I'm confused!"
<p>{safeText(userMessage)}</p>
```

### **For Static Text:**
```tsx
// ✅ Simple apostrophe escaping
<p>{safeApostropheText("We're here to help!")}</p>
```

## **Common Patterns to Avoid**

```tsx
// ❌ Don't manually escape - error-prone
<p>We&apos;ll send you an email</p>

// ❌ Don't use raw apostrophes - causes linting errors
<p>We'll send you an email</p>

// ✅ Use helper functions - automatic and safe
<p>{safeApostropheText("We'll send you an email")}</p>
```

## **Benefits**

1. **No More Linting Errors** - Automatically handles special characters
2. **Consistent Escaping** - Same approach across all components
3. **Easy to Use** - Simple function calls instead of manual HTML entities
4. **Maintainable** - Centralized logic for text escaping
5. **Type Safe** - Full TypeScript support

## **Migration Guide**

When updating existing components:

1. **Import the helper:**
   ```tsx
   import { safeApostropheText, safeText } from '@/lib/utils'
   ```

2. **Replace manual escaping:**
   ```tsx
   // Before
   <p>We&apos;ll send you an email</p>
   
   // After
   <p>{safeApostropheText("We'll send you an email")}</p>
   ```

3. **Replace raw apostrophes:**
   ```tsx
   // Before
   <p>We'll send you an email</p>
   
   // After
   <p>{safeApostropheText("We'll send you an email")}</p>
   ```

## **Testing**

The helper functions are pure functions and easy to test:

```tsx
import { safeApostropheText, safeText } from '@/lib/utils'

test('safeApostropheText escapes apostrophes', () => {
  expect(safeApostropheText("We'll test this")).toBe("We&apos;ll test this")
})

test('safeText escapes all entities', () => {
  expect(safeText('Text with "quotes" & apostrophes')).toBe('Text with &quot;quotes&quot; &amp; apostrophes')
})
```
