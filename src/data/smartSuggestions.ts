export const smartSuggestions: Record<string, string[]> = {
  'social': [
    'Static Posts (Instagram/LinkedIn)',
    'Instagram Reels / Shorts',
    'Community Management (Replies)',
    'Monthly Analytics Report',
    'Paid Ad Campaign Setup',
    'Content Calendar Creation',
    'Influencer Outreach',
    'Story Highlights Design',
    'LinkedIn Thought Leadership Articles',
    'Twitter/X Thread Creation'
  ],
  'video': [
    'Scriptwriting & Storyboard',
    'On-Location Shooting (Half Day)',
    'On-Location Shooting (Full Day)',
    'Video Editing (Up to 2 mins)',
    'Color Grading',
    'Sound Design & Mixing',
    'Drone Footage',
    'Social Media Cutdowns (15s/30s)',
    'Voiceover Recording',
    'Motion Graphics / Titles'
  ],
  'web': [
    'Homepage Design',
    'Internal Page Design',
    'Mobile Responsiveness Optimization',
    'CMS Integration (WordPress/Webflow)',
    'SEO Basic Setup',
    'Google Analytics Configuration',
    'Contact Form Integration',
    'Domain & Hosting Setup',
    'Speed Optimization',
    'Custom Icon Set'
  ],
  'brand': [
    'Logo Design (3 Concepts)',
    'Brand Color Palette',
    'Typography Selection',
    'Business Card Design',
    'Letterhead & Envelope Design',
    'Social Media Profile Assets',
    'Brand Guidelines Document',
    'Iconography',
    'Packaging Design',
    'Presentation Template'
  ],
  'seo': [
    'Keyword Research',
    'Competitor Analysis',
    'On-Page Optimization',
    'Technical SEO Audit',
    'Backlink Building',
    'Blog Content Writing (1000 words)',
    'Google My Business Optimization',
    'Monthly Performance Tracking',
    'Site Speed Improvements',
    'Meta Tag Optimization'
  ],
  'default': [
    'Project Management',
    'Weekly Status Meetings',
    'Final Presentation',
    'Source File Handover',
    'Training Session (1 Hour)',
    'Strategy Workshop',
    'Revisions (Round 1)',
    'Revisions (Round 2)'
  ]
};

export const getSuggestions = (input: string): string[] => {
  const lowerInput = input.toLowerCase();
  
  // 1. Check for keyword matches in keys
  for (const key in smartSuggestions) {
    if (lowerInput.includes(key)) {
      return smartSuggestions[key];
    }
  }

  // 2. Return general/mixed suggestions if no specific category matches
  // Or just return the 'default' set
  return smartSuggestions['default'];
};
