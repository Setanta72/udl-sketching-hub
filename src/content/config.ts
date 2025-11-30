import { defineCollection, z } from 'astro:content';

/**
 * CONTENT SCHEMA v2.0 - Concept-Based Learning Model
 *
 * This schema implements progressive mastery learning:
 * - Each module contains multiple concepts
 * - Each concept is a self-contained learning block
 * - No binary path filtering - all content visible to all learners
 * - Scaffolding guidance embedded in drills
 */

// Schema for drill options (choice-based practice)
const drillOptionSchema = z.object({
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
});

// Schema for individual practice drills (now with options)
const drillSchema = z.object({
  title: z.string(),
  description: z.string().optional(), // Optional if using options
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(), // Optional if using options
  scaffoldingSuggestion: z.string().optional(),
  estimatedTime: z.string().optional(),
  options: z.array(drillOptionSchema).optional(), // New: Choice-based drills
});

// Schema for common errors (contextual to each concept)
const errorSchema = z.object({
  errorTitle: z.string(),
  description: z.string(),
  diagnosis: z.string(),
  correction: z.string(),
  whenToUseAids: z.string().optional(),
});

// Schema for gallery examples showing progression
const galleryExampleSchema = z.object({
  imageUrl: z.string(),
  imageAlt: z.string(),
  annotations: z.array(z.string()),
});

// Schema for inline visual examples
const inlineExampleSchema = z.object({
  id: z.string(),
  type: z.enum(['image', 'video', 'gif']),
  url: z.string(),
  caption: z.string(),
  level: z.enum(['novice', 'proficient', 'mastery', 'all']).default('all'),
});

// Schema for an individual concept (the core learning unit)
const conceptSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number(),
  explanation: z.string().optional(), // Markdown text explaining this concept
  inlineExamples: z.array(inlineExampleSchema).optional(), // New: Visuals embedded in text

  // Resources for this concept
  videoUrl: z.string().optional(),
  videoDuration: z.string().optional(),
  videoCaption: z.string().optional(),
  videoLevel: z.enum(['novice', 'proficient', 'mastery', 'all']).default('all'), // New: Level tagging

  pdfGuideUrl: z.string().optional(),
  pdfGuideTitle: z.string().optional(),
  pdfLevel: z.enum(['novice', 'proficient', 'mastery', 'all']).default('all'), // New: Level tagging

  // Gallery showing progression: novice → proficient → mastery
  gallery: z.object({
    novice: galleryExampleSchema.optional(),
    proficient: galleryExampleSchema.optional(),
    mastery: galleryExampleSchema.optional(),
  }).optional(),

  // Practice drills for this specific concept
  drills: z.array(drillSchema).optional(),

  // Common errors specific to this concept
  commonErrors: z.array(errorSchema).optional(),

  // Mode-specific tips (Physical vs Digital)
  physicalTips: z.string().optional(),
  digitalTips: z.string().optional(),
});

// Schema for rubric criteria (module-level assessment)
const rubricCriteriaSchema = z.object({
  criteria: z.string(),
  novice: z.string(),
  proficient: z.string(),
  mastery: z.string(),
});

// Main module collection schema
const modulesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    moduleNumber: z.number(),
    title: z.string(),
    description: z.string(),
    estimatedTime: z.string(),
    prerequisites: z.array(z.string()).optional(),

    // Module overview
    learningObjectives: z.array(z.string()),
    whyItMatters: z.string(),

    // The concepts in this module (each is a complete learning block)
    concepts: z.array(conceptSchema),

    // Module-level self-assessment rubric
    rubric: z.array(rubricCriteriaSchema),
  }),
});

export const collections = {
  'modules': modulesCollection,
};
