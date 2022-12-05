const express=require("express")
const router=express.Router();

const dataframe = require("../data/stateLocations");
const Location = require("../models/LeadData");

//Testing route
router.post("/", async (req, res) => {
    try{
    dataframe.forEach(async (item)=>{
      const newLocation=new Location({
        name:item.name,
        state:item.state,
        lat:item.lat,
        lng:item.lon,
        stateCode:item.stateCode,
        pincode:item.pincode,
        dateCreated:item.dateCreated,
        leadType:item.leadType
      })
      await newLocation.save()
    })
  }
  catch(e){
    res.send(e)
  }
  
  res.send("done")
  }
  );

  module.exports=router