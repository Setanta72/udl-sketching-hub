# Print Workbook Production Guide

**Last Updated**: November 11, 2025
**Format**: A4 Landscape (297mm × 210mm)
**Current Status**: PDF Mockup Generated (101 pages across 7 modules)

---

## Table of Contents

1. [Mockup Overview](#mockup-overview)
2. [Asset Requirements](#asset-requirements)
3. [Production Workflow](#production-workflow)
4. [Quality Checklist](#quality-checklist)
5. [Printing Specifications](#printing-specifications)

---

## Mockup Overview

### What We Have

The `workbook-mockup/` directory contains print-ready PDF mockups with:

- ✅ **Proper A4 landscape format** (297mm × 210mm)
- ✅ **Spiral binding margins** (30mm left, 20mm right, 15mm top/bottom)
- ✅ **Complete layout structure** for all 7 modules
- ✅ **Placeholder boxes** for images showing exact placement
- ✅ **Practice space areas** with grid backgrounds
- ✅ **QR code placeholders** for video links
- ✅ **Cover and introduction pages**
- ✅ **Supplementary practice grid pages**

### Current Page Count

| File | Pages | Description |
|------|-------|-------------|
| 00-cover.pdf | 1 | Cover page with QR code placeholder |
| 01-introduction.pdf | ~2 | How to use + materials list |
| m1-biomechanics.pdf | 15 | Module 1 content |
| m2-perspective.pdf | 9 | Module 2 content |
| m3-volumetric.pdf | 17 | Module 3 content |
| m4-ellipses.pdf | 12 | Module 4 content |
| m5-advanced-form.pdf | 16 | Module 5 content |
| m6-annotation.pdf | 18 | Module 6 content |
| m7-shade-shadow.pdf | 14 | Module 7 content |
| 99-practice-grid.pdf | 1 | Blank practice page (can duplicate) |
| **Total** | **~105 pages** | Will increase to 140-160 with real images |

---

## Asset Requirements

### Gallery Images Needed

Each module has progression galleries showing novice → proficient → mastery examples.

**Total Required**: 57 gallery images minimum (19 concepts × 3 levels)

#### Module 1: Biomechanics (9 images)
- Concept 1.1: Shoulder vs Wrist Drawing (3 levels)
- Concept 1.2: Line Weight Hierarchy (3 levels)
- Concept 1.3: Ghosting Technique (3 levels)

#### Module 2: Perspective (6 images)
- Concept 2.1: Horizon Line & VPs (3 levels)
- Concept 2.2: 2-Point Perspective (3 levels)

#### Module 3: Volumetric (9 images)
- Concept 3.1: Crating (3 levels)
- Concept 3.2: X-Method Division (3 levels)
- Concept 3.3: Additive/Subtractive (3 levels)

#### Module 4: Ellipses (6 images)
- Concept 4.1: Ellipse Fundamentals (3 levels)
- Concept 4.2: Cylinder Construction (3 levels)

#### Module 5: Advanced Form (9 images)
- Concept 5.1: Fillets/Rounds/Chamfers (3 levels)
- Concept 5.2: Complex Intersections (3 levels)
- Concept 5.3: Lofting (3 levels)

#### Module 6: Annotation (9 images)
- Concept 6.1: Architectural Lettering (3 levels)
- Concept 6.2: Callouts & Leaders (3 levels)
- Concept 6.3: Page Composition (3 levels)

#### Module 7: Rendering (6 images)
- Concept 7.1: Light & Shadow (3 levels)
- Concept 7.2: Material Rendering (3 levels)

### Image Specifications

**Format**: High-resolution photos or scans
**Resolution**: 300 DPI minimum
**Size**: Approximately 80mm × 60mm print size
**File Type**: JPEG or PNG
**Color Mode**: RGB (will convert to CMYK for print)
**Content**:
- Clear, well-lit photos
- Consistent framing across levels
- Annotations visible if hand-drawn

### QR Codes Needed

1. **Cover Page**: Link to main website
2. **Introduction Page**: Link to video tutorial library
3. **Per Module** (optional): Direct links to module-specific videos

**QR Code Specs**:
- Size: 30mm × 30mm
- Format: High-resolution PNG or SVG
- Error correction: Level H (30% redundancy)
- Test scan before printing!

### Video Resources (for QR codes)

**Total**: 19 video tutorials (one per concept)
**Length**: 5-10 minutes each
**Hosting**: YouTube, Vimeo, or institutional media server

---

## Production Workflow

### Phase 1: Asset Creation (2-4 weeks)

**Week 1-2: Gallery Images**
1. Create or photograph student work at 3 levels
2. Annotate images as specified in content
3. Scan at 300 DPI or photograph with good lighting
4. Edit for consistent framing and labeling
5. Export as high-resolution JPEGs

**Week 3: QR Codes**
1. Deploy website to production URL
2. Record or compile video tutorials
3. Upload videos to hosting platform
4. Generate QR codes with correct URLs
5. Test QR codes with multiple devices

**Week 4: Cover Design**
1. Design professional cover in design software
2. Incorporate QR code
3. Match brand colors from web version
4. Export print-ready PDF (bleed if required)

### Phase 2: PDF Integration (1 week)

Two approaches:

#### Option A: Manual Insertion (Design Software)

1. **Import PDFs to InDesign/Illustrator**
   - Open each module PDF
   - Place gallery images into placeholder areas
   - Place QR codes in designated spots
   - Verify alignment and margins

2. **Export Print-Ready PDFs**
   - PDF/X-4 format for print
   - Include bleed if required by printer
   - Embed all fonts
   - Convert to CMYK color space

#### Option B: Automated (Web Integration)

1. **Add Real Images to Web Content**
   - Replace placeholder paths in module `.md` files
   - Example:
     ```yaml
     gallery:
       novice:
         imageUrl: /images/m1-shoulder-novice.jpg  # Real path
     ```

2. **Rebuild Site**
   ```bash
   npm run build
   ```

3. **Regenerate PDFs**
   ```bash
   npm run generate-workbook
   ```

4. **Verify Output**
   - Check all images loaded correctly
   - Verify image quality in print preview
   - Confirm page breaks are clean

**Recommendation**: Option B is faster and maintains consistency between web and print.

### Phase 3: Assembly & Proofing (1 week)

1. **Merge Individual PDFs**
   ```bash
   # Using pdftk (free, cross-platform)
   pdftk workbook-mockup/*.pdf cat output Complete-Workbook.pdf

   # Or using Adobe Acrobat Pro
   # Tools → Combine Files → Add Files → Combine
   ```

2. **Add Page Numbers** (if not automatic)
   - Use PDF editor to add sequential page numbers
   - Start numbering after cover
   - Format: "Page X of Y"

3. **Create Print-Ready PDF**
   - Preflight check in Acrobat Pro
   - Convert to PDF/X-4 (print standard)
   - Verify all fonts embedded
   - Check color mode (CMYK for offset printing)

4. **Order Proof Copy**
   - Print single copy at print shop or POD service
   - Review physical copy for:
     - Margin consistency
     - Image quality
     - Binding alignment
     - Color accuracy
     - Text readability

5. **Revisions**
   - Note any issues in proof
   - Make corrections
   - Repeat proof if significant changes

### Phase 4: Production (1-2 weeks depending on quantity)

See [Printing Specifications](#printing-specifications) below.

---

## Quality Checklist

### Pre-Print Checklist

- [ ] All 57 gallery images sourced and placed
- [ ] All images are 300 DPI or higher
- [ ] All QR codes tested and functional
- [ ] QR codes are 30mm × 30mm minimum
- [ ] Cover design complete and professional
- [ ] All fonts embedded in PDF
- [ ] PDF converted to CMYK color space
- [ ] PDF passes preflight check (no errors)
- [ ] Page numbers sequential and correct
- [ ] Margins correct for binding (30mm left)
- [ ] All text readable at print size
- [ ] No low-resolution images flagged
- [ ] Bleed added if required by printer (3mm typical)

### Proof Review Checklist

- [ ] Cover prints correctly (colors, QR code)
- [ ] Introduction page readable
- [ ] All module headers print correctly
- [ ] Gallery images sharp and clear
- [ ] Gallery level labels visible (Novice, Proficient, Mastery)
- [ ] Practice space grids print light enough to draw over
- [ ] Drill cards have adequate white space
- [ ] Error cards stand out visually
- [ ] Rubric tables fit on page without crowding
- [ ] QR codes scan successfully
- [ ] Page numbers visible and correct
- [ ] Binding margin adequate (no text cut off)
- [ ] Paper weight appropriate for drawing
- [ ] Overall layout professional

---

## Printing Specifications

### Format

- **Page Size**: A4 Landscape (297mm × 210mm)
- **Orientation**: Landscape throughout
- **Binding**: Spiral or Wire-O (allows flat opening)
- **Binding Edge**: Left (30mm margin)

### Paper

**Cover**:
- Stock: 300gsm card stock
- Finish: Matte or soft-touch laminate
- Color: Full color (CMYK)

**Interior Pages**:
- Stock: 120-150gsm
- Type: Smooth drawing paper or offset paper
- Color: Full color for gallery pages, B&W acceptable for text-only pages
- Important: Must support pencil/pen drawing

**Practice Grids**:
- Same as interior or heavier (150-170gsm)
- Smooth surface essential for sketching

### Binding Options

**Option 1: Plastic Spiral Binding** (Most Economical)
- Pros: Cheap, lays flat, pages turn easily
- Cons: Less durable, can snag in bags
- Cost: +$2-5 per book

**Option 2: Wire-O Binding** (Professional)
- Pros: Durable, professional look, lays completely flat
- Cons: Slightly more expensive
- Cost: +$4-8 per book

**Option 3: Perfect Binding** (Book-Like)
- Pros: Looks like textbook, durable spine
- Cons: Doesn't lay flat (bad for workbook use)
- **Not Recommended** for this application

### Quantity Pricing Estimates

Prices for full-color interior, wire-o binding, ~140-page book:

| Quantity | Cost per Book | Total Cost |
|----------|---------------|------------|
| 1 (Proof) | $40-60 | $40-60 |
| 25 | $22-30 | $550-750 |
| 50 | $18-24 | $900-1,200 |
| 100 | $15-20 | $1,500-2,000 |
| 250 | $12-16 | $3,000-4,000 |
| 500 | $10-13 | $5,000-6,500 |

**Notes**:
- Prices vary by region and printer
- Full color throughout is expensive; consider B&W for text-heavy pages
- Digital printing (low quantity) vs offset printing (high quantity)

### Print-on-Demand Option

**Services**: Lulu, Blurb, Amazon KDP

**Pros**:
- No upfront inventory
- Only print as ordered
- Easy updates (upload new PDF)
- Global distribution

**Cons**:
- Higher per-unit cost ($18-25)
- Less control over paper quality
- Binding options limited

**Best For**: Testing market, ongoing sales, low-volume distribution

### Local Print Shop Option

**Pros**:
- Control over paper selection
- Can request premium binding
- Support local business
- Fast turnaround (3-5 days)

**Cons**:
- More expensive for small runs
- Storage needed
- Manual distribution

**Best For**: Classroom sets, workshop materials, premium products

---

## Asset Creation Guide

### Creating Gallery Images

#### Approach 1: Commission from Students

**Process**:
1. Select advanced students for "mastery" examples
2. Select intermediate students for "proficient" examples
3. Select early-stage students for "novice" examples
4. Provide clear assignment brief (concept, size, medium)
5. Photograph or scan completed work
6. Obtain permission for educational use

**Pros**: Authentic student work, builds community
**Cons**: Variable quality, scheduling challenges
**Cost**: Free or small honorarium ($20-50 per image)

#### Approach 2: In-House Creation

**Process**:
1. Faculty or TA creates all three levels
2. Deliberately show progression in each level
3. Photograph or scan with consistent setup
4. Annotate as specified in content

**Pros**: Complete control, consistent style, fast
**Cons**: Time-intensive (30-40 hours total)
**Cost**: Your time only

#### Approach 3: Hybrid

**Process**:
1. Collect student work for "novice" and "proficient"
2. Create "mastery" examples in-house or commission professional
3. Ensures high quality at mastery level

**Pros**: Authentic + polished
**Cons**: Coordination effort
**Cost**: $10-30 per mastery image

### Photography Setup

**Equipment**:
- Camera or smartphone (12MP+)
- Tripod or stable surface
- Consistent lighting (natural or photo lamps)
- Neutral background (white or light gray)

**Settings**:
- Overhead shot, perpendicular to paper
- Consistent framing (fill frame with sketch)
- Consistent distance for each concept
- No shadows on sketch
- Sharp focus

**Post-Processing**:
- Crop to consistent size
- Adjust levels for clean white background
- Sharpen slightly
- Color balance if needed
- Export at 300 DPI

---

## Workflow Timeline

### Optimistic Timeline (Parallel Work)

**Week 1-2**: Asset creation (images 1-30)
**Week 3-4**: Asset creation (images 31-57) + QR codes
**Week 5**: PDF integration and assembly
**Week 6**: Proof review and revisions
**Week 7**: Final print production
**Week 8**: Delivery

**Total**: 8 weeks from start to books in hand

### Realistic Timeline (Sequential Work)

**Week 1-3**: Create all gallery images
**Week 4**: Create QR codes and cover
**Week 5**: Integrate assets into PDFs
**Week 6**: Proof order and review
**Week 7**: Revisions if needed
**Week 8-9**: Print production (depending on quantity)
**Week 10**: Delivery

**Total**: 10 weeks from start to books in hand

### Expedited Timeline (If Needed)

**Week 1-2**: Priority gallery images (Modules 1-3 only)
**Week 3**: Integrate and proof Modules 1-3
**Week 4**: Print first batch
**Week 5-6**: Complete Modules 4-7 in parallel

**Total**: 6 weeks for partial workbook (first 3 modules)

---

## Quick Start: Regenerate PDFs with Real Assets

Once you have real images:

```bash
# 1. Add images to public/images/ directory
mkdir -p public/images
# Copy your gallery images here with consistent naming:
# m1-shoulder-novice.jpg, m1-shoulder-proficient.jpg, m1-shoulder-mastery.jpg
# etc.

# 2. Update module content files
# Edit src/content/modules/m1-biomechanics.md
# Change: imageUrl: /images/placeholder.jpg
# To:     imageUrl: /images/m1-shoulder-novice.jpg

# 3. Rebuild site
npm run build

# 4. Regenerate PDFs
npm run generate-workbook

# 5. Review output
open workbook-mockup/m1-biomechanics.pdf

# 6. If good, merge all PDFs
pdftk workbook-mockup/*.pdf cat output Complete-Workbook-v1.0.pdf
```

---

## File Naming Convention

### Gallery Images

Format: `m{module}-{concept-slug}-{level}.jpg`

Examples:
- `m1-shoulder-novice.jpg`
- `m1-shoulder-proficient.jpg`
- `m1-shoulder-mastery.jpg`
- `m1-lineweight-novice.jpg`
- `m2-horizon-proficient.jpg`

### QR Codes

Format: `qr-{purpose}.png`

Examples:
- `qr-cover-website.png`
- `qr-intro-videos.png`
- `qr-m1-demos.png` (optional per-module codes)

---

## Distribution Options

### Academic Institution

**Free Distribution**:
- Print cost covered by department/grant
- Distribute to enrolled students
- Include with course materials

**Paid (Cost Recovery)**:
- Sell at campus bookstore
- Price: $25-35 (cost + handling)
- Or bundle with course fee

### Print-on-Demand

**Setup**:
1. Create account on Lulu.com or Blurb
2. Upload PDF
3. Set pricing: $35-45 retail
4. Publish

**Marketing**:
- Link from website
- Share with design education community
- Social media promotion

### Direct Sales

**Setup**:
- Order batch from local printer
- Store inventory
- Ship as ordered

**Payment**:
- PayPal, Stripe, or Gumroad
- Manual order fulfillment

---

## Maintenance & Updates

### Version Control

Keep versioned PDFs:
- `Complete-Workbook-v1.0.pdf` (initial release)
- `Complete-Workbook-v1.1.pdf` (minor corrections)
- `Complete-Workbook-v2.0.pdf` (major content updates)

### Update Process

1. Make changes to web content
2. Rebuild site: `npm run build`
3. Regenerate PDFs: `npm run generate-workbook`
4. Increment version number
5. Upload new PDF to print-on-demand service
6. Notify existing users of updates (if significant)

---

## Cost Summary

### One-Time Costs

| Item | Low | High | Notes |
|------|-----|------|-------|
| Gallery images | $0 | $1,500 | DIY vs commissioned |
| QR code generation | $0 | $0 | Free tools |
| Cover design | $0 | $300 | DIY vs professional |
| Proof copy | $40 | $60 | Essential |
| **Total Setup** | **$40** | **$1,860** | |

### Per-Book Costs (Based on Quantity)

| Quantity | Per Book | Total Batch Cost |
|----------|----------|------------------|
| 1 (Proof) | $50 | $50 |
| 25 (Class) | $25 | $625 |
| 50 (Semester) | $20 | $1,000 |
| 100 (Year) | $16 | $1,600 |
| Print-on-Demand | $20 | Per order |

### Suggested Retail Pricing

- **Cost Recovery**: $25-30
- **With Margin**: $35-45
- **Premium**: $50-60 (with extras like reference cards)

---

## Next Steps

### Immediate (This Week)
1. ✅ PDF mockups generated
2. [ ] Review mockups with team
3. [ ] Decide on asset creation approach
4. [ ] Recruit students or assign staff for image creation

### Short Term (Weeks 1-4)
1. [ ] Create first batch of gallery images (Modules 1-2)
2. [ ] Generate QR codes
3. [ ] Integrate assets and regenerate PDFs
4. [ ] Order first proof copy

### Medium Term (Weeks 5-8)
1. [ ] Complete remaining gallery images
2. [ ] Finalize cover design
3. [ ] Order final proof
4. [ ] Approve for production

### Long Term (Weeks 9-10)
1. [ ] Print first batch
2. [ ] Set up distribution method
3. [ ] Market to target audience
4. [ ] Gather user feedback for v2.0

---

## Questions?

**Technical Issues**:
- PDF generation errors: Check Node.js and Puppeteer versions
- Image quality: Ensure 300 DPI source files
- Binding alignment: Verify 30mm left margin in all PDFs

**Design Issues**:
- Colors look different: Convert to CMYK, request printed proof
- Text too small: Review at 100% zoom, test physical print
- Layout breaks: Check page-break-inside settings in print.css

**Production Issues**:
- Quotes too high: Get quotes from 3+ printers, consider POD
- Quality concerns: Request samples, specify paper/binding clearly
- Timeline tight: Start with partial workbook (first 3 modules)

---

**End of Print Production Guide**

**Current Status**: Ready for asset creation phase
**Mockup Location**: `workbook-mockup/` directory (101 pages, ~2.7 MB total)
**Next Action**: Review mockups and decide on asset creation approach
