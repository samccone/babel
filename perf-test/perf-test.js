var babylon = require('babylon');
var generator = require('babel-generator');
var fs = require('fs');
var profiler = require('v8-profiler');

var src = fs.readFileSync('concat.js', 'utf8');
var ast = babylon.parse(src, {sourceType: 'module'});

function gen() {
    return generator.default(ast, {
        sourceMaps: false,
        sourceFileName: 'omg.js',
        minified: false,
        comments: false
    }, src).code;
}

profiler.startProfiling('');
gen();
var collectedProfile = profiler.stopProfiling();
collectedProfile.export(function(err, res) {
  fs.writeFileSync(`gathered-${Date.now()}.cpuprofile`, res);
});
