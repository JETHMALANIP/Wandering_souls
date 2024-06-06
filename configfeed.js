const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/wanderingsouls");


connect.then(() => {
    console.log("Database connected Successfully");
})
.catch(() => {
    console.log("Database cannot be connected");
});


const FeedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    responses: {
        type: String,
        required:true
    }
});


const collectionFeed = new mongoose.model("feedbacks", FeedbackSchema);

module.exports = collectionFeed;
