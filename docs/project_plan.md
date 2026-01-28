# Proposal Generator - Project Plan

## 1. Project Goal
Build a lightweight, client-side web application ("Proposal Maker") that allows users to create professional, branded proposals for advertising/creative services. The tool will function like a document builder: users input data via forms, and the app renders a beautiful, print-ready web page that can be exported as a PDF.

## 2. Core Philosophy
*   **Client-Side Only:** No backend, no database.
*   **Stateless Tool:** The app is a "processor". Data is saved by the user as a `.json` file and can be re-uploaded to resume editing.
*   **Print-First Design:** The HTML output is optimized for "Print to PDF" functionality.
*   **Organic UX:** Clean input forms -> Real-time or On-demand Preview.

## 3. Proposal Structure (Sections)
The proposal will consist of the following ordered sections:

1.  **Intro Page:**
    *   Company Logo.
    *   Proposal Title.
    *   Client Name.
    *   Date.
2.  **Version History:**
    *   Table with columns: Version #, Date, Author, Notes.
    *   Ability to add rows for each iteration.
3.  **Table of Contents (Index):**
    *   Auto-generated list of sections.
    *   On-screen: Clickable anchor links.
    *   Print: Visual index.
4.  **Executive Summary & Objectives:**
    *   Rich text block for Summary.
    *   Highlighted "Objectives" section.
5.  **Scope of Work (SOW):**
    *   Split into **Services** (Header, Description) and **Deliverables** (Quantified list).
    *   *Example:* Header: "Social Media", Deliverables: "20 Videos", "10 Statics".
6.  **Client Responsibilities:**
    *   List of items the client must provide (e.g., Brand Assets, Product Samples).
7.  **Out of Scope:**
    *   List of exclusions (e.g., Media Budget, 3rd Party Licenses).
8.  **Proposed Team Structure:**
    *   List/Grid of team members (Name, Role, Headshot/Avatar).
9.  **Commercials (Costing):**
    *   Dynamic table with headers (Service Name) and rows (Line Items).
    *   Columns: Item, Description, Cost (INR).
    *   Auto-calculation of totals.
10. **Terms & Conditions:**
    *   Standard legal text block (editable).
11. **Sign-off & Contact:**
    *   Disclaimer.
    *   Agency Website, Social Handles, Address.
    *   Signature block.

## 4. Technical Stack
*   **Framework:** React (via Vite).
*   **Styling:** Tailwind CSS (Crucial for print layout utility classes) + `@tailwindcss/typography` plugin.
*   **Rich Text Editor:** Tiptap (Headless wrapper around ProseMirror).
    *   `@tiptap/react`: React integration.
    *   `@tiptap/starter-kit`: Core extensions (Bold, Italic, Lists, etc.).
    *   `@tiptap/extension-text-style`: For custom styling like font sizes.
*   **Icons:** Lucide React.
*   **Utilities:** `clsx` for class name merging.
*   **Data Format:** JSON (for saving/loading proposals).
*   **Deployment:** Static hosting (e.g., Vercel/Netlify/GitHub Pages).

## 5. Phased Implementation Plan

### Phase 1: Setup & Scaffolding
*   [x] Clean up legacy files.
*   [x] Initialize Vite + React project.
*   [x] Configure Tailwind CSS.
*   [x] Set up project folder structure (`components`, `styles`, `utils`).

### Phase 2: Data Model & State Management
*   [x] Define the TypeScript interfaces/JSON schema for the proposal.
*   [x] Create the "Save to JSON" and "Load from JSON" utility functions.
*   [x] Set up the main React Context or State store to hold the proposal data.

### Phase 3: The Builder UI (Input)
*   [x] Create a sidebar/navigation for jumping between sections.
*   [x] Implement input forms for basic text fields (Intro, Summary).
*   [x] Implement dynamic list forms (Version History, Team, Deliverables).
*   [x] Implement the Costing Table builder (Add row, Add Section, Calculate Totals).

### Phase 4: The Preview UI (Output)
*   [x] Create the "A4 Page" layout component.
*   [x] Implement the render view for each section.
*   [x] Add "Print" CSS styles (page breaks, hiding UI elements).
*   [x] Ensure typography and spacing look professional.

### Phase 5: Polish & Refine
*   [x] Add "Logo Upload" (convert to Base64 for JSON portability).
*   [x] Refine the UI (Transitions, empty states).
*   [x] Test "Save/Load" flow with realistic data.
*   [x] Final "Print to PDF" testing.

## 6. Future Enhancements (Backlog)
*   AI Integration: "Auto-fill Scope" button using Gemini.
*   Theming: Color pickers to match client branding.
*   Deployment: Push to GitHub Pages.