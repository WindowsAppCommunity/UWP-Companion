# UWP App Companion
A browser extension to serves as a companion to various 3rd party UWP apps, enabling a smooth transition from Website to App

# Contributing
### Find a bug?
 If you open an issue, make sure to label it appropriately (`feature-request`, `bug`, etc)

## Adding a new platform
    **Note**: If you add a new platform, please add at least one client to support it

Steps for adding a new platform
1. Create a new folder for the platform in `/src/lib/` with the name of your app (all lowercase)
2. Create `master.js` and `parsing.js` in the new folder.

---
### `master.js` requirements:

Must `export` an object with the following methods:

`function baseUrlMatch(url: any): boolean`: must consume a url and return true or false if it matches the hostname for this platform


`function shouldCloseOnSwitch(url: any): boolean`: must consume a url and return true or false if it is acceptable to close the tab after the preffered app is launched

`clients`: An object containing imports of all apps for this platform. Keys should be the name of the app, values are the app data. See existing code for details.

### `parsing.js`:

This file is the home for all the URL parsing methods you will need when converting an official URL to an app-specific protocol. 

The only major requirement 

---
## Adding an client

Coming soon
