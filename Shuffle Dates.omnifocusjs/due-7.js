// due-7.js - Shuffle due dates within 7 days

(() => {
  // Load shared functions
  eval(this.plugIn.library("shared.js"));
  
  return createPresetAction(true, false, false, 7);
})();