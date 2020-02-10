//Node and Mongodb Driver
/*
const assert  = require("assert");

exports.insertDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    coll.insert(document,(err,result)=>{
        assert.equal(err,null);
        console.log("Inserted "+result.result.n+" documents into the collection "+collection);
        callback(result);
    })
}
exports.findDocuments = (db,collection,callback)=>{
    const coll = db.collection(collection);
    coll.find({}).toArray((err,docs)=>{
        assert.equal(err,null);
        callback(docs);
    })
}
exports.deleteDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    coll.deleteOne(document,(err,result)=>{
        assert.equal(err,null);
        console.log("Removed the document ",document);
        callback(result);
    })
}
exports.updateDocument = (db,document,update,collection,callback)=>{
    const coll = db.collection(collection);
    coll.updateOne(document,{$set:update},null,(err,result)=>{
        assert.equal(err,null);
        console.log("Updated the document with ",document);
        callback(result);
    })
}   */

//Call back hell and promises
const assert  = require("assert");

exports.insertDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    return coll.insert(document);
}
exports.findDocuments = (db,collection,callback)=>{
    const coll = db.collection(collection);
    return coll.find({}).toArray();
}
exports.deleteDocument = (db,document,collection,callback)=>{
    const coll = db.collection(collection);
    return coll.deleteOne(document);
}
exports.updateDocument = (db,document,update,collection,callback)=>{
    const coll = db.collection(collection);
    return coll.updateOne(document,{$set:update},null);
} 