const express = require('express');
const server = express();



server.all('/', (req, res)=>{
  res.send(`Hurray! trexy is \nonline and 
  \nserving all of the users . Despite If it's showing online and trexy isn't responding to you then you can dm  at @akszt on instagram!`)
})
function keepAlive(){
  server.listen(8080, ()=>{console.log("TREXY IS ONLINE")
  });
}
module.exports = keepAlive;