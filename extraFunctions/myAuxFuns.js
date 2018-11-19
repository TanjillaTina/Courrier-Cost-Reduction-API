

var getUserDetail=function(user){
//console.log("Printing Username",user);

var det=[];
var i=0;
var userNamee="";
var designation="";
var dept="";
var comname="";
    while(user[i]!='(' &&  i<user.length) 
    {
        userNamee=userNamee+user[i];
     i++;
    }

   // console.log("Printing username from here ",userNamee,"Index is ",i);

    i=i+1;
    while(user[i]!=',' &&  i<user.length) 
    {
        designation=designation+user[i];
     i++;
    }
   // console.log("Printing designation from here ",designation,"Index is ",i);
  i=i+1;

while(user[i]!=',' &&  i<user.length) 
    {
        dept=dept+user[i];
     i++;
    }
   // console.log("Printing dept from here ",dept,"Index is ",i);

    i=i+1;

    while(user[i]!=')' &&  i<user.length) 
    {
        comname=comname+user[i];
     i++;
    }
    //console.log("Printing comname from here ",comname,"Index is ",i);

det.push(userNamee);
det.push(comname);
det.push(designation);
det.push(dept);


//console.log("Printing det ",det);
return det;

};

module.exports={
    getUserDetail
}