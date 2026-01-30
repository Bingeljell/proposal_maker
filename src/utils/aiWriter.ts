// AI Writer Utility
// Client-side template-based content generation for the AI Writing Assistant

import {
  ContentType,
  Tone,
  Length,
  ProjectType,
  findTemplate,
  contentTypeLabels,
  projectTypeLabels,
  toneLabels,
  lengthLabels,
} from '../data/aiTemplates';
import { getProjectTypesForContentType } from '../data/aiTemplates';

export interface AIWriterOptions {
  contentType: ContentType;
  projectType: ProjectType;
  tone: Tone;
  length: Length;
  clientName: string;
  context?: string;
}

export interface AIWriterResult {
  content: string;
  success: boolean;
  error?: string;
}

/**
 * Generate content using templates based on user selections
 * This is a client-side implementation that uses pre-written templates
 * with variable substitution - no API calls required
 */
export const generateContent = (options: AIWriterOptions): AIWriterResult => {
  try {
    const { contentType, projectType, tone, length, clientName, context } = options;

    // Find the appropriate template
    let template = findTemplate(contentType, projectType, tone, length);

    // If no specific template found, fall back to general project type
    if (!template) {
      template = findTemplate(contentType, 'general', tone, length);
    }

    // If still no template, return an error
    if (!template) {
      return {
        content: '',
        success: false,
        error: `No template found for ${contentTypeLabels[contentType]} - ${toneLabels[tone]} - ${lengthLabels[length]}`,
      };
    }

    // Replace variables in the template
    let generatedContent = template;

    // Replace {{clientName}}
    generatedContent = generatedContent.replace(/\{\{clientName\}\}/g, clientName || 'your organization');

    // Replace {{context}} - if no context provided, use a default message
    const contextText = context?.trim() || 'We understand your requirements and have tailored our approach accordingly.';
    generatedContent = generatedContent.replace(/\{\{context\}\}/g, contextText);

    // Clean up any remaining template variables (shouldn't happen, but just in case)
    generatedContent = generatedContent.replace(/\{\{\w+\}\}/g, '');

    return {
      content: generatedContent,
      success: true,
    };
  } catch (error) {
    return {
      content: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error generating content',
    };
  }
};

/**
 * Regenerate content with slight variations
 * Since we're using templates, we'll try different combinations
 */
export const regenerateContent = (
  options: AIWriterOptions,
  _previousAttempts: AIWriterOptions[] = []
): AIWriterResult => {
  // Try different lengths if multiple attempts
  const lengths: Length[] = ['short', 'medium', 'long'];
  const currentLengthIndex = lengths.indexOf(options.length);
  
  // Cycle through lengths for variety
  const nextLengthIndex = (currentLengthIndex + 1) % lengths.length;
  
  const newOptions: AIWriterOptions = {
    ...options,
    length: lengths[nextLengthIndex],
  };

  return generateContent(newOptions);
};

/**
 * Get suggestions for project types based on content type
 */
export const getProjectTypeSuggestions = (contentType: ContentType): ProjectType[] => {
  return getProjectTypesForContentType(contentType);
};

/**
 * Format generated content for insertion into the editor
 * Converts plain text to HTML if needed
 */
export const formatForEditor = (content: string): string => {
  // If content already contains HTML tags, return as-is
  if (/<[a-z][\s\S]*>/i.test(content)) {
    return content;
  }

  // Otherwise, convert line breaks to paragraphs
  const paragraphs = content
    .split('\n\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  if (paragraphs.length === 0) {
    return `<p>${content}</p>`;
  }

  return paragraphs.map((p) => `<p>${p}</p>`).join('');
};

/**
 * Get a preview of what will be generated (without full generation)
 */
export const getGenerationPreview = (options: Partial<AIWriterOptions>): string => {
  const parts: string[] = [];

  if (options.contentType) {
    parts.push(contentTypeLabels[options.contentType]);
  }
  if (options.projectType) {
    parts.push(`for ${projectTypeLabels[options.projectType]}`);
  }
  if (options.tone) {
    parts.push(`in a ${toneLabels[options.tone]} tone`);
  }
  if (options.length) {
    parts.push(`(${lengthLabels[options.length]} length)`);
  }

  if (parts.length === 0) {
    return 'Configure your content preferences to see a preview';
  }

  return `Generating ${parts.join(' ')}...`;
};

/**
 * Validate that all required options are present
 */
export const validateOptions = (options: Partial<AIWriterOptions>): string | null => {
  if (!options.contentType) {
    return 'Please select a content type';
  }
  if (!options.projectType) {
    return 'Please select a project type';
  }
  if (!options.tone) {
    return 'Please select a tone';
  }
  if (!options.length) {
    return 'Please select a length';
  }
  if (!options.clientName || options.clientName.trim() === '') {
    return 'Client name is required';
  }
  return null;
};

// Re-export types and functions for convenience
export type { ContentType, Tone, Length, ProjectType };
export { contentTypeLabels, projectTypeLabels, toneLabels, lengthLabels };
export { getProjectTypesForContentType } from '../data/aiTemplates';
