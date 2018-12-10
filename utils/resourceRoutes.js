var resourceRoutes = require('../config/resourceRoutes.json'),
    config = require('./config.js'),
    path = require('path'),
    fs = require('fs');

module.exports = {
    serveStatic: resourceRoutes.map(function (item) {
        return {
            route: item.to,
            dir: item.from
        };
    }),
    copy: resourceRoutes.map(function (item) {
        var isDirectory = fs.lstatSync(item.from).isDirectory(),
            from,
            to = path.resolve(config.distDir, './' + item.to),
            name;

        if (isDirectory) {
            from = item.from + '/**/*';
        } else {
            from = item.from;
            name = path.basename(to);
            to = path.dirname(to);
        }

        return {
            from: from,
            to: to,
            isFile: !isDirectory,
            name: name
        };
    })
};