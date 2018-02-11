'use strict';

const fs = require('fs');
const sizeOf = require('image-size');
const sharp = require('sharp');
const validator = require('validator');
const axios = require('axios');
const request = require('request');

const PERCENTAGE = 10;
const RESPONSE_TYPE = 'buffer';

const fromBase64 = async (source, percentage, width, height, responseType) => {
    const imageBuffer = Buffer.from(source, 'base64');
    const dimensions = getDimensions(imageBuffer, percentage, { width, height });
    const thumbnailBuffer = await sharpResize(imageBuffer, dimensions);

    if (responseType === 'base64') {
        return thumbnailBuffer.toString('base64');
    }

    return thumbnailBuffer;
};

const fromUri = async (source, percentage, width, height, responseType) => {

    const response = await axios.get(source.uri, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    const dimensions = getDimensions(imageBuffer, percentage, { width, height });
    const thumbnailBuffer = await sharpResize(imageBuffer, dimensions);


    if (responseType === 'base64') {
        return thumbnailBuffer.toString('base64');
    }

    return thumbnailBuffer;
};

const fromPath = async (source, percentage, width, height, responseType) => {

};

module.exports = async function (source, options) {
    let percentage = options && options.percentage ? options.percentage : PERCENTAGE;
    let width = options && options.width ? options.width : undefined;
    let height = options && options.height ? options.height : undefined;
    let responseType = options && options.responseType ? options.responseType : RESPONSE_TYPE;

    try {
        // check source
        switch (typeof source) {
            case 'object':
                return await fromUri(source, percentage, width, height, responseType);
                break;
            case 'string':
                if (validator.isBase64(source)) {
                    return await fromBase64(source, percentage, width, height, responseType);
                    break;
                } else {
                    return await fromPath(source, percentage, width, height, responseType);
                    break;
                }
            default:
                throw new Error('unsupported source type');
                break;
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

const getDimensions = (imageBuffer, percentageOfImage, dimensions) => {
    if (typeof dimensions.width != 'undefined' && typeof dimensions.height != 'undefined') {
        return { width: dimensions.width, height: dimensions.height };
    }

    dimensions = sizeOf(imageBuffer);

    let width = parseInt((dimensions.width * (percentageOfImage / 100)).toFixed(0));
    let height = parseInt((dimensions.height * (percentageOfImage / 100)).toFixed(0));

    return { width, height };
}

const sharpResize = (imageBuffer, dimensions) => {
    return new Promise(function (resolve, reject) {
        sharp(imageBuffer)
            .resize(dimensions.width, dimensions.height)
            .withoutEnlargement()
            .toBuffer((err, data, info) => {
                if (err) {
                    reject(err);
                } else {
                    const { format, width, height, size } = info;
                    const imagePayload = {
                        format: format,
                        width: width,
                        height: height,
                        size: size,
                    };
                    resolve(data);
                }
            });
    });
};
