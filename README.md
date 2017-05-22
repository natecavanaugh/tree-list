# tree-list
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]


> My top-notch module


## Install

```
$ npm install --save tree-list
```


## Usage

```js
var fileLister = require('tree-list');

fileLister('belgian');
//=> BEST BEER EVAR!
```

## CLI

```
$ npm install --global tree-list
```
```
$ tree-list --help

  Usage
    tree-list [input]

  Example
    tree-list
    BEER!

    tree-list belgian
    BEST BEER EVAR!

  Options
    --foo Lorem ipsum. Default: false
```


## API

### fileLister(input, [options])

#### input

*Required*
Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`
Default: `false`

Lorem ipsum.


## License

MIT © [Nate Cavanaugh](http://alterform.com)

[npm-image]: https://img.shields.io/npm/v/tree-list.svg?style=flat-square
[npm-url]: https://npmjs.org/package/tree-list
[travis-image]: https://img.shields.io/travis/natecavanaugh/tree-list/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/natecavanaugh/tree-list
