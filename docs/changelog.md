# Changelog

## 2026-01-30

### Major Feature Release - 7 New Client-Side Features

**Summary:** Implemented all high and medium priority client-side features from the roadmap.

**Features Completed:**

1. **Load from Template** - Template library with 6 pre-built templates (full proposals, scope, rate card, team, terms). Users can save custom templates to localStorage.

2. **Theme Presets** - 4 visual themes (Modern, Classic, Minimal, Bold) with CSS variable-based theming for the preview output.

3. **Approval Workflow** - Proposal status tracking (Draft → Review → Final → Sent) with visual badges, status history, and preview watermarks.

4. **Expiration Dates** - Set proposal validity period with automatic expiration calculation and visual warnings for expired proposals.

5. **Currency Support** - Multi-currency support for 8 currencies (INR, USD, EUR, GBP, AUD, CAD, SGD, AED) with proper localization.

6. **Dynamic Pricing** - Formula-based pricing with variables (e.g., `{videos} * 5000`) that auto-recalculates when variables change.

7. **Cover Page Designer** - Visual editor for 4 cover page layouts (Centered, Left-aligned, Split, Minimal) with background patterns and customization options.

---

## 2026-01-30

### Approval Workflow Feature Implementation

**Modified Files:**

1. **src/types/index.ts**
   - Added `ProposalStatus` type: 'draft' | 'review' | 'final' | 'sent'
   - Added `StatusHistoryItem` interface with status, timestamp, and changedBy fields
   - Extended `Proposal` interface to include `status` and optional `statusHistory` fields

2. **src/data/initialProposal.ts**
   - Added default `status: 'draft'` to initial proposal
   - Added initial `statusHistory` entry with timestamp and 'System' as changedBy

3. **src/context/ProposalContext.tsx**
   - Added import for `ProposalStatus` type
   - Added `updateStatus` function to context interface
   - Added migration logic for `status` and `statusHistory` fields in localStorage loading
   - Added migration logic for `status` and `statusHistory` fields in file upload
   - Reset status to 'draft' and cleared status history when duplicating proposal
   - Implemented `updateStatus` function with logging to console on status changes

4. **src/components/ui/StatusBadge.tsx** (NEW)
   - Created visual badge component for displaying proposal status
   - Color coding: Draft (gray), Review (amber), Final (blue), Sent (green)
   - Support for different sizes (sm, md, lg)
   - Export of `StatusDot` and `StatusIcon` for minimal displays
   - Full dark mode support

5. **src/components/ui/StatusWorkflow.tsx** (NEW)
   - Created stepper UI modal for managing approval workflow
   - Visual workflow: Draft → Review → Final → Sent
   - Click-to-change status functionality with confirmation dialog
   - Current status highlighted with distinctive styling
   - Status history display with timestamps
   - Color-coded steps matching status badge colors
   - Full dark mode support

6. **src/components/layout/Layout.tsx**
   - Added imports for `StatusBadge` and `StatusWorkflow` components
   - Added import for `GitBranch` icon
   - Integrated `StatusBadge` in header next to proposal name with clickable button
   - Added state management for workflow modal visibility
   - Integrated `StatusWorkflow` modal component

7. **src/components/preview/Preview.tsx**
   - Added subtle watermark showing current status in preview mode
   - Watermark rotates 45° and displays status text (DRAFT, IN REVIEW, FINAL)
   - Special "SENT" stamp with border for sent status (visible in print)
   - Watermark colors match status colors with reduced opacity
   - Watermarks hidden when printing except for "SENT" stamp

---

## 2026-01-30

### Cover Page Designer Feature Implementation

**Modified Files:**

1. **src/types/index.ts**
   - Added `CoverLayout` type: 'centered' | 'left-aligned' | 'split' | 'minimal'
   - Added `CoverStyle` interface with layout, decorative elements, background patterns, accent color, and font size options
   - Extended `ProposalMeta` interface to include optional `coverStyle` field

2. **src/data/initialProposal.ts**
   - Added default `coverStyle` to initial proposal meta with 'centered' layout

3. **src/context/ProposalContext.tsx**
   - Added migration logic for `coverStyle` field in localStorage loading
   - Added migration logic for `coverStyle` field in file upload

4. **src/components/ui/CoverDesigner.tsx** (NEW)
   - Created visual editor modal for cover page customization
   - Implemented layout selector with thumbnail previews for all 4 layouts
   - Added toggle for decorative elements
   - Added background pattern selector (none, dots, lines, gradient)
   - Added font size selector (compact, normal, large)
   - Implemented live preview of cover page with all styling options

5. **src/components/builder/IntroForm.tsx**
   - Added "Design Cover Page" button to open CoverDesigner modal
   - Button displays current layout name
   - Integrated with proposal context for real-time updates

6. **src/components/preview/coverLayouts/CenteredLayout.tsx** (NEW)
   - Classic centered layout with logo at top
   - Title prominently centered
   - Client name and date at bottom
   - Supports all background patterns and styling options

7. **src/components/preview/coverLayouts/LeftAlignedLayout.tsx** (NEW)
   - Professional left-aligned layout
   - Logo, title, client name, and date all left-aligned
   - Clean corporate aesthetic
   - Supports all background patterns and styling options

8. **src/components/preview/coverLayouts/SplitLayout.tsx** (NEW)
   - Modern split-screen design
   - Left side: Accent color block with logo
   - Right side: Title, client name, date
   - Supports all background patterns and styling options

9. **src/components/preview/coverLayouts/MinimalLayout.tsx** (NEW)
   - Ultra clean text-only layout
   - No logo display
   - Focuses on typography
   - Supports all background patterns and styling options

10. **src/components/preview/coverLayouts/index.ts** (NEW)
    - Central export file for all cover layout components

11. **src/components/preview/ProposalSections.tsx**
    - Refactored `CoverPage` component to use new layout system
    - Added support for all background patterns (dots, lines, gradient)
    - Implemented dynamic accent color application
    - Added font size scaling based on coverStyle settings
    - Maintains print-friendly output for all layouts
