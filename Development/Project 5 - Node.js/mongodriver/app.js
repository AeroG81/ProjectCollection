var MongoClient = require('mongodb').MongoClient;

//Connection url
const url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url,(err, database)=>{
    if(err){
        return console.dir(err);
    }

    console.log('Connected to mongodb');

    const db = database.db('users');
    /*
    InsertDocument(db, ()=>{
        database.close();
    });
    InsertDocuments(db, ()=>{
        database.close();
    });
    FindDocuments(db,()=>{
        database.close();
    });
    QueryDocuments(db, function(){
        database.close();
    });
    UpdateDocument(db,function () {
        database.close();
    });*/
    RemoveDocument(db,function () {
        database.close();
    })
});

const InsertDocument = (db, callback)=>{
    //get Collection
    const collection = db.collection('users');

    //insert dcoument
    collection.insert({
        name: 'Wei Hung',
        email: 'wpan@gmail.com'
    },(err,result)=>{
        if(err){
            return console.dir(err);
        }
        console.log('Inserted Document');
        console.log(result);
        callback(result);
    });
};

const InsertDocuments = (db,callback)=>{
    const collection = db.collection('users');
    collection.insertMany([
        {
            name: 'Wei Sze',
            email: 'wsze@gmail.com'
        },
        {
            name: 'Wei Xiang',
            email: 'wxiang@gmail.com'
        },
        {
            name: 'Wei Mo',
            email: 'wmo@gmail.com'
        }
    ],(err,result)=>{
        if(err){
            return console.dir(err);
        }
        console.log('Inserted Documents('+result.ops.length+')');
        console.log(result);
        callback(result);
    });
};

const FindDocuments = (db,callback)=>{
    const collection = db.collection('users');

    collection.find({}).toArray((err,docs)=>{
        if(err){
            return console.dir(err);
        }
        console.log('Found the following records');
        console.log(docs);
        callback(docs);
    });
};

const QueryDocuments = (db,callback)=>{
    const collection = db.collection('users');

    collection.find({'name': 'Wei Hung'}).toArray((err,docs)=>{
        if(err){
            return console.dir(err);
        }
        console.log('Found the following records');
        console.log(docs);
        callback(docs);
    });
};

const UpdateDocument = function(db,callback){
    const collection = db.collection('users');

    collection.updateOne({'name': 'Wei Hung'},
        {$set:{email:'hung@gmail.com'}},
        function (err,result){
            if (err) {
                return console.dir(err);
            }
            console.log('Updated Document');
            callback(result);
        });
};

const RemoveDocument = function (db,callback) {
    //Get Collection
    const collection = db.collection('users');

    collection.deleteOne({name: 'Wei Mo'},function (err,result) {
        if (err) {
            return console.dir(err);
        }
        console.log('Removed Document');
        console.log(result);
        callback(result);
    })
}