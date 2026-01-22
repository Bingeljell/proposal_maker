# memory.md

## 🧠 Project Overview
A web-based proposal generator tool for advertising agencies, designed to:
- Simplify proposal creation for Account Managers (AMs)
- Use an LLM (Google Gemini API) to auto-generate executive summaries and expand service descriptions
- Output editable, branded HTML proposals with tracking and optional commenting features
- Be mobile-friendly, open source, and easy to deploy
- Serve as a learning project for the developer, who is a beginner with some Python/Flask experience

## 🎯 Goals
1. Learn full-stack development and deployment (real-world, not tutorials)
2. Build something useful for the agency
3. Open-source the tool for other agencies
4. Keep it light, simple, and maintainable
5. Offer a slick, mobile-friendly frontend UX

## 🧰 Current/Planned Tech Stack
| Layer        | Tech                        |
|--------------|-----------------------------|
| Backend      | Flask (Python)              |
| Frontend     | React + Tailwind CSS        |
| Editor       | TipTap (for WYSIWYG editing)|
| LLM API      | Google Gemini               |
| Database     | SQLite (via SQLAlchemy)     |
| Auth         | Flask-Login or Firebase     |
| Hosting      | DigitalOcean Droplet        |
| Analytics    | Custom DB logging or Plausible |

## 🔧 Key Features
- Form-based proposal generation with AI expansion for services
- Executive summary auto-filled by LLM
- Predefined branded templates
- WYSIWYG editing of the generated proposal
- Publish to unique, password-protected client link
- Basic analytics (view count)
- AM login system with dashboard
- Future: inline commenting by clients

## 🗺️ Suggested Roadmap (High-level)
### Phase 1: MVP
- AM login
- Proposal form
- LLM integration for summary + services
- HTML proposal output
- Basic view tracking

### Phase 2: UX Enhancements
- WYSIWYG editor (TipTap)
- Password-protected client links
- AM dashboard

### Phase 3: Client Collaboration
- Highlight + comment
- Notifications to AMs
- Link access controls

## 💡 Dev Suggestions
- Stick with Flask + React for now — it's beginner-friendly and supports your goals
- Use SQLAlchemy to make DB upgrades easier later
- Consider Vite for React setup
- Optional: explore HTMX if you ever want to go full Flask without React

---

