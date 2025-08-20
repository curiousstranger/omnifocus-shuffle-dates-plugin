// reviewDates14.js - Shuffle review dates within 14 days

(() => {
  // Import shared library functions
  const { createPresetAction } = ShuffleDatesLibrary;
  
  // Create preset action: shuffle review dates only, 14 days
  return createPresetAction(false, false, true, 14);
})();