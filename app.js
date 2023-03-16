const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

app.get('/',(req,res) =>{
res.sendFile(__dirname +"/entry.html")
})

app.post('/',(req,res)=>{
    var a= req.body.number;
   if( a === "student"){
    res.redirect('/dashboard');
   }else if(a==="faculty"){
   // res.sendFile(__dirname + '/notwork.html');
   res.redirect('/console');
   }else{
    res.send("<h1>Entry a correct keyword to enter to the destination page</h1>")
   }


    // res.redirect('/dashboard');
})

app.get("/dashboard",(req,res)=>{
res.sendFile(__dirname+"/index.html")
})

app.use(express.json());
let consoleOutput = [];

app.post('/log', (req, res) => {
const { type, message } = req.body;

if (type === 'log') {
  
  //console.log(`Client log: ${message.class}`);
  consoleOutput.push(`${message.class}`);

} else if(type === 'error'){
  console.error(`Client error: ${message}`);
}

res.write('OK');
res.send();
});


app.get('/console', (req, res) => {



res.json(consoleOutput);



});







 
app.listen(5000,()=>{
    console.log("running");
})