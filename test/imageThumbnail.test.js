'use strict';

const fs = require('fs');
const ImageThumbnail = require('../src');
const Fixtures = require('../resources/_fixtures');
const IMAGE_PATH = './resources/images/dog.jpg';

describe('Image Thumbnail', () => {
    it('should return a buffer image thumbnail from an image base64', async () => {
        const thumbnail = await ImageThumbnail(Fixtures.imageBase64);

        expect(thumbnail.toJSON()).toEqual(Fixtures.thumbnailBuffer);
    });

    it('should return a base64 image thumbnail from an image base64', async () => {
        let options = { responseType: 'base64' };
        const thumbnail = await ImageThumbnail(Fixtures.imageBase64, options);

        expect(thumbnail).toEqual(Fixtures.thumbnailBase64);
    });

    it('should return a base64 image thumbnail from an image uri', async () => {
        let options = { responseType: 'base64' };
        const thumbnail = await ImageThumbnail({ uri: Fixtures.imageUri }, options);

        expect(thumbnail).toEqual(Fixtures.thumbnailBase64);
    });


    it('should return a buffer image thumbnail from an image uri', async () => {
        let options = { responseType: 'buffer' };
        const thumbnail = await ImageThumbnail({ uri: Fixtures.imageUri }, options);

        expect(thumbnail.toJSON()).toEqual(Fixtures.thumbnailBuffer);
    });

    it('should return a base64 image thumbnail from an image path', async () => {
        let options = { responseType: 'base64' };
        const thumbnail = await ImageThumbnail(IMAGE_PATH, options);

        expect(thumbnail).toEqual(Fixtures.thumbnailBase64);
    });

    it('should return a buffer image thumbnail from an image path', async () => {
        let options = { responseType: 'buffer' };
        const thumbnail = await ImageThumbnail(IMAGE_PATH, options);

        expect(thumbnail.toJSON()).toEqual(Fixtures.thumbnailBuffer);
    });

    
    it('should return a buffer image thumbnail from a stream', async () => {
        const imageStream = fs.createReadStream(IMAGE_PATH);
        const thumbnail = await ImageThumbnail(imageStream);

        expect(thumbnail.toJSON()).toEqual(Fixtures.thumbnailBuffer);
    });

    it('should return a buffer image thumbnail from a buffer', async () => {
        const imageBuffer = fs.readFileSync(IMAGE_PATH);
        const thumbnail = await ImageThumbnail(imageBuffer);

        expect(thumbnail.toJSON()).toEqual(Fixtures.thumbnailBuffer);
    });
});