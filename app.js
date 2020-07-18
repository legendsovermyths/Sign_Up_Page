const express=require("express");
const bodyParser=require('body-parser');
var https = require('https');
const request=require('request');
var app=express();
const path = require('path');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
  const fname=req.body.fname;
  const lname=req.body.lname;
  const email=req.body.email;
  console.log(fname);
  console.log(lname);
  console.log(email);
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  }
  var jsonData=JSON.stringify(data);
  const url='https://us10.api.mailchimp.com/3.0/lists/df023c8a4c'
  const options={
    method:"POST",
    auth:"Anirudh1:<Mailchimp API>"
  }
  var request=https.request(url,options,function(response){
    console.log(response.statusCode)
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html")
    }
    else{
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
    })
    request.write(jsonData);
    request.end();



})
app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT || 3000,function(req,res){
  console.log("Server started listening on port 3000.")
});
