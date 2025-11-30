# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The UDL Sketching Hub is an Astro-based static site generator (SSG) project for teaching product design sketching using Universal Design for Learning principles. The site uses a "Concept-Based Progressive Mastery" model to support learners of all abilities.

## Commands

```bash
# Development
npm install              # Install dependencies
npm run dev              # Start dev server (localhost:4321)
npm run build            # Build for production
npm run preview          # Preview production build locally

# Testing/Linting
# Note: Tests and linting not yet configured
```

## Architecture Overview

### Core Concept: Progressive Mastery
 
The site is built around a single inclusive path that supports all learners:
 
- **Scaffolding**: Aids (rulers, templates) are encouraged for novices.
- **Fading**: Guidance on how to gradually remove aids.
- **Mastery**: Goals for freehand execution.
 
This is implemented via:
1. **Concept Blocks**: Self-contained learning units.
2. **Scaffolding Suggestions**: Embedded in every drill.
3. **Rubrics**: Clear criteria for Novice/Proficient/Mastery levels.

### Concept-Based Module Template
 
Modules are composed of:
1. **Header & Overview** - Metadata and objectives
2. **Concept Blocks** - (Repeated for each concept)
   - Explanation
   - Resources
   - Progression Gallery
   - Drills (with scaffolding)
   - Common Errors
3. **Mastery Rubric** - Module-level assessment

### Content Collections

Module content uses Astro's Content Collections API:
- Schema defined in `src/content/config.ts`
- Content files in `src/content/modules/`
- Frontmatter provides structured data (drills, resources, errors)
- Markdown body provides prose content (concepts, application, rubric)

## Key Technical Patterns

### Concept Components
 
The `ConceptBlock.astro` component is the core building block. It renders:
- The concept explanation (markdown)
- The resources (video/PDF)
- The gallery
- The drills list
- The common errors accordion

### State Management
 
v2.0 is primarily static. Interactive components (like accordions) use simple internal state or vanilla JS. No global "Learning Mode" state exists.

### CSS Architecture

Global styles in `src/layouts/BaseLayout.astro` use CSS custom properties:

```css
:root {
  --color-primary: #2C3E50;
  --color-secondary: #E74C3C;
  --color-surface: #F8F9FA;
  --color-text-primary: #2C3E50;
  --color-text-secondary: #7F8C8D;
}
```

**Change theme colors by editing these variables only.** All components reference these vars.

## Content Editing Workflow

### Adding a New Module

1. Create `src/content/modules/m[N]-topic-name.md`
2. Copy frontmatter structure from existing module
3. Ensure `moduleNumber`, `title`, and `slug` are unique
4. Write content following the 7-section structure
5. Module auto-appears on homepage (sorted by moduleNumber)

### Adding Glossary Terms

Edit `src/data/glossary.json`:

```json
{
  "Term Name": "Definition that appears on hover/click"
}
```

Use `<dfn>Term Name</dfn>` in markdown to create hover glossary.

### Updating Resources

Resources (videos, guides, galleries) are in frontmatter:

```yaml
resources:
  video:
    title: "Video Title"
    url: "https://..."
    duration: "10 min"
  guide:
    title: "Guide Title"
    url: "https://..."
  gallery:
    title: "Gallery Title"
    url: "https://..."
```

URLs are optional during prototyping (shows title without link).

## Component Guide

### Interactive Components

- **`ConceptBlock.astro`**: Main container for a learning concept
- **`DrillsList.astro`**: Renders list of drills with difficulty badges
- **`ModesOfExpressionTabs.astro`**: Physical/Digital tabbed interface
- **`CommonErrorsAccordion.astro`**: Expandable pitfall/solution pairs
- **`RubricTable.astro`**: Responsive table for self-assessment

### Layouts

- **`BaseLayout.astro`**: Site shell with header/footer
- **`ModuleLayout.astro`**: Implements 7-section module template

### Pages

- **`src/pages/index.astro`**: Homepage with module grid
- **`src/pages/about.astro`**: UDL philosophy explanation
- **`src/pages/module/[slug].astro`**: Dynamic module pages

## Important Constraints

### Content-Code Separation

Non-developers must be able to edit content without touching code. Maintain strict separation:
- ✅ Content in markdown files or JSON
- ✅ Structure in frontmatter
- ❌ Never hard-code content in components
- ❌ Never require code changes for content updates

### Accessibility Requirements

- All interactive elements need keyboard navigation
- Use semantic HTML (`<details>`, `<nav>`, `role` attributes)
- Maintain WCAG 2.1 AA contrast ratios
- All videos must default to captions enabled

### Code Comments

Components MUST have heavy comments explaining:
- **What** the component does
- **How** to edit associated content
- **Where** the data comes from

Example:
```astro
---
/**
 * Drills List Component
 * Displays drill items that are filtered by learning mode
 * Content source: frontmatter `drills` array in module .md files
 */
```

## Common Development Tasks

### Styling a Component

1. Check if CSS custom properties exist for your color/spacing
2. Add `<style>` block in `.astro` component
3. Use scoped styles (default) unless global needed
4. Reference vars: `color: var(--color-primary)`

### Adding Client-Side Interactivity

1. Add `<script>` tag in `.astro` component
2. Use `document.addEventListener()` for delegation
3. Query by `data-*` attributes for stability
4. Dispatch custom events if other components need to react

### Modifying Concepts
 
Concepts are defined in the `concepts` array in the module frontmatter. Each concept has its own `id`, `title`, `explanation`, `drills`, etc.

### Testing Changes

No automated tests yet. Manual testing:
1. Run `npm run dev`
2. Verify all concepts render correctly
3. Check drill scaffolding and difficulty badges
4. Verify rubric table responsiveness

## Gotchas

### Astro Content Collections

- Frontmatter schema is STRICTLY typed in `src/content/config.ts`
- Invalid frontmatter causes build failures
- Optional fields must use `.optional()` in Zod schema

### Concept Frontmatter
 
- The `concepts` array in frontmatter can get large.
- Ensure indentation is correct in YAML.
- Use `|` for multi-line strings (like `explanation`).

### Module Markdown

- Section 1 (Core Concepts) and Sections 6-7 (Application, Rubric) come from markdown body
- Sections 2-5 come from frontmatter
- Don't duplicate content between frontmatter and body

## UDL Principle Mapping

When adding features, map to UDL principles:

1. **Representation** (The "What") - Multiple content formats
2. **Action & Expression** (The "How") - Multiple ways to demonstrate learning
3. **Engagement** (The "Why") - Motivation and self-assessment

Every feature should support at least one principle.

## Deployment

Build generates static HTML/CSS/JS:
```bash
npm run build  # Output: ./dist/
```

Deploy `dist` folder to:
- Netlify (drag-and-drop or Git auto-deploy)
- Vercel (Git integration)
- GitHub Pages (push to gh-pages branch)

No server-side rendering or databases needed.
