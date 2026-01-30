# Changelog

## 2026-01-30

### AI Writing Assistant Feature Implementation

**New Files:**

1. **src/data/aiTemplates.ts** (NEW)
   - Comprehensive template library for AI content generation
   - Templates for 4 content types: Executive Summary, Scope Description, Objectives, Team Description
   - Support for 8 project types: Social Media, Branding, Web Development, Mobile App, Consulting, Marketing, Design, General
   - 4 tone variants per template: Professional, Casual, Persuasive, Technical
   - 3 length options per tone: Short, Medium, Long
   - Template variables ({{clientName}}, {{context}}) for dynamic content insertion
   - Helper functions: `findTemplate()`, `getProjectTypesForContentType()`
   - Label mappings for UI display

2. **src/utils/aiWriter.ts** (NEW)
   - `generateContent(options)` - Main generation function using template substitution
   - `regenerateContent(options)` - Creates variations by cycling through lengths
   - `formatForEditor(content)` - Converts plain text to HTML paragraphs for Tiptap
   - `validateOptions(options)` - Validates all required fields are present
   - `getGenerationPreview(options)` - Shows preview text before generation
   - Client-side only implementation with simulated processing delays for UX
   - No external API calls - purely template-based generation

3. **src/components/ui/AIWritingAssistant.tsx** (NEW)
   - Modal component with split-panel layout (config left, preview right)
   - Content type selector with visual grid of 5 options
   - Project type dropdown (context-aware based on content type)
   - Tone selector with 4 pill-style buttons
   - Length selector with 3 segmented buttons
   - Context textarea for custom details
   - Client name input field
   - Generate button with loading state and spinner animation
   - Preview panel showing generated content with formatting
   - Regenerate button for creating variations
   - Insert button to add content to editor at cursor position
   - Error display with AlertCircle icon
   - Full dark mode support throughout
   - Gradient styling on generate button (purple to blue)

**Modified Files:**

4. **src/components/ui/RichTextEditor.tsx**
   - Added import for `Sparkles` icon from lucide-react
   - Added import for `AIWritingAssistant` component
   - Added state: `isAIAssistantOpen` for modal visibility
   - Added "AI Assist" button in toolbar with Sparkles icon
   - Button positioned next to "Insert Snippet" button
   - Integrated `AIWritingAssistant` modal with `onInsert` callback
   - Content inserts at current cursor position in editor

**Features:**
- Completely client-side - no API keys or external services required
- 96+ unique template combinations (4 content types × 8 project types × 4 tones × 3 lengths)
- Context-aware project type filtering
- Professional, usable content suitable for business proposals
- Simulated "AI processing" delay for better user experience
- Seamless integration with existing Tiptap editor
- Dark mode support matching existing UI patterns

---

## 2026-01-30

### Multiple Export Formats Feature Implementation

**Modified Files:**

1. **package.json**
   - Added `docx` package (v9.x) for Word document generation
   - Added `pptxgenjs` package (v3.x) for PowerPoint presentation generation
   - Added `xlsx` package (v0.18.x) for Excel spreadsheet generation

2. **src/utils/exportFormats.ts** (NEW)
   - Created `exportToWord(proposal)` function
     - Generates professional .docx files with cover page
     - Includes all sections: Executive Summary, Scope, Team, Commercials, Terms
     - Formatted tables for costing and rate card sections
     - Proper heading hierarchy with page breaks
     - Currency formatting based on proposal settings
   - Created `exportToPowerPoint(proposal)` function
     - Generates presentation-ready .pptx files
     - Cover slide with title, client name, and date
     - Individual slides for each major section
     - Tables for deliverables and costing data
     - Thank you slide at the end
     - Master slide design with consistent branding
   - Created `exportToExcel(proposal)` function
     - Generates multi-sheet .xlsx workbook
     - Summary sheet with proposal metadata
     - Costing sheet with detailed breakdown and subtotals
     - Rate Card sheet with all pricing items
     - Team sheet with member details and FTE calculation
     - Scope sheet with deliverables breakdown
     - Terms sheet with responsibilities and conditions
   - Helper functions for currency formatting, HTML stripping, and rate calculations

3. **src/components/ui/ExportModal.tsx** (NEW)
   - Created modal UI for selecting export format
   - Five export options: PDF (Print), Word, PowerPoint, Excel, JSON
   - Visual cards with icons and descriptions for each format
   - Format selection with radio button indicators
   - Export button with loading state during generation
   - Success animation after successful export
   - Dark mode support throughout
   - Keyboard accessible and responsive design

4. **src/components/layout/Layout.tsx**
   - Replaced "Print PDF" button with new "Export" button
   - Changed icon from Printer to FileOutput
   - Added dark mode styling for export button (blue accent in dark mode)
   - Integrated ExportModal component
   - Added state management for modal visibility
   - Removed old `handlePrint` function, replaced with `handleOpenExport`

**Features:**
- Pure client-side export (no server required)
- All major Microsoft Office formats supported
- Maintains proposal styling and formatting
- Proper file naming based on proposal name
- Export progress indication for longer operations

---

## 2026-01-30

### Win/Loss Tracking Feature Implementation

**Modified Files:**

1. **src/types/index.ts**
   - Added `ProposalOutcome` type: 'pending' | 'won' | 'lost' | 'on-hold'
   - Added `OutcomeDetails` interface with dateDecided, valueWon, lossReason, lossReasonOther, notes, and competitor fields
   - Extended `Proposal` interface to include optional `outcome` and `outcomeDetails` fields

2. **src/data/initialProposal.ts**
   - Added default `outcome: 'pending'` to initial proposal

3. **src/context/ProposalContext.tsx**
   - Added import for `ProposalOutcome` and `OutcomeDetails` types
   - Added `updateOutcome` function to context interface
   - Added migration logic for `outcome` field in localStorage loading
   - Added migration logic for `outcome` field in file upload
   - Reset outcome to 'pending' and cleared outcomeDetails when duplicating proposal
   - Implemented `updateOutcome` function with logging to console on outcome changes

4. **src/components/ui/OutcomeBadge.tsx** (NEW)
   - Created visual badge component for displaying proposal outcome
   - Color coding: Pending (gray), Won 🎉 (green), Lost 😞 (red), On Hold ⏸️ (amber)
   - Support for different sizes (sm, md, lg)
   - Icon integration for each outcome type
   - Full dark mode support

5. **src/components/ui/OutcomeTracker.tsx** (NEW)
   - Created modal UI for tracking proposal outcomes
   - Four outcome selection buttons: Won, Lost, On Hold, Reset to Pending
   - Won mode: Input for actual value won (may differ from proposal value)
   - Lost mode: Dropdown for loss reasons (Price too high, Timeline, Scope mismatch, Went with competitor, Other)
   - Lost mode: Additional fields for competitor name and custom reason (when "Other" selected)
   - Date picker for when decision was made
   - Notes textarea for additional comments
   - View mode to see outcome summary with formatted display
   - Confirmation dialog for resetting outcome
   - Currency formatting based on proposal currency
   - Full dark mode support

6. **src/components/layout/Layout.tsx**
   - Added imports for `OutcomeTracker` and `OutcomeBadge` components
   - Added import for `Target` icon
   - Integrated "Track Outcome" button in header next to import/export actions
   - Display `OutcomeBadge` in header when outcome is set (not pending)
   - Added state management for outcome tracker modal visibility
   - Integrated `OutcomeTracker` modal component

7. **src/components/preview/Preview.tsx**
   - Added outcome watermark that displays over status watermark when set
   - Won watermark: Green text with diagonal background watermark and bottom-right stamp
   - Lost watermark: Red text with diagonal background watermark and bottom-right stamp
   - On Hold watermark: Amber text with diagonal background watermark and bottom-right stamp
   - Watermarks visible in preview mode and print

---

## 2026-01-30

### Changes: Theme Presets Removed

- **Removed:** Theme Presets feature from UI (`ThemeSelector` removed from `Layout.tsx`)
  - Reason: Feature was partially implemented but didn't affect preview output
  - CSS variable system remains in codebase for future theming overhaul
  - Added deferred status note in `feature_roadmap.md`

### Major Feature Release - 10 New Client-Side Features

**Phase 1 (Completed 2026-01-30):**
1. Load from Template
2. Approval Workflow
3. Expiration Dates
4. Currency Support
5. Dynamic Pricing
6. Cover Page Designer

**Phase 2 (Completed 2026-01-30):**
7. AI Writing Assistant - Template-based content generation for Executive Summary, Scope, Objectives, Team
8. Win/Loss Tracking - Track proposal outcomes with reasons and deal values
9. Revenue Dashboard - Pipeline analytics, win rates, deal values, monthly trends
10. Export Modal - Unified export UI (PDF and JSON, with Word/PPTX/XLSX coming soon)

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
   - - No logo display
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
