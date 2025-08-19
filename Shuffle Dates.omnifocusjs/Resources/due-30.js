// due-30.js - Shuffle due dates within 30 days

(() => {
  // Load shared functions
  eval(this.plugIn.library("shared.js"));
  
  return createPresetAction(true, false, false, 30);
})();