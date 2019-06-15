'use strict';

const fs = require('fs');
const sizeOf = require('image-size');
const sharp = require('sharp');
const validator = require('validator');
const axios = require('axios');
const util = require('./util');

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
    const imageBuffer = fs.readFileSync(source);

    const dimensions = getDimensions(imageBuffer, percentage, { width, height });
    const thumbnailBuffer = await sharpResize(imageBuffer, dimensions);

    if (responseType === 'base64') {
        return thumbnailBuffer.toString('base64');
    }

    return thumbnailBuffer;
};

const fromReadStream = async (source, percentage, width, height, responseType) => {
    const imageBuffer = await util.streamToBuffer(source);
    const dimensions = getDimensions(imageBuffer, percentage, { width, height });
    const thumbnailBuffer = await sharpResize(imageBuffer, dimensions);

    if (responseType === 'base64') {
        return thumbnailBuffer.toString('base64');
    }

    return thumbnailBuffer;
};

const fromBuffer = async (source, percentage, width, height, responseType) => {
    const imageBuffer = source;

    const dimensions = getDimensions(imageBuffer, percentage, { width, height });
    const thumbnailBuffer = await sharpResize(imageBuffer, dimensions);

    if (responseType === 'base64') {
        return thumbnailBuffer.toString('base64');
    }

    return thumbnailBuffer;
};

module.exports = async (source, options) => {
    let percentage = options && options.percentage ? options.percentage : PERCENTAGE;
    let width = options && options.width ? options.width : undefined;
    let height = options && options.height ? options.height : undefined;
    let responseType = options && options.responseType ? options.responseType : RESPONSE_TYPE;

    try {
        switch (typeof source) {
            case 'object':
                let response;
                if (source instanceof fs.ReadStream) {
                    response = await fromReadStream(source, percentage, width, height, responseType);
                } else if (source instanceof Buffer) {
                    response = await fromBuffer(source, percentage, width, height, responseType);
                } else {
                    response = await fromUri(source, percentage, width, height, responseType);
                }
                return response;
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
    return new Promise((resolve, reject) => {
        sharp(imageBuffer)
            .resize({ width: dimensions.width, heigth: dimensions.height, withoutEnlargement: true })
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
