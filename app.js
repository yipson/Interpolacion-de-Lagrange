let kArray = 0;
const k = [];
const xArray = [];
const yArray = [];

// se almacena la operacion de los numeradores
const datosNumerador = {
    datos: [],
}

// Se almacena el valor Li
const resultadosL = {
    resultado: [],
}

// Almacenar valor P
const resulP = {
    resultado: [],
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});


function iniciarApp(){
    // Guardar k en un arreglo
    kArreglo();

    // Razon
    razon();
    
    // Capturar yj
    datosyj();

    //  graficar
    graficar();

}


function kArreglo() {
    kArray = document.querySelectorAll('.unorder-list li');
    kArray.forEach( e => {
        const n = parseInt(e.textContent);
        k[n] = parseInt(e.textContent);
    });
    alamacenarDat();
}


function alamacenarDat(){
    let xInput;
    for( let j=0; j < k.length; j++){
        xInput = document.querySelector(`.datox-${j+1}`);
        xInput.addEventListener('change', e => {
            e.preventDefault();
            const numeradorObj ={
                k: k[j], // quitar
                x: 1,
                xj: parseFloat(e.target.value)
            }
            xArray[j] = parseFloat(e.target.value);
            // guardar datos x & y
            agregarNumerador(numeradorObj);
        });
    }
}


function agregarNumerador(numeradorObj){
    const { datos } = datosNumerador;
    datosNumerador.datos = [...datos, numeradorObj];
}


function razon(){
    const btnResolver = document.querySelector('.resolver');
    btnResolver.addEventListener('click', e => {
        e.preventDefault();
        let i = 0;
        for( i; i <  k.length; i++  ){  
            const resultadoObj = {
                k: k[i],//datosNumerador.datos[i].k,  // quitar
                numerador: multiplicatoriaNume(i),
                denominador: denominador(i),
                yj: ''
            }
            guardarL(resultadoObj);
        }
        resultadoP();
        imprimirL();
    });
}


function multiplicatoriaNume(i) {
    let x3=1;
    let x2=0;
    let x=0;
    let num=1;
    n=0;
    for(let j=0; j < datosNumerador.datos.length; j++ ){
        
        if (j != i){ //k      

            x3 *= ( datosNumerador.datos[j].x);
            x2 +=  -( datosNumerador.datos[j].xj );

            while( (n === i) ||  (n === j) || (n > ( datosNumerador.datos.length-1 )) ) {
                n++;
                
                if ( n > (datosNumerador.datos.length-1) ){
                    n=0;
                }
            }

            x += ( (datosNumerador.datos[j].xj) * (datosNumerador.datos[n].xj) );
            num *= -( datosNumerador.datos[j].xj );
            n++;
        }
    }

    const multipObj = {
        x3: x3,
        x2: x2,
        x: x,
        num: num 
    }
    
    return multipObj;
}


function denominador(i){
    let denominador = 1;
    for(let j = 0; j < datosNumerador.datos.length; j++){
        if ( j != i  ){  // k     
            denominador *= ( datosNumerador.datos[i].xj - datosNumerador.datos[j].xj );
        }
    }
    return denominador;
}


function guardarL(resultadoObj) {
    const { resultado } = resultadosL;
    resultadosL.resultado = [...resultado, resultadoObj];

    
}

function imprimirL(){
    for( let j=0; j<k.length; j++){

        const divConteledorL = document.createElement('DIV');
        divConteledorL.classList.add('contenedor-l');

        const divDato = document.createElement('DIV');
        divDato.classList.add('dato-l');
        divConteledorL.appendChild(divDato);

        const divL = document.createElement('DIV');
        divL.classList.add('l');
        divDato.appendChild(divL);

        const p = document.createElement('P');
        p.textContent = `L${k[j]}=`;
        divL.appendChild(p);

        const divResultado = document.createElement('DIV');
        divResultado.classList.add('resultado');
        divDato.appendChild(divResultado);
        
        // NUMERADOR
        const numerador = document.createElement('P');
        numerador.classList.add('numerador');
        numerador.textContent = `(${ resultadosL.resultado[j].numerador.x3 }x^3) + (${ resultadosL.resultado[j].numerador.x2 }x^2) + (${ resultadosL.resultado[j].numerador.x }x) + (${ resultadosL.resultado[j].numerador.num })`;
        divResultado.appendChild(numerador);


        // DENOMINADOR
        const denominador = document.createElement('P');
        denominador.classList.add('denominador');
        denominador.textContent = `${ resultadosL.resultado[j].denominador }`;
        divResultado.appendChild(denominador);

        document.querySelector("#resultados").appendChild(divConteledorL);

    }


    const divConteledorL = document.createElement('DIV');
    divConteledorL.classList.add('contenedor-l');

    const divDato = document.createElement('DIV');
    divDato.classList.add('dato-l');
    divConteledorL.appendChild(divDato);

    const divL = document.createElement('DIV');
    divL.classList.add('l');
    divDato.appendChild(divL);

    const p = document.createElement('P');
    p.textContent = `P=`;
    divL.appendChild(p);

    const divResultado = document.createElement('DIV');
    divResultado.classList.add('resultado');
    divDato.appendChild(divResultado);
    
    // NUMERADOR
    const numerador = document.createElement('P');
    numerador.classList.add('numerador');
    numerador.textContent = `(${resulP.resultado[0].x3}x^3) + (${resulP.resultado[0].x2}x^2) + (${resulP.resultado[0].x}x) + (${resulP.resultado[0].num})`;
    divResultado.appendChild(numerador);

    document.querySelector("#resultados").appendChild(divConteledorL);
}


function datosyj(){
    let yInput;
    for(let j=0; j < k.length; j++){
        yInput = document.querySelector(`.datoy-${j+1}`);
        yInput.addEventListener('change', e => {
            e.preventDefault();
            yArray [j] = parseFloat(e.target.value);
        });
    }
}


function resultadoP() {
    let x3 =0 ;
    let x2 =0;
    let x = 0;
    let num = 0;
    let mult;

    for(let j=0; j < resultadosL.resultado.length; j++){
        mult = ( yArray[j] / resultadosL.resultado[j].denominador );
        x3 += mult;
        x2 += ( mult * resultadosL.resultado[j].numerador.x2 );
        x += ( mult * resultadosL.resultado[j].numerador.x );
        num += ( mult * resultadosL.resultado[j].numerador.num );
    }
    
    const resultP = {
        x3: parseFloat(x3.toFixed(2)),
        x2: parseFloat(x2.toFixed(2)),
        x: parseFloat(x.toFixed(2)),
        num: parseFloat(num.toFixed(2))
    }

    guardarP(resultP);
    
}


function guardarP(resultP){
    const { resultado } = resulP
    resulP.resultado = [... resultado, resultP];

    // console.log(resulP.resultado);
}

function graficar() {
    const btnGraficar = document.querySelector('.graficar');
    btnGraficar.addEventListener('click', e => {
        e.preventDefault();
        var data = [{
            x: xArray ,
            y: yArray,
            type: "var"
        }]
        Plotly.newPlot("grafico",data);
    });
}