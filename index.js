const app = require('./app');
const mongoose = require("mongoose");


app.listen(3000 , async() => {
    await mongoose.connect("mongodb+srv://sagarbanjade:sagarbanjade123@cluster0.dvjmb9p.mongodb.net/?retryWrites=true&w=majority")
    console.log("Connected to MONGODB");
    console.log("Server started at port number 3000");
})
