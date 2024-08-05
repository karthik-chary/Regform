const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app          = express();
// app.use(bodyParsers)
const port= process.env.PORT | 3000

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://fasfd:123ghgv@atlascluster.nkmk6r7.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`)
const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
})

const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "//html/index.html")
})



app.post("/register", async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        const existingUser = await Registration.findOne({email : email})
        if (!existingUser){
            const registrationData = new Registration({
                name,
                email,
                password
    
            })
            await registrationData.save()
            res.redirect("/success")
        }
        else{
            console.log("User already exist")
            res.redirect("/error")
        }
        
    }
    catch(error){
        console.log("error")
        res.redirect("error")
    }
})

app.get("/success", (req,res) => {
    res.sendFile(__dirname + "/html/success.html")
})

app.get("/error", (req,res) => {
    res.sendFile(__dirname + "/html/error.html")
})

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})