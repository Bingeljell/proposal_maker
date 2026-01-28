2026-01-28

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
