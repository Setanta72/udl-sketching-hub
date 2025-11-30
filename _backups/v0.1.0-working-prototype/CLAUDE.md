# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The UDL Sketching Hub is an Astro-based static site generator (SSG) project for teaching product design sketching using Universal Design for Learning principles. The site dynamically adapts to learner preferences through a "Learning Mode" toggle.

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

### Core Concept: Two-Path Learning System

The entire site is built around supporting two distinct learner paths that adapt content dynamically:

- **Guided Path**: Learners using aids (rulers, templates) for precision
- **Mastery Path**: Learners pursuing freehand skill with minimal aids

This is implemented via:
1. `localStorage` key `udl-learning-mode` storing user preference
2. JavaScript in `src/scripts/learningMode.ts` managing state
3. `data-paths` attributes on drill list items for filtering
4. Components that show/hide content based on current mode

### Seven-Section Module Template

Every module must follow this exact structure (defined in `src/layouts/ModuleLayout.astro`):

1. **Core Concepts** - From markdown body
2. **Resources** - From frontmatter (video, guide, gallery)
3. **Skills & Drills** - Dynamic list filtered by learning mode
4. **Modes of Expression** - Tabbed interface (Physical/Digital)
5. **Self-Support** - Accordion for common errors
6. **Application** - From markdown body
7. **Mastery Rubric** - From markdown body, language adapts to mode

### Content Collections

Module content uses Astro's Content Collections API:
- Schema defined in `src/content/config.ts`
- Content files in `src/content/modules/`
- Frontmatter provides structured data (drills, resources, errors)
- Markdown body provides prose content (concepts, application, rubric)

## Key Technical Patterns

### Dynamic Drill Filtering

Drills use a `paths` array in frontmatter:

```yaml
drills:
  - text: "**Drill:** Line Gauntlet"
    paths: ["guided", "mastery"]  # Shows in both modes
  - text: "**Drill:** Ruler Practice"
    paths: ["guided"]              # Shows only in guided mode
```

The `DrillsList.astro` component renders these with `data-paths` attributes, and `learningMode.ts` filters visibility based on localStorage.

### State Management

Client-side state is managed via:
- `localStorage` for persistence
- Custom events (`learning-mode-change`) for reactivity
- Direct DOM manipulation for show/hide (no framework needed)

When learning mode changes:
1. Toggle button updates UI
2. `setLearningMode()` saves to localStorage
3. Custom event dispatched
4. `applyLearningModeFilter()` updates DOM

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

- **`LearningModeToggle.astro`**: Site-wide mode selector with localStorage
- **`DrillsList.astro`**: Renders filterable drill list
- **`ModesOfExpressionTabs.astro`**: Physical/Digital tabbed interface
- **`CommonErrorsAccordion.astro`**: Expandable pitfall/solution pairs

All interactive components use vanilla JS in `<script>` tags (no framework).

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

### Modifying Learning Mode Behavior

All learning mode logic is in `src/scripts/learningMode.ts`. Key functions:
- `getLearningMode()` - Read from localStorage
- `setLearningMode(mode)` - Update and dispatch event
- `applyLearningModeFilter(mode)` - Update DOM visibility

### Testing Changes

No automated tests yet. Manual testing:
1. Run `npm run dev`
2. Toggle learning mode - verify drills filter correctly
3. Check localStorage persists across page loads
4. Verify all 7 sections render on module pages

## Gotchas

### Astro Content Collections

- Frontmatter schema is STRICTLY typed in `src/content/config.ts`
- Invalid frontmatter causes build failures
- Optional fields must use `.optional()` in Zod schema

### Learning Mode State

- Initial mode applied on `DOMContentLoaded`
- Components don't automatically react to mode changes
- Use custom events or manual DOM updates

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
