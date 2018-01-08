# fx45-node

[![Build Status](https://travis-ci.org/mgenware/fx45-node.svg?branch=master)](http://travis-ci.org/mgenware/fx45-node)
[![npm version](https://badge.fury.io/js/fx45-node.svg)](https://badge.fury.io/js/fx45-node)
[![Node.js Version](http://img.shields.io/node/v/fx45-node.svg)](https://nodejs.org/en/)

Generate JSON files for [fx54-node](https://github.com/mgenware/fx54-node).

The packages names may be slightly confusing:
* `fx54-node` Verify existence or content of files in a hierarchical object.
* `fx45-node` Generate JSON files for [fx54-node](https://github.com/mgenware/fx54-node).

## Installation
```sh
yarn add fx45-node
```

### Run tests
```sh
yarn test
```

## Example
Directory structure:
```
- root
  - dir1
    a.txt 
  - dir2
    b.txt
```

Code:
```javascript
import objectFromDirectory from 'fx45-node';

console.log(JSON.stringify(objectFromDirectory('./root')));
```

Output:
```json
{
  "dir1": {
    "a.txt": "Contents of a.txt"
  },
  "dir2": {
    "b.txt": "Contents of b.txt"
  }
}
```

## API
```javascript
objectFromDirectory(directory: string, ignoredFiles: string[]|null = null): object|null
```

* `ignoredFiles` files to be ignored, e.g. `['.DS_Store', 'thumbs.db']`.
