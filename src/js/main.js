/**
 * Main entry point for the UI Components application
 * Imports and initializes all modules
 */

import { initTrigMenu } from './components/sin-cos-menu.js';
import { initNavigation } from './components/navigation.js';

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initTrigMenu();
  initNavigation();
  
  console.log('UI Components initialized');
});
