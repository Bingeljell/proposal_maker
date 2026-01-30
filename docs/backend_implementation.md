# Backend Implementation Strategy

This document outlines the architecture, security, and implementation plan for transitioning "The Decent Proposal" to a hybrid architecture using Supabase.

---

## 1. Architecture Overview

To support features like **Shareable Links**, **Proposal Analytics**, and **Cloud Persistence**, we will adopt the following stack:

*   **Frontend Hosting:** Cloudflare Pages (Static Assets).
*   **Database & Backend:** Supabase (PostgreSQL).
*   **Authentication:** Supabase Auth (Google & Email).
*   **File Storage:** Supabase Storage (for non-embedded assets, if needed).

## 2. Data Model (PostgreSQL)

### `proposals` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` | Primary Key (Public identifier for sharing) |
| `user_id` | `uuid` | References `auth.users` (Owner) |
| `data` | `jsonb` | The complete proposal JSON blob |
| `is_public` | `boolean` | Toggle for shareable link activation |
| `created_at` | `timestamp` | Audit field |
| `updated_at` | `timestamp` | Audit field |

### `analytics_events` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | `bigint` | Primary Key |
| `proposal_id` | `uuid` | References `proposals.id` |
| `event_type` | `text` | e.g., 'view', 'print', 'export' |
| `metadata` | `jsonb` | Browser info, time spent (no PII) |
| `created_at` | `timestamp` | Event time |

## 3. Security & Privacy

### Row Level Security (RLS)
We will enforce privacy directly at the database level using Supabase RLS:

1.  **Strict Ownership:** Only the user who created a proposal can `INSERT`, `UPDATE`, or `DELETE` it (`auth.uid() = user_id`).
2.  **Controlled Sharing:** 
    *   Anonymous users can `SELECT` (view) a proposal **ONLY IF** `is_public` is true.
    *   The 128-bit UUID format makes "guessing" URLs virtually impossible.
3.  **Privacy-First Analytics:**
    *   No personally identifiable information (PII) of the client (viewer) is stored.
    *   Analytics are internal and not shared with third-party trackers.

## 4. Implementation Phases

### Phase 1: Connectivity
- Install `@supabase/supabase-js`.
- Configure environment variables for Cloudflare Pages.
- Initialize Supabase client utility.

### Phase 2: Authentication
- Add "Sign In" flow to the Sidebar.
- Map local `ProposalContext` to sync with Supabase for authenticated users.

### Phase 3: Sharing & Analytics
- Implement "Publish" toggle in the UI.
- Create the `/p/:id` route for the read-only client preview.
- Implement event logging for views and interaction tracking.

### Phase 4: Cloud Library
- Move the **Content Library** from `localStorage` to Supabase to allow cross-device access.
