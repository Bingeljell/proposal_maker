2026-01-26

- Added: "Rate Card" section with categories and line items (Description, Comment, Qty, Unit Cost); reordering (Up/Down) for both Rate Card categories and deliverables in "Scope of Work"; Section visibility toggle in `Sidebar.tsx` with Eye icons; "Hidden from proposal" warning banner in `Layout.tsx`.
- Changed: Split `TermsAndSignOff` into independent `Terms` and `SignOffSection` components; refactored `Preview.tsx` for dynamic rendering; updated `ProposalContext.tsx` with migration logic for `sectionVisibility` and `rateCard`.

2026-01-23

- Added: `AGENTS.md` with workflow rules (new file; no functions/methods changed).
- Changed: `Agents.md` -> `AGENTS.md` rename for tooling conventions; `docs/changelog.md` reformatted to one bullet per change type and updated to log the agent instructions (no functions/methods changed).

2026-01-22

- Changed: Added print break fallbacks and @page margins in `src/index.css` (utilities `break-before-page`, `break-inside-avoid`, `break-after-avoid`, print @page settings); adjusted print-safe layout in `src/components/preview/ProposalSections.tsx` (ScopeOfWork, Requirements, OutOfScope, Team, Commercials, TermsAndSignOff) to avoid split cards/tables and hide print divider borders.
