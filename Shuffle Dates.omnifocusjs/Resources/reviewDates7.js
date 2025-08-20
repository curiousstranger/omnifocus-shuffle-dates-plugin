// reviewDates7.js - Shuffle review dates within 7 days

(() => {
  // Get the shared library
  const shuffleLib = PlugIn.find("org.curiousstranger.ShuffleDates").library("shuffleDatesLibrary");
  
  // Create and return the preset action
  return shuffleLib.createPresetAction(false, false, true, 7);
})();