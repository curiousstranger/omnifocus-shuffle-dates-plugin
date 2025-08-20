// reviewDates30.js - Shuffle review dates within 30 days

(() => {
  // Import shared library functions
  const { createPresetAction } = ShuffleDatesLibrary;
  
  // Create preset action: shuffle review dates only, 30 days
  return createPresetAction(false, false, true, 30);
})();