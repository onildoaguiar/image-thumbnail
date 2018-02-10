'use strict';

const sizeOf = require('image-size');
const sharp = require('sharp');
const validator = require('validator');
const PERCENTAGE = 3;

module.exports = async function (source, options) {
    let percentage = options && options.percentage ? options.percentage : PERCENTAGE;
    let width = options && options.width ? options.width : undefined;
    let height = options && options.height ? options.height : undefined;

    // Check source
    if (typeof source === 'object') {
        //
    } else{

    }



    // check if a valid base64
    if (validator.isBase64(base64Data)) {
        var image;

        var thumbnailImage;

        var imageWidth, imageHeight;

        var bufferImage = Buffer.from(base64Data, 'base64');

        var dimensions = sizeOf(bufferImage);

        var imageBase64;

        imageWidth = getNewDimensions(percentageOfImage, dimensions.width);
        imageHeight = getNewDimensions(percentageOfImage, dimensions.height);

        // resize original image
        imageBase64 = await sharpResize(bufferImage, imageWidth, imageHeight);

        return image;
    } else {
        return 500;
    }
};

const getNewDimensions = (percentageOfImage, dimension) => {
    var compressionDimension = dimension * (percentageOfImage / 100);
    return parseInt(compressionDimension.toFixed(0));
}

const sharpResize = (bufferImage, imageWidth, imageHeight) => {
    return new Promise(function (resolve, reject) {
        sharp(bufferImage)
            .resize(imageWidth, imageHeight)
            .withoutEnlargement()
            .toBuffer((err, data, info) => {
                if (err) {
                    reject(err);
                } else {
                    imageBase64 = data.toString('base64');
                    const { format, width, height, size } = info;
                    const imagePayload = {
                        image: imageBase64,
                        format: format,
                        width: width,
                        height: height,
                        size: size,
                    };
                    resolve(imageBase64);
                }
            });
    });
};
