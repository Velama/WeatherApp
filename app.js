const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){

res.sendFile(__dirname+"/index.html")

})


app.post('/',function(req,res){
const query = req.body.cityName;
const appKey = "009b84a5790b7dee6baedf3099d878c6";
const unit = "metric";

  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+unit;

  https.get(url,function(response){
    response.on('data',function(data){
      const weatherdata = JSON.parse(data)
      const temp = weatherdata.main.temp
      const name = weatherdata.name
      const weatherDesc = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imageURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The temperature in "+name+" is "+temp+" degrees celsius</h1>")
      res.write("<p>The weather is currently "+weatherDesc+"</p>")
      res.write("<img src="+imageURL+">")
      res.send()
      
    })
  })





})







app.listen(3000,function()
{
  console.log("Server is running on port 3000.");
});
