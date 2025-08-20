// dueDates30.js - Shuffle due dates within 30 days

(() => {
  // Get the shared library
  const shuffleLib = PlugIn.find("org.curiousstranger.ShuffleDates").library("shuffleDatesLibrary");
  
  // Create and return the preset action
  return shuffleLib.createPresetAction(true, false, false, 30);
})();