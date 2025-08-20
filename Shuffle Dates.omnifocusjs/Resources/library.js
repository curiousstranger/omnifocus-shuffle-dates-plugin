// library.js - Shared utility functions for Shuffle Dates plugin

(() => {
  'use strict';

  // Helper function to create a random date within a given number of days from now
  const getRandomDateInDays = (days) => {
    const startDate = new Date();
    const endDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
    const range = endDate - startDate;
    return new Date(startDate.getTime() + Math.random() * range);
  };

  // Helper function to create a random date between two dates
  const getRandomDateBetween = (startDate, endDate) => {
    const range = endDate - startDate;
    return new Date(startDate.getTime() + Math.random() * range);
  };

  // Helper function to shuffle dates for selection with specific settings
  const shuffleDatesForSelection = (selection, shuffleDue, shuffleDefer, shuffleReview, dateGenerator) => {
    // change dates for each task
    selection.tasks.forEach((task) => {
      if (shuffleDue) {
        task.dueDate = dateGenerator();
      }
      if (shuffleDefer) {
        task.deferDate = dateGenerator();
      }
      // Note: tasks don't have review dates in OmniFocus
    });

    // change dates for each project
    selection.projects.forEach((project) => {
      if (shuffleDue) {
        project.dueDate = dateGenerator();
      }
      if (shuffleDefer) {
        project.deferDate = dateGenerator();
      }
      if (shuffleReview) {
        project.nextReviewDate = dateGenerator();
      }
    });
  };

  // Common validation function to ensure there are selected tasks or projects
  const validateSelection = (selection) => {
    return !!selection.tasks.length || !!selection.projects.length;
  };

  // Create a preset action with given parameters
  const createPresetAction = (shuffleDue, shuffleDefer, shuffleReview, days) => {
    const action = new PlugIn.Action(function (selection) {
      shuffleDatesForSelection(
        selection, 
        shuffleDue, 
        shuffleDefer, 
        shuffleReview, 
        () => getRandomDateInDays(days)
      );
    });
    
    action.validate = validateSelection;
    return action;
  };

  // Export functions to global scope for use by action scripts
  if (typeof global !== 'undefined') {
    global.ShuffleDatesLibrary = {
      getRandomDateInDays,
      getRandomDateBetween,
      shuffleDatesForSelection,
      validateSelection,
      createPresetAction
    };
  } else {
    // Fallback for direct inclusion
    this.ShuffleDatesLibrary = {
      getRandomDateInDays,
      getRandomDateBetween,
      shuffleDatesForSelection,
      validateSelection,
      createPresetAction
    };
  }
})();