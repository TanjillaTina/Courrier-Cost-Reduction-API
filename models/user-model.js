const mongoose=require('mongoose');
const Schema=mongoose.Schema;


let conigneeSchema=new Schema({
    cpname2:{type: String,required:false},
    cpnum2:{type: String,required:false},
    comname2:{ type:String,required:false},
    comadd2:{ type:String,required:false},
    city2:{ type:String,required:false},
    country2:{ type:String,required:false},  
});



let shiperOrshippingToSchema=new Schema({
    cpname1:{type: String,required:false},
    cpnum1:{type: String,required:false},
    comname1:{ type:String,required:false},
    comadd1:{ type:String,required:false},
    city1:{ type:String,required:false},
    country1:{ type:String,required:false},  
});


let requestSchema=new Schema({
    buyer:{type: String,required:false},
    orderNumber:{type: String,required:false},
    style:{type: String,required:false},
    estemWeight:{type: String,required:false},
    article:{type: String,required:false},
    item:{type: String,required:false},
    inOrout:{type: String,required:false},
    done:{ type: Boolean ,default:false},
   // urgent:{ type: Boolean ,default:false},
    //creditdays:{type: Number,required:true},
    //shiperOrshippingTo:[shiperOrshippingToSchema],
   // conignee:[conigneeSchema]

});




let userSchema=new Schema({
     username:{ type:String,required:true},
     comname: { type:String,required:true},
     designation:{ type:String,required:true},
     dept:{ type:String,required:true},
     requests:[requestSchema]

});



const User=mongoose.model('user',userSchema);
module.exports=User;