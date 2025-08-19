// defer-7.js - Shuffle defer dates within 7 days

(() => {
  // Load shared functions
  eval(this.plugIn.library("shared.js"));
  
  return createPresetAction(false, true, false, 7);
})();