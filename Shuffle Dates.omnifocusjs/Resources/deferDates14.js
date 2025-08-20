// deferDates14.js - Shuffle defer dates within 14 days

(() => {
  // Import shared library functions
  const { createPresetAction } = ShuffleDatesLibrary;
  
  // Create preset action: shuffle defer dates only, 14 days
  return createPresetAction(false, true, false, 14);
})();