var fs = require('fs');

const file = '.env';

var fileStream = fs.readFileSync(file, 'utf-8');
var newfs = fileStream.replace('ENV=test', 'ENV=dev');
fs.writeFileSync(file, newfs);
