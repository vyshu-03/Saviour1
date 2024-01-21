const fs = require("fs")
const express = require("express")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
const bodyParser = require("body-parser")
const app = express()
const port = 3000
const User = require("./model/user")
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
mongoose.connect("mongodb+srv://basavaishnavi2003:OLz8gAsbomIzrSp8@cluster0.xkduyhm.mongodb.net/NewDb?retryWrites=true&w=majority").then(()=>{
    console.log("Connected")
}).catch((e) => {
    console.log(e)
    console.log("Not Connected")
})
app.get("/",(req,res) =>{
    let a = fs.readFileSync("index.html")
    res.send(a.toString())
})


app.post("/", async(req,res) =>{
    const userData = new User(req.body)
    await userData.save()
    let a = fs.readFileSync("successsss.html")
    res.send(a.toString())
})
app.post('/register', (req, res) => {
    const { email } = req.body;
  
    // Send email using nodemailer
    sendEmail(email)
      .then(() => {
        res.send('Registration successful. Check your email for a confirmation message.');
      })
      .catch(error => {
        console.error('Error sending email:', error);
        res.status(500).send('Internal Server Error');
      });
  });
app.listen(port, () =>{
    console.log(port)
})
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'basavaishnavi2003@gmail.com', // replace with your Gmail email
      pass: 'ttabkkdvtvydgznk', // replace with your Gmail password or an app-specific password
    },
  });
  function sendEmail(email) {
    const mailOptions = {
      from: 'basavaishnavi2003@gmail.com', // replace with your Gmail email
      to: email,
      subject: 'Registration Confirmation',
      text: 'Thank you for registering!',
    };
    return transporter.sendMail(mailOptions);
}