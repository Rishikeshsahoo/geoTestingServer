const mongoose=require("mongoose")
const date=new Date()
const locationSchema=new mongoose.Schema({
    "Lead ID": String,
      "Customer Name": String,
      "Customer plan": String,
      "Start time":String ,
      "Status time":String ,
      "Lead type":String ,
      "lead Status":String ,
      "Lead Country": String,
      "Lead State":String ,
      "Lead District":String ,
      "Lead main locality":String ,
      "Lead sub locality":String ,
      "Lead source channel":String ,
      "Latitude":String ,
      "longitude":String 

})

module.exports= mongoose.model("LeadData",locationSchema);