// shuffleDatesLibrary.js - Shared library for OmniFocus Shuffle Dates plugin

(() => {
  // Create the library instance with proper version
  const lib = new PlugIn.Library(new Version("1.0"));
  
  // Helper function to create a random date within a given number of days from now
  lib.getRandomDateInDays = (days) => {
    const startDate = new Date();
    const endDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
    const range = endDate - startDate;
    return new Date(startDate.getTime() + Math.random() * range);
  };

  // Helper function to create a random date between two dates
  lib.getRandomDateBetween = (startDate, endDate) => {
    const range = endDate - startDate;
    return new Date(startDate.getTime() + Math.random() * range);
  };

  // Helper function to convert reviewInterval units to days
  lib.convertReviewIntervalToDays = (reviewInterval) => {
    if (!reviewInterval || !reviewInterval.steps || !reviewInterval.unit) {
      return 7; // default fallback
    }
    
    const steps = reviewInterval.steps;
    const unit = reviewInterval.unit.toLowerCase();
    
    switch (unit) {
      case 'days':
      case 'day':
        return steps;
      case 'weeks':
      case 'week':
        return steps * 7;
      case 'months':
      case 'month':
        return steps * 30; // approximate
      case 'years':
      case 'year':
        return steps * 365; // approximate
      default:
        return 7; // default fallback
    }
  };

  // Helper function to create a random date within a project's review interval,
  // respecting both the project's review interval and the custom date range
  lib.getRandomDateForProject = (project, startDate, endDate) => {
    const intervalDays = lib.convertReviewIntervalToDays(project.reviewInterval);
    const maxEndDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * intervalDays);
    const effectiveEndDate = endDate < maxEndDate ? endDate : maxEndDate;
    const range = effectiveEndDate - startDate;
    return new Date(startDate.getTime() + Math.random() * range);
  };

  // Helper function for preset actions - simpler version respecting review interval
  lib.getRandomDateForProjectPreset = (project, maxDays) => {
    const intervalDays = lib.convertReviewIntervalToDays(project.reviewInterval);
    const effectiveDays = Math.min(intervalDays, maxDays);
    return lib.getRandomDateInDays(effectiveDays);
  };

  // Helper function to shuffle dates for selection with specific settings
  lib.shuffleDatesForSelection = (selection, shuffleDue, shuffleDefer, shuffleReview, dateGenerator, customStartDate, customEndDate, maxDays) => {
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
        if (customStartDate && customEndDate) {
          // For custom shuffle - use the custom range but respect review interval
          project.nextReviewDate = lib.getRandomDateForProject(project, customStartDate, customEndDate);
        } else if (maxDays) {
          // For preset actions - use the simpler logic
          project.nextReviewDate = lib.getRandomDateForProjectPreset(project, maxDays);
        } else {
          // Fallback to simple date generator
          project.nextReviewDate = dateGenerator();
        }
      }
    });
  };

  // Common validation function to ensure there are selected tasks or projects
  lib.validateSelection = (selection) => {
    return !!selection.tasks.length || !!selection.projects.length;
  };

  // Create a preset action with given parameters
  lib.createPresetAction = (shuffleDue, shuffleDefer, shuffleReview, days) => {
    const action = new PlugIn.Action(function (selection) {
      lib.shuffleDatesForSelection(
        selection, 
        shuffleDue, 
        shuffleDefer, 
        shuffleReview, 
        () => lib.getRandomDateInDays(days),
        null, // customStartDate
        null, // customEndDate
        days  // maxDays for review interval logic
      );
    });

    action.validate = lib.validateSelection;
    return action;
  };
  
  // Return the library for use by other plug-ins
  return lib;
})();