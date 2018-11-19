const mongoose=require('mongoose');
const Schema=mongoose.Schema;



let companySchema=new Schema({
    companyname:{type: String,required:true},
    comshortname:{type: String,required:false},
    comurl:{ type:String,required:false},
    comtel:{type:Number,required:false},
    comfax:{ type:String,required:false},
    
});


let addressSchema=new Schema({
    contactpersonname:{type: String,required:true},
    address:{type: String,required:true},
    city:{ type:String,required:true},
    state:{ type:String,required:true},
    country:{ type:String,required:true},
    postalcode:{type:Number,required:false},
    email:{ type:String,required:false}
    
});


let requestSchema=new Schema({
    supplierlistcat:{type: String,required:true},
    inorout:{type: String,required:true},
    done:{ type: Boolean ,default:false},
    urgent:{ type: Boolean ,default:false},
    creditdays:{type: Number,required:true},
    companydetail:[companySchema],
    addressdetail:[addressSchema]

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