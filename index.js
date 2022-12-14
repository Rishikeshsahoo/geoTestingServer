const express = require("express");
const mongoose = require("mongoose");
const LeadData = require("./models/LeadData");
const cors = require("cors");
require("dotenv").config()
const preprocessData = require("./lib/utils").preprocessData


const LeadDataMain=require("./data/data")
const OLTData=require("./data/OLT")
const Trans_EQData=require("./data/Trans_equip")
const zoneMapping=require("./data/ZONE_CIRCLE_SSA_Mapping")




// mongoose.connect("mongodb+srv://root:root@cluster0.tujj06w.mongodb.net/testDB?retryWrites=true&w=majority")
// .then(()=>{
//   console.log("database Connected")
// })
// .catch((err)=>{
//   console.log("Failed to connect ",err)
// });

const app = express();

const port = 7000||process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

let mainData=[];






app.get("/", async (req, res) => {

  //This is mongo specific code
//   LeadData.find({})
// .then(async (resp)=>{
//   mainData=resp
//   mainData=await preprocessData(mainData)
//   console.log("hello")
//   res.json({"mainData":mainData, "OLTData":OLTData,"Trans_EQData":Trans_EQData});
// })
// .catch((err)=>{console.log(err)})


  mainData=LeadDataMain
  mainData=await preprocessData(mainData)
  console.log("hello")
  res.json({"mainData":mainData, "OLTData":OLTData,"Trans_EQData":Trans_EQData});


});


app.post("/",async (req,res)=>{

  //Mongo specific code

//   LeadData.find({})
// .then(async (resp)=>{
//   mainData=resp
//   mainData=await preprocessData(mainData)
//   try{
   
//     let obj=req.body.params;
//     let zone=obj.zone;
//     let circle=obj.circle;
//     let SSA=obj.SSA;
//     let leadStatus=obj.leadStatus;
//     // console.log(zone)
//     // console.log(circle)
//     // console.log(SSA)
//     // console.log(leadStatus)
//     let filtered_data=mainData
//     let zone_circles_set=new Set([]);
//     let zone_circles=([]);


//     if(leadStatus!==undefined && leadStatus!==null)
//     {
//       if(filtered_data)
//       filtered_data=filtered_data.map((it)=>{
//         if(it["lead Status"].toLowerCase().trim()===leadStatus.toLowerCase().trim())
//           return it;
//           return false;
//       }
//       ).filter((it)=>{return it})
//     }

//     // console.log(filtered_data)
//     if(zone=== undefined || zone===null)
//     {
//       return res.json({"mainData":filtered_data, "OLTData":OLTData,"Trans_EQData":Trans_EQData});
//     }

//     zoneMapping.forEach((it)=>{
//       if(it["ZONE"]===zone)zone_circles_set.add(it["CIRCLE_NAME"].toLowerCase().trim())
//     })
//     zone_circles=Array.from(zone_circles_set)
    
//     filtered_data=filtered_data.map((it)=>{
//       if(zone_circles.includes(it["Lead State"].toLowerCase().trim(),0))
//       {
//         return it; 
//       }
//       return false
//     }
//     ).filter((it)=>{return it})

//     if(circle===null || circle===undefined){
//       // console.log(filtered_data)
//       return res.json({"mainData":filtered_data, "OLTData":OLTData,"Trans_EQData":Trans_EQData});
//     }

//     filtered_data=filtered_data.map((it)=>{
//       if(circle.toLowerCase().trim()===it["Lead State"].toLowerCase().trim())
//       {
//         return it; 
//       }
//       return false
//     }
//     ).filter((it)=>{return it})

//     if(true)
//     {
//       // console.log("wow",filtered_data)
//       return res.json({"mainData":filtered_data, "OLTData":OLTData,"Trans_EQData":Trans_EQData});
//     }
    
//   }
//   catch(e){
//     console.log(e)
//     res.json({message:e.message})
//   }

// })
// .catch((err)=>{console.log("something wrong happened while retrieiving the data")})
  // console.log(mainData)
  

    mainData=LeadDataMain
    mainData=await preprocessData(mainData)
    try{
     
      let obj=req.body.params;
      let zone=obj.zone;
      let circle=obj.circle;
      let SSA=obj.SSA;
      let leadStatus=obj.leadStatus;
     
      let filtered_data=mainData
      let zone_circles_set=new Set([]);
      let zone_circles=([]);
  
  
      if(leadStatus!==undefined && leadStatus!==null)
      {
        if(filtered_data)
        filtered_data=filtered_data.map((it)=>{
          if(it["lead Status"].toLowerCase().trim()===leadStatus.toLowerCase().trim())
            return it;
            return false;
        }
        ).filter((it)=>{return it})
      }
  
      // console.log(filtered_data)
      if(zone=== undefined || zone===null)
      {
        return res.json({"mainData":filtered_data, "OLTData":OLTData,"Trans_EQData":Trans_EQData});
      }
  
      zoneMapping.forEach((it)=>{
        if(it["ZONE"]===zone)zone_circles_set.add(it["CIRCLE_NAME"].toLowerCase().trim())
      })
      zone_circles=Array.from(zone_circles_set)
      
      filtered_data=filtered_data.map((it)=>{
        if(zone_circles.includes(it["Lead State"].toLowerCase().trim(),0))
        {
          return it; 
        }
        return false
      }
      ).filter((it)=>{return it})
  
      if(circle===null || circle===undefined){
        // console.log(filtered_data)
        return res.json({"mainData":filtered_data, "OLTData":OLTData,"Trans_EQData":Trans_EQData});
      }
  
      filtered_data=filtered_data.map((it)=>{
        if(circle.toLowerCase().trim()===it["Lead State"].toLowerCase().trim())
        {
          return it; 
        }
        return false
      }
      ).filter((it)=>{return it})
  
      if(true)
      {
        // console.log("wow",filtered_data)
        return res.json({"mainData":filtered_data, "OLTData":OLTData,"Trans_EQData":Trans_EQData});
      }
      
    }
    catch(e){
      console.log(e)
      res.json({message:e.message})
    }
  
})



//Testing route
app.delete("/", async (req, res) => {
  await Location.deleteMany({});
  res.status(201).send("deleted");
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});


