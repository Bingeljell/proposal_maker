import { Proposal } from '../types';

export const initialProposal: Proposal = {
  id: crypto.randomUUID(),
  meta: {
    title: 'Digital Marketing Proposal',
    clientName: 'Acme Corp',
    date: new Date().toISOString().split('T')[0],
    logo: null,
  },
  sectionVisibility: {
    'intro': true,
    'history': true,
    'summary': true,
    'scope': true,
    'client-req': true,
    'out-of-scope': true,
    'team': true,
    'costing': true,
    'ratecard': true,
    'terms': true,
    'sign-off': true,
  },
  versionHistory: [
    {
      id: crypto.randomUUID(),
      version: '1.0',
      date: new Date().toISOString().split('T')[0],
      author: 'Agency Team',
      notes: 'Initial Draft',
    },
  ],
  execSummary: {
    summary: 'We are excited to present this proposal...', 
    objectives: '1. Increase Brand Awareness\n2. Drive Sales',
  },
  scope: [
    {
      id: crypto.randomUUID(),
      name: 'Social Media Marketing',
      description: 'Comprehensive management of social channels.',
      deliverables: [
        { id: crypto.randomUUID(), description: 'Instagram Static Posts', quantity: 10 },
        { id: crypto.randomUUID(), description: 'Instagram Reels', quantity: 4 },
      ],
    },
  ],
  clientResponsibilities: ['Provide brand assets', 'Approve content calendar weekly'],
  outOfScope: ['Paid Media Budget', '3rd Party Software Licenses'],
  team: [
    {
      id: crypto.randomUUID(),
      name: 'Jane Doe',
      role: 'Project Lead',
      allocation: 50,
      description: 'Oversees strategy and client communication.',
      image: null
    }
  ],
  costing: [
    {
      id: crypto.randomUUID(),
      title: 'Monthly Retainer',
      items: [
        { id: crypto.randomUUID(), description: 'Social Media Management', quantity: 1, rate: 50000 },
      ],
    },
  ],
  rateCard: [],
  terms: '1. Payment Terms: 50% advance.\n2. Validity: This proposal is valid for 14 days.',
  signOff: {
    disclaimer: 'Confidential Information',
    website: 'www.myagency.com',
    socials: '@myagency',
    showSignatures: true,
  },
};
