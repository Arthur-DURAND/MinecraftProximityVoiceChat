var express = require('express');
var app = express();

let players = {}

app.get('/playerjoined', function (req, res) {
   // TODO check ip is minecraft server
   let username = req.query.username
   if(username){
      let id
      while(true){
         id = Math.floor(Math.random() * 1000000)
         let isUsed = false
         for(const name in players){
            if(id == players[name]){
               isUsed = true
            }
         }
         if(!isUsed){
            break
         }
      }
      players[username] = id
      res.send("{id:"+id+"}")
   }

})

app.get('/proximity-chat', function (req, res) {
   let id = req.query.id
   let validId = false
   for(const name in players){
      if(id == players[name]){
         validId = true
         res.send('Hello World ' + req.get('host') + " ; " + req.originalUrl + " ; " + req.url);
      }
   }
   if(!validId){
      res.send('Wrong id');
   }
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})