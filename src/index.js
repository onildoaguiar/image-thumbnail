'use strict';

const fs = require('fs');
const sizeOf = require('image-size');
const sharp = require('sharp');
const validator = require('validator');
const axios = require('axios');
const util = require('./util');

const PERCENTAGE = 10;
const RESPONSE_TYPE = 'buffer';

const fromBase64 = async (source, percentage, width, height, responseType, jpegOptions) => {
    const imageBuffer = Buffer.from(source, 'base64');
    const dimensions = getDimensions(imageBuffer, percentage, { width, height });
    const thumbnailBuffer = await sharpResize(imageBuffer, dimensions, jpegOptions);

    if (responseType === 'base64') {
        return thumbnailBuffer.toString('base64');
    }

    return thumbnailBuffer;
};

const fromUri = async (source, percentage, width, height, responseType, jpegOptions) => {
    const response = await axios.get(source.uri, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    const dimensions = getDimensions(imageBuffer, percentage, { width, height });
    const thumbnailBuffer = await sharpResize(imageBuffer, dimensions, jpegOptions);


    if (responseType === 'base64') {
        return thumbnailBuffer.toString('base64');
    }

    return thumbnailBuffer;
};

const fromPath = async (source, percentage, width, height, responseType, jpegOptions) => {
    const imageBuffer = fs.readFileSync(source);

    const dimensions = getDimensions(imageBuffer, percentage, { width, height });
    const thumbnailBuffer = await sharpResize(imageBuffer, dimensions, jpegOptions);

    if (responseType === 'base64') {
        return thumbnailBuffer.toString('base64');
    }

    return thumbnailBuffer;
};

const fromReadStream = async (source, percentage, width, height, responseType, jpegOptions) => {
    const imageBuffer = await util.streamToBuffer(source);
    const dimensions = getDimensions(imageBuffer, percentage, { width, height });
    const thumbnailBuffer = await sharpResize(imageBuffer, dimensions, jpegOptions);

    if (responseType === 'base64') {
        return thumbnailBuffer.toString('base64');
    }

    return thumbnailBuffer;
};

const fromBuffer = async (source, percentage, width, height, responseType, jpegOptions) => {
    const imageBuffer = source;

    const dimensions = getDimensions(imageBuffer, percentage, { width, height });
    const thumbnailBuffer = await sharpResize(imageBuffer, dimensions, jpegOptions);

    if (responseType === 'base64') {
        return thumbnailBuffer.toString('base64');
    }

    return thumbnailBuffer;
};

module.exports = async (source, options) => {
    const percentage = options && options.percentage ? options.percentage : PERCENTAGE;
    const width = options && options.width ? options.width : undefined;
    const height = options && options.height ? options.height : undefined;
    const responseType = options && options.responseType ? options.responseType : RESPONSE_TYPE;
    const jpegOptions = options && options.jpegOptions ? options.jpegOptions : undefined;

    try {
        switch (typeof source) {
            case 'object':
                let response;
                if (source instanceof fs.ReadStream) {
                    response = await fromReadStream(source, percentage, width, height, responseType, jpegOptions);
                } else if (source instanceof Buffer) {
                    response = await fromBuffer(source, percentage, width, height, responseType, jpegOptions);
                } else {
                    response = await fromUri(source, percentage, width, height, responseType, jpegOptions);
                }
                return response;
            case 'string':
                if (validator.isBase64(source)) {
                    return await fromBase64(source, percentage, width, height, responseType, jpegOptions);
                } else {
                    return await fromPath(source, percentage, width, height, responseType, jpegOptions);
                }
            default:
                throw new Error('unsupported source type');
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

const getDimensions = (imageBuffer, percentageOfImage, dimensions) => {
    if (typeof dimensions.width != 'undefined' && typeof dimensions.height != 'undefined') {
        return { width: dimensions.width, height: dimensions.height };
    }

    if (typeof dimensions.width != 'undefined' || typeof dimensions.height != 'undefined') {
        return mergeDimensions(imageBuffer, dimensions)
    }

    const originalDimensions = sizeOf(imageBuffer);

    const width = parseInt((originalDimensions.width * (percentageOfImage / 100)).toFixed(0));
    const height = parseInt((originalDimensions.height * (percentageOfImage / 100)).toFixed(0));

    return { width, height };
}

const mergeDimensions = (imageBuffer, dimensions) => {
    const originalDimensions = sizeOf(imageBuffer);
    let newDimensions = dimensions

    if (typeof dimensions.width == 'undefined')
        newDimensions = { width: originalDimensions.width, height: dimensions.height };
    else if (typeof dimensions.height == 'undefined')
        newDimensions = { width: dimensions.width, height: originalDimensions.height };

    return newDimensions;
}

const sharpResize = (imageBuffer, dimensions, jpegOptions) => {
    return new Promise((resolve, reject) => {
        sharp(imageBuffer)
            .resize({ width: dimensions.width, heigth: dimensions.height, withoutEnlargement: true })
            .jpeg(jpegOptions ? jpegOptions : { force: false })
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
