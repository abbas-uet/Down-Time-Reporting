const mongoos=require('mongoose');

const websites=new mongoos.Schema({
    title:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        reuired:true,
    },history: [
        {
          statusCode: Number,
          timestamp: String,
        }
      ],
    latestStatus: Number,
})

const Website=new mongoos.model('Website',websites);
module.exports=Website;