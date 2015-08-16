var app = require('../../server.js');
var PORT = process.env.PORT || 8000;
app.listen(PORT,function(){
  console.log('Listening on PORT:',PORT);
});