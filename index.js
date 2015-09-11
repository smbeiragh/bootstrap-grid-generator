/**
 * Created by sajjad on 9/11/15.
 */

var Nightmare = require('nightmare');
var gm = require('gm');
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/test', function(req, res) {
  res.send('hello world');
});

app.use(express.static('public'));

var server = app.listen(3000, function () {

  new Nightmare()
    .viewport(1200, 1800)
    .goto('http:/localhost:3000')
    .wait()
    .screenshot('grids/lg.png')
    .viewport(992, 1800)
    .wait()
    .screenshot('grids/md.png')
    .viewport(768, 1800)
    .wait()
    .screenshot('grids/sm.png')
    .viewport(480, 1800)
    .wait()
    .screenshot('grids/xs.png')
    .run(function(err, nightmare){
      if(err){
        console.error(err);
      }else{
        console.log('done!');
        server.close();
        gm("grids/xs.png").transparent('#FFFFFF').write('grids/xs.png', function (err) {
          if (err) {
            console.error(err);
          }
        });
        gm("grids/sm.png").transparent('#FFFFFF').write('grids/sm.png', function (err) {
          if (err) {
            console.error(err);
          }
        });
        gm("grids/md.png").transparent('#FFFFFF').write('grids/md.png', function (err) {
          if (err) {
            console.error(err);
          }
        });
        gm("grids/lg.png").transparent('#FFFFFF').write('grids/lg.png', function (err) {
          if (err) {
            console.error(err);
          }
        });
      }
    });
});
