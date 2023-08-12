let add = document.querySelector('#add');
let substract = document.querySelector('#substract');
//console.log(add, substract);

add.addEventListener("click", function () {
    let output = document.querySelector('#output');    
    let value = parseInt(output.innerText) + 1;
    if (value > 10) {
    alert("llegaste al limite");
        value = 0;
    }
    output.innerText = value;

});

substract.addEventListener("click", function () {
    let output = document.querySelector('#output');
    let value = parseInt(output.innerText) - 1;
    if (value < 0) {
    alert("no se puede bajar mas");
        value = 0;
    }
    output.innerText = value;

});
    //que funcione la resta y que no pase de 0
    //en la suma que no pase de 10