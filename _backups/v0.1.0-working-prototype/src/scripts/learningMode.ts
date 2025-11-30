/**
 * Learning Mode Management
 * Handles localStorage for the learning mode toggle and drill filtering
 */

export type LearningMode = 'guided' | 'mastery';

const STORAGE_KEY = 'udl-learning-mode';

/**
 * Get the current learning mode from localStorage
 * Defaults to 'guided' if not set
 */
export function getLearningMode(): LearningMode {
  if (typeof window === 'undefined') return 'guided';

  const stored = localStorage.getItem(STORAGE_KEY);
  return (stored === 'mastery' ? 'mastery' : 'guided') as LearningMode;
}

/**
 * Set the learning mode in localStorage
 */
export function setLearningMode(mode: LearningMode): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEY, mode);

  // Dispatch custom event so components can react
  window.dispatchEvent(new CustomEvent('learning-mode-change', {
    detail: { mode }
  }));
}

/**
 * Initialize learning mode filtering on page load
 * Filters drill items based on their data-paths attribute
 */
export function initializeLearningMode(): void {
  const mode = getLearningMode();
  applyLearningModeFilter(mode);
}

/**
 * Apply learning mode filtering to drill items and rubric text
 */
export function applyLearningModeFilter(mode: LearningMode): void {
  // Filter drills based on data-paths attribute
  const drillItems = document.querySelectorAll('[data-paths]');
  drillItems.forEach((item) => {
    const paths = (item as HTMLElement).dataset.paths?.split(',') || [];
    if (paths.includes(mode)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });

  // Show/hide appropriate rubric sections
  const rubricSections = document.querySelectorAll('[data-rubric-mode]');
  rubricSections.forEach((section) => {
    const rubricMode = (section as HTMLElement).dataset.rubricMode;
    if (rubricMode === mode) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });

  // Update toggle UI if present
  const toggle = document.querySelector('[data-learning-toggle]');
  if (toggle) {
    toggle.setAttribute('data-current-mode', mode);
  }
}
