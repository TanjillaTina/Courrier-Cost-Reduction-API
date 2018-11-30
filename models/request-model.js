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

let reqDetailSchema=new Schema({
    buyer:{type: String,required:false},
    orderNumber:{type: String,required:false},
    style:{type: String,required:false},
    article:{type: String,required:false},
    item:{type: String,required:false},

});

let requestSchema=new Schema({
    //user info
    userId:{ type: String ,required:true},
    usermail:{type:String,required:true},
    //request date
    reqDay:{ type: String ,required:true},
    reqDate:{ type: String ,required:true},
    //company name 
    comname:{type: String,required:false},
    //request detail
    shiperOrshippingTo:[shiperOrshippingToSchema],
    conignee:[conigneeSchema],
    reqDetail:[reqDetailSchema],
    //////////inner boundaries for request queue
    courriercomname:{type: String,default:""},
    downloadex:{ type: Boolean ,default:false},
    requestQueue:{ type: Boolean ,default:false},
    ///////////////inner boundaries for on processing queue
    estemWeight:{type: String,required:false},
    boxSize:{type: String,required:false},
    cost:{type: String,required:false},
    onprocessingQueue:{ type: Boolean ,default:false},

    ////
    done:{ type: Boolean ,default:false}
    
    

});





const Requests=mongoose.model('request',requestSchema);

module.exports=Requests;