# Backend Implementation Strategy

This document outlines the architecture, security, and implementation plan for transitioning "Proposal Maker" to a hybrid architecture using Supabase.

---

## 1. Architecture Overview

To support features like **Shareable Links**, **Proposal Analytics**, **Cross-Device Editing**, and **Cloud Persistence**, we will adopt the following stack:

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend Hosting** | Cloudflare Pages | Static assets, global CDN |
| **Database & Backend** | Supabase (PostgreSQL) | Data persistence, real-time sync |
| **Authentication** | Supabase Auth | Google & Email sign-in |
| **File Storage** | Supabase Storage | Logo uploads, attachments (if needed) |

### Key Design Principles

1. **Cloud-First**: Once authenticated, all data lives in the cloud for cross-device access
2. **Exit-Friendly**: Users can export to Word (.docx) at any time to leave the platform
3. **Privacy-First**: No PII of proposal viewers is stored; analytics are anonymous
4. **Progressive Enhancement**: Works without auth (localStorage), enhanced with auth (cloud sync)

---

## 2. Data Model (PostgreSQL)

### `proposals` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` | Primary Key (Public identifier for sharing) |
| `user_id` | `uuid` | References `auth.users` (Owner) |
| `data` | `jsonb` | The complete proposal JSON blob |
| `is_public` | `boolean` | Toggle for shareable link activation |
| `version` | `integer` | Version counter for conflict resolution |
| `shared_at` | `timestamp` | When proposal was first shared |
| `created_at` | `timestamp` | Audit field |
| `updated_at` | `timestamp` | Audit field |

### `analytics_events` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | `bigint` | Primary Key |
| `proposal_id` | `uuid` | References `proposals.id` |
| `event_type` | `text` | 'view', 'section_view', 'scroll', 'time_spent', 'export', 'print' |
| `section_id` | `text` | Which section was viewed (for section analytics) |
| `time_spent_seconds` | `integer` | Time spent on section/page |
| `scroll_depth_percent` | `integer` | How far user scrolled |
| `session_id` | `text` | Groups events from same viewing session |
| `metadata` | `jsonb` | Browser info, viewport (no PII) |
| `created_at` | `timestamp` | Event time |

**Data Retention**: Analytics events auto-delete after 90 days to manage database size.

### `content_library` Table (Cloud Content Library)

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` | Primary Key |
| `user_id` | `uuid` | References `auth.users` (Owner) |
| `name` | `text` | Snippet name |
| `content` | `text` | HTML content |
| `category` | `text` | 'scope', 'rate', 'testimonial', 'general' |
| `created_at` | `timestamp` | Audit field |

---

## 3. Security & Privacy

### Row Level Security (RLS) Policies

We enforce privacy directly at the database level:

```sql
-- Users can only access their own proposals
CREATE POLICY "Users can only access own proposals"
  ON proposals FOR ALL
  USING (auth.uid() = user_id);

-- Anonymous users can only view public proposals
CREATE POLICY "Public proposals are viewable by everyone"
  ON proposals FOR SELECT
  USING (is_public = true);

-- Analytics: Only proposal owner can view analytics
CREATE POLICY "Only owners can view analytics"
  ON analytics_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM proposals 
      WHERE proposals.id = analytics_events.proposal_id 
      AND proposals.user_id = auth.uid()
    )
  );
```

### Privacy-First Analytics

- **No PII**: Client (viewer) information is never stored
- **Anonymous Sessions**: Session IDs are random, not linked to individuals
- **Opt-in Sharing**: Proposals are private by default; user must explicitly enable sharing
- **UUID Security**: 128-bit UUID format makes URL guessing statistically impossible

---

## 4. Client View Architecture

### Separate Lightweight Client View

Instead of loading the full app for shared links, we create a dedicated client view:

**Route**: `https://proposalmaker.com/view/:id` (or `p/:id`)

**Characteristics**:
- No sidebar, no editing UI, no builder components
- Read-only proposal rendering only
- Includes analytics tracking script for:
  - Page views
  - Section visibility (Intersection Observer)
  - Scroll depth tracking
  - Time spent per section
- Optimized bundle size (~30% of full app)
- Mobile-responsive for client viewing

**Analytics Tracking Implementation**:
```typescript
// Track when each section enters viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      logEvent('section_view', { section_id: entry.target.id });
    }
  });
});

// Track scroll depth
window.addEventListener('scroll', throttle(() => {
  const depth = Math.round((window.scrollY / document.body.scrollHeight) * 100);
  logEvent('scroll', { scroll_depth_percent: depth });
}, 1000));
```

---

## 5. Implementation Phases

### Phase 1: Connectivity & Auth
**Goal**: Establish Supabase connection and authentication

- [ ] Install `@supabase/supabase-js`
- [ ] Configure environment variables for Cloudflare Pages
- [ ] Initialize Supabase client utility
- [ ] Add "Sign In" button to Sidebar
- [ ] Implement Google OAuth and Email magic link
- [ ] Add "Sync to Cloud" prompt for existing local proposals

**Migration Story**: When user first signs in:
1. Detect localStorage proposals
2. Show dialog: "Import X proposals to cloud?"
3. Batch upload to Supabase
4. Clear localStorage after successful sync

### Phase 2: Cloud Persistence
**Goal**: Real-time sync of proposals to cloud

- [ ] Modify `ProposalContext` to sync with Supabase when authenticated
- [ ] Add "Sync status" indicator in UI
- [ ] Implement optimistic updates
- [ ] Add conflict resolution (last-write-wins based on `updated_at`)
- [ ] Version counter increment on each save

### Phase 3: Sharing & Client View
**Goal**: Enable shareable links with analytics

- [ ] Add "Publish" toggle in proposal settings
- [ ] Create `/view/:id` route with lightweight client view
- [ ] Implement analytics tracking in client view
- [ ] Create "Analytics Dashboard" for proposal owners
  - Views over time
  - Section engagement (heatmap)
  - Average time spent
  - Scroll depth distribution

### Phase 4: Cloud Content Library
**Goal**: Cross-device access to content snippets

- [ ] Migrate Content Library from localStorage to Supabase
- [ ] Sync content snippets across devices
- [ ] Add "Default Snippets" for new users (agency templates)

### Phase 5: Advanced Analytics
**Goal**: Deeper insights into proposal performance

- [ ] Aggregate analytics dashboard (across all proposals)
- [ ] Export analytics reports
- [ ] A/B testing different proposal versions

---

## 6. Exit Strategy

Users can leave the platform at any time:

1. **Export to Word**: Already implemented - generates .docx file
2. **Export to PDF**: Print to PDF functionality
3. **JSON Export**: Raw data export (for technical users)

**No Lock-In**: All user data is exportable in standard formats.

---

## 7. Cost Considerations

### Supabase Free Tier Limits
- 500MB database
- 1GB storage  
- 2GB bandwidth/month
- 100K API requests/month

### Estimated Usage
- Average proposal JSON: ~50KB
- 500MB = ~10,000 proposals
- Analytics events: ~1KB each, 90-day retention

**Scaling**: When approaching limits, upgrade to Pro ($25/month) or implement data archival.

---

## 8. Technical Decisions

### Why Supabase over Cloudflare D1?
| Factor | Supabase | Cloudflare D1 |
|--------|----------|---------------|
| Auth | ✅ Built-in | ❌ Manual implementation |
| Maturity | ✅ Production-ready | ⚠️ Still in Beta |
| Real-time | ✅ Built-in subscriptions | ❌ Not available |
| Community | ✅ Large, established | ⚠️ Smaller |
| Edge Performance | ⚠️ Good | ✅ Excellent |

**Verdict**: Supabase wins for faster development and built-in auth.

### Why No Offline Support?
- Primary use case is desktop/laptop with stable internet
- Cloud-first enables cross-device editing (main goal)
- Simpler architecture without service workers and sync logic

---

## 9. Open Questions

1. **Team/Organization Support**: Should multiple users share proposals within an agency?
2. **Custom Domains**: Should users be able to use `proposals.myagency.com`?
3. **White-labeling**: Remove "Proposal Maker" branding on shared links for paid users?
4. **Integrations**: Which CRMs to prioritize? (HubSpot, Salesforce, Pipedrive, Zoho?)

---

## 10. Success Metrics

Track these after launch:
- % of users who enable cloud sync
- Average time from "Draft" to "Sent" status
- Proposal view-to-win conversion rate
- Feature adoption (templates, AI assistant, etc.)
- User retention (returning within 30 days)

---

**Last Updated**: 2026-01-30  
**Status**: Ready for implementation  
**Next Step**: Phase 1 - Connectivity & Auth
