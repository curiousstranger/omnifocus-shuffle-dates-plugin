// review-7.js - Shuffle review dates within 7 days

(() => {
  // Load shared functions
  eval(this.plugIn.library("shared.js"));
  
  return createPresetAction(false, false, true, 7);
})();