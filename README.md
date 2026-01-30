# The Decent Proposal

> "Because Demi Moore won't win you the business"

A lightweight, client-side web application for creating professional, branded proposals for advertising and creative services. Built with React and Tailwind CSS.

---

## What It Does

Proposal Maker functions like a document builder:

1. **Input Data via Forms** — Fill in proposal details through an intuitive sidebar interface
2. **Preview in Real-Time** — See your proposal rendered beautifully as you edit
3. **Export as PDF** — Print the preview page to PDF for a professional deliverable

### Proposal Sections

The tool generates proposals with the following sections:

| Section | Description |
|---------|-------------|
| **Intro Page** | Company logo, proposal title, client name, and date |
| **Version History** | Track iterations with version numbers, dates, authors, and notes |
| **Table of Contents** | Auto-generated index with clickable anchor links |
| **Executive Summary & Objectives** | Rich text summary with highlighted objectives |
| **Scope of Work** | Services and deliverables with quantified lists |
| **Rate Card** | Service categories with line items (Description, Comment, Qty, Unit Cost) |
| **Client Responsibilities** | List of items the client must provide |
| **Out of Scope** | Exclusions and boundaries |
| **Proposed Team Structure** | Team members with roles and avatars |
| **Commercials (Costing)** | Dynamic costing table with auto-calculated totals |
| **Terms & Conditions** | Editable legal text block |
| **Sign-off & Contact** | Disclaimer, agency details, and signature block |

### Key Features

- **Client-Side Only** — No backend or database required; runs entirely in your browser
- **Save & Resume** — Export your work as a `.json` file and re-upload to continue editing
- **Section Visibility Toggle** — Show/hide sections as needed for different proposals
- **Manual Page Breaks** — Control exactly where pages break in the PDF output
- **Print-Optimized** — CSS tuned for clean, professional PDF generation
- **Rich Text Editing** — Tiptap-powered editor for formatted content

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool and dev server |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling with print-friendly utilities |
| **Tiptap** | Rich text editor |
| **Lucide React** | Icons |
| **clsx** | Conditional class merging |

---

## Project Structure

```
src/
├── components/
│   ├── builder/          # Form components for each section
│   │   ├── IntroForm.tsx
│   │   ├── ScopeForm.tsx
│   │   ├── CostingForm.tsx
│   │   └── ...
│   ├── layout/           # App layout and sidebar
│   │   ├── Layout.tsx
│   │   └── Sidebar.tsx
│   ├── preview/          # PDF preview components
│   │   ├── Preview.tsx
│   │   └── ProposalSections.tsx
│   └── ui/               # Shared UI components
│       └── RichTextEditor.tsx
├── context/              # React context for proposal state
│   └── ProposalContext.tsx
├── data/                 # Default proposal data
│   └── initialProposal.ts
├── hooks/                # Custom React hooks
│   └── useProposal.ts
├── types/                # TypeScript interfaces
│   └── index.ts
├── styles/               # Additional styles
├── utils/                # Utility functions
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── index.css             # Global styles with print CSS
```

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. **Clone or download the repository**

   ```bash
   cd proposal_maker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in your browser**

   Navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready for static hosting on Vercel, Netlify, GitHub Pages, or any static host.

### Preview Production Build

```bash
npm run preview
```

---

## Usage Guide

### Creating a Proposal

1. **Fill in the Forms** — Use the sidebar to navigate between sections and enter your proposal data
2. **Toggle Section Visibility** — Click the eye icon next to any section to include/exclude it from the final proposal
3. **Preview Your Work** — The right panel shows a live preview of your proposal
4. **Save Your Progress** — Click "Save JSON" to download your proposal as a file
5. **Export to PDF** — Open the preview in print mode (Ctrl+P / Cmd+P) and save as PDF

### Resuming Work

1. Click "Load JSON" in the sidebar
2. Select your previously saved `.json` file
3. Continue editing where you left off

### Tips for Best PDF Output

- Use Chrome or Edge for printing (best CSS support)
- Select "Save as PDF" as the destination
- Choose "A4" paper size
- Enable "Background graphics" in print settings
- Disable headers/footers if desired

---

## Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint for code quality |

### Adding New Sections

To add a new proposal section:

1. Define the TypeScript interface in `src/types/index.ts`
2. Add default data in `src/data/initialProposal.ts`
3. Create a form component in `src/components/builder/`
4. Add the preview render in `src/components/preview/ProposalSections.tsx`
5. Update the sidebar in `src/components/layout/Sidebar.tsx`

---

## Documentation

- `docs/project_plan.md` — Original project specification and roadmap
- `docs/changelog.md` — Development history and changes
- `AGENTS.md` — Development guidelines for contributors

---

## Future Enhancements

- AI Integration for auto-filling scope sections
- Theming with color pickers for client branding
- Deployed demo on GitHub Pages

---

## License

Private — This is a personal project.
