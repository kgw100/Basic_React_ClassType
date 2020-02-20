// let a = 10;

function outFunc(a){
        let c = 10;

    return function inFunc(b){
        c++;
        console.log(a+b+c);
        
    }
}

var sum = outFunc(5);
sum(20);
sum(30);