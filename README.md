# react-native-reachability [![npm version](https://badge.fury.io/js/react-native-reachability.svg)](https://badge.fury.io/js/react-native-reachability) [![Build Status](https://travis-ci.org/Younics/react-native-reachability.svg?branch=master)](https://travis-ci.org/Younics/react-native-reachability) [![codecov](https://codecov.io/gh/Younics/react-native-reachability/branch/master/graph/badge.svg)](https://codecov.io/gh/Younics/react-native-reachability) [![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)

React Native tool for checking network reachability iOS/Android

## Getting started

`$ npm install react-native-reachability --save`

### Mostly automatic installation

`$ react-native link react-native-reachability`

### Manual installation

#### iOS

1.  In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2.  Go to `node_modules` ➜ `react-native-reachability` and add `RNReachability.xcodeproj`
3.  In XCode, in the project navigator, select your project. Add `libRNReachability.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4.  Run your project (`Cmd+R`)<

#### Android

1.  Open up `android/app/src/main/java/[...]/MainActivity.java`

- Add `import com.younics.reachability.RNReachabilityPackage;` to the imports at the top of the file
- Add `new RNReachabilityPackage()` to the list returned by the `getPackages()` method

2.  Append the following lines to `android/settings.gradle`:
    ```
    include ':react-native-reachability'
    project(':react-native-reachability').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-reachability/android')
    ```
3.  Insert the following lines inside the dependencies block in `android/app/build.gradle`:
    ```
      compile project(':react-native-reachability')
    ```

## Usage

```javascript
import Network from 'react-native-reachability'

const timeout = 1000 // default is 5000 milis
const isReachable = await Network.isReachable(timeout) // timeout is optional
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/23213144?v=4" width="100px;"/><br /><sub><b>Filip Hoško</b></sub>](https://github.com/filiphosko)<br />[💻](https://github.com/Younics/react-native-reachability/commits?author=filiphosko "Code") [📖](https://github.com/Younics/react-native-reachability/commits?author=filiphosko "Documentation") [🎨](#design-filiphosko "Design") [💡](#example-filiphosko "Examples") [🤔](#ideas-filiphosko "Ideas, Planning, & Feedback") [⚠️](https://github.com/Younics/react-native-reachability/commits?author=filiphosko "Tests") [🚇](#infra-filiphosko "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars0.githubusercontent.com/u/7254177?v=4" width="100px;"/><br /><sub><b>Michal Balšianka</b></sub>](https://github.com/Wreit)<br />[💻](https://github.com/Younics/react-native-reachability/commits?author=Wreit "Code") [📖](https://github.com/Younics/react-native-reachability/commits?author=Wreit "Documentation") [🎨](#design-Wreit "Design") [💡](#example-Wreit "Examples") [🤔](#ideas-Wreit "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/13818216?v=4" width="100px;"/><br /><sub><b>xxramonxx</b></sub>](https://github.com/xxramonxx)<br />[📖](https://github.com/Younics/react-native-reachability/commits?author=xxramonxx "Documentation") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
