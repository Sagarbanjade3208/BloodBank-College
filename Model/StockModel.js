const mongoose = require("mongoose")

const StockModel = new mongoose.Schema({
    "A+" : {
        type : Number ,
        required : true ,
        default : 0
    } ,
    "A-" : {
        type : Number ,
        required : true ,
        default : 0
    } ,
    "B+" : {
        type : Number ,
        required : true ,
        default : 0
    } ,
    "B-" : {
        type : Number ,
        required : true ,
        default : 0
    } ,
    "AB+" : {
        type : Number ,
        required : true ,
        default : 0
    } ,
    "AB-" : {
        type : Number ,
        required : true ,
        default : 0
    } ,
    "O+" : {
        type : Number ,
        required : true ,
        default : 0
    } ,
    "O-" : {
        type : Number ,
        required : true ,
        default : 0
    }
})

const Stock = mongoose.model("Stock" , StockModel);

module.exports = StockModel;
