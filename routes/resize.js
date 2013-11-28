var fs = require('fs');
var spawn = require('child_process').spawn;

var request = require('request');
var tmp = require('tmp');


module.exports = function(req, res, next) {
    var url = req.params[1].slice(1);
    var size = 200;
    var args = ['-', '-thumbnail', size + '^', '-gravity', 'center', '-extent', size, '-' ];
    var convert = spawn('convert', args);

    request(url).pipe(convert.stdin);
    convert.stdout.pipe(res);
};
