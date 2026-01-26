export type SectionId = 
  | 'intro' 
  | 'history' 
  | 'summary' 
  | 'scope' 
  | 'client-req' 
  | 'out-of-scope' 
  | 'team' 
  | 'costing' 
  | 'terms' 
  | 'sign-off';

export interface Proposal {
  id: string;
  meta: ProposalMeta;
  sectionVisibility: Record<SectionId, boolean>;
  versionHistory: VersionHistoryItem[];
  execSummary: ExecSummary;
  scope: ScopeSection[];
  clientResponsibilities: string[];
  outOfScope: string[];
  team: TeamMember[];
  costing: CostingSection[];
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

export interface SignOff {
  disclaimer: string;
  website: string;
  socials: string; // Could be structured, keeping simple for now
  showSignatures: boolean;
}
