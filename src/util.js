module.exports.streamToBuffer = (stream) => {
  return new Promise((resolve, reject) => {
    const buffers = [];
    stream.on('data', function (data) {
      buffers.push(data);
    });

    stream.on('end', function () {
      resolve(Buffer.concat(buffers));
    })
  })
}

module.exports.removeUndefined = (dimensions) => {
  Object.keys(dimensions).forEach(key => dimensions[key] === undefined && delete dimensions[key]);
  return dimensions
}