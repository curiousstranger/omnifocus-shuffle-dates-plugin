// deferDates30.js - Shuffle defer dates within 30 days

(() => {
  // Import shared library functions
  const { createPresetAction } = ShuffleDatesLibrary;
  
  // Create preset action: shuffle defer dates only, 30 days
  return createPresetAction(false, true, false, 30);
})();