const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const port = 7000;

const app = new express();

app.use(serveStatic(path.resolve(__dirname, '../dist')));
app.listen(port, () => {
  console.log('server start on 127.0.0.1:7000');
});