// dueDates14.js - Shuffle due dates within 14 days

(() => {
  // Import shared library functions
  const { createPresetAction } = ShuffleDatesLibrary;
  
  // Create preset action: shuffle due dates only, 14 days
  return createPresetAction(true, false, false, 14);
})();