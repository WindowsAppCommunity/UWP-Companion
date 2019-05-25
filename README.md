# UWP App Companion
A browser extension to serves as a companion to various 3rd party UWP apps, enabling a smooth transition from Website to App

This project is an evolution of another project of mine called the [MyTube Companion](https://github.com/Arlodotexe/myTube-Companion), whose sole purpose was to redirect from YouTube's website to the MyTube app. By using a third party app, you gained access to features that were unavailable to a web browser or that the big guys don't want to implement, such as Picture in picture mode and ad-free viewing.

With cooperation from many third party UWP developers, a touch of [Fabric UI](https://developer.microsoft.com/en-us/fabric#/), and little elbow grease, the MyTube Companion was completely torn apart and put back together again in the form of the UWP Companion. From the code that turns the gears to the design of the User Interface, everything has been turned up to 11.

## Supported Platforms & Clients

 - Reddit
    - Legere
    - Reddplanet (WIP)
 - YouTube
    - MyTube
 - Discord
    - Quarrel
 - Spotify
    - Spotimo
    - Xpotify
 - Mixer
   - Mixplay

 
# Contributing

## Contributing is easy!

The code is extremely modular, and adding support for a new client should be a breeze. In fact, if the platform is already set up, you can add a new client in less than [20 lines of code](https://github.com/Arlodotexe/UWP-Companion/blob/master/core/lib/discord/quarrel.js).

If you'd like to add a new platform, it's going to take a few more steps. 

### Find a bug?
 If you open an issue, make sure to label it appropriately (`feature-request`, `bug`, etc)




## Adding a new platform

Steps for adding a new platform
1. Create a new folder for the platform in `/src/lib/` with the name of your app (all lowercase)
2. Create `master.js` and `parsing.js` in the new folder. Populate these as needed using the documentation below
3. In `/core/libs.js`, import the platform just like the rest
4. Add the new platform as a key under the `platforms` object, and the imported platform as the value. Make sure the key matches the `name` property of the platform _**exactly**_.
5. In `/core/helpers/settings.js`, add a new entry under `DefaultSettings.platforms`. The key is your `platform.name` again, while the value is an [`IPlatformSetting`](todo, create type documentation).

---
### `master.js` requirements:

Must `export` an object with the following methods:

`function baseUrlMatch(url: any): boolean`: must consume a url and return true or false if it matches the hostname for this platform


`function shouldCloseOnSwitch(url: any): boolean`: must consume a url and return true or false if it is acceptable to close the tab after the preffered app is launched

`clients`: An object containing imports of all apps for this platform. Keys should be the name of the app, values are the app data. See existing code for details.

### `parsing.js`:

This file is all the URL parsing methods you'll need for detecting and capturing certain parts of an official URL.  

The only major requirement is that all methods get exported as default on an object, like so:

```javascript
export default {
    hasSomeId: hasSomeId,
    ...
}
```

---
## Adding an client

Coming soon
 