'use strict';

const ImageThumbnail = require('../src/');
const Fixtures = require('../resources/_fixtures/');
const fs = require('fs');

describe('Image Thumbnail', async () => {
    it('should return a buffer image thumbnail from an image base64', async () => {
        const thumbnail = await ImageThumbnail(Fixtures.imageBase64);

        expect(thumbnail.toJSON()).toEqual(Fixtures.thumbnailBuffer);
    });

    it('should return a base64 image thumbnail from an image base64', async () => {
        let options = { responseType: 'base64' }
        const thumbnail = await ImageThumbnail(Fixtures.imageBase64, options);

        expect(thumbnail).toEqual(Fixtures.thumbnailBase64);
    });

    it('should return a base64 image thumbnail from an image uri', async () => {
        let options = { responseType: 'base64' }
        const thumbnail = await ImageThumbnail({ uri: Fixtures.imageUri }, options);

        expect(thumbnail).toEqual(Fixtures.thumbnailBase64);
    });

    
    it('should return a buffer image thumbnail from an image uri', async () => {
        let options = { responseType: 'buffer' }
        const thumbnail = await ImageThumbnail({ uri: Fixtures.imageUri }, options);

        expect(thumbnail.toJSON()).toEqual(Fixtures.thumbnailBuffer);
    });
});