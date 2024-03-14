const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const CONNECTION_STRING = "mongodb+srv://altair:mig63Wmx6EnOQdwB@cluster0.bavkeai.mongodb.net/?retryWrites=true&w=majority";

var db = null;



const client = new MongoClient(CONNECTION_STRING);

try {
    client.connect();
    db = client.db("examenOrange");
    console.log("MongoDB Connection Success...");
} catch (error) {
    console.error(error);
}

module.exports = db