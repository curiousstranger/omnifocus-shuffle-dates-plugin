// reviewDates7.js - Shuffle review dates within 7 days

(() => {
  // Import shared library functions
  const { createPresetAction } = ShuffleDatesLibrary;
  
  // Create preset action: shuffle review dates only, 7 days
  return createPresetAction(false, false, true, 7);
})();