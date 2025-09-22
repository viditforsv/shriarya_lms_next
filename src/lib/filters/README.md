# Advanced Filter Plugin System

A reusable, plugin-based advanced filtering system for the ShriArya LMS that supports complex logical operations like "difficulty of 9 OR difficulty of not 8".

## 🏗️ Architecture

The plugin system consists of:

1. **Core Plugin** (`AdvancedFilterPlugin.tsx`) - Main hook and UI components
2. **Filter Configurations** (`configs/`) - Pre-configured filter setups for different use cases
3. **Legacy Filter Form** (`LegacyFilterForm.tsx`) - Backward-compatible simple filter UI
4. **API Integration** - Seamless integration with existing API endpoints

## 🚀 Quick Start

### 1. Basic Usage

```tsx
import {
  useAdvancedFilterPlugin,
  FilterPluginUI,
} from "@/lib/filters/AdvancedFilterPlugin";
import { questionBankFilterConfig } from "@/lib/filters/configs/QuestionBankFilterConfig";

function MyComponent() {
  const filterPlugin = useAdvancedFilterPlugin({
    ...questionBankFilterConfig,
    onFiltersChange: (filters) => {
      // Handle filter changes
    },
  });

  return (
    <div>
      <FilterPluginUI plugin={filterPlugin} />
    </div>
  );
}
```

### 2. Custom Configuration

```tsx
const customConfig = {
  apiEndpoint: "/api/my-endpoint",
  availableFields: [
    {
      value: "status",
      label: "Status",
      type: "select",
      options: ["active", "inactive"],
    },
    { value: "priority", label: "Priority", type: "number" },
  ],
  enablePreview: true,
  onPreviewChange: (count) => console.log(`${count} items match`),
};

const filterPlugin = useAdvancedFilterPlugin(customConfig);
```

## 📋 Available Filter Types

### Operators

- `eq` - Equals
- `neq` - Not equals
- `gt` - Greater than
- `gte` - Greater than or equal
- `lt` - Less than
- `lte` - Less than or equal
- `in` - In array
- `nin` - Not in array
- `like` - Contains (case-sensitive)
- `ilike` - Contains (case-insensitive)
- `is` - Is null/not null
- `not` - Is not null

### Field Types

- `text` - Text input
- `number` - Number input
- `boolean` - True/False select
- `select` - Dropdown with options

## 🎯 Advanced Filter Examples

### Example 1: Difficulty OR Logic

```json
[
  { "field": "difficulty", "operator": "eq", "value": 9 },
  { "field": "difficulty", "operator": "neq", "value": 8 }
]
```

**Result**: Questions with difficulty = 9 OR difficulty ≠ 8

### Example 2: Range Query

```json
[
  { "field": "difficulty", "operator": "gte", "value": 5 },
  { "field": "difficulty", "operator": "lte", "value": 8 }
]
```

**Result**: Questions with difficulty between 5 and 8 (inclusive)

### Example 3: Complex Boolean Logic

```json
[
  {
    "conditions": [
      { "field": "subject", "operator": "eq", "value": "Mathematics" },
      { "field": "difficulty", "operator": "gte", "value": 7 }
    ],
    "logic": "AND"
  },
  {
    "conditions": [
      { "field": "is_pyq", "operator": "eq", "value": true },
      { "field": "pyq_year", "operator": "gte", "value": 2020 }
    ],
    "logic": "AND"
  }
]
```

**Result**: (Mathematics AND difficulty ≥ 7) OR (PYQ AND year ≥ 2020)

## 🔧 Configuration Options

### FilterPluginConfig Interface

```typescript
interface FilterPluginConfig {
  // API endpoint for filtering
  apiEndpoint: string;

  // Available fields for filtering
  availableFields: Array<{
    value: string;
    label: string;
    type?: "text" | "number" | "boolean" | "select";
    options?: string[];
  }>;

  // Legacy filters (for backward compatibility)
  legacyFilters?: Record<string, string>;

  // Callbacks
  onFiltersChange?: (filters: AdvancedFilter[]) => void;
  onLegacyFiltersChange?: (filters: Record<string, string>) => void;

  // UI customization
  showAdvancedButton?: boolean;
  showLegacyFilters?: boolean;
  showActiveFilters?: boolean;
  customFilterDisplay?: (filters: AdvancedFilter[]) => React.ReactNode;

  // API request customization
  buildRequestParams?: (
    advancedFilters: AdvancedFilter[],
    legacyFilters: Record<string, string>
  ) => Record<string, any>;

  // Preview functionality
  enablePreview?: boolean;
  onPreviewChange?: (count: number) => void;
}
```

## 📁 File Structure

```
src/lib/filters/
├── AdvancedFilterPlugin.tsx          # Core plugin hook and UI
├── configs/
│   ├── QuestionBankFilterConfig.ts   # Question bank configuration
│   └── BulkAssignmentFilterConfig.ts # Bulk assignment configuration
└── README.md                         # This documentation

src/components/filters/
└── LegacyFilterForm.tsx              # Legacy filter form component
```

## 🔄 Migration Guide

### From Old Filter System

**Before:**

```tsx
const [filters, setFilters] = useState({});
const [advancedFilters, setAdvancedFilters] = useState([]);

const handleFilterChange = (key, value) => {
  setFilters((prev) => ({ ...prev, [key]: value }));
};
```

**After:**

```tsx
const filterPlugin = useAdvancedFilterPlugin({
  ...yourConfig,
  onFiltersChange: (filters) => {
    // Handle advanced filters
  },
  onLegacyFiltersChange: (filters) => {
    // Handle legacy filters
  },
});

// Use filterPlugin.legacyFilters and filterPlugin.advancedFilters
```

## 🎨 UI Components

### FilterPluginUI

Main UI component that renders:

- Advanced filter button
- Active filters display
- Preview functionality
- Advanced filter builder modal

### LegacyFilterForm

Backward-compatible form for simple filters:

- Grid layout of filter inputs
- Support for different input types
- Automatic validation

## 🔌 API Integration

The plugin automatically handles API requests:

```typescript
// Advanced filters
{ advanced_filters: JSON.stringify(advancedFilters) }

// Legacy filters
{ subject: "Mathematics", difficulty: "5" }

// Combined
{
  advanced_filters: JSON.stringify(advancedFilters),
  subject: "Mathematics" // legacy filters still work
}
```

## 🧪 Testing

Test the advanced filtering with the test endpoint:

```bash
GET /api/question-bank/test-advanced-filters?test=difficulty-or-not
```

Available test cases:

- `difficulty-or-not` - Difficulty = 9 OR ≠ 8
- `range` - Difficulty between 5 and 8
- `complex` - Multi-field complex logic
- `pyq-recent` - PYQ from 2020 onwards

## 🚀 Future Enhancements

1. **Filter Templates** - Save and reuse common filter combinations
2. **Filter Sharing** - Share filter URLs with colleagues
3. **Filter Analytics** - Track most used filter combinations
4. **Smart Suggestions** - AI-powered filter recommendations
5. **Export/Import** - Export filter configurations to JSON

## 🤝 Contributing

When adding new filter configurations:

1. Create a new config file in `src/lib/filters/configs/`
2. Define available fields with proper types
3. Add any custom API parameter building logic
4. Update this documentation
5. Add tests for new functionality

## 📝 Examples in Codebase

- **Question Bank**: `/src/app/question-bank/page.tsx`
- **Bulk Assignments**: `/src/components/BulkAssignmentManager.tsx`
- **Test Endpoint**: `/src/app/api/question-bank/test-advanced-filters/route.ts`
