const mongoose=require('mongoose');
const Schema=mongoose.Schema;



let userSchema=new Schema({
    outlookId: {type: String,required:true},
    username:{type: String,required:true},
    email:{type: String,required:true},
    comname:{type: String,required:true}

});




const User=mongoose.model('user',userSchema);

module.exports=User;