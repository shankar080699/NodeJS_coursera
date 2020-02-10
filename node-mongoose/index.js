//Mongoose newDishes
/*
const mongoose  = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect  = mongoose.connect(url);

connect.then((db)=>{

    console.log("Connected successfully the server");

    var newDishes = Dishes({
        name : 'Hari',
        description : 'Test'
    });

    newDishes.save()
    .then((dish)=>{
        console.log(dish);
        return Dishes.find({});
    })
    .then((dishes)=>{
        console.log(dishes);
        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    })

})
*/
// Using create function
const mongoose  = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect  = mongoose.connect(url);

connect.then((db)=>{

    console.log("Connected successfully the server");

    Dishes.create({
        name : 'Hari',
        description : 'Test'
    })
    .then((dish)=> {
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id,{
            $set: {description:"Updated Test"}
        },{
            new: true
        })
        .exec()
        
    })
    .then((dish)=>{
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment : 'Excellent',
            author: 'Leonardo Di Cpara'
        })

        return dish.save();
    })
    .then((dish)=>{
        console.log (dish);
        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    })

})