
const { log } = require("console");
const express = require("express");
const { write } = require("fs");
const https=require("https");
const bodyParser=require("body-parser");
const app = express();
 app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");
})
app.post("/", function(req,res){
    const city=req.body.CityName;
    const unit=req.body.unitName;
    const apiKey="";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units";
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const WeatherData = JSON.parse(data);
            const WeatherDescription=WeatherData.weather[0].description;
            const temp=WeatherData.main.temp;
            const icon=WeatherData.weather[0].icon;
            const ImageUrl="https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>It feels like "+WeatherDescription);
            res.write("<h1>The Temperature is "+temp+" degrees Celcius</h1>");
            res.write("<img src="+ImageUrl+">");
            res.send()
        })
    })
})


app.listen(3000,function(){
    console.log("Server started at 3000");
});
