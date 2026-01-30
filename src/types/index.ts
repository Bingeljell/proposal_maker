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

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | 'SGD' | 'AED';

export type ProposalStatus = 'draft' | 'review' | 'final' | 'sent';

export interface StatusHistoryItem {
  status: ProposalStatus;
  timestamp: string;
  changedBy?: string;
}

export interface CurrencyConfig {
  symbol: string;
  locale: string;
  name: string;
  code: Currency;
}

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
  pricingVariables: PricingVariable[];
  status: ProposalStatus;
  statusHistory?: StatusHistoryItem[];
}

export type CoverLayout = 'centered' | 'left-aligned' | 'split' | 'minimal';

export interface CoverStyle {
  layout: CoverLayout;
  showDecorativeElements: boolean;
  backgroundPattern?: 'none' | 'dots' | 'lines' | 'gradient';
  accentColor?: string;
  fontSize: 'compact' | 'normal' | 'large';
}

export interface ProposalMeta {
  title: string;
  clientName: string;
  date: string;
  logo: string | null; // Base64 string
  proposalName: string; // For file naming, separate from title
  expiresAt?: string; // ISO date string for proposal expiration
  validityDays?: number; // Number of days until expiration (for auto-calculation)
  currency?: Currency; // Optional for backward compatibility, defaults to 'INR'
  coverStyle?: CoverStyle; // Optional for backward compatibility
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
  useFormula?: boolean;
  formula?: string; // e.g. "{videos} * 5000 + {posts} * 1000"
  variables?: Record<string, number>; // Local variables override
  calculatedRate?: number; // The calculated value from formula
  formulaError?: string; // Error message if formula is invalid
}

export interface PricingVariable {
  id: string;
  name: string; // Display name (e.g., "Number of Videos")
  key: string; // Variable key (e.g., "videos") - used in formulas
  value: number;
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

// Template Types
export type TemplateCategory = 'full' | 'scope' | 'ratecard' | 'team' | 'terms';

export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  isCustom?: boolean;
  createdAt?: string;
  // Optional partial Proposal data
  execSummary?: ExecSummary;
  scope?: ScopeSection[];
  clientResponsibilities?: string[];
  outOfScope?: string[];
  team?: TeamMember[];
  costing?: CostingSection[];
  rateCard?: RateCardSection[];
  terms?: string;
  signOff?: SignOff;
}

// Package Builder Types
export interface PackageTemplate {
  id: string;
  name: string;
  description: string;
  tier: 'basic' | 'standard' | 'premium' | 'custom';
  scope: ScopeSection[];
  rateCard: RateCardSection[];
  team: TeamMember[];
  execSummary: ExecSummary;
  estimatedPrice: number;
}

// Questionnaire Types
export interface QuestionnaireQuestion {
  id: string;
  question: string;
  type: 'single_choice' | 'multiple_choice' | 'text' | 'budget' | 'timeline';
  options?: string[];
  required: boolean;
}

export interface QuestionnaireResponse {
  questionId: string;
  answer: string | string[];
}

export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  questions: QuestionnaireQuestion[];
  recommendedPackage?: string; // PackageTemplate ID
}

// ============ Theme Presets Types ============

export type ThemePreset = 'modern' | 'classic' | 'minimal' | 'bold';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textMuted: string;
  background: string;
  backgroundAlt: string;
  border: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
  mono: string;
}

export interface ThemeSpacing {
  pagePadding: string;
  sectionGap: string;
  elementGap: string;
  compact: boolean;
}

export interface ThemeBorderRadius {
  small: string;
  medium: string;
  large: string;
  card: string;
}

export interface ThemeSettings {
  id: ThemePreset;
  name: string;
  description: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  showTricolorLine: boolean;
  headingStyle: 'uppercase' | 'capitalize' | 'normal';
  tableStyle: 'striped' | 'bordered' | 'minimal';
  cardStyle: 'shadow' | 'border' | 'flat';
}

export interface ThemeContextState {
  currentTheme: ThemePreset;
  setTheme: (theme: ThemePreset) => void;
  themeSettings: ThemeSettings;
}
