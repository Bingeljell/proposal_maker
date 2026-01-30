// AI Writing Assistant Templates
// These templates provide professional, reusable content for proposals

export type ContentType = 'executive-summary' | 'scope-description' | 'objectives' | 'team-description' | 'custom';
export type Tone = 'professional' | 'casual' | 'persuasive' | 'technical';
export type Length = 'short' | 'medium' | 'long';
export type ProjectType = 'social-media' | 'branding' | 'web-development' | 'mobile-app' | 'consulting' | 'marketing' | 'design' | 'general';

export interface TemplateVariant {
  tone: Tone;
  length: Length;
  template: string;
}

export interface ContentTemplate {
  id: string;
  contentType: ContentType;
  projectType: ProjectType;
  variants: TemplateVariant[];
}

// Template helper to create variants for all tones and lengths
const createVariants = (
  professional: Record<Length, string>,
  casual: Record<Length, string>,
  persuasive: Record<Length, string>,
  technical: Record<Length, string>
): TemplateVariant[] => {
  const variants: TemplateVariant[] = [];
  
  (Object.keys(professional) as Length[]).forEach((length) => {
    variants.push({ tone: 'professional', length, template: professional[length] });
  });
  (Object.keys(casual) as Length[]).forEach((length) => {
    variants.push({ tone: 'casual', length, template: casual[length] });
  });
  (Object.keys(persuasive) as Length[]).forEach((length) => {
    variants.push({ tone: 'persuasive', length, template: persuasive[length] });
  });
  (Object.keys(technical) as Length[]).forEach((length) => {
    variants.push({ tone: 'technical', length, template: technical[length] });
  });
  
  return variants;
};

// Executive Summary Templates
const executiveSummaryTemplates: ContentTemplate[] = [
  {
    id: 'exec-summary-social-media',
    contentType: 'executive-summary',
    projectType: 'social-media',
    variants: createVariants(
      {
        short: 'We propose a comprehensive social media management solution for {{clientName}}. Our strategy will enhance your digital presence through targeted content creation, community engagement, and data-driven optimization across key platforms.',
        medium: 'This proposal outlines a strategic social media management partnership with {{clientName}}. Our team will develop and execute a comprehensive digital strategy designed to elevate your brand presence, engage your target audience, and drive measurable business results. Through consistent content creation, community management, and performance analytics, we aim to establish {{clientName}} as a leader in your industry.',
        long: 'We are excited to present this comprehensive proposal for social media management services tailored specifically for {{clientName}}. In the digital landscape, a strong social media presence is essential for brand growth and customer engagement. Our proposed partnership will encompass strategic planning, content creation, community management, and performance analytics across all relevant social platforms. We bring extensive experience in helping brands like yours build meaningful connections with their audience, increase brand awareness, and drive conversions. This proposal details our approach, methodology, and the value we will deliver to help {{clientName}} achieve its digital marketing objectives.',
      },
      {
        short: 'Hey {{clientName}}! We would love to help you rock social media. Our team will create awesome content, chat with your followers, and help your brand stand out online.',
        medium: 'Thanks for considering us for your social media needs, {{clientName}}! We are passionate about helping businesses like yours succeed online. Our approach is simple but effective: we will create content your audience loves, keep your community engaged, and always be there to respond to comments and messages. We believe in transparent communication and real results.',
        long: 'Hi {{clientName}} team! We are thrilled at the opportunity to work with you on your social media journey. We know that managing social media can feel overwhelming. That is where we come in! We are a team of social media enthusiasts who genuinely love what we do. We will handle everything from strategy to execution, so you can focus on running your business. We will keep things casual and authentic because that is what resonates with audiences today.',
      },
      {
        short: 'Transform your social media presence with our proven strategies. We will help {{clientName}} captivate your audience, outshine competitors, and convert followers into loyal customers.',
        medium: 'Imagine your brand commanding attention across every social platform. That is what we deliver for {{clientName}}. Our social media expertise has helped countless businesses double their engagement and triple their reach. We do not just post content – we craft experiences that resonate with your audience and drive real business growth.',
        long: 'In a world where attention is the most valuable currency, {{clientName}} deserves a social media strategy that does not just participate – it dominates. Our proven methodology has generated millions of impressions and driven exceptional ROI for our clients. We combine creative excellence with data-driven precision to ensure every post, story, and interaction moves your business forward.',
      },
      {
        short: 'This proposal delineates a systematic approach to social media asset management for {{clientName}}. The implementation encompasses content strategy formulation, audience segmentation analysis, and performance metric tracking.',
        medium: 'The following document presents a technical framework for comprehensive social media ecosystem management pertaining to {{clientName}}. Our methodology integrates quantitative audience analysis, content architecture design, engagement protocol implementation, and recursive performance optimization algorithms.',
        long: 'This comprehensive technical proposal outlines a systematic approach to social media infrastructure development and management for {{clientName}}. The scope encompasses strategic planning methodologies, content production workflows, community management protocols, and performance analytics frameworks. Our technical implementation strategy leverages platform-specific algorithmic optimizations and continuous iterative improvement protocols.',
      }
    ),
  },
  {
    id: 'exec-summary-branding',
    contentType: 'executive-summary',
    projectType: 'branding',
    variants: createVariants(
      {
        short: 'We present a strategic branding initiative for {{clientName}}. Our comprehensive approach will define your brand identity, establish visual consistency, and position your organization for market leadership.',
        medium: 'This proposal outlines a complete branding transformation for {{clientName}}. Our team will work collaboratively with you to develop a distinctive brand identity that captures your essence, resonates with your target audience, and differentiates you from competitors.',
        long: 'We are pleased to submit this comprehensive branding proposal for {{clientName}}. In an increasingly crowded marketplace, a strong, distinctive brand is not just an asset – it is a necessity for survival and growth. Our proposed branding initiative will take you through a strategic journey of discovery, definition, and design.',
      },
      {
        short: 'Hey {{clientName}}! Ready for a brand glow-up? We will help you figure out what makes you special and show it off to the world.',
        medium: 'Thanks for thinking of us for your branding project, {{clientName}}! We are excited to dive in and really get to know what makes your business tick. Branding is not just about pretty designs – it is about telling your story in a way that connects with people.',
        long: 'Hi there, {{clientName}} team! We are so excited about the possibility of working together on your brand. We believe every business has a unique story worth telling, and our job is to help you tell yours in the most compelling way possible.',
      },
      {
        short: 'Your brand deserves to be unforgettable. We will create a powerful identity for {{clientName}} that commands attention and turns casual observers into passionate advocates.',
        medium: 'What if your brand could stop people in their tracks? That is exactly what we create for {{clientName}}. In a sea of sameness, we craft brands that stand out and stick in peoples minds.',
        long: 'Great brands do not happen by accident – they are strategically crafted to capture hearts and minds. For {{clientName}}, we envision a brand that does not just compete but leads. A brand that customers do not just recognize but love.',
      },
      {
        short: 'This proposal presents a systematic approach to brand identity architecture for {{clientName}}. The scope includes visual identity system design and strategic positioning frameworks.',
        medium: 'The following document delineates a comprehensive branding methodology for {{clientName}}, encompassing brand strategy formulation, visual identity system architecture, and brand guideline documentation.',
        long: 'This technical proposal outlines a systematic framework for comprehensive brand identity development for {{clientName}}. The methodology encompasses strategic brand analysis, competitive landscape evaluation, and visual identity system architecture.',
      }
    ),
  },
  {
    id: 'exec-summary-web-dev',
    contentType: 'executive-summary',
    projectType: 'web-development',
    variants: createVariants(
      {
        short: 'We propose a comprehensive web development solution for {{clientName}}. Our team will deliver a modern, responsive website that enhances user experience and drives conversions.',
        medium: 'This proposal outlines our approach to developing a cutting-edge web solution for {{clientName}}. We will design and build a responsive, user-centric website that combines stunning aesthetics with robust functionality.',
        long: 'We are excited to present this comprehensive web development proposal for {{clientName}}. In the digital-first world, your website is often the first and most important touchpoint with potential customers. Our proposed solution goes beyond simply creating a website.',
      },
      {
        short: 'Hey {{clientName}}! We would love to build you an awesome website. Whether you need something simple or complex, we have got the skills to make it happen.',
        medium: 'Thanks for considering us for your web project, {{clientName}}! We love building websites that make a real difference for businesses. We will work closely with you to understand exactly what you need.',
        long: 'Hi {{clientName}} team! We are really excited about the chance to build your new website. We know that getting a new website can feel like a big undertaking. But do not worry, we have got your back!',
      },
      {
        short: 'Your website should be your hardest-working employee. We will build {{clientName}} a high-performance digital platform that converts visitors into customers 24/7.',
        medium: 'Imagine a website that works tirelessly to grow your business every single day. That is what we create for {{clientName}}. In a world where first impressions are made in milliseconds, your website needs to captivate instantly.',
        long: 'Every visitor to your website is an opportunity. The question is: are you capitalizing on every single one? For {{clientName}}, we propose building a high-performance digital platform engineered for growth.',
      },
      {
        short: 'This proposal outlines a systematic web development methodology for {{clientName}}. The technical implementation encompasses responsive frontend architecture and performance optimization.',
        medium: 'The following document presents a comprehensive web development framework for {{clientName}}, utilizing modern technology stacks and agile development methodologies.',
        long: 'This technical proposal delineates a systematic approach to full-stack web development for {{clientName}}. The architectural framework employs modern JavaScript ecosystems and follows agile scrum practices.',
      }
    ),
  },
  {
    id: 'exec-summary-general',
    contentType: 'executive-summary',
    projectType: 'general',
    variants: createVariants(
      {
        short: 'We are pleased to submit this proposal for {{clientName}}. Our team is committed to delivering exceptional results through strategic planning and dedicated partnership.',
        medium: 'This proposal outlines our comprehensive approach to addressing the needs of {{clientName}}. We bring extensive expertise, proven methodologies, and a commitment to excellence.',
        long: 'We are honored to present this detailed proposal for {{clientName}}. After careful consideration of your requirements and objectives, we have developed a comprehensive solution that aligns with your goals.',
      },
      {
        short: 'Hey {{clientName}}! We would love to work with you on this project. We are a team that cares about doing great work and making sure you are happy.',
        medium: 'Thanks for giving us the chance to propose on your project, {{clientName}}! We are genuinely excited about what we could create together.',
        long: 'Hi {{clientName}} team! We are thrilled you are considering us for this project. We really love what we do, and we think that shows in our work.',
      },
      {
        short: 'Partner with us to achieve extraordinary results. We bring the expertise and dedication that {{clientName}} needs to dominate your market.',
        medium: 'Why settle for good when you can have exceptional? {{clientName}} deserves a partner that brings passion, expertise, and relentless commitment to your success.',
        long: 'Success does not happen by chance – it is the result of strategic thinking, expert execution, and unwavering commitment. For {{clientName}}, we offer exactly that.',
      },
      {
        short: 'This proposal presents a systematic methodology for project execution on behalf of {{clientName}}. The framework encompasses strategic planning and outcome-based deliverables.',
        medium: 'The following document delineates a comprehensive project framework for {{clientName}}, incorporating systematic analysis and structured implementation protocols.',
        long: 'This technical proposal outlines a systematic framework for project execution and delivery for {{clientName}}. The methodology encompasses initial requirements analysis and project scope definition.',
      }
    ),
  },
];

// Scope Description Templates
const scopeDescriptionTemplates: ContentTemplate[] = [
  {
    id: 'scope-social-media',
    contentType: 'scope-description',
    projectType: 'social-media',
    variants: createVariants(
      {
        short: 'Our social media management services include content strategy development, daily posting across platforms, community engagement, performance analytics, and monthly reporting.',
        medium: 'This scope encompasses comprehensive social media management services. We will develop a tailored content strategy, create and curate engaging posts, manage daily community interactions, and provide detailed monthly reports.',
        long: 'Our comprehensive social media management scope includes: Strategic Planning, Content Creation, Community Management, Paid Social campaigns, Analytics & Reporting, and Crisis Management protocols.',
      },
      {
        short: 'We will handle your social media from A to Z – posts, replies, stories, the works. You focus on your business, we will keep your social feeds buzzing!',
        medium: 'Here is what we will take care of for you: coming up with content ideas, creating posts your audience will love, scheduling everything, responding to comments and messages, and keeping you in the loop.',
        long: 'Alright, here is exactly what we will be doing: content strategy, graphic design, copywriting, posting across all platforms, community engagement, and regular performance reports.',
      },
      {
        short: 'Dominate social media with our complete management solution. From viral content creation to community cultivation, we deliver the engagement your brand deserves.',
        medium: 'This is your all-access pass to social media success. We create scroll-stopping content, build engaged communities, and turn followers into customers.',
        long: 'Stop struggling with social media and start dominating it. Our complete management solution transforms your social presence into a revenue-generating machine.',
      },
      {
        short: 'Technical scope includes: Content Management System integration, social listening tool deployment, automated publishing workflows, and engagement analytics dashboards.',
        medium: 'The technical implementation encompasses: Social Media Management Platform configuration, automated publishing workflows, social listening and sentiment analysis, and competitor monitoring systems.',
        long: 'The technical scope includes comprehensive social media infrastructure: Platform Architecture, Content Systems, Monitoring & Listening, Analytics Stack, and Security protocols.',
      }
    ),
  },
  {
    id: 'scope-web-dev',
    contentType: 'scope-description',
    projectType: 'web-development',
    variants: createVariants(
      {
        short: 'Our web development services include requirements analysis, UX/UI design, frontend and backend development, content integration, testing, and deployment.',
        medium: 'This scope encompasses end-to-end web development services. We will conduct requirements gathering, create wireframes and designs, develop responsive interfaces, and provide post-launch support.',
        long: 'Our comprehensive web development scope includes: Discovery & Strategy, Design, Development, Content integration, Quality Assurance, Deployment, and Post-Launch support.',
      },
      {
        short: 'We will build you a website that looks great and works perfectly. From planning to launch, we handle everything!',
        medium: 'Here is what you will get: planning, design mockups, development, content integration, testing, launch, and training.',
        long: 'We will start by understanding your business, then create design mockups, build the site, add your content, test everything, launch, and train you on updates.',
      },
      {
        short: 'Get a website that works as hard as you do. Our development process ensures every pixel serves a purpose.',
        medium: 'This is not just web development – it is digital transformation. We build websites that load fast, rank high, and convert visitors.',
        long: 'Your website is too important to leave to chance. We build websites that are fast, mobile-first, SEO-optimized, conversion-focused, and scalable.',
      },
      {
        short: 'Technical scope: Requirements specification, system architecture design, frontend framework implementation, backend API development, and CI/CD pipeline configuration.',
        medium: 'The technical deliverables include: System Requirements documentation, responsive frontend implementation, RESTful API development, automated testing suites, and cloud infrastructure configuration.',
        long: 'The technical implementation includes: Planning Phase, Architecture design, Frontend Development, Backend Development, Database design, DevOps setup, and Security hardening.',
      }
    ),
  },
  {
    id: 'scope-general',
    contentType: 'scope-description',
    projectType: 'general',
    variants: createVariants(
      {
        short: 'Our services include project planning, execution, quality assurance, and delivery. We ensure all deliverables meet the highest standards.',
        medium: 'This scope encompasses comprehensive project delivery services including discovery sessions, project planning, execution, quality assurance, and stakeholder communications.',
        long: 'Our comprehensive service scope includes: Discovery & Planning, Execution, Quality Assurance, Delivery, and Post-Delivery support.',
      },
      {
        short: 'We will handle everything from start to finish. Regular updates, quality work, and a final result you will love!',
        medium: 'Here is how we will work together: understand your needs, create a plan, keep you updated, check our work, and deliver something amazing.',
        long: 'We will have conversations to understand your needs, create a detailed plan, check in regularly, review thoroughly, and make tweaks until you are thrilled.',
      },
      {
        short: 'Experience a partnership that prioritizes your success. Our comprehensive approach ensures no detail is overlooked.',
        medium: 'We do not just complete projects – we deliver transformations. Our meticulous approach covers every phase from strategy to execution.',
        long: 'Why settle for ordinary when you can have extraordinary? Our service scope is designed to deliver exceptional results at every turn.',
      },
      {
        short: 'Technical scope includes: Requirements analysis, project planning documentation, iterative development cycles, and formal deliverable acceptance procedures.',
        medium: 'The technical implementation framework encompasses: Stakeholder requirements analysis, work breakdown structure, Gantt chart scheduling, and Agile/Scrum methodologies.',
        long: 'The comprehensive technical scope includes: Initiation Phase, Planning Phase, Execution Phase, Monitoring & Control Phase, and Closure Phase.',
      }
    ),
  },
];

// Objectives Templates
const objectivesTemplates: ContentTemplate[] = [
  {
    id: 'objectives-general',
    contentType: 'objectives',
    projectType: 'general',
    variants: createVariants(
      {
        short: 'Primary objectives: Enhance brand visibility, improve operational efficiency, increase customer engagement, and drive measurable business growth.',
        medium: 'The key objectives are to: establish market presence, optimize internal processes, enhance customer experience, generate business results, and create competitive advantages.',
        long: 'Strategic objectives include: Brand & Market Positioning, Operational Excellence, Customer Engagement, Business Growth, and Innovation & Sustainability.',
      },
      {
        short: 'We want to help you: Get noticed by more customers, work smarter, keep customers happy, and grow your business.',
        medium: 'Here is what we are aiming for: More brand awareness, smoother operations, happier customers, and real bottom-line growth.',
        long: 'We want to get your brand in front of more people, make your operations easier, create great customer experiences, and drive measurable revenue growth.',
      },
      {
        short: 'Your success is our mission. We are targeting: Market dominance, operational superiority, unmatched customer loyalty, and explosive revenue growth.',
        medium: 'We are crushing these goals: Establishing your brand as the go-to choice, building smooth systems, creating exceptional customer experiences, and driving growth.',
        long: 'By the end of this engagement, we aim to make your brand impossible to ignore, transform your operations, delight your customers, and significantly grow your business metrics.',
      },
      {
        short: 'Quantifiable objectives include: Brand awareness metrics, operational efficiency ratios, customer satisfaction indices, and revenue growth percentages.',
        medium: 'Success metrics include: Brand Awareness measurements, Operational Metrics, Customer Metrics like NPS, and Financial Targets.',
        long: 'Objectives are defined through KPIs including: Brand & Marketing Objectives, Operational Objectives, Customer Experience Objectives, Financial Objectives, and Market Position Objectives.',
      }
    ),
  },
];

// Team Description Templates
const teamDescriptionTemplates: ContentTemplate[] = [
  {
    id: 'team-general',
    contentType: 'team-description',
    projectType: 'general',
    variants: createVariants(
      {
        short: 'Our dedicated team brings together expertise across strategy, creative, and technical disciplines. Each member is committed to delivering exceptional results.',
        medium: 'The assigned project team comprises seasoned professionals with extensive experience. Our team includes strategic leadership, subject matter experts, creative talent, and technical specialists.',
        long: 'We are assembling a carefully selected team including: Project Leadership, Domain Experts, Creative Team, Technical Specialists, and Account Management.',
      },
      {
        short: 'You will be working with a friendly bunch of experts who actually care about your project. We have got the skills and enthusiasm to make this awesome!',
        medium: 'Here is who will be working on your project: Experienced folks, creative types, technical wizards, and a dedicated account person. We genuinely enjoy what we do!',
        long: 'You will have a project lead who keeps everything on track, creative minds who love making beautiful things, technical experts who solve problems, and a dedicated account manager.',
      },
      {
        short: 'Elite talent, relentless dedication, proven results. Your project deserves our A-team – and that is exactly what you are getting.',
        medium: 'We are deploying our best talent for you. These are proven performers: industry veterans, creative geniuses, and technical masters.',
        long: 'We are fielding our championship team: strategists who have shaped trends, creatives with award-winning work, and technical leads who have built platforms for millions.',
      },
      {
        short: 'Personnel assignments include: Project Director, Subject Matter Experts, Creative Leads, Technical Architects, and Account Managers.',
        medium: 'The project organizational structure comprises: Project Governance, Domain Expertise, Creative Resources, Technical Implementation, and Client Interface.',
        long: 'The personnel configuration includes: Executive Sponsorship, Project Leadership, Domain Expertise Team, Creative Division, Technical Division, Quality Assurance, and Client Services.',
      }
    ),
  },
];

// Custom Templates
const customTemplates: ContentTemplate[] = [
  {
    id: 'custom-general',
    contentType: 'custom',
    projectType: 'general',
    variants: createVariants(
      {
        short: '{{context}}',
        medium: 'Based on your requirements: {{context}} This solution addresses your specific needs.',
        long: '{{clientName}} has engaged our team to address: {{context}} We have developed a comprehensive solution tailored to your requirements.',
      },
      {
        short: '{{context}}',
        medium: 'Hey {{clientName}}! You told us you need: {{context}} Here is what we are proposing...',
        long: 'Hi {{clientName}} team! We are excited about your vision: {{context}} We would love to help make it happen.',
      },
      {
        short: '{{context}}',
        medium: '{{clientName}}, you have ambitious goals: {{context}} Let us create something extraordinary.',
        long: 'The opportunity before {{clientName}} is significant: {{context}} Let us seize this opportunity together.',
      },
      {
        short: '{{context}}',
        medium: 'Requirements Analysis: {{context}} Proposed Solution: Implementation of systematic methodologies.',
        long: 'Project Overview: {{context}} Technical Approach: Systematic implementation with established frameworks.',
      }
    ),
  },
];

// Export all templates
export const aiTemplates: ContentTemplate[] = [
  ...executiveSummaryTemplates,
  ...scopeDescriptionTemplates,
  ...objectivesTemplates,
  ...teamDescriptionTemplates,
  ...customTemplates,
];

// Helper function to find a template
export const findTemplate = (
  contentType: ContentType,
  projectType: ProjectType,
  tone: Tone,
  length: Length
): string | null => {
  const template = aiTemplates.find(
    (t) => t.contentType === contentType && t.projectType === projectType
  );
  
  if (!template) return null;
  
  const variant = template.variants.find(
    (v) => v.tone === tone && v.length === length
  );
  
  return variant?.template || null;
};

// Get available project types for a content type
export const getProjectTypesForContentType = (contentType: ContentType): ProjectType[] => {
  const types = aiTemplates
    .filter((t) => t.contentType === contentType)
    .map((t) => t.projectType);
  return [...new Set(types)];
};

// Labels for UI
export const contentTypeLabels: Record<ContentType, string> = {
  'executive-summary': 'Executive Summary',
  'scope-description': 'Scope Description',
  'objectives': 'Objectives',
  'team-description': 'Team Description',
  'custom': 'Custom',
};

export const projectTypeLabels: Record<ProjectType, string> = {
  'social-media': 'Social Media',
  'branding': 'Branding',
  'web-development': 'Web Development',
  'mobile-app': 'Mobile App',
  'consulting': 'Consulting',
  'marketing': 'Marketing',
  'design': 'Design',
  'general': 'General',
};

export const toneLabels: Record<Tone, string> = {
  'professional': 'Professional',
  'casual': 'Casual',
  'persuasive': 'Persuasive',
  'technical': 'Technical',
};

export const lengthLabels: Record<Length, string> = {
  'short': 'Short',
  'medium': 'Medium',
  'long': 'Long',
};
