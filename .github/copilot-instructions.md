# OmniFocus Shuffle Dates Plugin

OmniFocus Shuffle Dates is a JavaScript plugin bundle for OmniFocus that randomly assigns due, defer, and review dates to selected tasks and projects. The plugin provides 10 separate actions: 1 customizable action and 9 quick preset actions.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

**This is a JavaScript plugin bundle, NOT a traditional software project** - there are no build processes, dependency installations, or test suites. Development workflow is entirely different from typical software projects.

### Essential Validation Steps
- Validate JavaScript syntax: `node -c "Shuffle Dates.omnifocusjs/Resources/filename.js"` -- takes < 1 second per file. NEVER CANCEL.
- Validate all JS files at once: `for js_file in "Shuffle Dates.omnifocusjs/Resources"/*.js; do echo "Checking $js_file"; node -c "$js_file"; done` -- takes < 1 second total. NEVER CANCEL.
- Validate manifest.json: `python3 -m json.tool "Shuffle Dates.omnifocusjs/manifest.json" > /dev/null && echo "Valid JSON"` -- takes < 1 second. NEVER CANCEL.
- Verify bundle structure: All scripts referenced in manifest.json must exist in Resources/ directory.

### Installing Dependencies for Enhanced Validation
- Install ESLint for better JavaScript validation: `npm install eslint --no-save` -- takes 5-10 seconds. NEVER CANCEL.
- Create basic ESLint config: `echo 'export default [{ files: ["**/*.js"], rules: {} }];' > eslint.config.js`
- Run ESLint: `npx eslint "Shuffle Dates.omnifocusjs/Resources/filename.js"` -- takes 1-2 seconds per file. NEVER CANCEL.

### OmniAutomation API Reference
- **ALWAYS use official documentation**: When writing OmniAutomation-specific code, reference the official documentation at https://omni-automation.com/plugins/ rather than guessing at API methods and properties.
- **Core OmniAutomation concepts**: The plugin uses OmniAutomation APIs to interact with OmniFocus objects like `Task`, `Project`, `Selection`, and `Form`.
- **Key API patterns in this plugin**:
  - `selection.tasks` and `selection.projects` - access selected items
  - `task.dueDate`, `task.deferDate` - task date properties
  - `project.dueDate`, `project.deferDate`, `project.nextReviewDate` - project date properties
  - `new Form()` - create user input forms for the custom action
- **Documentation sections to reference**:
  - Plugin architecture and manifest structure
  - Task and Project object APIs
  - Selection APIs for working with user-selected items
  - Form APIs for creating user interfaces

### Plugin Testing and Installation
- **CRITICAL**: This plugin can only be fully tested within OmniFocus application itself.
- To install: Double-click the "Shuffle Dates.omnifocusjs" bundle folder in macOS. It will open OmniFocus and install the plugin.
- **MANUAL VALIDATION REQUIREMENT**: After any code changes, you MUST:
  1. Install the updated plugin bundle in OmniFocus
  2. Create test tasks and projects in OmniFocus
  3. Select the test items
  4. Run each plugin action to verify functionality
  5. Confirm that dates are properly randomized within expected ranges
  6. Test all 10 actions: 1 custom + 9 presets (due/defer/review dates for 7/14/30 days)

### Bundle Structure Requirements
- Bundle MUST be named with `.omnifocusjs` extension
- Bundle MUST contain `manifest.json` in root
- Bundle MUST contain `Resources/` directory with JavaScript files
- Bundle MUST contain `Resources/en.lproj/` with localization strings
- All JavaScript files referenced in manifest.json actions MUST exist in Resources/

## Validation Scenarios

**CRITICAL**: Since this plugin manipulates dates in OmniFocus, always test these specific scenarios after making changes:

1. **Custom Action Testing**: 
   - Select tasks and projects in OmniFocus
   - Run "Shuffle Dates (Custom)" action
   - Verify form appears with date fields and checkboxes
   - Set custom date range and select date types
   - Confirm dates are set within specified range

2. **Preset Action Testing**:
   - Test all 9 preset actions (due/defer/review dates for 7/14/30 days)
   - Verify each action runs without forms
   - Confirm dates are set within correct time ranges
   - Verify due dates work on both tasks and projects
   - Verify defer dates work on both tasks and projects
   - Verify review dates only work on projects (tasks don't have review dates)

3. **Edge Case Testing**:
   - Test with no items selected (should not run)
   - Test with mixed selection of tasks and projects
   - Test with projects that have existing review intervals

## Common Tasks

### Modifying Plugin Actions
- Edit JavaScript files in `Shuffle Dates.omnifocusjs/Resources/`
- Main customizable logic: `customShuffle.js` (174 lines)
- Preset actions: `dueDates7.js`, `dueDates14.js`, `dueDates30.js`, etc. (62-98 lines each)
- Always validate syntax after changes: `node -c filename.js`

### Adding New Preset Actions
1. Create new JavaScript file in `Resources/` directory
2. Follow pattern from existing preset files (dueDates7.js, etc.)
3. Add action definition to `manifest.json`
4. Create corresponding localization strings in `en.lproj/`
5. Validate bundle structure and install in OmniFocus for testing

### Updating Localization
- Edit `.strings` files in `Resources/en.lproj/`
- Each action needs: `label`, `mediumLabel`, `paletteLabel`
- Format: `"key" = "value";`

### Repository File Structure
```
.
├── README.md                           # Documentation
└── Shuffle Dates.omnifocusjs/         # Plugin bundle
    ├── manifest.json                   # Plugin metadata (10 actions defined)
    └── Resources/                      # JavaScript and localization
        ├── customShuffle.js           # Main customizable action (174 lines)
        ├── dueDates7.js               # Due dates preset: 7 days
        ├── dueDates14.js              # Due dates preset: 14 days  
        ├── dueDates30.js              # Due dates preset: 30 days
        ├── deferDates7.js             # Defer dates preset: 7 days
        ├── deferDates14.js            # Defer dates preset: 14 days
        ├── deferDates30.js            # Defer dates preset: 30 days
        ├── reviewDates7.js            # Review dates preset: 7 days
        ├── reviewDates14.js           # Review dates preset: 14 days
        ├── reviewDates30.js           # Review dates preset: 30 days
        └── en.lproj/                  # English localization
            ├── manifest.strings       # Bundle labels
            ├── customShuffle.strings  # Custom action labels
            ├── dueDates7.strings      # Due 7d action labels
            ├── dueDates14.strings     # Due 14d action labels
            ├── dueDates30.strings     # Due 30d action labels
            ├── deferDates7.strings    # Defer 7d action labels
            ├── deferDates14.strings   # Defer 14d action labels
            ├── deferDates30.strings   # Defer 30d action labels
            ├── reviewDates7.strings   # Review 7d action labels
            ├── reviewDates14.strings  # Review 14d action labels
            └── reviewDates30.strings  # Review 30d action labels
```

### Key Code Patterns
- All JavaScript files use IIFE pattern: `(() => { /* code */ })()`
- Preset actions call `createPresetAction(shuffleDue, shuffleDefer, shuffleReview, days)`
- Date generation: `getRandomDateInDays(days)` and `getRandomDateBetween(startDate, endDate)`
- Validation: `validateSelection(selection)` ensures tasks or projects are selected
- Actions modify: `task.dueDate`, `task.deferDate`, `project.dueDate`, `project.deferDate`, `project.nextReviewDate`

### Timing Expectations
- JavaScript syntax validation: < 1 second per file. NEVER CANCEL.
- JSON validation: < 1 second. NEVER CANCEL.
- ESLint validation: 1-2 seconds per file. NEVER CANCEL.
- Bundle structure verification: < 1 second. NEVER CANCEL.
- **Plugin installation and testing in OmniFocus: 2-5 minutes manually. ALWAYS REQUIRED after changes.**

## Critical Notes
- **DO NOT attempt to build** - this is a pure JavaScript plugin bundle, no build process exists
- **DO NOT look for package.json, tests, or CI/CD** - none exist for this plugin type
- **DO NOT try to run the JavaScript files directly** - they depend on OmniFocus APIs
- **ALWAYS validate in OmniFocus** - syntax validation alone is insufficient
- **Bundle size is ~104KB total** - changes should be minimal and focused
- **Review dates only work on projects** - tasks don't support review dates in OmniFocus