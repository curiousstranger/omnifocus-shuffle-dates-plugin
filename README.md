# Shuffle Dates for OmniFocus

I made this OmniFocus plugin to assign random dates (due, defer, and review) to any selected tasks or projects for a configurable range of days out from today. With your task or project selected, you can either use the main **Automation > Shuffle Dates** action for full customization or choose from quick preset actions for common scenarios.

## Features

**Two ways to shuffle dates:**

### 1. Main Action: "Shuffle Dates" (Custom)
- Choose which date types to shuffle with checkboxes
- Set custom date ranges (minimum and maximum dates)
- Remember your preferences during the session
- Full control over all options

### 2. Quick Preset Actions
For quick shuffling without forms, choose from:

**Due Date Presets:**
- Shuffle Due Dates (7 days)
- Shuffle Due Dates (14 days) 
- Shuffle Due Dates (30 days)

**Defer Date Presets:**
- Shuffle Defer Dates (7 days)
- Shuffle Defer Dates (14 days)
- Shuffle Defer Dates (30 days)

**Review Date Presets (Projects only):**
- Shuffle Review Dates (7 days)
- Shuffle Review Dates (14 days)
- Shuffle Review Dates (30 days)

**Date Types Supported:**
- **Due Dates**: When tasks/projects must be completed
- **Defer Dates**: When tasks/projects become available to work on  
- **Review Dates**: When projects should be reviewed next (projects only)

My goal was to replicate and expand upon the random "dice roll" date change option you get with the iOS version of the app. I'm not sure why the desktop version doesn't have this feature. I've always liked it, particularly for tasks that don't have any real-world urgency but would benefit from some kind of date structure.

Read more about automation and OmniFocus here:
[https://omni-automation.com/omnifocus/](https://omni-automation.com/omnifocus)

To install this just download the `.omnifocusjs` file and double-click it. It should open in OmniFocus automatically.


## Release Notes

### 0.4

Added pre-configured quick actions for each date type with common time ranges (7, 14, and 30 days). Users can now choose from:
- Main "Shuffle Dates" action with full customization options (original behavior preserved)
- 9 quick preset actions: 3 for due dates, 3 for defer dates, and 3 for review dates
- Each preset shuffles dates within the specified number of days from today
- No forms to fill out - just select your tasks/projects and choose the preset action

### 0.3

Extended functionality to support shuffling all date types: due dates, defer dates, and review dates. Added checkboxes to let users choose which date types to shuffle. Review dates are only available for projects. Renamed plugin from "Shuffle Due Dates" to "Shuffle Dates" to reflect expanded functionality.

### 0.2

Added an input form that lets you specify the min/max dates to randomly shuffle due dates between. Defaults to between 1 week and 1 month out, but these can be changed and remembered throughout the same session.

### 0.1

Initial release!