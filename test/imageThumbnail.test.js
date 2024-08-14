'use strict';

const fs = require('fs');
const sizeOf = require('image-size');
const imageThumbnail = require('../src');
const fixtures = require('./_fixtures');
const util = require('../src/util');
const IMAGE_PATH = './resources/images/dog.jpg';

describe('Image Thumbnail', () => {
  describe('Thumbnail Buffer', () => {
    it('should return a buffer image thumbnail from an image base64', async () => {
      const thumbnail = await imageThumbnail(fixtures.imageBase64);

      expect(thumbnail.toJSON()).toEqual(fixtures.thumbnailBufferFromBase64);
    });

    it('should return a buffer image thumbnail from an image uri', async () => {
      const options = { responseType: 'buffer' };
      const thumbnail = await imageThumbnail({ uri: fixtures.imageUri }, options);

      expect(thumbnail.toJSON()).toEqual(fixtures.thumbnailBufferFromUri);
    });

    it('should return a buffer image thumbnail from a file path', async () => {
      const options = { responseType: 'buffer' };
      const thumbnail = await imageThumbnail(IMAGE_PATH, options);

      expect(thumbnail.toJSON()).toEqual(fixtures.thumbnailBufferFromFilePath);
    });

    it('should return a buffer image thumbnail from a stream', async () => {
      const imageStream = fs.createReadStream(IMAGE_PATH);
      const thumbnail = await imageThumbnail(imageStream);

      expect(thumbnail.toJSON()).toEqual(fixtures.thumbnailBufferFromFilePath);
    });

    it('should return a buffer image thumbnail from a buffer', async () => {
      const imageBuffer = fs.readFileSync(IMAGE_PATH);
      const thumbnail = await imageThumbnail(imageBuffer);

      expect(thumbnail.toJSON()).toEqual(fixtures.thumbnailBufferFromFilePath);
    });

  });

  describe('Thumbnail Base64', () => {

    it('should return a base64 image thumbnail from an image base64', async () => {
      const options = { responseType: 'base64' };
      const thumbnail = await imageThumbnail(fixtures.imageBase64, options);

      expect(thumbnail).toEqual(fixtures.thumbnailBase64FromBase64);
    });

    it('should return a base64 image thumbnail from a buffer', async () => {
      const options = { responseType: 'base64' };
      const imageBuffer = fs.readFileSync(IMAGE_PATH);
      const thumbnail = await imageThumbnail(imageBuffer, options);

      expect(thumbnail).toEqual(fixtures.thumbnailBase64FromFilePath);
    });

    it('should return a base64 image thumbnail from a stream', async () => {
      const options = { responseType: 'base64' };
      const imageStream = fs.createReadStream(IMAGE_PATH);
      const thumbnail = await imageThumbnail(imageStream, options);

      expect(thumbnail).toEqual(fixtures.thumbnailBase64FromFilePath);
    });

    it('should return a base64 image thumbnail from an image uri', async () => {
      const options = { responseType: 'base64' };
      const thumbnail = await imageThumbnail({ uri: fixtures.imageUri }, options);

      expect(thumbnail).toEqual(fixtures.thumbnailBase64FromUri);
    });

    it('should return a base64 image thumbnail from a file path', async () => {
      const options = { responseType: 'base64' };
      const thumbnail = await imageThumbnail(IMAGE_PATH, options);

      expect(thumbnail).toEqual(fixtures.thumbnailBase64FromFilePath);
    });

    it('should return a base64 image thumbnail from an image from samsung phones due to weird encoding and failOnError set', async () => {
      const options = { responseType: 'base64', failOnError: false };
      const thumbnail = await imageThumbnail(fixtures.imageBaseSamsung, options);

      expect(thumbnail).toEqual(fixtures.thumbnailBase64FromSamsung);
    });
  });


  describe('Options', () => {
    it('should return a buffer image and keep aspect 300x200', async () => {
      const options = { width: 300, height: 200 };
      const imageBuffer = fs.readFileSync(IMAGE_PATH);
      const thumbnail = await imageThumbnail(imageBuffer, options);
      const dimensions = sizeOf(thumbnail);

      expect(dimensions.width).toEqual(300);
      expect(dimensions.height).toEqual(200);
    });

    it('should return a buffer image with width equals 300', async () => {
      const options = { width: 300 };
      const imageBuffer = fs.readFileSync(IMAGE_PATH);
      const thumbnail = await imageThumbnail(imageBuffer, options);
      const dimensions = sizeOf(thumbnail);

      expect(dimensions.width).toEqual(300);
      expect(dimensions.height).toEqual(199);

    });

    it('should return a buffer image with height equals 300', async () => {
      const options = { height: 300 };
      const imageBuffer = fs.readFileSync(IMAGE_PATH);
      const thumbnail = await imageThumbnail(imageBuffer, options);
      const dimensions = sizeOf(thumbnail);

      expect(dimensions.width).toEqual(451);
      expect(dimensions.height).toEqual(300);

    });

    it('should return a buffer image with width equals 300 and height equals 200', async () => {
      const options = { width: 300, height: 200 };
      const imageBuffer = fs.readFileSync(IMAGE_PATH);
      const thumbnail = await imageThumbnail(imageBuffer, options);
      const dimensions = sizeOf(thumbnail);

      expect(dimensions.width).toEqual(300);
      expect(dimensions.height).toEqual(200);
    });

    it('should return a buffer image with width quals 200', async () => {
      const options = { height: 200 };
      const imageBuffer = fs.readFileSync(IMAGE_PATH);
      const thumbnail = await imageThumbnail(imageBuffer, options);
      const dimensions = sizeOf(thumbnail);

      expect(dimensions.width).toEqual(301);
      expect(dimensions.height).toEqual(200);
    });

    it('should return a buffer image with width equals 144 and height equals 96', async () => {
      const options = { percentage: 15 };
      const imageBuffer = fs.readFileSync(IMAGE_PATH);
      const thumbnail = await imageThumbnail(imageBuffer, options);
      const dimensions = sizeOf(thumbnail);

      expect(dimensions.width).toEqual(144);
      expect(dimensions.height).toEqual(96);
    });
  });

  describe('Utils', () => {
    describe('RemoveUndefined', () => {
      it('should return an object only with height', async () => {
        const originalObject = { width: undefined, height: 200 };

        const newObject = util.removeUndefined(originalObject)

        expect(newObject).toEqual({ height: 200 });
      });

      it('should return an object only with width', async () => {
        const originalObject = { width: 200, height: undefined };

        const newObject = util.removeUndefined(originalObject)

        expect(newObject).toEqual({ width: 200 });

      });

      it('should return an object with width and height', async () => {
        const originalObject = { width: 200, height: 200 };

        const newObject = util.removeUndefined(originalObject)

        expect(newObject).toEqual(originalObject);

      });
    });
  });
});