const mongoose=require("mongoose")
const date=new Date()
const locationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    lat:{
        type:String,
        required:true
    },
    lng:{
        type:String,
        required:true
    },
    stateCode:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    dateCreated:{
        type:String,
        require:true,
        default:date
    },
    leadType:{
        type:Number,
        requires:true
    }

})

module.exports= mongoose.model("Location",locationSchema);