
const $body = document.getElementById('body')
//Creamos un contenedor donde se crearan dinamicamente los botones.
const $contenedorBotones = document.getElementById('contenedor-botones');

//Variables donde se almacenaran titulos, los botones y las imagenes que los acompañen.
let nuevoTitulo,
 nuevoBoton,
 imgBoton,
 resultado,
 nSeccion = 0;

//Variables para almacenar valor asociado a PAEDctas
let paedctasTriangulo = undefined,
 paedctasAlerta = undefined,
 paedctasChild = undefined;

//Objeto con variables del Triangulo de Evaluacion Pediatrica
const objTriangulo = {
    trianguloAparienciaInteraccion: true,
    trianguloAparienciaTono: true,
    trianguloAparienciaMirada: true,
    trianguloAparienciaLlanto: true,
    trianguloApariencia: true,
    trianguloCirculacion: true,
    trianguloRespiracion: true
};

//Objeto con codigo de color
const codigoColor = {
    'azul': 'I',
    'verde': 'II',
    'amarillo': 'III',
    'naranja': 'IV',
    'rojo': 'V'
}

//Objeto con suma total de valores de las escalas.
const valorTotal = {
    triangulo: true,
    alertaTemprana: 0,
    saveChild: 9,
};

//Objetos de cada a evaluar con sus correspondientes parametros e imagen que acompañaran al boton 
const objConciencia = {
    titulo:'Conciencia',
    despierto: {
        img: '../imgs/despierto.png',
        imgGif: '../imgs/despierto.webp',
        funcion: (title) => sumaValor(title, [true, 0, 0]),
    },
    dormido: {
        img: '../imgs/despierto.png',
        imgGif: '../imgs/dormido.webp',
        funcion: (title) => sumaValor(title, [true, 1, 0])
    },
    irritable: {
        img: '../imgs/despierto.png',
        imgGif: '../imgs/irritable.webp',
        funcion: (title) => sumaValor(title, [false, 2, 3])
    },
    convulsiones: {
        img: '../imgs/despierto.png',
        imgGif: '../imgs/convulsiones.webp',
        funcion: (title) => sumaValor(title, [false, 3, 9])
    }
}

const objColorPiel = {
    titulo:'Coloracion de la Piel',
    rosada: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    palida: {
        img:null,
        funcion: () => sumaValor(title,[false, 1, 3])
    },
    cianotica: {
        img: null,
        funcion: (title) => sumaValor(title,[false, 2, 9])
    },
    rubicunda: {
        img: null,
        funcion: (title) => sumaValor(title,[false, 2, 9])
    },
    marmorea: {
        img: null,
        funcion: (title) => sumaValor(title,[false, 3, 9])
    },
    purpurica: {
        img: null,
        funcion: (title) => sumaValor(title,[false, 3, 9])
    }
}

const objHidratacionPiel = {
    titulo:'Estado de Hidratacion de la Piel',
    normal: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    pastosa: {
        img:null,
        funcion: (title) => sumaValor(title,[false, 0, 1.5])
    },
}

const objHidratacionMucosa = {
    titulo:'Estado de Hidratacion de las Mucosas',
    normal: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    seca: {
        img:null,
        funcion: (title) => sumaValor(title,[false, 0, 1.5])
    }
}

const objHidratacionOjos = {
    titulo:'Estado de Hidratacion Segun los Ojos',
    normal: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    hundidos: {
        img:null,
        funcion: (title) => sumaValor(title,[false, 0, 1.5])
    }
}

const objHidratacionVomito = {
    titulo:'Estado de Hidratacion Segun Presencia de Vomito',
    presente: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    ausente: {
        img:null,
        funcion: (title) => sumaValor(title,[false, 0, 1.5])
    }
}

const objHidratacionToleranciaVO = {
    titulo:'Estado de Hidratacion Segun la Tolerancia a la Via Oral',
    tolera: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    noTolera: {
        img:null,
        funcion: (title) => sumaValor(title,[false, 0, 1.5])
    }
}

const objHidratacionTurgencia = {
    titulo:'Estado de Hidratacion Segun Turgencia de la Piel (o signo de Pligue)',
    positivo: {
        img: null,
        funcion: (title) => sumaValor(title,[false, 0, 1.5])
    },
    negativo: {
        img:null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    }
}

const objActividad = {
    titulo:'Actividad',
    juega: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    confundido: {
        img:null,
        funcion: (title) => sumaValor(title,[false, 2, 3])
    },
    letargico: {
        img: null,
        funcion: (title) => sumaValor(title,[false, 3, 3])
    },
    inconsciente: {
        img: null,
        funcion: (title) => sumaValor(title,[false, 3, 9])
    }
}

const objTono = {
    titulo:'Tono',
    eutonico: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    hipotonico: {
        img:null,
        funcion: (title) => sumaValor(title,[false, 0, 0])
    },
    hipertonico: {
        img: null,
        funcion: (title) => sumaValor(title,[false, 0, 0])
    }
}

const objMirada = {
    titulo:'Visual',
    mantiene: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    noMantiene: {
        img:null,
        funcion: (title) => sumaValor(title,[false, 0, 3])
    },
    noDirige: {
        img: null,
        funcion: (title) => sumaValor(title,[false, 0, 3])
    }
}

const objLlanto = {
    titulo:'Intensidad del Llanto',
    fuerte: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    debil: {
        img:null,
        funcion: (title) => sumaValor(title,[false, 0, 3])
    }
}

const objConsolabilidad = {
    titulo:'Consolabilidad',
    consolable: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    inconsolable: {
        img:null,
        funcion: (title) => sumaValor(title,[false, 0, 9])
    }
}

const objRuidosRespiratorios = {
    titulo:'Ruidos Respiratorios',
    ausentes: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    presentes: {
        img:null,
        gruñido: null,
        estridor: null,
        quejido: null,
        silibancias: null,
        funcion: (title) => console.log('Crear funcion ruidos respiratorios')
    }
}

const objDificultadRespiratoria = {
    titulo:'Dificultad Respiratoria',
    ausente: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    presente: {
        img:null,
        tiraje: null,
        retraccion: null,
        aleteo: null,
        disosiacion: null,
        funcion: (title) => console.log('Crear funcion dificultad respiratoria')
    },

}

const objPosicionRespiratoria = {
    titulo:'Posicion Patologica',
    ausente: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    presente: {
        img:null,
        tripode:null,
        olfateo:null,
        cabeceo:null,
        funcion: (title) => sumaValor(title,[false, 0, 3])
    }
}

const objAntecedentes = {
    titulo:'Antecedentes de Enfermedades Patologicos y/o uso de Esteroides',
    ausentes: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    presentes: {
        img:null,
        funcion: (title) => sumaValor(title,[true, 0, 3])
    }
}

const objAbuso = {
    titulo:'Datos de Abuso',
    ausentes: {
        img: null,
        funcion: (title) => sumaValor(title,[true, 0, 0])
    },
    presentes: {
        img:null,
        funcion: (title) => sumaValor(title,[true, 0, 3])
    }
}

const objResultado = {
    titulo:'Resultado',
    evaluar:{
        funcion: evaluarResultado,
    }
}

//Suma el valor del parametro seleccionado al total segun su indice en el array. Ademas llama a la funcion para desactivar los botones actuales.
function sumaValor(tituloSeccion, vInicial){
    tituloSeccion = tituloSeccion.toLowerCase()
    console.log(tituloSeccion)
    if(typeof vInicial[0] === 'boolean' && !(vInicial[0])){
        if(tituloSeccion === 'conciencia') return objTriangulo.trianguloAparienciaInteraccion = false;

        if(tituloSeccion === 'coloracion de la piel') return objTriangulo.trianguloCirculacion = false;

        if(tituloSeccion === 'actividad') return objTriangulo.trianguloAparienciaInteraccion = false;

        if(tituloSeccion === 'tono') return objTriangulo.trianguloAparienciaTono = false;

        if(tituloSeccion === 'visual') return objTriangulo.trianguloAparienciaMirada = false;

        if(tituloSeccion === 'intensidad del llanto') return objTriangulo.trianguloAparienciaLlanto = false;

        if(tituloSeccion === 'consolabilidad') return objTriangulo.trianguloAparienciaLlanto = false;

        if(tituloSeccion === 'ruidos respiratorios') return objTriangulo.trianguloRespiracion = false;

        if(tituloSeccion === 'dificultad respiratoria') return objTriangulo.trianguloRespiracion = false;

        if(tituloSeccion === 'posicion patologica') return objTriangulo.trianguloRespiracion = false;
    }
    if(typeof vInicial[1]==='number' && typeof vInicial[2]==='number'){
        valorTotal.alertaTemprana += vInicial[1]
        valorTotal.saveChild = valorTotal.saveChild  + vInicial[2];
    }
    desactivarBotones()
}

//Revisa si hay nodos hijos en el div contenedor y los borra, ademas que manda a llamar a la funcion para crear los botones de la nueva seccion.
desactivarBotones = () => {
    $contenedorBotones.removeChild(nuevoBoton);
    nSeccion++
    crearBotones()        
}

const arrObj = [
    /*
    objConciencia, 
    objColorPiel, 
    objHidratacionPiel, 
    objHidratacionMucosa, 
    objHidratacionOjos, 
    objHidratacionVomito, 
    objHidratacionToleranciaVO, 
    objHidratacionTurgencia, 
    objActividad, 
    objTono, 
    objMirada, 
    objLlanto, 
    objConsolabilidad, 
    objRuidosRespiratorios, 
    objDificultadRespiratoria, 
    objPosicionRespiratoria, 
    objAntecedentes, 
    objAbuso,*/
    objResultado
]

crearBotones = () => {
    //Itera sobre array con objetos para sacar sus llaves y valores.
    for(let i=0; i<arrObj.length; i++){
        if(i === nSeccion){
            //Sacamos nombre de llaves y los valores de cada uno, de cada objeto
            let llaves = Object.keys(arrObj[i])
            let valor = Object.values(arrObj[i]);

            let codigoColores = Object.keys(codigoColor);
            let codigoNumerico = Object.values(codigoColor);

            //Utilizamos el titulo para nombrar la pagina en la que nos enctramos
            nuevoTitulo = document.createElement('h3'); 
            nuevoTitulo.innerText = valor[0];
            $body.insertBefore(nuevoTitulo, $contenedorBotones);

            //Itera sobre el array de llaves para crear el boton segun parametro.
            //Itera sobre el array de objetos para asginar imagen correspondiente a boton.
            //Se crean dos eventos para cambiar de una imagen estatica a una en movimiento al pasar el mouse sobre el img button.
            for(let i=0; i<llaves.length; i++){
                let imagenEstatica = valor[i].img;
                let imagenMovimiento = valor[i].imgGif;

                if(llaves[i] !== 'titulo'){
                    nuevoBoton = document.createElement('button');
                    nuevoBoton.innerText = llaves[i].toUpperCase();
                    nuevoBoton.onclick = () => valor[i].funcion(valor[0])

                    imgBoton = document.createElement('img');
                    imgBoton.src = imagenEstatica;

                    nuevoBoton.addEventListener('pointerenter', (e) => {
                        $contenedorBotones.childNodes.forEach(nodo => {
                            if(nodo.firstChild.data === e.target.innerText) nodo.firstElementChild.src = imagenMovimiento;
                        })
                    })

                    nuevoBoton.addEventListener('pointerleave', (e) => {
                        $contenedorBotones.childNodes.forEach(nodo => {
                            if(nodo.firstChild.data === e.target.innerText) nodo.firstElementChild.src = imagenEstatica;
                        })
                    })

                    nuevoBoton.appendChild(imgBoton);
                    $contenedorBotones.appendChild(nuevoBoton);
                }
            }
        }
    }
}

function evaluarResultado(){
    let codigoColores = Object.keys(codigoColor),
     valorColores = Object.values(codigoColor),
     codigoUrgencia = undefined;
    
    //----------------Triangulo de Evaluacion Pediatrica------------------//
    (objTriangulo.trianguloAparienciaInteraccion === true 
        && objTriangulo.trianguloAparienciaTono === true 
        && objTriangulo.trianguloAparienciaMirada === true 
        && objTriangulo.trianguloAparienciaLlanto === true)
    ? objTriangulo.trianguloApariencia = true
    : objTriangulo.trianguloApariencia = false;

    if(objTriangulo.trianguloApariencia === true 
        && objTriangulo.trianguloRespiracion === true 
        && objTriangulo.trianguloCirculacion === true) paedctasTriangulo = codigoColores[0];

    if(objTriangulo.trianguloApariencia === false 
        && objTriangulo.trianguloRespiracion === true 
        && objTriangulo.trianguloCirculacion === true) paedctasTriangulo = codigoColores[1];

    if(objTriangulo.trianguloApariencia === true
        && objTriangulo.trianguloRespiracion === false 
        && objTriangulo.trianguloCirculacion === true) paedctasTriangulo= codigoColores[2];

    if(objTriangulo.trianguloApariencia === false 
        && objTriangulo.trianguloRespiracion === false 
        && objTriangulo.trianguloCirculacion === true) paedctasTriangulo= codigoColores[3];

    if(objTriangulo.trianguloApariencia === true 
        && objTriangulo.trianguloRespiracion === true 
        && objTriangulo.trianguloCirculacion === false) paedctasTriangulo= codigoColores[2];

    if(objTriangulo.trianguloApariencia === false 
        && objTriangulo.trianguloRespiracion === true 
        && objTriangulo.trianguloCirculacion === false) paedctasTriangulo= codigoColores[3];

    if(objTriangulo.trianguloApariencia === false 
        && objTriangulo.trianguloRespiracion === false 
        && objTriangulo.trianguloCirculacion === false) paedctasTriangulo= codigoColores[4];

    //-----------------Sistema de Alerta Temprana---------------//
    if(valorTotal.alertaTemprana === 0) paedctasAlerta = codigoColores[0];
    if(valorTotal.alertaTemprana  === 1) paedctasAlerta = codigoColores[1];
    if(valorTotal.alertaTemprana  === 2) paedctasAlerta = codigoColores[2];
    if(valorTotal.alertaTemprana  === 3) paedctasAlerta = codigoColores[3];
    if(valorTotal.alertaTemprana  >3) paedctasAlerta = codigoColores[4];

    //----------------Save a Child----------------//
    if(valorTotal.saveChild == 0) paedctasChild = codigoColores[0];
    if(valorTotal.saveChild == 3) paedctasChild = codigoColores[1];
    if(valorTotal.saveChild == 6) paedctasChild = codigoColores[2];
    if(valorTotal.saveChild == 9) paedctasChild = codigoColores[3];
    if(valorTotal.saveChild >9) paedctasChild = codigoColores[4];

    //-------------Asignar codigo de urgencia--------------//
    for(let i = 0; i<codigoColores.length; i++){
        if(paedctasChild === codigoColores[i]){
            codigoUrgencia = valorColores[i]
        }
    }

    //Itera sobre array con objetos para sacar sus valores.
    for(let i=0; i<arrObj.length; i++){
        if(i === nSeccion){
            //Sacamos nombre los valores de cada objeto
            valor = Object.values(arrObj[i]);

            //Utilizamos el titulo para nombrar la pagina en la que nos encontramos
            nuevoTitulo = document.createElement('h3'); 
            nuevoTitulo.innerText = valor[0];
            $body.insertBefore(nuevoTitulo, $contenedorBotones);

                if(valor[0].toLocaleLowerCase() === 'resultado'){
                    resultado = document.createElement('p')

                    resultado.innerText = `
                    CODIGO OBTENIDO: ${paedctasChild.toUpperCase()}
        
                    Valores segun paedCTAS: ${codigoUrgencia}
        
                    Valores en Escalas Individuales:
                        -Triangulo Evaluacion Pediatrica Apariencia: ${(objTriangulo.trianguloApariencia)?'Normal':'Anormal'}
                            - Interaccion: ${objTriangulo.trianguloAparienciaInteraccion?'Normal':'Anormal'}
                            - Tono: ${objTriangulo.trianguloAparienciaTono?'Normal':'Anormal'}
                            - Mirada: ${objTriangulo.trianguloAparienciaMirada?'Normal':'Anormal'}
                            - Llanto: ${objTriangulo.trianguloAparienciaLlanto?'Normal':'Anormal'}
                            - Llanto: ${objTriangulo.trianguloAparienciaLlanto?'Normal':'Anormal'}
                        -Triangulo Evaluacion Pediatrica Respiratorio: ${objTriangulo.trianguloRespiracion?'Normal':'Anormal'}
                        -Triangulo Evaluacion Pediatrica Circulatorio: ${objTriangulo.trianguloCirculacion?'Normal':'Anormal'}
        
                        -Sistema de Alerta Temprana: ${valorTotal.alertaTemprana}
        
                        -Save A Child: ${valorTotal.saveChild} 
                    `;

                    $contenedorBotones.appendChild(resultado);                
            }
        }
    }
} 

crearBotones()



