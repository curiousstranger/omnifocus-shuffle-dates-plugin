// dueDates7.js - Shuffle due dates within 7 days

(() => {
  // Import shared library functions
  const { createPresetAction } = ShuffleDatesLibrary;
  
  // Create preset action: shuffle due dates only, 7 days
  return createPresetAction(true, false, false, 7);
})();