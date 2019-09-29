const webpack = require('webpack');
const path = require('path')

const SRC_DIR = path.resolve(__dirname , "./public/js/src/client.js");
const DIST_DIR = path.resolve(__dirname , "./public/js/dist/")

module.exports = {
    entry: SRC_DIR,
    output: {
        path: DIST_DIR,
        filename: "bundle.js",
    },
    watch: true
}