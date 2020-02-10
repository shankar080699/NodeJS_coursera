//Simple import export

/*var rect = require('./rectangle');
function solvRect(l,b){
        console.log("L = "+l+" B= "+b);
        if(l <=0 || b<=0){
            console.log("Nunber cannot be negative");
        }
        else {
            console.log("Perimeter: "+rect.perimeter(l,b));
            console.log("Area : "+rect.area(l,b));
        }

}

solvRect(1,2);
solvRect(-1,2);
solvRect(5,4);*/

//Callbacks and Error Handling

var rect = require('./rectangle');
function solvRect(l,b){
        rect(l,b,(err,rectangle) =>{
            if(err){
                console.log(err.message);
            }
            else{
                console.log("Perimeter: "+rectangle.perimeter());
                console.log("Area : "+rectangle.area());
            }
        }
        );
        console.log("After rect()");

}

solvRect(1,2);
solvRect(-1,2);
solvRect(5,4);