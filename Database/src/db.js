const mongoDbClient=require('mongoose');
mongoDbClient.connect("mongodb://localhost:27017/Down_Time_Reporting",).then(()=>{
    console.log("Connection is Established to MongoDb")
}).catch((e)=>{
    console.log('Error:: ',e);
})
module.exports=mongoDbClient;