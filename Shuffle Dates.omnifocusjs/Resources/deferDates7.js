// deferDates7.js - Shuffle defer dates within 7 days

(() => {
  // Import shared library functions
  const { createPresetAction } = ShuffleDatesLibrary;
  
  // Create preset action: shuffle defer dates only, 7 days
  return createPresetAction(false, true, false, 7);
})();