# react-native-virtualized-masonry

[![npm](https://img.shields.io/npm/v/react-native-virtualized-masonry)](https://www.npmjs.com/package/react-native-virtualized-masonry)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-native-virtualized-masonry)](https://www.npmjs.com/package/react-native-virtualized-masonry)
[![David](https://img.shields.io/david/iftechio/react-native-virtualized-masonry)](https://david-dm.org/iftechio/react-native-virtualized-masonry)
[![npm](https://img.shields.io/npm/dt/react-native-virtualized-masonry.svg?style=flat-square)](https://www.npmjs.com/package/react-native-virtualized-masonry)

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
