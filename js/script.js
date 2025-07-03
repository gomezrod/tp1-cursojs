const titulo = document.querySelector('#titulo');
const head = document.querySelector('#head');
const botonVer = document.querySelector('#botonVer');
const botonElegir = document.querySelector('#botonElegir');
const contenedor = document.querySelector('#contenedorReceta');

//Array de objetos a modo de base de datos
const recetas = [
    {
        nombre: "Guiso de lentejas con carne y chorizo colorado",
        porciones: 6.0,
        ingredientes: [
            { nombre: "chorizo colorado", cantidad: 1.0, unidad: "un." },
            { nombre: "panceta ahumada", cantidad: 150.0, unidad: "g" },
            { nombre: "roast beef (u otra carne)", cantidad: 250.0, unidad: "g" },
            { nombre: "cebolla grande", cantidad: 1.0, unidad: "un." },
            { nombre: "dientes de ajo", cantidad: 2.0, unidad: "un." },
            { nombre: "morrón", cantidad: 0.5, unidad: "un." },
            { nombre: "papa grande", cantidad: 1.0, unidad: "un." },
            { nombre: "zanahoria", cantidad: 1.0, unidad: "un." },
            { nombre: "tomates", cantidad: 2.0, unidad: "un." },
            { nombre: "tomates secos", cantidad: 4.0, unidad: "un." },
            { nombre: "lentejas", cantidad: 350.0, unidad: "g" },
            { nombre: "puré de tomate", cantidad: 0.5, unidad: "vaso" },
            { nombre: "hojas de laurel", cantidad: 2.0, unidad: "un." },
            { nombre: "aceite de oliva", cantidad: null, unidad: "cant. necesaria" },
            { nombre: "sal, pimienta, ajo en polvo, pimentón, orégano", cantidad: null, unidad: "cant. necesaria" }
        ],
        preparacion: "*1. Hervir el chorizo cortado durante 15 min para desgrasar. *2. Dorar panceta hasta crocante, luego chorizo; retirar. *3. Dorar la carne en la misma olla. *4. Sofreír cebolla, morrón y ajo hasta transparente. *5. Agregar tomate, cocinar 3 min. *6. Reincorporar carnes y desglasar con vino hasta evaporación (~3 min). *7. Añadir papas, zanahorias, tomates secos y condimentos, puré de tomate. *8. Agregar lentejas, agua caliente y laurel; tapar y cocer a fuego medio, revolviendo y añadiendo agua caliente según sea necesario. *9. Cociná hasta que las lentejas estén tiernas, dejá reposar unas horas antes de servir para intensificar sabor."
    },
    {
        nombre: "Pastel de papas tradicional",
        porciones: 4.0,
        ingredientes: [
            { nombre: "papas", cantidad: 1.0, unidad: "kg" },
            { nombre: "carne picada de ternera", cantidad: 0.5, unidad: "kg" },
            { nombre: "cebolla", cantidad: 1.0, unidad: "un." },
            { nombre: "pimiento morrón", cantidad: 0.5, unidad: "un." },
            { nombre: "dientes de ajo", cantidad: 2.0, unidad: "un." },
            { nombre: "pastilla de caldo", cantidad: 1.0, unidad: "un." },
            { nombre: "ajo en polvo", cantidad: null, unidad: "cdita." },
            { nombre: "pimentón", cantidad: null, unidad: "cdita." },
            { nombre: "manteca", cantidad: 25.0, unidad: "g" },
            { nombre: "chorrito de leche", cantidad: null, unidad: "cda." },
            { nombre: "nuez moscada", cantidad: null, unidad: "cdita." },
            { nombre: "aceite, sal, pimienta", cantidad: null, unidad: "cant. necesaria" },
        ],
        preparacion: "*1. Hervir papas cortadas en cubos con sal. *2. Picar cebolla, ajo y morrón. *3. Sofreír en aceite hasta que la cebolla esté transparente. *4. Agregar carne picada, desmenuzar, salpimentar y añadir pastilla de caldo, ajo en polvo y pimentón; cocinar 15 min. *5. Hacer puré caliente con manteca, leche, sal, pimienta y nuez moscada. *6. En una fuente, colocar una capa de puré, luego la carne (templada) y finalizar con otra capa de puré; alisar mojando la cuchara. *7. Gratinar en horno fuerte 15-20 min hasta dorar."
    },
    {
        nombre: "Receta de cazuela de vacuno",
        porciones: 5.0,
        ingredientes: [
            { nombre: "carne de vacuno (bola de lomo/osobuco/falda)", cantidad: 1.0, unidad: "kg" },
            { nombre: "zanahorias", cantidad: 2.0, unidad: "un." },
            { nombre: "papas", cantidad: 2.0, unidad: "un." },
            { nombre: "choclo", cantidad: 1.0, unidad: "un." },
            { nombre: "cebolla", cantidad: 1.0, unidad: "un." },
            { nombre: "dientes de ajo", cantidad: 2.0, unidad: "un." },
            { nombre: "pimiento verde", cantidad: 1.0, unidad: "un." },
            { nombre: "ramita de apio", cantidad: 1.0, unidad: "un." },
            { nombre: "calabaza", cantidad: 1.0, unidad: "trozo" },
            { nombre: "hoja de laurel", cantidad: 1.0, unidad: "un." },
            { nombre: "ramita de tomillo", cantidad: 1.0, unidad: "un." },
            { nombre: "sal y pimienta", cantidad: null, unidad: "cant. necesaria" },
            { nombre: "agua", cantidad: null, unidad: "cant. necesaria" }
        ],
        preparacion: "*1. Cortar la carne en trozos, las verduras en cubos/trozos. *2. En una olla grande, dorar la carne, luego agregar cebolla, ajo, morrón y apio; sofreír hasta que se ablanden. *3. Añadir zanahorias, papas, choclo y calabaza. Cubrir con agua, sumar laurel, tomillo, sal y pimienta. *4. Cocinar tapado a fuego medio hasta que la carne esté tierna y las verduras listas. *5. Ajustar sazón y servir bien caliente."

    },
    {
        nombre: "Chocotorta",
        porciones: 8.0,
        ingredientes: [
            { nombre: "dulce de leche", cantidad: 400.0, unidad: "g" },
            { nombre: "crema de leche", cantidad: 400.0, unidad: "g" },
            { nombre: "galletitas de chocolate", cantidad: 750.0, unidad: "g" },
            { nombre: "leche o café", cantidad: null, unidad: "cant. necesaria para remojar" },
            { nombre: "chocolate semi amargo", cantidad: 50.0, unidad: "g" },
            { nombre: "cacao en polvo", cantidad: 50.0, unidad: "g" }
        ],
        preparacion: "*1. Mezclar dulce de leche con crema hasta obtener una crema homogénea. *2. Humedecer levemente las galletitas con leche o café y colocar una capa en la base y bordes de la molde. *3. Cubrir con una parte de la crema. *4. Repetir capas de galletitas y crema hasta llenar el molde. *5. Terminar con crema y espolvorear cacao en polvo y trozos de chocolate. *6. Refrigerar al menos 4 h (mejor toda la noche) antes de servir."
    },
    {
        nombre: "Budín inglés",
        porciones: 10.0,
        ingredientes: [
            { nombre: "harina leudante (o harina + polvo de hornear)", cantidad: 150.0, unidad: "g" },
            { nombre: "manteca pomada", cantidad: 150.0, unidad: "g" },
            { nombre: "azúcar", cantidad: 150.0, unidad: "g" },
            { nombre: "huevos", cantidad: 3.0, unidad: "un." },
            { nombre: "miel", cantidad: 1.0, unidad: "cda." },
            { nombre: "ralladura de naranja y limón", cantidad: null, unidad: "cant. necesaria" },
            { nombre: "frutos secos variados", cantidad: null, unidad: "cant. necesaria" },
            { nombre: "fruta abrillantada (opcional)", cantidad: null, unidad: "cant. necesaria" },
            { nombre: "clara + azúcar impalpable (para glasé real)", cantidad: null, unidad: "cant. necesaria" }
        ],
        preparacion: "*1. Batir manteca pomada con azúcar hasta obtener una mezcla cremosa. *2. Incorporar los huevos uno a uno, luego la miel y ralladuras. *3. Agregar la harina leudante (si usás harina común, agregale una pizca de polvo de hornear) mezclando suavemente. *4. Sumá los frutos secos y, opcionalmente, la fruta abrillantada. *5. Verter en molde enmantecado y enharinado. *6. Hornear a temperatura media (170-180 °C) unos 50-60 min, hasta que al pinchar salga limpio. *7. Si querés, preparar un glaseado con clara y azúcar impalpable y cubrir el budín cuando se enfríe."
    }
];

//Personalización de experiencia de usuario
sessionStorage.removeItem('recetasVistas');
let nombre = sessionStorage.getItem("userName");

if (!sessionStorage.getItem("userName")) {
    nombre = prompt("Bienvenido/a! Ingresá tu nombre para comenzar:");
    sessionStorage.setItem("userName", nombre);
}

if (nombre) {
    agregarSubtitulo(nombre);
}

//Funciones para selección y muestra de información

function mostrarIngredientes (receta) {
    let cantidad = prompt("Ingrese la cantidad de porciones, en caso de no saber ingresar 0 o dejar en blanco");
    if (cantidad === '' || cantidad === '0') {
        eliminarElemento('lista'); 
        eliminarElemento('ingredientes');
        let titulo = `Ingredientes para ${receta.porciones} porciones: `;
        agregarParrafo(titulo, 'ingredientes');
        for (let item of receta.ingredientes) {
            let cant = item.cantidad;
            if (item.cantidad === null) {
                cant = '';
            }
            let txt = `${item.nombre}: ${cant} ${item.unidad}`;
            agregarParrafo(txt, 'ingredientes');
        }
    } else {
        eliminarElemento('lista');
        eliminarElemento('ingredientes');
        let calc = Number(cantidad) / Number(receta.porciones);
        let titulo = `Ingredientes para ${cantidad} porciones: `;
        agregarParrafo(titulo, 'ingredientes');
        for (let item of receta.ingredientes) {
            let cantidadCalculada = (item.cantidad * calc).toFixed(2)
            if (cantidadCalculada == 0) {
                cantidadCalculada = ''
            };
            let txt = `${item.nombre}: ${cantidadCalculada} ${item.unidad}`;
            agregarParrafo(txt, 'ingredientes');
        }
    }
}

function mostrarPreparacion(receta) {
    const recetaArray=receta.preparacion.split('*');
    let titulo = 'Instrucciones para la preparación:';
    agregarParrafo(titulo, 'preparacion');
    
    for(let p of recetaArray){
        agregarParrafo(p, 'preparacion');
    }
}

function mostrarLista(){
    let hayLista = document.getElementById('lista');
  
    eliminarElemento('ingredientes');
    eliminarElemento('preparacion');


    if (!hayLista) {
        let txt = `
            <h2>Recetas disponibles:</h2>
            <ol>
            ${recetas.map((receta) => `<li>${receta.nombre}</li>`).join('')}
            </ol>
        `;
        agregarParrafo(txt, 'lista');
    }

    // let i = 1;
    // for (const item of recetas) {
    //     let txt = i + ". " + item.nombre
    //     console.log(txt);
    //     if(!hayLista){
    //         agregarParrafo(txt, 'lista');
    //     }
    //     i++;
    // }

}

//Funciones para modificación del DOM

function agregarSubtitulo (nombre) {    
    if(!document.getElementById('subtitulo')){
        const subTitle = document.createElement('h3');
        subTitle.innerHTML = `Hola, ${nombre}`
        subTitle.setAttribute('id', 'subtitulo');
        head.appendChild(subTitle);
    }
}

function agregarParrafo (p, id) {
    if (!document.getElementById(id)) {
        const article = document.createElement('article');
        const parrafo = document.createElement('p');
        article.setAttribute('id', id);
        parrafo.innerHTML = p;
        article.appendChild(parrafo);
        contenedor.appendChild(article);
    }else{
        const parrafo = document.createElement('p');
        const article = document.getElementById(id);
        parrafo.innerHTML=p;
        article.appendChild(parrafo);
        contenedor.appendChild(article);
    }
}

function eliminarElemento (id) {
    let element = document.getElementById(id);
    if(element){
        element.remove();
    }
}

function agregarBoton (id, txt) {
    if(!document.getElementById(id)){
        const boton = document.createElement('button');
        boton.setAttribute('id', id);
        boton.classList.add('boton');
        boton.innerHTML = txt;
        document.querySelector('.boton__contenedor').appendChild(boton);

        if(id === 'botonAgregarFavorito'){
            boton.addEventListener('click', () => {
                let recetaElegida = sessionStorage.getItem('recetaElegida');
                if(recetaElegida){
                    alert(`Receta "${recetas[recetaElegida - 1].nombre}" agregada a favoritos!`);
                    let recetaFavorita = {
                        nombre: recetas[recetaElegida - 1].nombre,
                        porciones: recetas[recetaElegida - 1].porciones,
                        ingredientes: recetas[recetaElegida - 1].ingredientes,
                        preparacion: recetas[recetaElegida - 1].preparacion,
                        id: recetaElegida -1
                    }
                    sessionStorage.setItem('recetaFavorita', JSON.stringify(recetaFavorita));
                }else{
                    alert('No se ha seleccionado ninguna receta');
                }
            });
        }

        if(id === 'botonVerFavorito'){
            boton.addEventListener('click', () => {
                let recetaFavorita = JSON.parse(sessionStorage.getItem('recetaFavorita'));
                if(recetaFavorita){
                    mostrarIngredientes(recetaFavorita);
                    mostrarPreparacion(recetaFavorita);
                    sessionStorage.removeItem('recetasVistas');
                }else{
                    alert('No hay receta favorita guardada');
                }
            });
        }
    }
}

//Eventos de interacción con botones

botonVer.addEventListener("click", () => {
    sessionStorage.setItem("recetasVistas", true);
    eliminarElemento('botonAgregarFavorito');
    if(sessionStorage.getItem('recetaElegida')){
        agregarBoton('botonVerFavorito', 'Ver receta favorita');
    }
    mostrarLista();
})

botonElegir.addEventListener("click", () => {
    if(sessionStorage.getItem("recetasVistas")){
        const seleccion = prompt("Seleccione una receta de la lista por número:");

        if (recetas[seleccion - 1]) {
            mostrarIngredientes(recetas[seleccion - 1]);
            mostrarPreparacion(recetas[seleccion - 1]);
            sessionStorage.setItem('recetaElegida', seleccion);
            agregarBoton('botonAgregarFavorito', 'Agregar a favoritos');
            sessionStorage.removeItem('recetasVistas');
        } else {
            alert(`No se encontró la receta con el número ${seleccion}, revisar elección`);

        }
    }else{
        alert('Primero hacé click en "Ver recetas"')
    }
})

botonVer.addEventListener("mouseover", () => {
    botonVer.classList.add('encendido');
});

botonVer.addEventListener("mouseout", () => {
    botonVer.classList.remove('encendido');
});

botonElegir.addEventListener("mouseover", () => {
    botonElegir.classList.add('encendido');
});

botonElegir.addEventListener("mouseout", () => {
    botonElegir.classList.remove('encendido');
});