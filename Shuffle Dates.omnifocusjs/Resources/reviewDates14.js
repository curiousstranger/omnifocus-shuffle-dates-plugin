// reviewDates14.js - Shuffle review dates within 14 days

(() => {
  // Shared functions (included directly to avoid library loading issues)
  
  // Helper function to create a random date within a given number of days from now
  const getRandomDateInDays = (days) => {
    const startDate = new Date();
    const endDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
    const range = endDate - startDate;
    return new Date(startDate.getTime() + Math.random() * range);
  };

  // Helper function to convert reviewInterval units to days
  const convertReviewIntervalToDays = (reviewInterval) => {
    if (!reviewInterval || !reviewInterval.steps || !reviewInterval.unit) {
      return 14; // default fallback
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
        return 14; // default fallback
    }
  };

  // Helper function to create a random date within a project's review interval, 
  // respecting both the project's review interval and the requested shuffling window
  const getRandomDateForProject = (project, maxDays) => {
    const intervalDays = convertReviewIntervalToDays(project.reviewInterval);
    const effectiveDays = Math.min(intervalDays, maxDays);
    return getRandomDateInDays(effectiveDays);
  };

  // Helper function to shuffle dates for selection with specific settings
  const shuffleDatesForSelection = (selection, shuffleDue, shuffleDefer, shuffleReview, dateGenerator, maxDays) => {
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
        project.nextReviewDate = getRandomDateForProject(project, maxDays);
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
        () => getRandomDateInDays(days),
        days
      );
    });

    action.validate = validateSelection;
    return action;
  };
  
  return createPresetAction(false, false, true, 14);
})();