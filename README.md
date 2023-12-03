# About
Generate an image thumbnail.

[![NPM](https://nodei.co/npm/image-thumbnail.png)](https://nodei.co/npm/image-thumbnail/)

## Purpose?
This module will generate an image thumbnail.

By default the thumbnail's file format will be the same as the source file. You can use the __jpegOptions__ option to force output to jpeg.

## Usage
### imageThumbnail(source, options)

#### Async/Await (Typescript & ES7)
```js
const imageThumbnail = require('image-thumbnail');

try {
    const thumbnail = await imageThumbnail('resources/images/dog.jpg');
    console.log(thumbnail);
} catch (err) {
    console.error(err);
}
```

#### Using promises (node 8.x)
```js
const imageThumbnail = require('image-thumbnail');

imageThumbnail('resources/images/dog.jpg')
    .then(thumbnail => { console.log(thumbnail) })
    .catch(err => console.error(err));
```

## Examples

#### From Uri
```js
const imageThumbnail = require('image-thumbnail');

try {
    const thumbnail = await imageThumbnail({ uri: 'https://images/dogs.jpg' });
    console.log(thumbnail);
} catch (err) {
    console.error(err);
}
```

#### From Base64
```js
const imageThumbnail = require('image-thumbnail');

try {
    const thumbnail = await imageThumbnail('/9j/4AAQSkZJRgABAQEBLAEsAAD/4QEERXhpZgAA==');
    console.log(thumbnail);
} catch (err) {
    console.error(err);
}
```

#### From Path
```js
const imageThumbnail = require('image-thumbnail');

try {
    const thumbnail = await imageThumbnail('resources/images/dog.jpg');
    console.log(thumbnail);
} catch (err) {
    console.error(err);
}
```

#### From Buffer
```js
const imageThumbnail = require('image-thumbnail');

try {
    const imageBuffer = fs.readFileSync('resources/images/dog.jpg');

    const thumbnail = await imageThumbnail(imageBuffer);
    console.log(thumbnail);
} catch (err) {
    console.error(err);
}
```

#### From Stream
```js
const imageThumbnail = require('image-thumbnail');
const fs = require('fs');

try {
    const stream = fs.createReadStream('resources/images/dog.jpg')

    const thumbnail = await imageThumbnail(stream);
    console.log(thumbnail);
} catch (err) {
    console.error(err);
}
```

## Options

- __options:__
  - __percentage__ [0-100] - image thumbnail percentage. Default = 10
  - __width__ [number] - image thumbnail width.
  - __height__ [number] - image thumbnail height.
  - __responseType__ ['buffer' || 'base64'] - response output type. Default = 'buffer'
  - __jpegOptions__ [0-100] - Example: { force:true, quality:100 }
  - __fit__ [string] - method by which the image should fit the width/height. Default = contain ([details](https://sharp.pixelplumbing.com/api-resize))
  - __failOnError__ [boolean] - Set to false to avoid read problems for images from some phones (i.e Samsung) in the sharp lib. Default = true ([details](https://github.com/lovell/sharp/issues/1578))
  - __withMetaData__ [boolean] - Keep metadata in the thumbnail (will increase file size)

### Examples
```js
const imageThumbnail = require('image-thumbnail');

let options = { percentage: 25, responseType: 'base64' }

try {
    const thumbnail = await imageThumbnail('resources/images/dog.jpg', options);
    console.log(thumbnail);
} catch (err) {
    console.error(err);
}
```

```js
const imageThumbnail = require('image-thumbnail');

let options = { width: 100, height: 100, responseType: 'base64' }

try {
    const thumbnail = await imageThumbnail('resources/images/dog.jpg', options);
    console.log(thumbnail);
} catch (err) {
    console.error(err);
}
```

```js
const imageThumbnail = require('image-thumbnail');

let options = { width: 100, height: 100, responseType: 'base64', jpegOptions: { force:true, quality:90 } }

try {
    const thumbnail = await imageThumbnail('resources/images/dog.jpg', options);
    console.log(thumbnail);
} catch (err) {
    console.error(err);
}
```

# License
This project is licensed under the MIT License - see the LICENSE.md file for details.
