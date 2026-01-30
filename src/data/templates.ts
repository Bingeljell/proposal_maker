import { ProposalTemplate } from '../types';

export const templates: ProposalTemplate[] = [
  {
    id: 'video-production',
    name: 'Video Production Project',
    description: 'Complete setup for a video shoot, including pre-production, filming, and post-production.',
    category: 'Creative',
    data: {
      sectionVisibility: {
        'intro': true,
        'history': true,
        'summary': true,
        'scope': true,
        'client-req': true,
        'out-of-scope': true,
        'team': true,
        'costing': true,
        'ratecard': false,
        'terms': true,
        'sign-off': true,
      },
      pageBreaks: [],
      execSummary: {
        summary: '<p>We are pleased to submit this proposal for your upcoming video production project. Our team specializes in high-quality visual storytelling that aligns with your brand identity.</p>',
        objectives: '1. Create a compelling brand film\n2. Deliver 3 social media cutdowns\n3. Ensure high-quality color grading and sound design',
      },
      scope: [
        {
          id: 'scope-pre-prod',
          name: 'Pre-Production',
          description: 'Planning and organization phase.',
          deliverables: [
            { id: 'del-script', description: 'Scriptwriting & Storyboard', quantity: 1 },
            { id: 'del-location', description: 'Location Scouting', quantity: 2 },
            { id: 'del-casting', description: 'Casting & Talent Management', quantity: 1 },
          ],
        },
        {
          id: 'scope-prod',
          name: 'Production',
          description: 'On-set filming days.',
          deliverables: [
            { id: 'del-shoot', description: 'Filming Days (4K Cinema Camera)', quantity: 2 },
            { id: 'del-lighting', description: 'Lighting & Grip Setup', quantity: 1 },
            { id: 'del-sound', description: 'On-location Sound Recording', quantity: 1 },
          ],
        },
        {
          id: 'scope-post',
          name: 'Post-Production',
          description: 'Editing and finalization.',
          deliverables: [
            { id: 'del-edit', description: 'Video Editing (Offline & Online)', quantity: 1 },
            { id: 'del-color', description: 'Color Grading', quantity: 1 },
            { id: 'del-audio', description: 'Sound Mix & Master', quantity: 1 },
          ],
        },
      ],
      clientResponsibilities: [
        'Provide brand guidelines and logo files (vector format)',
        'Approve script and storyboard prior to shoot',
        'Provide access to shooting locations',
      ],
      outOfScope: [
        'Travel and accommodation costs for crew (billed at actuals)',
        'Talent buyout fees (if applicable)',
        'Raw footage delivery (available for an additional fee)',
      ],
      team: [
        {
          id: 'team-dir',
          name: 'Director',
          role: 'Creative Lead',
          allocation: 100,
          description: 'Directs the visual style and performance.',
          image: null
        },
        {
          id: 'team-dop',
          name: 'DOP',
          role: 'Cinematographer',
          allocation: 100,
          description: 'Handles camera and lighting.',
          image: null
        },
        {
          id: 'team-editor',
          name: 'Editor',
          role: 'Post-Production',
          allocation: 50,
          description: 'Assembles the final cut.',
          image: null
        },
      ],
      costing: [
        {
          id: 'cost-prod',
          title: 'Production Costs',
          items: [
            { id: 'item-pre', description: 'Pre-Production Fee', quantity: 1, rate: 25000 },
            { id: 'item-shoot', description: 'Production Days (Crew + Gear)', quantity: 2, rate: 75000 },
            { id: 'item-post', description: 'Post-Production Package', quantity: 1, rate: 40000 },
          ],
        },
      ],
      rateCard: [],
      terms: '1. 50% advance payment required to book shoot dates.\n2. Two rounds of revisions included in post-production.\n3. Final delivery upon full payment clearance.',
      signOff: {
        disclaimer: 'This proposal is valid for 30 days from the date of issue.',
        website: 'www.creativeagency.com',
        socials: '@creativeagency',
        showSignatures: true,
      },
    },
  },
  {
    id: 'website-dev',
    name: 'Website Development',
    description: 'Design and development of a responsive, SEO-optimized website.',
    category: 'Technical',
    data: {
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
      pageBreaks: [],
      execSummary: {
        summary: '<p>We propose a modern, high-performance website to elevate your digital presence. Our approach combines aesthetic excellence with robust technical architecture.</p>',
        objectives: '1. Launch a mobile-responsive website\n2. Improve page load speeds\n3. Integrate CMS for easy content management',
      },
      scope: [
        {
          id: 'scope-ux',
          name: 'UX/UI Design',
          description: 'Designing the visual interface and user experience.',
          deliverables: [
            { id: 'del-wire', description: 'Wireframes', quantity: 5 },
            { id: 'del-mockup', description: 'High-fidelity UI Mockups', quantity: 5 },
            { id: 'del-proto', description: 'Interactive Prototype', quantity: 1 },
          ],
        },
        {
          id: 'scope-dev',
          name: 'Development',
          description: 'Coding and implementation.',
          deliverables: [
            { id: 'del-fe', description: 'Frontend Implementation (React/Next.js)', quantity: 1 },
            { id: 'del-cms', description: 'CMS Integration (Sanity/Strapi)', quantity: 1 },
            { id: 'del-seo', description: 'Basic SEO Setup', quantity: 1 },
          ],
        },
      ],
      clientResponsibilities: [
        'Provide all website copy and text',
        'Provide high-resolution images',
        'Domain name and hosting account access',
      ],
      outOfScope: [
        'Content writing (copywriting)',
        'Advanced custom animations',
        'Ongoing maintenance (separate contract)',
      ],
      team: [
        {
          id: 'team-pm',
          name: 'Project Manager',
          role: 'Lead',
          allocation: 20,
          description: 'Main point of contact.',
          image: null
        },
        {
          id: 'team-dev',
          name: 'Senior Developer',
          role: 'Tech Lead',
          allocation: 100,
          description: 'Full-stack development.',
          image: null
        },
      ],
      costing: [
        {
          id: 'cost-milestone',
          title: 'Project Milestones',
          items: [
            { id: 'item-design', description: 'Design Phase Approval', quantity: 1, rate: 40000 },
            { id: 'item-dev', description: 'Development Phase Completion', quantity: 1, rate: 80000 },
            { id: 'item-launch', description: 'Final Launch & Testing', quantity: 1, rate: 20000 },
          ],
        },
      ],
      rateCard: [
        {
          id: 'rate-maint',
          name: 'Maintenance Add-ons',
          description: 'Optional post-launch services.',
          items: [
            { id: 'rate-hourly', description: 'Additional Dev Hours', comment: 'Per hour rate', quantity: 1, unitCost: 2500 },
            { id: 'rate-server', description: 'Server Setup', comment: 'One-time fee', quantity: 1, unitCost: 5000 },
          ],
        },
      ],
      terms: '1. 40% Advance, 30% on Design Approval, 30% on Launch.\n2. Bug support included for 30 days post-launch.\n3. Client owns all code upon final payment.',
      signOff: {
        disclaimer: 'Standard development contract applies.',
        website: 'www.devstudio.io',
        socials: '@devstudio',
        showSignatures: true,
      },
    },
  },
  {
    id: 'social-retainer',
    name: 'Social Media Retainer',
    description: 'Monthly ongoing social media management and content creation.',
    category: 'Business',
    data: {
      sectionVisibility: {
        'intro': true,
        'history': true,
        'summary': true,
        'scope': true,
        'client-req': true,
        'out-of-scope': true,
        'team': true,
        'costing': true,
        'ratecard': false,
        'terms': true,
        'sign-off': true,
      },
      pageBreaks: [],
      execSummary: {
        summary: '<p>A comprehensive monthly retainer to keep your social channels active, engaging, and growing.</p>',
        objectives: '1. Consistent posting schedule\n2. Community engagement\n3. Monthly performance reporting',
      },
      scope: [
        {
          id: 'scope-monthly',
          name: 'Monthly Deliverables',
          description: 'Recurring content output.',
          deliverables: [
            { id: 'del-posts', description: 'Static Posts / Carousels', quantity: 12 },
            { id: 'del-stories', description: 'Instagram Stories', quantity: 20 },
            { id: 'del-reels', description: 'Short-form Video (Reels/TikTok)', quantity: 4 },
          ],
        },
        {
          id: 'scope-mgmt',
          name: 'Management',
          description: 'Account handling.',
          deliverables: [
            { id: 'del-report', description: 'Monthly Analytics Report', quantity: 1 },
            { id: 'del-community', description: 'Community Management (Reply to comments)', quantity: 1 },
          ],
        },
      ],
      clientResponsibilities: [
        'Approval of monthly content calendar by the 25th of previous month',
        'Product samples for photography',
      ],
      outOfScope: [
        'Ad spend (paid directly to platforms)',
        'Influencer fees',
      ],
      team: [
        {
          id: 'team-smm',
          name: 'Social Media Manager',
          role: 'Account Lead',
          allocation: 50,
          description: 'Strategy and posting.',
          image: null
        },
        {
          id: 'team-des',
          name: 'Graphic Designer',
          role: 'Creative',
          allocation: 50,
          description: 'Visual asset creation.',
          image: null
        },
      ],
      costing: [
        {
          id: 'cost-retainer',
          title: 'Monthly Fee',
          items: [
            { id: 'item-retainer', description: 'Social Media Retainer Fee', quantity: 1, rate: 45000 },
          ],
        },
      ],
      rateCard: [],
      terms: '1. Retainer payable in advance by the 1st of each month.\n2. Minimum 3-month commitment.\n3. 30-day notice period for cancellation.',
      signOff: {
        disclaimer: 'Prices exclude GST.',
        website: 'www.socialagency.com',
        socials: '@socialagency',
        showSignatures: true,
      },
    },
  }
];
