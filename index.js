import express from "express";
import axios from "axios";

const port = 3000;
const app = express();
let date = new Date().toJSON().slice(0,10);
date=date.slice(8,10)+"/"+date.slice(5,7)+"/"+date.slice(0,4);
console.log(date);

app.use(express.static("public"));

app.get("/", (req,res)=> {
    res.render("index.ejs");
});

app.post("/", async (req,res)=> {
    try{
        const result = await axios.get("http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civil&output=json");
        console.log(result.data.dataseries[0]);
        res.render("index.ejs", {
            tdate: date,
            weather: result.data.dataseries[0].weather,
            temp: result.data.dataseries[0].temp2m,
            humid: result.data.dataseries[0].rh2m,
            windSpeed: result.data.dataseries[0].wind10m.speed,
            windDirec: result.data.dataseries[0].wind10m.direction,
        });
    }
    catch(error){
        res.render("index.ejs", { result: JSON.stringify(error.message) });
    }
});

app.listen(port, ()=> {
    console.log(`Listening on Port ${port}`);
})
