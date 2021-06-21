var fs = require('fs');

const file = '.env';

var fileStream = fs.readFileSync(file, 'utf-8');
var newfs = fileStream.replace('ENV=dev', 'ENV=test');
fs.writeFileSync(file, newfs);
