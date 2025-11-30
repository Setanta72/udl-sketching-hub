# Developer-Ready Project Brief

# Project: The UDL Sketching Hub (Prototype v1)

## 1. Project Vision

To build a fully-functional, content-complete prototype of a web-based learning resource for product design sketching. The site will serve as a self-paced hub, enabling learners of all abilities to achieve their desired level of mastery, from proficiency with aids to full freehand mastery.

## 2. Core Challenge & Target Audience

- **Audience:** Product Design undergraduates.
    
- **Challenge:** This audience has varying levels of prior skill. The site's architecture **must** support a "Progressive Mastery" model:
    
    1. **Scaffolding:** Providing aids (rulers, templates) for novices to build confidence.
    2. **Fading:** Gradually removing aids to move towards freehand mastery.
    3. **Mastery:** Encouraging rapid, gestural, freehand ideation.
        

## 3. Guiding Philosophy: Universal Design for Learning (UDL)

All features must map back to the three UDL principles:

1. **Provide Multiple Means of Representation:** (The "What" - e.g., video, text, guides)
    
2. **Provide Multiple Means of Action & Expression:** (The "How" - e.g., digital, physical, aided)
    
3. **Provide Multiple Means of Engagement:** (The "Why" - e.g., self-assessment, clear goals)
    

## 4. Key Architectural Feature: Concept-Based Learning
 
To address the Core Challenge, the site uses a "Concept-Based" structure rather than a rigid linear page.
 
- **Structure:** Modules are composed of self-contained "Concept Blocks".
- **Progression:** Each block contains the theory, examples, drills, and diagnostics for that specific concept.
- **UDL Rationale:** This chunking reduces cognitive load and allows learners to focus on one skill at a time before moving to the next.
    

## 5. Site Architecture

1. **Homepage (`/`)**
    
    - **Purpose:** Introduce the UDL philosophy and the Module Grid.
        
    - **Content:**
        
        - Brief intro to the UDL approach.
            
        - A visual grid of all 7 Modules. This is the main navigation.
            
2. **Module Page Template (`/module/m1-biomechanics`, `/module/m2-perspective`, etc.)**
    
    - **Purpose:** The core learning environment. This single template will be populated by the 7 module content files.
        
    - **Content:** Must contain the 7 UDL-driven sections specified below.
        
3. **About Page (`/about`)**
    
    - **Purpose:** Explicitly explains the UDL philosophy.
        
    - **Content:** "What is UDL?", "How to use the Mastery Rubrics", "How to use the Scaffolding Tips."
        

## 6. Module Page Template: Detailed Specification

This is the most critical component. The template is populated from external Markdown files and renders a series of **Concept Blocks**.

### 6.1. Section 1: Core Concepts

- **Content:** Text, lists, images.
    
- **Feature:** Implement a "pop-up" glossary. Key terms (`Minor Axis`, `Terminator`, `Cone of Vision`) should be highlighted (e.g., with `<dfn>`) and reveal a definition on hover/click.
    
- **UDL Link:** Representation (Clarifies vocabulary).
    

### 6.2. Section 2: Resources

- **Content:** A grid or tabbed block for `[Video]`, `[Step-by-Step Guide]`, `[Gallery]`.
    
- **Feature:** All embedded videos **must** have captions enabled by default.
    
- **UDL Link:** Representation (Provides alternatives for visual/auditory info).
    

### 6.3. Skills & Drills (Embedded in Concept)
 
- **Content:** Practice exercises specific to the concept.
- **Feature:** Each drill includes a **Scaffolding Suggestion** (how to use aids if struggling) and a **Mastery Challenge** (how to push further).
- **UDL Link:** Action & Expression (Graduated levels of support).
        

### 6.4. Modes of Expression (Physical vs. Digital)
 
- **Content:** Mode-specific tips included within each Concept Block.
- **Feature:** "Physical Tips" and "Digital Tips" sections.
- **UDL Link:** Action & Expression (Optimizes for different tools).
    

### 6.5. Section 5: Self-Support (Common Errors & Pitfalls)

- **Content:** An "accordion" or "FAQ-style" dropdown interface.
    
- **Feature:** Each "Pitfall" (e.g., "My cubes look flat") is a `<summary>` tag that, when clicked, reveals the "Diagnosis" and "Correction" in an associated `<details>` tag.
    
- **UDL Link:** Engagement (Minimizes frustration, builds resilience).
    

### 6.6. Section 6: Application (Authentic Task)

- **Content:** A clear "assignment" block.
    
- **Feature (Prototype v1):** A simple text block describing the task.
    
- **Feature (Prototype v2 - Optional):** A "Community Gallery" where learners can submit their work.
    
- **UDL Link:** Action & Expression (Authentic way to demonstrate mastery).
    

### 6.7. Mastery Rubric
 
- **Content:** An interactive self-assessment table at the end of the module.
- **Feature:** Columns for "Novice", "Proficient", and "Mastery" with clear behavioral descriptors.
- **UDL Link:** Engagement (Promotes self-assessment and reflection).
    

## 7. Content Specification & Deliverables

- **Deliverable:** The developer will build out **all 7 modules** based on the UDL template structure.
    
- **Content Source:** The content will be provided as 7 separate Markdown files (`m1.md`, `m2.md`, etc.).
    
- **Template:** The structure provided in `product_design_sketching_udl.md` (for Module 2) will be the template.
    
- **Example Content:** To assist the developer, I am providing the content structure for **Module 1** and **Module 2** below. The developer will use this same 7-part structure for M3-M7 (content for M3-M7 will be provided as simple text, which the developer must format into the MD structure).
    

### **Content File Example 1: `m1-biomechanics.md`**

```
# Module 1: Biomechanics & Line

### 1. Core Concepts
* Drawing from Shoulder (for large arcs/lines) vs. Wrist (for detail).
* Stable Page Orientation: Keeping your page fixed to build a consistent mental 3D model.
* Line Confidence & Ghosting: Rehearsing the stroke before drawing.
* Line Weight Hierarchy (5 types):
    1.  **Construction:** (Lightest) The "scaffolding" you will draw over.
    2.  **Internal:** Real edges *inside* the form.
    3.  **External:** Real edges on the *outside* of the form.
    4.  **Profile/Outline:** (Heaviest) The line that defines the object's silhouette.
    5.  **Cut Lines:** (Heavy) Used for cross-sections.

### 2. Resources
* [Video]: "Drawing from your Shoulder"
* [Step-by-Step Guide]: "The 5-Type Line Weight Hierarchy"
* [Gallery]: "Examples of Professional Line Work"

### 3. Skills & Drills
* <li data-path="guided,mastery">**Drill:** Line Gauntlet (Freehand) - Draw pages of parallel lines (H, V, D).</li>
* <li data-path="guided">**Drill:** Guided-Line Practice - Use a ruler to draw 10 perfect lines, then try to replicate them freehand.</li>
* <li data-path="mastery">**Drill:** Line Length Estimation - Draw a 2cm line, then a 5cm, then a 10cm. Check with a ruler.</li>
* <li data-path="mastery">**Drill:** "Clock Face" - Draw a dot, then practice drawing lines of the same length to all 12 "clock" positions.</li>
* <li data-path="guided,mastery">**Drill:** Line Weight Push/Pull - Practice creating a single line that goes from light to heavy.</li>

### 4. Modes of Expression
* **Physical:** Use a fineliner (0.1mm) for construction lines and a marker or (0.5mm) for profiles.
* **Digital:** Set your brush pressure sensitivity. Use a light blue color on a separate layer for construction lines.

### 5. Self-Support (Common Errors)
* **Pitfall:** My lines are "hairy" or "scratchy."
    * **Diagnosis:** You are drawing from your wrist and "sketching" the line instead of "drawing" it.
    * **Correction:** Lock your wrist. Practice the "Line Gauntlet" drill from your shoulder. Ghost the line 3 times, then draw it in one single, confident pass.
* **Pitfall:** All my lines look the same; my drawing is flat.
    * **Diagnosis:** You are not using line weight hierarchy.
    * **Correction:** Re-draw an object *only* focusing on weight. Go over your outline 3 times to make it the darkest.

### 6. Application
* Sketch a simple, flat object (e.g., a credit card, a smartphone).
* Your *only* goal is to use at least 3 distinct line weights. Make the outline pop.

### 7. Mastery Rubric
* **Novice:** Lines are hairy, wobbly, and from the wrist.
* **Proficient (Guided):** Can use a ruler and different pens to create a clean drawing with a clear line weight hierarchy.
* **Proficient (Mastery):** Lines are clean and from the shoulder. Some hierarchy is visible.
* **Mastery (Guided):** Can produce a "production-ready" technical drawing with perfect lines using aids.
* **Mastery (Mastery):** Freehand lines are crisp, confident, and show a deliberate and expressive 5-type hierarchy.
```

### **Content File Example 2: `m2-perspective.md`**

```
# Module 2: Perspective Systems

### 1. Core Concepts
* Horizon Line (HL): Represents the viewer's eye level.
* Vanishing Points (VP): The points on the HL where parallel lines converge.
* 1, 2, and 3-Point Perspective.
* Cone of Vision (C.O.V.): The ~60° cone representing a distortion-free view.
* Phase A (Explicit): Placing VPs on your page.
* Phase B (Gestural): Estimating VPs off the page.

### 2. Resources
* [Video]: "The 3 Types of Perspective Explained (10 min)"
* [Step-by-Step Guide]: "How to Construct a Cube in 1, 2, and 3-Point Perspective"
* [Gallery]: "20 Examples of Perspective in Product Design"

### 3. Skills & Drills
* <li data-path="guided">**Drill:** Explicit Cube Studies in 1, 2 & 3-Point (Aided) - Use a ruler and on-page VPs.</li>
* <li data-path="guided,mastery">**Drill:** The VP Transition Drill - Draw one cube aided, then one next to it freehand, aiming for the same VPs.</li>
* <li data-path="mastery">**Drill:** "Cubes in a Scene" (Estimated) - Draw 10-15 cubes freehand, all obeying the same *implied* VPs.</li>
* <li data-path="guided,mastery">**Drill:** Distortion Check - Draw cubes near the edge of your page to see how they distort.</li>

### 4. Modes of Expression
* **Physical:** Use a large sheet of paper (A3) to place VPs far apart. Use a T-square. Print perspective grids and trace over them.
* **Digital:** Use the "Perspective Guide" or "Drawing Assist" tool in your app (Procreate, Sketchbook, etc.).

### 5. Self-Support (Common Errors)
* **Pitfall:** "My cubes look flat," or "My parallel lines don't look right."
    * **Diagnosis:** You are drawing in "isometric" (parallel lines) not "perspective" (converging lines).
    * **Correction:** Re-do the "Explicit Cube Studies" drill. Force *every* receding line to go to a single VP.
* **Pitfall:** "My objects look weird or warped at the edges."
    * **Diagnosis:** Your object is outside the Cone of Vision. Your VPs are too close together.
    * **Correction:** Place your VPs *much* further apart, ideally off the page.

### 6. Application
* Create a simple 'street view' scene.
* Draw an HL and two VPs.
* Sketch 3-5 'buildings' (as simple cubes) on the same ground plane.

### 7. Mastery Rubric
* **Novice:** Lines are parallel (isometric) or diverge. Relies 100% on VPs.
* **Proficient (Guided):** Can accurately construct complex scenes *using on-page VPs and rulers*.
* **Proficient (Mastery):** Can estimate simple forms freehand, but with some inconsistencies.
* **Mastery (Guided):** Can rapidly produce complex, accurate drawings *using perspective grids or guides*.
* **Mastery (Mastery):** Intuitively sketches complex forms in accurate gestural 2-point perspective *without any guides*.
```

## 8. Developer Mandates & Code Quality

This is non-negotiable for the success of the project. The prototype must be editable by a non-developer (the client/educator).

1. **Content Decoupling (Headless):** The HTML templates **must** be decoupled from the content. The site must be built with a **Static Site Generator (SSG)** like **Astro, Eleventy (11ty), or Hugo**. The developer will ingest the 7 Markdown files to generate the static HTML pages.
    
2. **Human-Readable Comments:** The code, especially the HTML/Nunjucks/Liquid templates, **must be heavily commented**. The comments must explain _what_ each code block is for and _how_ to edit the content it generates.
    
    - _Example:_
        
        ```
        <!-- ====== SECTION 5: SELF-SUPPORT ===== -->
        <!-- This block reads the "Self-Support" section from the .md file -->
        <!-- It creates an accordion list. To edit content, see the .md file. -->
        <div class="self-support">
          <!-- ... loop for pitfalls ... -->
        </div>
        ```
        
3. **Easy Styling:** Use CSS Custom Properties (Variables) for all colors, fonts, and primary spacing (e.g., `--color-primary`, `--font-body`) in a global stylesheet. This allows for easy thematic changes without digging into component-level CSS.
    

## 9. Design & Technical Stack

- **Stack:** Static Site Generator (Astro, Eleventy preferred)
    
- **Content:** Sourced from Markdown files.
    
- **Styling:** Plain CSS with Custom Properties, or Tailwind CSS (if developer is proficient).
    
- **Design:** Clean, academic, "analog" aesthetic. High-contrast, WCAG 2.1 AA compliant.
    
- **Hosting:** The prototype will be hosted on a free static host like Netlify, Vercel, or GitHub Pages.