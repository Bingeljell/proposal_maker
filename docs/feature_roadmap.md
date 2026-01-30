# Feature Roadmap

This document outlines planned features and enhancements for Proposal Maker.

---

## Planned Features

### 1. Load from Template ⭐ HIGH PRIORITY

**Description:**
Allow users to quickly populate proposal sections using pre-defined templates. This will significantly speed up proposal creation by providing common configurations for scope of work, rate cards, team structures, and more.

**Scope:**
- **Template Library:** A collection of reusable templates for:
  - **Scope of Work Templates:** Pre-defined service categories with typical deliverables (e.g., "Social Media Package", "Video Production", "Brand Identity")
  - **Rate Card Templates:** Standard pricing structures for different service types
  - **Team Structure Templates:** Common team configurations (e.g., "Small Project Team", "Full-Service Team")
  - **Terms & Conditions Templates:** Standard legal clauses for different contract types
  - **Full Proposal Templates:** Complete proposal structures for common project types

**Implementation Notes:**
- Templates will be stored as JSON files in a `templates/` directory
- Users can browse and preview templates before applying
- Templates can be applied to specific sections or the entire proposal
- Users can save their current proposal as a custom template for future use

**Priority:** High  
**Status:** Pure client-side ✅

---

### 2. Content & Writing

| Feature | Description | Priority | Status |
|---------|-------------|----------|--------|
| ~~Content Library~~ | ~~Save reusable snippets (boilerplate text, case studies, testimonials)~~ | ✅ | **Completed 2026-01-28** |
| AI Writing Assistant | Auto-generate scope descriptions, executive summaries, or rewrite content for different tones | Medium | Client-side |
| Grammar/Spell Check | Integrated proofreading throughout the proposal | Low | Client-side |
| Smart Suggestions | Recommend services based on client industry or project type | Low | Client-side |

---

### 3. Customization & Branding

| Feature | Description | Priority | Status |
|---------|-------------|----------|--------|
| ~~Dark Mode~~ | ~~Toggle between light and dark themes for the builder~~ | ✅ | **Completed 2026-01-28** |
| ~~Theme Presets~~ | ~~Multiple visual styles (Modern, Classic, Minimal, Bold)~~ | ⏸️ | **Deferred - see note below** |
| Cover Page Designer | Visual editor for the intro page | Medium | Client-side |
| Multi-brand Support | Switch between different agency brands | Low | Client-side |
| Custom CSS | Advanced users can add their own styles | Low | Client-side |

---

### 4. Collaboration & Workflow

| Feature | Description | Priority | Status |
|---------|-------------|----------|--------|
| Approval Workflow | Mark proposals as Draft → Review → Final → Sent | Medium | Client-side |
| E-signature Integration | Built-in signing (DocuSign, HelloSign) | Medium | Requires backend |
| Shareable Preview Links | Send clients a view-only link | High | ⚠️ **Requires backend/hosting** |
| Comments/Annotations | Add internal notes to sections | Low | Client-side |

---

### 5. Business Intelligence

| Feature | Description | Priority | Status |
|---------|-------------|----------|--------|
| Expiration Dates | Auto-expire proposals after a set date | Medium | Client-side |
| Proposal Analytics | Track when clients view proposals, time spent per section | Medium | ⚠️ Requires backend |
| Win/Loss Tracking | Record outcomes to calculate conversion rates | Low | Client-side |
| Revenue Dashboard | Total pipeline value, won revenue, average deal size | Low | Client-side |

---

### 6. Data & Integrations

| Feature | Description | Priority | Status |
|---------|-------------|----------|--------|
| Currency Support | Multi-currency with automatic conversion | Medium | Client-side |
| CRM Integration | Pull client data from HubSpot, Salesforce, Pipedrive | Medium | ⚠️ Requires API/backend |
| Calendar Integration | Add project timelines with Gantt-style visuals | Low | Client-side |
| Cloud Sync | Auto-save to Google Drive/Dropbox | Low | ⚠️ Requires OAuth/backend |

---

### 7. Export & Delivery

| Feature | Description | Priority | Status |
|---------|-------------|----------|--------|
| Multiple Export Formats | Word, PowerPoint, Excel (for costing) | Medium | Client-side |
| Email Templates | Pre-written emails to send with proposals | Low | Client-side |
| Password Protection | Secure sensitive proposals | Low | Client-side |
| QR Code Generation | For easy mobile access | Low | Client-side |
| Deployment | One-click deploy to GitHub Pages/Netlify | Low | ⚠️ Requires tooling |

---

### 8. Advanced Features

| Feature | Description | Priority | Status |
|---------|-------------|----------|--------|
| ~~Package Builder~~ | ~~Bundle services into tiered packages (Basic/Standard/Premium)~~ | ✅ | **Completed 2026-01-28** |
| ~~Questionnaire Mode~~ | ~~Send clients a form to auto-populate the proposal~~ | ✅ | **Completed 2026-01-28** |
| ~~Duplicate/Clone~~ | ~~Copy existing proposals as starting points~~ | ✅ | **Completed 2026-01-28** |
| Dynamic Pricing | Formulas based on quantities (e.g., "Price per video × number of videos") | Medium | Client-side |
| Version Control | Built-in versioning with diff view between proposal versions | Low | Client-side |
| Multi-language Support | Support for proposals in multiple languages | Low | Client-side |

---

## Completed Features

| Feature | Completion Date |
|---------|-----------------|
| **Dark Mode** | 2026-01-28 |
| **Duplicate/Clone Proposal** | 2026-01-28 |
| **Content Library** | 2026-01-28 |
| **Package Builder** | 2026-01-28 |
| **Questionnaire Mode** | 2026-01-28 |
| Manual Page Breaks | 2026-01-26 |
| Rate Card Section | 2026-01-26 |
| Section Visibility Toggle | 2026-01-26 |
| Save/Load JSON | 2026-01-22 |
| Print-Optimized Output | 2026-01-22 |
| Rich Text Editor | 2026-01-20 |
| Logo Upload (Base64) | 2026-01-20 |

---

## Client-Side First Strategy

Features marked **"Client-side"** can be implemented immediately without any backend infrastructure.  
Features marked **"⚠️ Requires backend"** will be deferred until backend infrastructure is available.

**Current Focus:** Load from Template (High Priority, Client-side ✅)

---

## Deferred Features

### Theme Presets (Deferred)
**Status:** Partially implemented but removed from UI  
**Reason:** The feature required extensive refactoring of ProposalSections.tsx to use CSS variables instead of hardcoded Tailwind classes. The implementation complexity outweighed the immediate value.  
**Path forward:** Revisit when doing a comprehensive UI theming overhaul.

### Backend-Required Features (Pending Discussion)
The following features require backend infrastructure and need to be discussed:

| Feature | Why Backend Needed |
|---------|-------------------|
| **Shareable Preview Links** | Need server to host and serve proposals at unique URLs |
| **Proposal Analytics** | Need to track views, time spent - requires server-side logging |
| **CRM Integration** | API calls to HubSpot/Salesforce need secure credentials storage |
| **Cloud Sync** | OAuth + file storage (Google Drive/Dropbox) |
| **E-signature Integration** | DocuSign/HelloSign webhooks and API |

**Discussion needed:** Do we want to:
1. Keep the app purely client-side (simple, no hosting costs)?
2. Add a lightweight backend for specific features?
3. Use serverless functions for specific APIs?
