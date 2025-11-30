/**
 * PDF Workbook Generator
 * Converts built Astro site to print-ready PDF workbook
 * Format: A4 Landscape with proper margins for spiral binding
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Module configuration
const MODULES = [
  { slug: 'm1-biomechanics', title: 'Module 1: Biomechanics & Line Quality' },
  { slug: 'm2-perspective', title: 'Module 2: Perspective Systems' },
  { slug: 'm3-volumetric', title: 'Module 3: Volumetric Construction' },
  { slug: 'm4-ellipses', title: 'Module 4: Ellipses & Cylindrical Forms' },
  { slug: 'm5-advanced-form', title: 'Module 5: Advanced Form & Surface Transitions' },
  { slug: 'm6-annotation', title: 'Module 6: Annotation & Page Layout' },
  { slug: 'm7-shade-shadow', title: 'Module 7: Shade, Shadow & Rendering' }
];

// Output configuration
const OUTPUT_DIR = './workbook-mockup';
const DIST_DIR = './dist'; // Astro build output

/**
 * Ensure output directory exists
 */
function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✓ Created output directory: ${OUTPUT_DIR}`);
  }
}

/**
 * Check if dist directory exists
 */
function checkDistExists() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Error: dist/ directory not found.');
    console.error('   Please run "npm run build" first to generate the site.');
    process.exit(1);
  }
}

/**
 * Generate PDF for a single module
 */
async function generateModulePDF(browser, module) {
  console.log(`\n📄 Generating PDF: ${module.title}`);

  const page = await browser.newPage();

  // Set viewport for consistent rendering
  await page.setViewport({
    width: 1280,
    height: 800,
    deviceScaleFactor: 2 // Higher quality
  });

  // Construct file path to module
  const modulePath = path.join(process.cwd(), DIST_DIR, 'module', module.slug, 'index.html');

  if (!fs.existsSync(modulePath)) {
    console.warn(`⚠️  Warning: ${modulePath} not found, skipping...`);
    await page.close();
    return false;
  }

  try {
    // Load the module page
    await page.goto(`file://${modulePath}`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log('   ↳ Page loaded');

    // Generate PDF with A4 landscape settings
    const pdfPath = path.join(OUTPUT_DIR, `${module.slug}.pdf`);

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      landscape: true,
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: '15mm',
        right: '20mm',
        bottom: '15mm',
        left: '30mm' // Extra for spiral binding
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>', // Empty header
      footerTemplate: `
        <div style="font-size: 9pt; color: #666; width: 100%; padding: 0 20mm; display: flex; justify-content: space-between;">
          <span>UDL Sketching Hub Workbook</span>
          <span style="margin: 0 auto;">© 2025 - For Educational Use</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `
    });

    console.log(`   ✓ PDF saved: ${pdfPath}`);

    // Get page count
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pageCount = (pdfBuffer.toString('latin1').match(/\/Type[\s]*\/Page[^s]/g) || []).length;
    console.log(`   ↳ ${pageCount} pages`);

    await page.close();
    return true;

  } catch (error) {
    console.error(`   ❌ Error generating PDF: ${error.message}`);
    await page.close();
    return false;
  }
}

/**
 * Generate cover page (placeholder for now)
 */
async function generateCoverPage(browser) {
  console.log('\n📄 Generating cover page');

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

  // Create simple HTML cover page
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page {
          size: A4 landscape;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 210mm;
          width: 297mm;
          background: linear-gradient(135deg, #2E5266 0%, #6B9080 100%);
          color: white;
          font-family: 'Poppins', 'Inter', sans-serif;
          text-align: center;
        }
        .cover-content {
          max-width: 80%;
        }
        h1 {
          font-size: 48pt;
          margin-bottom: 15mm;
          font-weight: 800;
        }
        .subtitle {
          font-size: 24pt;
          margin-bottom: 10mm;
          font-weight: 400;
        }
        .qr-placeholder {
          width: 40mm;
          height: 40mm;
          border: 3px dashed rgba(255,255,255,0.5);
          margin: 15mm auto 5mm;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12pt;
        }
        .url {
          font-size: 14pt;
          opacity: 0.9;
        }
      </style>
    </head>
    <body>
      <div class="cover-content">
        <h1>UDL Sketching Hub</h1>
        <div class="subtitle">A Progressive Mastery Approach<br>to Product Design Sketching</div>
        <div class="qr-placeholder">
          QR CODE<br>TO WEB VERSION
        </div>
        <div class="url">sketching-hub.yourdomain.edu</div>
        <div style="margin-top: 20mm; font-size: 12pt; opacity: 0.8;">
          Complete Workbook • 7 Modules • ~30 Hours of Learning
        </div>
        <div style="margin-top: 10mm; font-size: 10pt; opacity: 0.7;">
          © 2025 • For Educational Use
        </div>
      </div>
    </body>
    </html>
  `);

  const coverPath = path.join(OUTPUT_DIR, '00-cover.pdf');

  await page.pdf({
    path: coverPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  console.log(`   ✓ Cover page saved: ${coverPath}`);
  await page.close();
}

/**
 * Generate supplementary pages (practice grids, reference sheets)
 */
async function generateSupplementaryPages(browser) {
  console.log('\n📄 Generating supplementary pages');

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

  // Practice grid page
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page {
          size: A4 landscape;
          margin: 15mm 20mm 15mm 30mm;
        }
        body {
          margin: 0;
          padding: 0;
          background:
            linear-gradient(#d0d0d0 1px, transparent 1px),
            linear-gradient(90deg, #d0d0d0 1px, transparent 1px);
          background-size: 5mm 5mm;
          background-position: 0 0;
          min-height: 100%;
          font-family: 'Inter', sans-serif;
        }
        .page-title {
          background: white;
          padding: 5mm;
          margin: 0 0 5mm 0;
          font-size: 18pt;
          font-weight: 600;
          color: #2E5266;
        }
      </style>
    </head>
    <body>
      <div class="page-title">Practice Grid Page • 5mm Grid for Sketching Exercises</div>
    </body>
    </html>
  `);

  const practiceGridPath = path.join(OUTPUT_DIR, '99-practice-grid.pdf');

  await page.pdf({
    path: practiceGridPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: {
      top: '15mm',
      right: '20mm',
      bottom: '15mm',
      left: '30mm'
    }
  });

  console.log(`   ✓ Practice grid saved: ${practiceGridPath}`);

  // Introduction page
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page {
          size: A4 landscape;
          margin: 15mm 20mm 15mm 30mm;
        }
        body {
          margin: 0;
          padding: 5mm;
          font-family: 'Inter', sans-serif;
          font-size: 11pt;
          line-height: 1.5;
        }
        h1 {
          font-family: 'Poppins', sans-serif;
          color: #2E5266;
          font-size: 24pt;
          margin-bottom: 5mm;
        }
        h2 {
          font-family: 'Poppins', sans-serif;
          color: #2E5266;
          font-size: 16pt;
          margin-top: 8mm;
          margin-bottom: 3mm;
        }
        .materials-list {
          background: #F8F9FA;
          padding: 5mm;
          border-left: 4px solid #6B9080;
          margin: 5mm 0;
        }
        ul {
          margin: 2mm 0 2mm 6mm;
          padding: 0;
        }
        li {
          margin-bottom: 2mm;
        }
        .qr-section {
          display: flex;
          align-items: center;
          gap: 5mm;
          margin: 8mm 0;
          padding: 5mm;
          background: #FFF8F0;
          border-radius: 3mm;
        }
        .qr-placeholder {
          width: 30mm;
          height: 30mm;
          border: 2px dashed #666;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9pt;
          color: #666;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <h1>How to Use This Workbook</h1>

      <p><strong>Welcome to the UDL Sketching Hub Workbook!</strong> This workbook follows a progressive mastery approach, supporting learners at all skill levels through structured practice and honest self-assessment.</p>

      <h2>The Progressive Mastery Model</h2>
      <ul>
        <li><strong>Novice</strong>: Building foundational skills through deliberate practice</li>
        <li><strong>Proficient</strong>: The goal for all learners - consistent, reliable execution</li>
        <li><strong>Mastery</strong>: Optional specialization with effortless fluency</li>
      </ul>

      <p><strong>Everyone progresses at their own pace.</strong> Use the scaffolding suggestions and aids guidance to support your learning journey.</p>

      <h2>Recommended Materials</h2>
      <div class="materials-list">
        <ul>
          <li>Sketch paper or marker paper (smooth surface, 70-80gsm)</li>
          <li>Pencils: HB, 2B, 4B for line weight variation</li>
          <li>Fine liners: 0.3mm, 0.5mm, 0.8mm</li>
          <li>Straightedge and french curves (as aids, not crutches)</li>
          <li>Ellipse templates (professional tools, not cheating!)</li>
          <li>Optional: Markers (Copic, Prismacolor) for rendering</li>
        </ul>
      </div>

      <h2>Access Video Tutorials</h2>
      <div class="qr-section">
        <div class="qr-placeholder">QR CODE<br>TO VIDEOS</div>
        <div>
          <p><strong>Scan this code to access video demonstrations for each concept.</strong></p>
          <p>Videos complement the written instructions with real-time technique demonstrations.</p>
        </div>
      </div>

      <h2>Self-Assessment Philosophy</h2>
      <p>At the end of each module, you'll find a rubric for self-assessment. Be honest with yourself—identifying areas for growth is how you improve. <strong>Proficiency is the goal for all learners; mastery is optional.</strong></p>

      <p style="margin-top: 10mm; padding-top: 5mm; border-top: 1px solid #ccc; font-size: 10pt; color: #666;">
        <em>This workbook is designed to complement the online UDL Sketching Hub. Visit the web version for interactive features, progress tracking, and community resources.</em>
      </p>
    </body>
    </html>
  `);

  const introPath = path.join(OUTPUT_DIR, '01-introduction.pdf');

  await page.pdf({
    path: introPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: {
      top: '15mm',
      right: '20mm',
      bottom: '15mm',
      left: '30mm'
    }
  });

  console.log(`   ✓ Introduction page saved: ${introPath}`);

  await page.close();
}

/**
 * Main execution function
 */
async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  UDL Sketching Hub - Workbook PDF Generator');
  console.log('  Format: A4 Landscape (297mm × 210mm)');
  console.log('═══════════════════════════════════════════════════\n');

  // Pre-flight checks
  checkDistExists();
  ensureOutputDir();

  console.log('Starting PDF generation...\n');

  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  console.log('✓ Browser launched\n');

  let successCount = 0;
  let totalModules = MODULES.length;

  try {
    // Generate cover
    await generateCoverPage(browser);

    // Generate introduction
    await generateSupplementaryPages(browser);

    // Generate each module
    for (const module of MODULES) {
      const success = await generateModulePDF(browser, module);
      if (success) successCount++;
    }

    console.log('\n═══════════════════════════════════════════════════');
    console.log(`✓ PDF Generation Complete!`);
    console.log(`  ${successCount}/${totalModules} modules generated successfully`);
    console.log(`  Output directory: ${OUTPUT_DIR}`);
    console.log('═══════════════════════════════════════════════════\n');

    console.log('📁 Generated Files:');
    const files = fs.readdirSync(OUTPUT_DIR).sort();
    files.forEach(file => {
      const stats = fs.statSync(path.join(OUTPUT_DIR, file));
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`   • ${file} (${sizeKB} KB)`);
    });

    console.log('\n💡 Next Steps:');
    console.log('   1. Review individual PDFs in workbook-mockup/ directory');
    console.log('   2. Test print one module to verify layout and margins');
    console.log('   3. Use pdftk or similar to merge into complete workbook:');
    console.log('      pdftk workbook-mockup/*.pdf cat output Complete-Workbook.pdf');
    console.log('   4. Share mockup with production team for asset placement\n');

  } catch (error) {
    console.error('\n❌ Fatal error during PDF generation:');
    console.error(error);
    process.exit(1);
  } finally {
    await browser.close();
    console.log('✓ Browser closed\n');
  }
}

// Run the generator
main().catch(error => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});
