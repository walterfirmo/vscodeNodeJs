//db.js
const ObjectId = require("mongodb").ObjectId;
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017",
                        { useUnifiedTopology: true })
                .then(connection => {
                    global.connection = connection.db("aula02");
                    console.log("conectato ao banco de dados!");
                })
                .catch(error => console.log(error));
              
function findCustomers(){
    return global.connection
                    .collection("clientes")
                    .find({})
                    .toArray();
}

function findCustomer(id){
    const objectId = new ObjectId(id);
    return global.connection
                 .collection("clientes")
                 .findOne({_id: objectId});
}

function insertCustomer(customers){
    return global.connection
                    .collection("clientes")
                    .insertOne(customers);
}

function updateCustomer(id, customer){
    const objectId = new ObjectId(id);
    return global.connection
                    .collection("clientes")
                    .updateOne({_id: ObjectId}, {$set: customer});
}

function deleteCustomer(id){
    const objectId = new ObjectId();
    return global.connection
                    .collection("clientes")
                    .deleteOne({_id: ObjectId});
}

module.exports = { 
    findCustomers, 
    insertCustomer, 
    updateCustomer, 
    deleteCustomer,
    findCustomer
}