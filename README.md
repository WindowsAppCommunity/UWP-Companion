# UWP App Companion
A browser extension to serve as a companion to various 3rd party UWP apps, enabling a smooth transition from Website to App

This project is an evolution of the [MyTube Companion](https://github.com/Arlodotexe/myTube-Companion), whose sole purpose was to redirect from YouTube's website to the MyTube app. By using a third party app, you gained access to features that were unavailable to a web browser or that the big guys don't want to implement, such as Picture in picture mode and ad-free viewing.

With cooperation from many third party UWP developers, a touch of [Fabric UI](https://developer.microsoft.com/en-us/fabric#/), and little elbow grease, the MyTube Companion was completely torn apart and put back together again in the form of the UWP Companion. From the code that turns the gears to the design of the User Interface, everything has been turned up to 11.

## Installing

### [Download from the Chrome WebStore](https://chrome.google.com/webstore/detail/uwp-companion/egfgdliklfgpmdjfofbmhmoejdhehani)

It can also be sideloaded from the [releases](https://github.com/UWPCommunity/UWP-Companion/releases/) page.

## Supported Platforms & Clients


|  |  |  |  |  |  |  |
| - | - | - | - | - | - | - |
| ![Legere logo](assets/icons/clients/Legere.png) | ![Reddplannet logo](assets/icons/platforms/Reddit.png) | ![myTube logo](assets/icons/clients/myTube.png) | ![Mixplay for Mixer logo](assets/icons/platforms/Mixer.png) | ![Quarrel logo](assets/icons/clients/Quarrel.png) | ![Spotimo logo](assets/icons/clients/Spotimo_.png) | ![Xpo Music logo](assets/icons/clients/Xpo%20Music.png) |
| <font size="+1">[Legere](https://www.microsoft.com/en-us/p/legere-for-reddit/9phjrvcskvjz)</font> | <font size="+0.7">[Reddplanet](https://www.microsoft.com/en-us/p/reddplanet/9nblggh4s44m)</font> | <font size="+1">[myTube](https://www.microsoft.com/en-us/p/mytube/9wzdncrcwf3l)</font> | <font size="+1">[Mixplay](https://www.microsoft.com/en-us/p/mixplay-for-mixer/9pn94d9bdfzm)</font> | <font size="+1">[Quarrel](https://www.microsoft.com/en-us/p/quarrel/9nbrwj777c8r)</a> | <font size="+1">[Spotimo](https://www.microsoft.com/en-us/p/spotimo-beta/9p75w183m6qr)</font> | <font size="+1">[Xpo Music](https://www.microsoft.com/en-us/p/xpotify-a-modern-spotify-experience-for-windows-10/9n1n68mc7fxr)</font> |
|  |  |  |  |  |  |  |

## Contributing

The UWP Companion is always looking to support new apps! The codebase is ***extremely*** modular and designed to be as easy to work with as possible, even if you're a brand new developer.

If you're the developer of an app, [see our docs](docs/contributing.md) to get started.

## Bug reports

The UWP Companion is currently in Beta. As such, bugs should be expected. Known issues will be tracked in the [Github Issues](https://github.com/Arlodotexe/UWP-Companion/issues)

Bugs should be tracked here on GitHub.
When opening an issue, make sure to label it appropriately (`feature-request`, `bug`, etc) and provide 

## FAQ

### Where can I download for Firefox, Edge, etc?

For edge, the extension is awaiting approval from Microsoft. Sideloading is possible, but will need a manifest change and will not stay enabled if sideloaded. The UWP Companion is not yet compatible with Firefox, as it has a few more bugs to work out.

## Why doesn't it work with X app?

It's up to the developers of an app to add support for the UWP Companion. If you want your favorite app to work with the extension, contact them and let them know!

### Why doesn't "Close windows on Switch" work?

A recent change to Chromium means that the user can no longer select "Always open these types of links..." option, and the dialog box intereferes with this functionality. This feature will be fixed if possible, and removed if not fixable.