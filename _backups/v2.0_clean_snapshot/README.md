# UDL Sketching Hub

A web-based learning resource for product design sketching, built on **Universal Design for Learning (UDL)** principles.

## Project Overview

The UDL Sketching Hub provides a self-paced learning environment for product design undergraduates, supporting two distinct learner paths:

- **Concept-Based**: Modular learning blocks that build from core concepts to application
- **Progressive Mastery**: Scaffolding that supports all learners from novice to mastery within a single path

## Tech Stack

- **Framework**: [Astro](https://astro.build) v4.16+ (Static Site Generator)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v3.4+
- **Language**: TypeScript
- **Deployment**: Netlify, Vercel, or GitHub Pages (static)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Start the development server:**

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Available Commands

| Command           | Action                                       |
|-------------------|----------------------------------------------|
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start dev server at `localhost:4321`         |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview build locally before deploying       |

## Project Structure

```
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── ConceptBlock.astro
│   │   ├── DrillsList.astro
│   │   ├── CommonErrorsAccordion.astro
│   │   └── RubricTable.astro
│   ├── content/             # Content collections
│   │   ├── config.ts        # Content schema definitions
│   │   └── modules/         # Module markdown files
│   │       ├── m1-biomechanics.md
│   │       ├── m2-perspective.md
│   │       └── ...
│   ├── data/                # JSON data files
│   │   └── glossary.json    # Glossary term definitions
│   ├── layouts/             # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── ModuleLayout.astro
│   ├── pages/               # Route pages
│   │   ├── index.astro      # Homepage
│   │   ├── about.astro      # About page
│   │   └── module/
│   │       └── [slug].astro # Dynamic module pages
│   └── scripts/             # Client-side TypeScript
│       └── learningMode.ts  # Learning mode management
├── public/                  # Static assets
└── astro.config.mjs         # Astro configuration
```

## Key Features

### 1. Concept-Based Learning

Modules are broken down into discrete "Concepts". Each concept is a self-contained learning unit containing:
- **Explanation**: Core theory and technique
- **Resources**: Video and PDF guides
- **Progression Gallery**: Visual examples of Novice vs. Proficient vs. Mastery work
- **Drills**: Practice exercises with embedded scaffolding
- **Common Errors**: Diagnostic help for self-correction

### 2. Progressive Mastery

Instead of separate paths, every drill and concept is designed to support all learners:
- **Scaffolding Tips**: Embedded in every drill to help beginners
- **Mastery Challenges**: Extension tasks for advanced learners
- **Rubrics**: Clear criteria for self-assessment at every level

### 3. Content-Code Separation

All module content lives in markdown files (`src/content/modules/`) with frontmatter metadata. Non-developers can edit content without touching code.

### 4. Accessibility

- WCAG 2.1 AA compliant design
- Semantic HTML with ARIA labels
- Keyboard navigation support
- High contrast color scheme

## Adding New Modules

To add a new module (e.g., Module 8):

1.  Create `src/content/modules/m8-your-topic.md`
2.  Follow the frontmatter schema defined in `src/content/config.ts`
3.  Include all 7 sections in the markdown body
4.  The module will automatically appear on the homepage

Example frontmatter:

```yaml
---
moduleNumber: 8
title: "Your Topic Name"
description: "Brief description"
estimatedTime: "3-4 hours"
learningObjectives: ["Objective 1", "Objective 2"]
whyItMatters: "Motivation text"

concepts:
  - id: "concept-1"
    title: "First Concept"
    order: 1
    explanation: "Markdown text..."
    drills:
      - title: "Drill Name"
        difficulty: "beginner"
---
```

## Editing Content

### Module Content

Edit files in `src/content/modules/`. Changes will hot-reload in dev mode.

### Glossary Terms

Edit `src/data/glossary.json` to add or modify glossary definitions for `<dfn>` tags.

### Styling

Colors, fonts, and spacing are defined as CSS custom properties in `src/layouts/BaseLayout.astro`:

```css
:root {
  --color-primary: #2C3E50;
  --color-secondary: #E74C3C;
  --color-background: #FFFFFF;
  --color-surface: #F8F9FA;
  /* ... */
}
```

Change these values to theme the entire site.

## Building for Production

```bash
npm run build
```

Output will be in `./dist/` directory. Deploy this folder to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push `dist` to `gh-pages` branch

## License

This project is for educational use.

## Support

For issues or questions about the codebase, consult the `CLAUDE.md` file or the original UDL Brief.
