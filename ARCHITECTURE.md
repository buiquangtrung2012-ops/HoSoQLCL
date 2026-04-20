# Architecture & Component Structure

## 📐 Visual Layout Structure

```
┌────────────────────────────────────────────────────────────┐
│                        HEADER BAR                           │
│                    (Search + Add Button)                     │
└────────────────────────────────────────────────────────────┘

┌──────────────┬──────────────┬────────────────────────────────┐
│              │              │                                │
│   SIDEBAR    │  TASK LIST   │       DETAIL PANEL             │
│   (w-48)     │   (w-72)     │       (flex-1)                 │
│              │              │                                │
│  • Nav       │ • Task 1     │  ┌──────────────────────────┐  │
│    Items     │   Status     │  │   Task Header            │  │
│  • Project   │ • Task 2     │  │   (Name, ID, Status)     │  │
│    Info      │ • Task 3     │  ├──────────────────────────┤  │
│              │ • ...        │  │                          │  │
│              │              │  │  Basic Info Section      │  │
│              │              │  │  Timeline Section        │  │
│              │              │  │  Technical Section       │  │
│              │              │  │  Automation Section      │  │
│              │              │  │                          │  │
│              │              │  │  (Scrollable Content)    │  │
│              │              │  │                          │  │
│              │              │  ├──────────────────────────┤  │
│              │              │  │   ACTION BAR (Sticky)    │  │
│              │              │  │   Save | Export          │  │
│              │              │  └──────────────────────────┘  │
└──────────────┴──────────────┴────────────────────────────────┘
```

---

## 🏗️ Component Hierarchy

```
App.jsx
│
├── Sidebar
│   ├── Navigation Items
│   └── Project Info Card
│
├── Header
│   ├── Search Bar
│   └── Add Button
│
└── MainContent
    ├── TaskList
    │   └── TaskListItem[] (Multiple)
    │       ├── Badge (Category)
    │       ├── Status Badge
    │       └── Delete Action
    │
    └── DetailPanel
        ├── TaskHeader
        │   ├── Task Name
        │   ├── ID + Status
        │   └── Action Buttons
        │
        ├── FormContent (Scrollable)
        │   ├── TaskBasicInfo
        │   │   ├── FormSection
        │   │   ├── FormField (Category)
        │   │   └── FormField (Location)
        │   │
        │   ├── TaskTimeline
        │   │   ├── FormSection
        │   │   ├── FormField (Start Date)
        │   │   ├── FormField (Inspection Date)
        │   │   └── Duration Display
        │   │
        │   ├── TaskTechnicalInfo
        │   │   ├── FormSection
        │   │   ├── FormField (Standards)
        │   │   ├── Button (AI Suggest)
        │   │   └── Loading Overlay
        │   │
        │   └── TaskAutomationPanel
        │       ├── FormSection
        │       ├── Progress Bar
        │       ├── DocumentCheckbox[]
        │       └── Status Alert
        │
        └── TaskActionBar (Sticky)
            ├── Status Message
            ├── Button (Save)
            └── Button (Export)

Modal (Conditional)
└── Add Task Form
    ├── Task Name Input
    ├── Category Select
    ├── Location Input
    ├── Date Fields
    └── Action Buttons
```

---

## 📁 File Organization

```
src/
├── design/
│   └── tokens.js              ← Design System
│
├── components/
│   ├── layout/
│   │   └── Layout.jsx         ← Sidebar, Header
│   │
│   ├── form/                  ← NEW FOLDER
│   │   ├── TaskHeader.jsx
│   │   ├── FormComponents.jsx
│   │   ├── TaskFormSections.jsx
│   │   ├── TaskAutomationPanel.jsx
│   │   └── TaskActionBar.jsx
│   │
│   ├── ui/
│   │   └── Common.jsx         ← Badge, Button, Card
│   │
│   └── TaskComponents.jsx     ← TaskListItem
│
└── App.jsx                    ← Main App
```

---

## 🔄 Data Flow

```
User Interaction
    ↓
    ├─ Create Task
    │   └─ Modal → Form → handleSaveTask() → API → fetchTasks() → UI Update
    │
    ├─ Select Task
    │   └─ TaskListItem Click → setCurrentTask() → Detail Panel Renders
    │
    ├─ Edit Task
    │   └─ Form Field → setCurrentTask() → Model Updated (not saved yet)
    │
    ├─ Save Task
    │   └─ handleSaveTask() → API → fetchTasks() → List Updates
    │
    ├─ Export Task
    │   └─ handleExport() → API → File Downloads
    │
    ├─ AI Suggest
    │   └─ handleAISuggest() → API → Response → Update Model
    │
    └─ Delete Task
        └─ handleDeleteTask() → Confirm → API → fetchTasks() → UI Clear
```

---

## 🎨 Design System Structure

### tokens.js Contents

```
colors
├── primary
│   ├── 50:   #f0f4ff (light)
│   └── 600:  #4f46e5 (main)
├── success (emerald)
├── warning (amber)
├── error (rose)
└── slate (neutral)

spacing
├── xs: 4px
├── sm: 8px
├── md: 16px
├── lg: 24px
├── xl: 32px
└── 2xl: 48px

typography
├── label: text-[9px] font-black uppercase
├── body: text-xs font-semibold
└── h3: text-xl font-bold

shadows
├── sm: shadow-sm
├── md: shadow-md
├── lg: shadow-lg
└── xl: shadow-xl

borderRadius
├── sm: rounded-lg
├── md: rounded-xl
├── lg: rounded-2xl
└── full: rounded-full

layout
├── sidebarWidth: w-48
├── taskListWidth: w-72
├── headerHeight: h-16
└── detailPanelMinWidth: flex-1
```

---

## 🔗 Component Dependencies

```
App.jsx
├── imports Sidebar (layout/Layout.jsx)
├── imports Header (layout/Layout.jsx)
├── imports TaskListItem (TaskComponents.jsx)
├── imports TaskHeader (form/TaskHeader.jsx)
├── imports TaskBasicInfo (form/TaskFormSections.jsx)
├── imports TaskTimeline (form/TaskFormSections.jsx)
├── imports TaskTechnicalInfo (form/TaskFormSections.jsx)
├── imports TaskAutomationPanel (form/TaskAutomationPanel.jsx)
├── imports TaskActionBar (form/TaskActionBar.jsx)
├── imports Badge, Button (ui/Common.jsx)
├── imports layout from design/tokens.js
└── imports icons from lucide-react

TaskHeader.jsx
└── imports Badge (ui/Common.jsx)

FormComponents.jsx
└── (No component imports)

TaskFormSections.jsx
├── imports FormSection, FormField, FormGrid (form/FormComponents.jsx)
├── imports Button (ui/Common.jsx)
└── imports Sparkles icon (lucide-react)

TaskAutomationPanel.jsx
├── imports FormSection (form/FormComponents.jsx)
└── imports icons (lucide-react)

TaskActionBar.jsx
├── imports Button (ui/Common.jsx)
└── imports Download, Eye, Save icons (lucide-react)

Layout.jsx
├── imports ShieldCheck icon (lucide-react)
└── imports layout tokens (design/tokens.js)

TaskComponents.jsx
├── imports Badge, Button (ui/Common.jsx)
└── imports icons (lucide-react)

Common.jsx
└── (No component imports)
```

---

## 🔌 Props & Data Flow

### TaskHeader Props
```
{
  task: {
    id: number
    name: string
    inspection_date: string
    standards: string
    status: string
  }
  onDelete: function
  onHistory: function
}
```

### FormSection Props
```
{
  title: string
  subtitle?: string
  icon?: ReactNode
  children: ReactNode
  highlighted?: boolean
  className?: string
}
```

### FormField Props
```
{
  label: string
  required?: boolean
  error?: string
  children: ReactNode (input/select/textarea)
  fullWidth?: boolean
  helpText?: string
}
```

### TaskBasicInfo Props
```
{
  task: Task
  onChange: function
  disabled?: boolean
}
```

### TaskAutomationPanel Props
```
{
  task: Task
  onDocumentToggle?: function
}
```

### TaskActionBar Props
```
{
  task: Task
  onSave: function
  onExport: function
  isSaving?: boolean
  isExporting?: boolean
  disabled?: boolean
}
```

---

## 🎯 State Management Overview

### App Level State
```
// Data State
const [tasks, setTasks]                         // All tasks
const [currentTask, setCurrentTask]             // Selected task
const [newTask, setNewTask]                     // Modal form

// UI State
const [activeTab, setActiveTab]                 // Nav selection
const [searchQuery, setSearchQuery]             // Search input
const [showAddModal, setShowAddModal]           // Modal visibility

// Loading State
const [isLoadingAI, setIsLoadingAI]             // AI suggestion
const [isSavingTask, setIsSavingTask]           // Save operation
const [isExporting, setIsExporting]             // Export operation
```

### Local Component State
- Most components are stateless
- Use props for data binding
- Change handlers go to App.jsx

---

## 🎨 Styling Pattern

### Component Styling
```jsx
// Using Tailwind classes
<div className={`
  bg-white/40                    // Background
  p-5 rounded-xl                // Padding + Border Radius
  border border-slate-100/50    // Border
  shadow-sm                     // Shadow
  hover:shadow-md               // Hover effect
  transition-all                // Animation
  ${isActive ? 'ring-2' : ''}   // Conditional
`}>
```

### Design Token Usage
```jsx
// Import tokens
import { layout, colors, typography } from './design/tokens';

// Use in components
<div className={layout.sidebarWidth}>
<span className={typography.label}>
<style={{color: colors.primary[600]}}
```

---

## 🔄 Form Submission Flow

```
User fills form
    ↓
onChange event fires
    ↓
setCurrentTask() updates state
    ↓
Task is edited in memory (not saved)
    ↓
User clicks "Save" button
    ↓
handleSaveTask(currentTask) called
    ↓
setIsSavingTask(true)
    ↓
API call (POST/PUT)
    ↓
API returns success/error
    ↓
fetchTasks() refreshes list
    ↓
setIsSavingTask(false)
    ↓
UI updates with new data
```

---

## 🧪 Component Testing Points

```
Each component should test:

TaskHeader
├─ Renders task name
├─ Shows ID and status
└─ Buttons trigger callbacks

TaskFormSections
├─ Fields display correctly
├─ onChange fires
└─ Values update in parent

TaskAutomationPanel
├─ Progress bar displays
├─ Checkboxes toggle
└─ Alerts appear/disappear

TaskActionBar
├─ Displays task status
├─ Save button works
├─ Export button disabled when incomplete
└─ Loading states show

Layout
├─ Sidebar renders
├─ Navigation works
├─ Header search functions
└─ Responsive behavior
```

---

## 📊 Performance Optimizations

### Rendering
- Form sections only update when their data changes
- Task list items optimized with key prop
- Modal only renders when needed

### Re-renders
- Components use proper props dependency
- No inline object creation in renders
- Event handlers stable

### Data
- Single source of truth in App state
- Minimal prop drilling
- Efficient filtering

---

## 🔐 Data Safety

### Preserved
✓ All existing data models
✓ API contract unchanged
✓ Database schema
✓ Authentication
✓ Export format

### Protected
✓ User input validated
✓ Errors handled gracefully
✓ Loading states prevent double-submit
✓ Confirmation for delete

---

## 🚀 Deployment Architecture

```
Production Build
    ↓
minified CSS + JS
    ↓
Deployed to server
    ↓
Served with index.html
    ↓
React app initializes
    ↓
Data fetched from API
    ↓
UI renders
    ↓
Ready for user interaction
```

---

**Last Updated**: April 20, 2026  
**Version**: 2.0  
**Status**: ✅ Complete
