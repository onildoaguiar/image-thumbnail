'use strict';

const imageUri = require('./imageUri.json').uri;
const imageBase64 = require('./imageBase64.json').base64;
const thumbnailBufferFromBase64 = require('./thumbnailBufferFromBase64.json').buffer;
const thumbnailBufferFromFilePath = require('./thumbnailBufferFromFilePath.json').buffer;
const thumbnailBufferFromUri = require('./thumbnailBufferFromUri.json').buffer;
const thumbnailBase64FromBase64 = require('./thumbnailBase64FromBase64.json').base64;
const thumbnailBase64FromFilePath = require('./thumbnailBase64FromFilePath.json').base64;
const thumbnailBase64FromUri = require('./thumbnailBase64FromUri.json').base64;
const unsupportedSourceType = 'Error: unsupported source type'

module.exports = {
    imageBase64,
    imageUri,
    thumbnailBufferFromBase64,
    thumbnailBufferFromFilePath,
    thumbnailBufferFromUri,
    thumbnailBase64FromBase64,
    thumbnailBase64FromFilePath,
    thumbnailBase64FromUri,
    unsupportedSourceType
};