2026-01-28

- Fixed: Added missing `break-before-page` class to `ScopeOfWork` component in `ProposalSections.tsx` to ensure it starts on a new page when printing to PDF.
- Changed: Added `proposalName` field to `ProposalMeta` type for separate file naming (independent of proposal title).
- Changed: Updated `saveToFile()` in ProposalContext to use `proposalName` if provided, otherwise falls back to `title`.
- Changed: Updated `document.title` in `Layout.tsx` to use `proposalName` for default PDF filename when printing.
- Changed: Added Proposal File Name input field in `IntroForm.tsx` with help text explaining its purpose.
- Changed: Updated header in `Layout.tsx` to display `proposalName` when available.
- Changed: Added migration logic for `proposalName` field in ProposalContext for backward compatibility.
- Added: Implemented **Questionnaire Mode** with interactive questionnaire (`QuestionnaireModal.tsx`) that recommends packages based on client responses.
- Added: Created default questionnaire (`defaultQuestionnaire.json`) with budget, timeline, and services questions.
- Added: Smart package recommendation algorithm based on budget and project goals.
- Added: Implemented **Package Builder** feature with pre-defined package templates (`src/data/defaultPackages.json`), package selector modal (`PackageSelector.tsx`), and `applyPackage()` function in ProposalContext.
- Added: Created `PackageTemplate` and `Questionnaire` types in `src/types/index.ts`.
- Added: Default packages: "Social Media Starter" (₹45k), "Digital Growth Package" (₹95k), "Full-Service Premium" (₹185k).
- Added: Implemented **Dark Mode** feature with `useDarkMode` hook (`src/hooks/useDarkMode.ts`), sun/moon toggle in header, and full dark theme support across all UI components.
- Changed: Updated Tailwind config to enable `darkMode: 'class'` strategy.
- Changed: Updated `Layout.tsx`, `Sidebar.tsx`, `IntroForm.tsx`, `ScopeForm.tsx`, `RichTextEditor.tsx`, `ContentLibraryModal.tsx`, and `ContentLibraryManager.tsx` with dark mode classes.
- Changed: Updated `docs/feature_roadmap.md` to mark **Duplicate/Clone**, **Content Library**, and **Dark Mode** as completed features.
- Added: Implemented `duplicateProposal()` function in `src/context/ProposalContext.tsx` to create a copy of the current proposal with cleared history and updated title/date.
- Added: Created `defaultContentSnippets.json` with default advertising agency snippets for scope, rate card, testimonials, and general content.
- Added: Created `useContentLibrary` hook in `src/hooks/useContentLibrary.ts` to manage content snippets with localStorage persistence.
- Added: Created `ContentLibraryModal` component in `src/components/ui/ContentLibraryModal.tsx` for browsing and inserting snippets with category filtering.
- Added: Created `ContentLibraryManager` component in `src/components/ui/ContentLibraryManager.tsx` for adding, editing, and deleting custom snippets.
- Added: Integrated content library into `RichTextEditor` with "Insert Snippet" button and modal.
- Added: Added `ContentSnippet` and `ContentSnippetCategory` types to `src/types/index.ts`.
- Changed: Updated `Sidebar.tsx` to include "Duplicate Proposal" and "Content Library" action buttons.
- Changed: Updated `AGENTS.md` with changelog format specification.
- Changed: Marked Phase 5 items as complete in `docs/project_plan.md`.
- Added: Expanded `docs/feature_roadmap.md` with comprehensive feature categories: Content & Writing, Customization & Branding, Collaboration & Workflow, Business Intelligence, Data & Integrations, Export & Delivery, and Advanced Features.
- Added: Created `docs/feature_roadmap.md` with planned features including "Load from Template" functionality and backlog items.
- Added: Created `README.md` with project overview, setup instructions, usage guide, and documentation references.

2026-01-26

- Added: Manual page break data model and inline break support — `pageBreaks` in `src/types/index.ts`, defaults in `src/data/initialProposal.ts`, migrations in `src/context/ProposalContext.tsx`, marker styling in `src/index.css`, and RichTextEditor `PageBreak` node/toolbar insert in `src/components/ui/RichTextEditor.tsx`.
- Changed: Builder controls now toggle break-before markers in `src/components/builder/ScopeForm.tsx`, `RateCardForm.tsx`, `TeamForm.tsx`, `CostingForm.tsx`; preview renders markers for scope/ratecard/team/commercials in `src/components/preview/ProposalSections.tsx` so breaks show in Preview but not in print.

2026-01-26

- Added: "Rate Card" section with categories and line items (Description, Comment, Qty, Unit Cost); reordering (Up/Down) for both Rate Card categories and deliverables in "Scope of Work".
- Added: Section visibility toggle in `Sidebar.tsx` with Eye icons (Blue for included, Red for excluded); "Hidden from proposal" warning banner in `Layout.tsx` for hidden sections; `sectionVisibility` property to `Proposal` type and `initialProposal`.
- Changed: Split `TermsAndSignOff` into independent `Terms` and `SignOffSection` components; refactored `Preview.tsx` for dynamic rendering; updated `ProposalContext.tsx` with migration logic for `sectionVisibility` and `rateCard`.

2026-01-26

- Changed: Reverted print break adjustments in `src/components/preview/ProposalSections.tsx` (ScopeOfWork, Commercials render loops) so categories can split as before; updated `docs/changelog.md`.

2026-01-23

- Added: `AGENTS.md` with workflow rules (new file; no functions/methods changed).
- Changed: `Agents.md` -> `AGENTS.md` rename for tooling conventions; `docs/changelog.md` reformatted to one bullet per change type and updated to log the agent instructions (no functions/methods changed).

2026-01-22

- Changed: Added print break fallbacks and @page margins in `src/index.css` (utilities `break-before-page`, `break-inside-avoid`, `break-after-avoid`, print @page settings); adjusted print-safe layout in `src/components/preview/ProposalSections.tsx` (ScopeOfWork, Requirements, OutOfScope, Team, Commercials, TermsAndSignOff) to avoid split cards/tables and hide print divider borders.
