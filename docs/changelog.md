2026-01-26

- Added: Section visibility toggle in `Sidebar.tsx` with Eye icons (Blue for included, Red for excluded); "Hidden from proposal" warning banner in `Layout.tsx` for hidden sections; `sectionVisibility` property to `Proposal` type and `initialProposal`.
- Changed: Split `TermsAndSignOff` into independent `Terms` and `SignOffSection` components in `ProposalSections.tsx`; refactored `Preview.tsx` to dynamically render content and Table of Contents based on visibility settings; updated `ProposalContext.tsx` with data migration logic for `sectionVisibility`.

2026-01-23

- Added: `AGENTS.md` with workflow rules (new file; no functions/methods changed).
- Changed: `Agents.md` -> `AGENTS.md` rename for tooling conventions; `docs/changelog.md` reformatted to one bullet per change type and updated to log the agent instructions (no functions/methods changed).

2026-01-22

- Changed: Added print break fallbacks and @page margins in `src/index.css` (utilities `break-before-page`, `break-inside-avoid`, `break-after-avoid`, print @page settings); adjusted print-safe layout in `src/components/preview/ProposalSections.tsx` (ScopeOfWork, Requirements, OutOfScope, Team, Commercials, TermsAndSignOff) to avoid split cards/tables and hide print divider borders.
