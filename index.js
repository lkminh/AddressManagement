/**
 * Created by minhluong on 4/7/17.
 */
const express = require("express");
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/src'));

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'src', 'index.html'))
})

var server = app.listen(3005, function() {
    console.log("Server started at port: ", server.address().port);
});