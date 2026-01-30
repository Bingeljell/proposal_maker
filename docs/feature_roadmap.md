# Feature Roadmap

This document outlines planned features and enhancements for Proposal Maker.

---

## Planned Features

### 1. Load from Template

> **✅ Completed 2026-01-30**

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

---

### 2. Content & Writing

| Feature | Description | Priority |
|---------|-------------|----------|
| ~~AI Writing Assistant~~ | ~~Auto-generate scope descriptions, executive summaries, or rewrite content for different tones~~ | ✅ **Completed 2026-01-30** |
| Grammar/Spell Check | Integrated proofreading throughout the proposal | Low |
| ~~Smart Suggestions~~ | ~~Recommend services based on client industry or project type~~ | ✅ **Completed 2026-01-30** |

---

### 3. Customization & Branding

| Feature | Description | Priority |
|---------|-------------|----------|
| ~~Theme Presets~~ | ~~Multiple visual styles (Modern, Classic, Minimal, Bold)~~ | ✅ **Completed 2026-01-30** |
| Custom CSS | Advanced users can add their own styles | Low |
| Multi-brand Support | Switch between different agency brands | Low |
| ~~Cover Page Designer~~ | ~~Visual editor for the intro page~~ | ✅ **Completed 2026-01-30** |

---

### 4. Collaboration & Workflow

| Feature | Description | Priority |
|---------|-------------|----------|
| Comments/Annotations | Add internal notes to sections | Low |
| Approval Workflow | Mark proposals as Draft → Review → Final → Sent | Medium |
| Shareable Preview Links | Send clients a view-only link | High |
| E-signature Integration | Built-in signing (DocuSign, HelloSign) | Medium |

---

### 5. Business Intelligence

| Feature | Description | Priority |
|---------|-------------|----------|
| Proposal Analytics | Track when clients view proposals, time spent per section | Medium |
| Win/Loss Tracking | Record outcomes to calculate conversion rates | Low |
| Revenue Dashboard | Total pipeline value, won revenue, average deal size | Low |
| Expiration Dates | Auto-expire proposals after a set date | Medium |

---

### 6. Data & Integrations

| Feature | Description | Priority |
|---------|-------------|----------|
| CRM Integration | Pull client data from HubSpot, Salesforce, Pipedrive | Medium |
| Calendar Integration | Add project timelines with Gantt-style visuals | Low |
| Cloud Sync | Auto-save to Google Drive/Dropbox | Low |
| ~~Currency Support~~ | ~~Multi-currency with automatic conversion~~ | ✅ **Completed 2026-01-30** |

---

### 7. Export & Delivery

| Feature | Description | Priority |
|---------|-------------|----------|
| ~~Multiple Export Formats~~ | ~~Word (.docx)~~ | ✅ **Completed 2026-01-30** |
| Email Templates | Pre-written emails to send with proposals | Low |
| Password Protection | Secure sensitive proposals | Low |
| QR Code Generation | For easy mobile access | Low |

---

### 8. Advanced Features

| Feature | Description | Priority |
|---------|-------------|----------|
| ~~Dynamic Pricing~~ | ~~Formulas based on quantities, discounts, and taxes~~ | ✅ **Completed 2026-01-30** |
| ~~Package Builder~~ | ~~Bundle services into tiered packages (Basic/Standard/Premium)~~ | ✅ **Completed 2026-01-28** |
| ~~Questionnaire Mode~~ | ~~Send clients a form to auto-populate the proposal~~ | ✅ **Completed 2026-01-28** |
| ~~Duplicate/Clone~~ | ~~Copy existing proposals as starting points~~ | ✅ **Completed 2026-01-28** |

---

## Original Backlog

| Feature | Description | Priority |
|---------|-------------|----------|
| AI Integration | "Auto-fill Scope" button using Gemini or similar LLM to generate scope content based on project brief | Medium |
| Theming | Color pickers to match client branding; custom fonts; dark mode for builder | Medium |
| Deployment | Push to GitHub Pages or similar static hosting | Low |
| Multi-language Support | Support for proposals in multiple languages | Low |
| Version Control | Built-in versioning with diff view between proposal versions | Low |

---

## Completed Features

| Feature | Completion Date |
|---------|-----------------|
| **Export to Word (.docx)** | 2026-01-30 |
| **Smart Suggestions** | 2026-01-30 |
| **Advanced Cover Patterns** | 2026-01-30 |
| **Currency Support** | 2026-01-30 |
| **Dynamic Pricing** | 2026-01-30 |
| **Cover Page Designer** | 2026-01-30 |
| **AI Writing Assistant** | 2026-01-30 |
| **Theme Presets** | 2026-01-30 |
| **Load from Template** | 2026-01-30 |
| **Duplicate/Clone Proposal** | 2026-01-28 |
| **Content Library** | 2026-01-28 |
| Manual Page Breaks | 2026-01-26 |
| Rate Card Section | 2026-01-26 |
| Section Visibility Toggle | 2026-01-26 |
| Save/Load JSON | 2026-01-22 |
| Print-Optimized Output | 2026-01-22 |
| Rich Text Editor | 2026-01-20 |
| Logo Upload (Base64) | 2026-01-20 |
