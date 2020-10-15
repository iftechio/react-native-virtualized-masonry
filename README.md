# react-native-virtualized-masonry

> A pure JS React-Native **virtualized** masonry layout component

## Preview

[online-demo](https://snack.expo.io/@wtmanutd/react-native-virtualized-masonry-demo)

## Install

`$ yarn add react-native-virtualized-masonry`

or

`$ npm install react-native-virtualized-masonry`

## Usage

```javascript
import Masonry from "react-native-virtualized-masonry"

...

<Masonry
  data={data}
  renderItem={...}
  width={Dimensions.get("screen").width}
  getBrickHeight={...}
  ....
/>
```
