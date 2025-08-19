// defer-30.js - Shuffle defer dates within 30 days

(() => {
  // Load shared functions
  eval(this.plugIn.library("shared.js"));
  
  return createPresetAction(false, true, false, 30);
})();