// customShuffle.js - Custom shuffle action with full form controls

(() => {
  // Shared functions (included directly to avoid library loading issues)
  
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
  
  // store end/start date and date type selections here to remember previous choices
  let settings = {};

  const action = new PlugIn.Action(function (selection) {
    // extract start/end dates and date types from previous selections
    let { startDate, endDate, shuffleDue, shuffleDefer, shuffleReview } = settings;

    // create the fields for the form
    const startDateField = new Form.Field.Date(
      "startDate",
      "Min Date",
      startDate ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    );

    const endDateField = new Form.Field.Date(
      "endDate",
      "Max Date",
      endDate ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    );

    // create checkboxes for date types
    const shuffleDueField = new Form.Field.Checkbox(
      "shuffleDue",
      "Shuffle Due Dates",
      shuffleDue ?? true
    );

    const shuffleDeferField = new Form.Field.Checkbox(
      "shuffleDefer",
      "Shuffle Defer Dates",
      shuffleDefer ?? false
    );

    const shuffleReviewField = new Form.Field.Checkbox(
      "shuffleReview",
      "Shuffle Review Dates (Projects only)",
      shuffleReview ?? false
    );

    // create the form prompt and add the fields
    const inputForm = new Form();
    inputForm.addField(startDateField);
    inputForm.addField(endDateField);
    inputForm.addField(shuffleDueField);
    inputForm.addField(shuffleDeferField);
    inputForm.addField(shuffleReviewField);

    const formPrompt = "Choose custom date range and date types to shuffle:";
    const buttonTitle = "Shuffle Away!";

    // make sure dates are formatted correctly, min is <= max, and at least one date type is selected
    inputForm.validate = function (formObject) {
      const values = formObject.values;
      const atLeastOneDateTypeSelected = values["shuffleDue"] || values["shuffleDefer"] || values["shuffleReview"];
      
      return (
        !isNaN(values["startDate"]) &&
        !isNaN(values["endDate"]) &&
        values["startDate"] <= values["endDate"] &&
        atLeastOneDateTypeSelected
      );
    };

    // render the form, store the new settings and randomize the selected date types
    inputForm.show(formPrompt, buttonTitle).then((formObject) => {
      const values = formObject.values;
      
      settings = {
        startDate: values["startDate"],
        endDate: values["endDate"],
        shuffleDue: values["shuffleDue"],
        shuffleDefer: values["shuffleDefer"],
        shuffleReview: values["shuffleReview"],
      };

      // method to return random date between min and max dates stored in settings
      const newRandomDate = () => getRandomDateBetween(settings.startDate, settings.endDate);

      shuffleDatesForSelection(selection, settings.shuffleDue, settings.shuffleDefer, settings.shuffleReview, newRandomDate);
    });
  });

  // only run the action if there are tasks or projects selected
  action.validate = validateSelection;

  return action;
})();