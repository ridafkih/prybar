<h1 align="center">PryBar</h1>

## What is PryBar?
PryBar is a node module which allows you to programatically modify *some* very niche Expo-generated configuration files.
- `Info.plist`
- `build.gradle`
- `app/build.gradle`
- and `Podfile`

## Installation

Y'know, just use your favourite package manager!

```bash
npm i prybar     # 🎩 A classic move!
yarn add prybar  # 🎉 Convenience, and pretty emojis!
pnpm i prybar    # 😤 For hustlin' and bustlin'!
```

## Usage

```ts
// ...
import { withGradle, withPods, withCustomPlist } from "prybar";

const withPlugin: ConfigPlugin = (config) => {
  /**
   * Will add the dependencies, plugins, and repositories to the respective
   * build.gradle files.
   */
  withGradle(config, {
    dependencies: [`com.fullstory:gradle-plugin-local:1.27.1`],
    plugins: [{ name: "fullstory", options: { org: "o-XXX-XXXX } }],
    repositories: [{ name: "maven", url: "https://maven.fullstory.com" }],
  });
  
  /**
   * Will add the provided pods to the Podfile.
   */
  withPods(config, [
    {
      name: "FullStory",
      url: "https://ios-releases.fullstory.com/fullstory-1.27.1.tar.gz",
    }
  ]);
  
  /**
   * Will make the respective changes to the Info.plist file.
   */
  return withCustomPlist(config, [
    {
      key: "FullStory",
      value: { OrgId: "o-XXX-XXXX" },
    }
  ]);
};

export default withPlugin;
```

## Important Note

> **Warning**
> 
> This package leverages Expo's *dangerous* modifiers.
> It's important to note that you should not use this flippantly. It's only recommended that you use this library if you know what you're doing. Changes should be static, and tested before build to ensure a stable compilation. 
