// dueDates30.js - Shuffle due dates within 30 days

(() => {
  // Import shared library functions
  const { createPresetAction } = ShuffleDatesLibrary;
  
  // Create preset action: shuffle due dates only, 30 days
  return createPresetAction(true, false, false, 30);
})();