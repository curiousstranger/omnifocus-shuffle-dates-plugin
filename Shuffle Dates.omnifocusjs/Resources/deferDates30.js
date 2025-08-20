// deferDates30.js - Shuffle defer dates within 30 days

(() => {
  // Get the shared library
  const shuffleLib = PlugIn.find("org.curiousstranger.ShuffleDates").library("shuffleDatesLibrary");
  
  // Create and return the preset action
  return shuffleLib.createPresetAction(false, true, false, 30);
})();