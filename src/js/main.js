/**
 * Main entry point for the UI Components application
 * Imports and initializes all modules
 */

import { initTrigMenu } from './components/trig-menu.js';

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initTrigMenu();
  
  console.log('UI Components initialized');
});
