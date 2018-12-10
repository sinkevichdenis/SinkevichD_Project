
var configPaths = require('../config/paths.json'),
    path = require('path');

module.exports = {
    watch: configPaths.watch,
    src: configPaths.src,
    dist: resolve(configPaths.dist, configPaths.to),
    temp: resolve(configPaths.temp, configPaths.to),
    tempDir: configPaths.temp,
    distDir: configPaths.dist,
    data: configPaths.data
};

function resolve(relate, pathsMap) {
    var result = {};

    for (var name in pathsMap) {
        result[name] = path.resolve(relate, pathsMap[name]);
    }

    return result;
}