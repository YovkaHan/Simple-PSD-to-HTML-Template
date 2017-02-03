/* eslint no-console: 0 */

var path = require('path');
var express = require('express');
var app = require('express')();
var url = require('url');
var http = require('http').Server(app);

http.listen(4000, 'localhost');

app.use('/', express.static(__dirname + '/public'));

app.get('/', function(req, res)
{
    debugger;
    res.sendFile(path.resolve('./public/index.html'));
});