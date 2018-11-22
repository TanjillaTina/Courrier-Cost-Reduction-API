const mongoose=require('mongoose');
const Schema=mongoose.Schema;



let cosigneeSchema=new Schema({
    cpname2:{type: String,required:false},
    cpnum2:{type: String,required:false},
    comname2:{ type:String,required:false},
    comadd2:{ type:String,required:false},
    city2:{ type:String,required:false},
    country2:{ type:String,required:false},  
});




const Cosignee=mongoose.model('cosignee',cosigneeSchema);

module.exports=Cosignee;