const axios = require("axios")

const  batchProcess = async (posArray)=>{
    let queryString = "";
    posArray.forEach((it)=>{
        queryString+=`&location=${it["address"]}`
    })
    try{
    const response=await axios.get(`http://www.mapquestapi.com/geocoding/v1/batch?key=vxEZwoArjPlQyd90CvwG4z1uxJ5ymoPy
    ${queryString}`)
    
    posArray.forEach((it,idx)=>{
        const latLng=response.data.results[idx].locations[0].latLng;
        // console.log(latLng)
        it["Latitude"]=latLng.lat;
        it["longitude"]=latLng.lng;

    })
    return posArray
    }
    catch(err)
    {
        console.log(err)
    }

}

const preprocessData=async (mainData)=>{
    let posArray=mainData.map((it,idx)=>{
        if(it["Latitude"]===undefined ||it["Latitude"]===null || it["longitude"]===undefined ||it["longitude"]===null )
        {
            return {position:idx, address:`${it["Lead State"]} ${it["Lead District"]} ${it["Lead main locality"]}`,Latitude:"",longitude:""}
        }
    }).filter((it)=>{if(it) return true})
    posArray= await batchProcess(posArray)

    if(posArray)
    posArray.forEach((it)=>{
        mainData[it.position]["Latitude"]=`${it["Latitude"]}`;
        mainData[it.position]["longitude"]=`${it["longitude"]}`;
    })

    // console.log(mainData)
    return mainData;

}

module.exports={preprocessData}