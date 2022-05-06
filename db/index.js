const { connect } = require("mongoose");

// const { mongoURI }= process.env;



const mongoURI = "mongodb+srv://alice:98pHr4pgn7pe6BEJ@cluster0.j90zy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

connect(mongoURI)
    .then(() => console.log("MongoDB Connected..."))
    .catch(console.log)