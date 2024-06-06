const express =require('express');
const bodyparser=require('body-parser');
const nodemailer = require('nodemailer');
const path=require("path");
const bcrypt = require("bcrypt");
const collection = require("./config.js");
const collectionFeed = require("./configfeed.js");
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static("style"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/HEADERFOOTER/footer.html");
    console.log(__dirname);
})

app.post("/foot", async(req, response)=>{
    var from = 'testsyit33@gmail.com';
    var to = req.body.fEmail;
    var subject ='Feedback Recieved';
    var message = 'Thank you for the feedback!! We are happy to hear your thoughts and help you in every way possible. \nRegards Wandering Souls.';

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'testsyit33@gmail.com',
            pass: 'fhwd waxu tzfv nxxk'
        }
    });

    const data ={
       name:req.body.fName,
       email:req.body.fEmail,
       responses:req.body.fFeedback
   }
   

       
       const userdatafeed = await collectionFeed.insertMany(data);
       console.log(userdatafeed);
       
   
    
    var mailOptions ={
        from: from,
        to: to,
        subject: subject,
        text: message
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        response.redirect("/home.html")
     })
})














app.get("/signup",(req,res) => {
    res.render("signup");
})

app.post("/signup", async (req, res) =>{
    const data ={
        name:req.body.sEmail,
        password:req.body.Confirm
    }
    const existingUser = await collection.findOne({name:data.name});
    if(existingUser){
        res.send("User already exists. Please choose a different ID.");
    }else{

        
        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.redirect("/home.html");
    }
    
});



app.get("/index",(req,res) => {
    res.render("index");
})
app.post("/index",async(req,res) =>{
    
        const check = await collection.findOne({name:req.body.Email});
        if(check){

            if(check.password != req.body.Password){
                res.send("Invalid Password");
            }
            else{
                res.redirect("/home.html");
            }
        }else{
            res.send("Invalid credentials")
        }
        

       /* const isPasswordMatch = await bcrypt.compare(req.body.Password, check.Password);
        if(isPasswordMatch){
        }else{
            res.send("wr pass error");
        } */
    
})



app.listen(5500, function(){
    console.log("running at 5500")
})











