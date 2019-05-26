# Contributing

The codebase for the UWP Companion is ***extremely*** modular, and adding support for a new client should be a breeze. 


| <font size="+1.5">Getting started:</font> |  |
| - | - |
| <font size="+1">[Adding a client](#Adding-a-new-client)</font> | <font size="+1">[Adding a platform](#Adding-a-new-platform)</font>  |
| | |

## What you'll need

 - Very basic experience with Javascript
 - A working launch protocol for the app you're adding
 - App logo and a smaller icon version (optional for clients, falls back to platform icons)


# Adding a new client

If the platform is already set up, you can add a new client in less than [20 lines of code](https://github.com/Arlodotexe/UWP-Companion/blob/master/core/lib/discord/quarrel.js).


Steps for creating a new client:
1. Find the folder for the platform you are targeting in `/src/lib/`. If your platform doesn't exist, you'll have to [add a new platform](#Adding-a-new-platform)
2. Create a new file, and name it after your client (all lowercase). The file extension is `.js`. For example, if you're adding a client called `Foo`, create `foo.js`
3. Populate the newly created file using the documentation below
4. In `master.js` within the same folder, `import` the client as the same exact `name` you created when populating your client. 
5. Find the `export default` statement in `master.js` Add your imported client to the `clients` key.

 - If you have other helper methods that are specific to the platform and not the client, place them in the file `helpers.js` in the platform directory.

## Setting up your client `.js`

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| name | `string` | Name of the client |
| parseUrl | `function` | Used to transform an HTTP URL to a protocol URI for your app. Runs every time the current tab is updated or reloaded. Consumes a (url: `string`) and should return (protocol: `string | undefined`) |
| postLaunch | `function` | Runs after a client is launched. Used to perform actions on a page such as pausing a video |
| config | `object` | Config object. Unused for now, but will be used in the future |

That's it! The end result for your new `.js` file will look something like this:
```javascript
import RedditParser from './parsing.js';

export default {
    config: {
        logo: "https://arlo.site/projects/UWPCompanion/logos/clients/Legere.png",
        icon: "https://arlo.site/projects/UWPCompanion/icons/clients/Legere.png",
        color: "#FF4500"
    },
    name: "Legere",
    parseUrl: function(url) {
        if (RedditParser.isSubreddit(url) || RedditParser.isUser(url) || RedditParser.isPost(url)) {
            return "legere://" + url
        }
        return;
    }
}
```


# Adding a new platform

Steps for adding a new platform
1. Create a new folder for the platform in `/src/lib/` with the name of your app (all lowercase)
2. Create `master.js` and `parsing.js` in the new folder. Populate these as needed using the documentation below
3. In `/core/libs.js`, import the platform just like the rest
4. Add the new platform as a key under the `platforms` object, and the imported platform as the value. Make sure the key matches the `name` property of the platform _**exactly**_.
5. In `/core/helpers/settings.js`, add a new entry under `DefaultSettings.platforms`. The key is your `platform.name` again, while the value is an [`IPlatformSetting`] (as defined in `/core/typings.ts`).

---
## Setting up `master.js`:

`master.js` must export a default object like so:


| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| name | <code>string</code> | Name of the platform |
| logo | <code>string</code> | URL of the full sized logo. Will be downscaled and displayed to the user |
| icon | <code>string</code> | URL of the an icon version of the logo. Used as a fallback in the extension bar when the user is on a site supported by a client | 
| baseUrlMatch | <code>function</code> | Used to match a website to a platform. Should be imported from `parsing.js`. Consumes a (url: `string`) and should return a `bool` |
| shouldCloseOnSwitch | <code>function</code> | (Optional) Used to determine if the extension should close the tab after a client is launched. Consumes (url: `string`, tab: `object`) and returns a `bool` |
| clients | <code>object</code> | Key-value pairs of the clients supported on this platform. Keep these comma seperated for brevity |

When all set up, `master.js` should look something like this:
```javascript
import myTube from './mytube.js';
import YTParser from './parsing.js';

export default {
    name: "YouTube",
    logo: "https://arlo.site/projects/UWPCompanion/logos/platforms/YouTube.png",
    icon: "https://arlo.site/projects/UWPCompanion/icons/platforms/YouTube.png",
    baseUrlMatch: YTParser.isYoutube,
    clients: {
        myTube
    }
};
```

## Setting up `parsing.js`:

This file will contains all the URL parsing methods you'll need for detecting and capturing certain parts of an official URL.  

The only major requirement is that all methods get exported as default on an object, like so:

```javascript
export default {
    hasId,
    isSomething,
    isSomethingElse
}
```
