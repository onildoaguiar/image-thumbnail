# About
Generate an image thumbnail.

[![NPM](https://nodei.co/npm/image-thumbnail.png)](https://nodei.co/npm/image-thumbnail/)

## Purpose?

This module will generate an image thumbnail.

## Usage

#### Async/Await (Typescript & ES7)
```js
const imageThumbnail = require('image-thumbnail');

try {
    const thumbnail = await imageThumbnail('images/dog.jpg');
    console.log(thumbnail);
} catch (err) {
    console.error(err);
}
```

#### Using promises (node 8.x)
```js
const imageThumbnail = require('image-thumbnail');

imageThumbnail('image-thumbnail')
.then(thumbnail => { console.log(thumbnail); })
.catch(err => console.error(err));
```

# License
This project is licensed under the MIT License - see the LICENSE.md file for details
