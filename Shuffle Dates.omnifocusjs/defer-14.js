// defer-14.js - Shuffle defer dates within 14 days

(() => {
  // Load shared functions
  eval(this.plugIn.library("shared.js"));
  
  return createPresetAction(false, true, false, 14);
})();