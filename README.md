# About
Generate an image thumbnail.

[![NPM](https://nodei.co/npm/image-thumbnail.png)](https://nodei.co/npm/image-thumbnail/)

## Purpose?

This module will generate an image thumbnail.

## Usage

#### Default values
```js
const imageThumbnail = require('image-thumbnail');

// Default values
const obfuscateEmail = obfuscatorEmail('onildo.aguiar@gmail.com');
```

#### With options
```js
const obfuscatorEmail = require('obfuscator-email');

// With options
const options = { numberOfAsteriks: 3, numberOfCharacters: 3 };
const obfuscateEmail = obfuscatorEmail('onildo.aguiar@gmail.com', options);
```

# License
This project is licensed under the MIT License - see the LICENSE.md file for details
