'use stricit',



//global array for the objects

let allGoats =[];
 


//creat constractor function
function GoatImage(name,source){
this.name=name;
this.source=source;
//votes
this.votes=0;

allGoats.push(this);
}
