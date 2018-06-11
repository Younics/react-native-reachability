# react-native-reachability

React Native tool for checking network reachability iOS/Android

## Getting started

`$ npm install react-native-reachability --save`

### Mostly automatic installation

`$ react-native link react-native-reachability`

### Manual installation

#### iOS

1.  In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2.  Go to `node_modules` ➜ `react-native-reachability` and add `NativeReachability.xcodeproj`
3.  In XCode, in the project navigator, select your project. Add `libNativeReachability.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4.  Run your project (`Cmd+R`)<

#### Android

1.  Open up `android/app/src/main/java/[...]/MainActivity.java`

- Add `import com.reactlibrary.NativeReachabilityPackage;` to the imports at the top of the file
- Add `new NativeReachabilityPackage()` to the list returned by the `getPackages()` method

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
import NativeReachability from 'react-native-reachability'

// TODO: What to do with the module?
NativeReachability
```
