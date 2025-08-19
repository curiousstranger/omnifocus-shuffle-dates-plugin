# Shuffle Dates for OmniFocus

I made this OmniFocus plugin to assign random dates (due, defer, and review) to any selected tasks or projects for a configurable range of days out from today. With your task or project selected simply select **Automation > Shuffle Dates** from the menu. You can choose which date types to shuffle and specify the date range - random dates will be assigned to every selected project or task based on your selections.

**Date Types Supported:**
- **Due Dates**: When tasks/projects must be completed
- **Defer Dates**: When tasks/projects become available to work on  
- **Review Dates**: When projects should be reviewed next (projects only)

My goal was to replicate and expand upon the random "dice roll" date change option you get with the iOS version of the app. I'm not sure why the desktop version doesn't have this feature. I've always liked it, particularly for tasks that don't have any real-world urgency but would benefit from some kind of date structure.

Read more about automation and OmniFocus here:
[https://omni-automation.com/omnifocus/](https://omni-automation.com/omnifocus)

To install this just download the `.omnijs` file and double-click it. It should open in OmniFocus automatically.


## Release Notes

### 0.3

Extended functionality to support shuffling all date types: due dates, defer dates, and review dates. Added checkboxes to let users choose which date types to shuffle. Review dates are only available for projects. Renamed plugin from "Shuffle Due Dates" to "Shuffle Dates" to reflect expanded functionality.

### 0.2

Added an input form that lets you specify the min/max dates to randomly shuffle due dates between. Defaults to between 1 week and 1 month out, but these can be changed and remembered throughout the same session.

### 0.1

Initial release!