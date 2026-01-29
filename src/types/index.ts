export type SectionId = 
  | 'intro' 
  | 'history' 
  | 'summary' 
  | 'scope' 
  | 'client-req' 
  | 'out-of-scope' 
  | 'team' 
  | 'costing' 
  | 'ratecard'
  | 'terms' 
  | 'sign-off';

export interface Proposal {
  id: string;
  meta: ProposalMeta;
  sectionVisibility: Record<SectionId, boolean>;
  pageBreaks: PageBreak[];
  versionHistory: VersionHistoryItem[];
  execSummary: ExecSummary;
  scope: ScopeSection[];
  clientResponsibilities: string[];
  outOfScope: string[];
  team: TeamMember[];
  costing: CostingSection[];
  rateCard: RateCardSection[];
  terms: string;
  signOff: SignOff;
}

export interface ProposalMeta {
  title: string;
  clientName: string;
  date: string;
  logo: string | null; // Base64 string
}

export interface VersionHistoryItem {
  id: string;
  version: string;
  date: string;
  author: string;
  notes: string;
}

export interface ExecSummary {
  summary: string;
  objectives: string;
}

export interface ScopeSection {
  id: string;
  name: string; // Service Header (e.g. "Social Media")
  description: string; // High level description
  deliverables: DeliverableItem[];
}

export interface DeliverableItem {
  id: string;
  description: string; // "Instagram Reels"
  quantity: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  allocation: number; // Percentage (0-100)
  description: string; // Job Description
  image: string | null; // Base64 or URL
}

export interface CostingSection {
  id: string;
  title: string; // "Development Phase"
  items: CostItem[];
}

export interface CostItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface RateCardSection {
  id: string;
  name: string; // Category Head
  description: string;
  items: RateCardItem[];
}

export interface RateCardItem {
  id: string;
  description: string;
  comment: string;
  quantity: number;
  unitCost: number;
}

export type PageBreakTargetType =
  | 'scope-category'
  | 'scope-deliverable'
  | 'ratecard-category'
  | 'ratecard-item'
  | 'team-member'
  | 'costing-category'
  | 'costing-item';

export interface PageBreak {
  id: string;
  targetId: string;
  targetType: PageBreakTargetType;
}

export interface SignOff {
  disclaimer: string;
  website: string;
  socials: string; // Could be structured, keeping simple for now
  showSignatures: boolean;
}

export type ContentSnippetCategory = 'scope' | 'rate' | 'testimonial' | 'general';

export interface ContentSnippet {
  id: string;
  name: string;
  content: string;
  category: ContentSnippetCategory;
}
