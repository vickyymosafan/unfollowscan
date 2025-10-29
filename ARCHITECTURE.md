# Architecture Documentation

## Separation of Concerns: Logic vs UI

Codebase ini mengikuti prinsip **Separation of Concerns** dengan memisahkan Logic dan UI secara jelas.

## Struktur Folder

```
lib/
├── hooks/              # Custom Hooks (Logic Layer)
│   ├── useFileUpload.ts           # File upload & validation logic
│   ├── useTableSearch.ts          # Search filtering logic
│   ├── useTablePagination.ts      # Pagination logic
│   ├── useTextPressure.ts         # Animation logic
│   └── useInstagramAnalysis.ts    # Main analysis orchestration
│
├── analysis/           # Business Logic (Pure Functions)
│   └── follower-analyzer.ts      # Follower analysis algorithms
│
├── parser/             # Data Parsing (Pure Functions)
│   ├── instagram-parser.ts       # Main parser
│   ├── json-parser.ts            # JSON format parser
│   └── html-parser.ts            # HTML format parser
│
├── utils/              # Utility Functions (Pure Functions)
│   ├── file-reader.ts            # File reading utilities
│   ├── csv-generator.ts          # CSV export utilities
│   ├── format.ts                 # Number formatting
│   ├── scroll.ts                 # Smooth scroll utilities
│   ├── set-operations.ts         # Set operations
│   └── username-normalizer.ts    # Username normalization
│
├── icons/              # Icon Components (UI)
│   └── index.tsx                 # Centralized SVG icons
│
└── types.ts            # TypeScript Type Definitions

components/             # UI Components (Presentation Layer)
├── FileUploadCard.tsx  # File upload UI
├── TextPressure.tsx    # Interactive text UI
├── ResultTable.tsx     # Results table UI
├── Hero.tsx            # Hero section UI
└── ...                 # Other UI components

app/
└── page.tsx            # Main page (Orchestration)
```

## Layer Responsibilities

### 1. Custom Hooks Layer (`lib/hooks/`)
**Responsibility:** Encapsulate reusable logic and state management

**Characteristics:**
- Manage component state
- Handle side effects (useEffect)
- Provide functions to manipulate state
- Return data and functions to UI components
- No UI rendering

**Example:**
```typescript
// useFileUpload.ts
export function useFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  
  const handleFileSelection = (files: FileList | null) => {
    // Logic here
  };
  
  return { files, handleFileSelection };
}
```

### 2. Business Logic Layer (`lib/analysis/`, `lib/parser/`)
**Responsibility:** Core business logic and data processing

**Characteristics:**
- Pure functions (no side effects)
- Testable in isolation
- No UI dependencies
- No state management

**Example:**
```typescript
// follower-analyzer.ts
export function analyzeFollowers(
  followers: string[],
  following: string[]
): AnalysisResults {
  // Pure logic here
  return results;
}
```

### 3. Utility Layer (`lib/utils/`)
**Responsibility:** Reusable helper functions

**Characteristics:**
- Pure functions
- Generic and reusable
- No business logic
- No UI dependencies

**Example:**
```typescript
// format.ts
export function formatNumber(num: number): string {
  return num.toLocaleString('id-ID');
}
```

### 4. UI Components Layer (`components/`)
**Responsibility:** Presentation and user interaction

**Characteristics:**
- Focus on rendering UI
- Use custom hooks for logic
- Handle user events
- No business logic
- Minimal state (only UI state)

**Example:**
```typescript
// FileUploadCard.tsx
export default function FileUploadCard({ onProcess }) {
  const { files, handleFileSelection } = useFileUpload();
  
  return (
    <div>
      {/* UI rendering only */}
    </div>
  );
}
```

### 5. Orchestration Layer (`app/page.tsx`)
**Responsibility:** Coordinate components and data flow

**Characteristics:**
- Use custom hooks for state management
- Pass data to child components
- Handle high-level logic flow
- Minimal business logic

**Example:**
```typescript
// page.tsx
export default function Home() {
  const { results, processFiles } = useInstagramAnalysis();
  
  return (
    <>
      <FileUploadCard onProcess={processFiles} />
      {results && <ResultTable data={results} />}
    </>
  );
}
```

## Data Flow

```
User Interaction
      ↓
UI Component (Presentation)
      ↓
Custom Hook (Logic)
      ↓
Business Logic / Utils (Pure Functions)
      ↓
Custom Hook (State Update)
      ↓
UI Component (Re-render)
```

## Benefits

### 1. Maintainability
- Logic dan UI terpisah
- Mudah menemukan dan memperbaiki bugs
- Perubahan logic tidak affect UI

### 2. Testability
- Logic bisa di-test secara isolated
- Pure functions mudah di-test
- Mock dependencies lebih mudah

### 3. Reusability
- Custom hooks bisa digunakan di multiple components
- Pure functions bisa digunakan di berbagai context
- DRY principle terpenuhi

### 4. Scalability
- Mudah menambahkan fitur baru
- Pattern yang jelas untuk development
- Code organization yang konsisten

### 5. Performance
- Logic optimization tidak affect UI
- Memoization di hooks lebih efektif
- Re-render optimization lebih mudah

## Best Practices

### DO ✅
- Pisahkan logic ke custom hooks
- Gunakan pure functions untuk business logic
- Keep UI components focused on rendering
- Use TypeScript for type safety
- Follow single responsibility principle

### DON'T ❌
- Jangan campur logic dengan UI di component
- Jangan taruh business logic di UI component
- Jangan buat side effects di pure functions
- Jangan duplikasi logic di multiple places
- Jangan skip type definitions

## Example: Adding New Feature

**Scenario:** Menambahkan fitur export to PDF

**Steps:**
1. Buat utility function di `lib/utils/pdf-generator.ts` (Pure function)
2. Buat custom hook di `lib/hooks/usePdfExport.ts` (Logic)
3. Update UI component untuk menggunakan hook (UI)
4. Test logic secara isolated
5. Test UI integration

**Code:**
```typescript
// 1. lib/utils/pdf-generator.ts
export function generatePDF(data: string[]): Blob {
  // Pure function logic
}

// 2. lib/hooks/usePdfExport.ts
export function usePdfExport() {
  const handleExport = (data: string[]) => {
    const pdf = generatePDF(data);
    // Download logic
  };
  
  return { handleExport };
}

// 3. components/ResultTable.tsx
export default function ResultTable({ data }) {
  const { handleExport } = usePdfExport();
  
  return (
    <button onClick={() => handleExport(data)}>
      Export PDF
    </button>
  );
}
```

## Conclusion

Dengan mengikuti architecture ini, codebase menjadi lebih maintainable, testable, dan scalable. Setiap layer punya responsibility yang jelas dan tidak overlap dengan layer lain.
