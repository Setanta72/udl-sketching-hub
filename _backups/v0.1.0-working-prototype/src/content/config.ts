import { defineCollection, z } from 'astro:content';

const modulesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    moduleNumber: z.number(),
    title: z.string(),
    description: z.string().optional(),

    // Section 2: Resources
    resources: z.object({
      video: z.object({
        title: z.string(),
        url: z.string().optional(),
        duration: z.string().optional(),
      }).optional(),
      guide: z.object({
        title: z.string(),
        url: z.string().optional(),
      }).optional(),
      gallery: z.object({
        title: z.string(),
        url: z.string().optional(),
      }).optional(),
    }).optional(),

    // Section 3: Skills & Drills with path filtering
    drills: z.array(z.object({
      text: z.string(),
      paths: z.array(z.enum(['guided', 'mastery'])),
    })).optional(),

    // Section 4: Modes of Expression
    modesOfExpression: z.object({
      physical: z.string(),
      digital: z.string(),
    }).optional(),

    // Section 5: Self-Support (Common Errors)
    commonErrors: z.array(z.object({
      pitfall: z.string(),
      diagnosis: z.string(),
      correction: z.string(),
    })).optional(),
  }),
});

export const collections = {
  'modules': modulesCollection,
};
