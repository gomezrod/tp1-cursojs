const titulo = document.querySelector('#titulo');
const head = document.querySelector('#head');
const botonVer = document.querySelector('#botonVer');
const botonElegir = document.querySelector('#botonElegir');
const contenedor = document.querySelector('#contenedorReceta');
const botonBuscar = document.querySelector('#botonBuscar');
const listaFav = document.querySelector('#listaFavoritos');

const recetas = await cargarRecetas();

async function cargarRecetas() {
    try {
        const recetas = await fetch('../db/recetas.json');
        if (!recetas.ok) {
            throw new Error('Error al cargar las recetas');
        }
        const data = await recetas.json();
        if (data.length === 0) {
            throw new Error('No se encontraron recetas');
        }
        return data;
    } catch (error) {
        console.error(error);
        titulo.innerHTML = 'Error al cargar las recetas';
        head.appendChild(titulo);
    }
}

//Personalización de experiencia de usuario
sessionStorage.removeItem('recetasVistas');
cargarNombre();

async function cargarNombre() {
    const nombre = sessionStorage.getItem("userName");
    if (!nombre) {
        const { value: nombre, isConfirmed } = await Swal.fire({
            title: '¡Hola! Ingresa tu nombre para comenzar:',
            input: 'text',
            inputPlaceholder: 'Tu nombre',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            icon: 'info'
        })
        if(isConfirmed){
            Swal.fire(`¡Hola, ${nombre}!`)
            sessionStorage.setItem("userName", nombre);
            agregarSubtitulo(nombre);
        }
    } else {
        agregarSubtitulo(nombre);
    }
}

//Funciones para modificación del DOM

function agregarSubtitulo(nombre) {
    if (!document.getElementById('subtitulo')) {
        const subTitle = document.createElement('h3');
        subTitle.innerHTML = `Hola, ${nombre}`
        subTitle.setAttribute('id', 'subtitulo');
        const time = luxon.DateTime.now().setLocale('es').toLocaleString(luxon.DateTime.DATETIME_MED);
        const fecha = document.createElement('p');
        fecha.innerHTML = time;
        head.appendChild(subTitle);
        head.appendChild(fecha);
    }
}

function agregarElemento(id, title, txt, btn = false, contenedor = document.querySelector('#contenedorReceta'), clase='card') {
    console.log(`Agregando elemento con id: ${id}, título: ${title}, texto: ${txt}`);
    if (!document.getElementById(id)) {
        const card = document.createElement('div');
        card.setAttribute('id', id);
        card.setAttribute('class', clase);
        const cardTitle = document.createElement('h3');
        cardTitle.innerHTML = title;
        const cardText = document.createElement('p');
        cardText.innerHTML = txt;
        card.appendChild(cardTitle);
        card.appendChild(cardText);
        if (btn) {
            const cardButton = document.createElement('button');
            cardButton.setAttribute('id', `boton${id}`);
            cardButton.classList.add('boton');
            cardButton.innerHTML = 'Ver receta';
            cardButton.addEventListener('click', () => {
                sessionStorage.setItem('recetaElegida', id);
                mostrarIngredientes(recetas[id - 1]);
                mostrarPreparacion(recetas[id - 1]);
                agregarBoton('botonAgregarFavorito', 'Agregar a favoritos');
            });
            card.appendChild(cardButton);
        }
        contenedor.appendChild(card);
    } else {
        console.log(`El elemento con id ${id} ya existe.`);
        return null;
    }
}

function eliminarElementoPorClass(className) {
    const elementos = document.querySelectorAll(`.${className}`);
    elementos.forEach(elemento => {
        elemento.remove();
    });
}

function agregarParrafo(p, id) {
    if (!document.getElementById(id)) {
        console.log(`El elemento con id ${id} no existe, creando uno nuevo.`);
        const article = document.createElement('article');
        const parrafo = document.createElement('p');
        article.setAttribute('id', id);
        parrafo.innerHTML = p;
        article.appendChild(parrafo);
        contenedor.appendChild(article);
    } else {
        console.log(`El elemento con id ${id} ya existe, agregando párrafo.`);
        const parrafo = document.createElement('p');
        const article = document.getElementById(id);
        parrafo.innerHTML = p;
        article.appendChild(parrafo);
    }
}

function eliminarElemento(id) {
    let element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

function agregarBoton(id, txt) {
    if (!document.getElementById(id)) {
        const boton = document.createElement('button');
        boton.setAttribute('id', id);
        boton.classList.add('boton');
        boton.innerHTML = txt;
        document.querySelector('.boton__contenedor').appendChild(boton);
        if (id === 'botonAgregarFavorito') {
            boton.addEventListener('click', () => {
                let recetaElegida = sessionStorage.getItem('recetaElegida');
                if (recetaElegida) {
                    Swal.fire({
                        title: 'Receta guardada',
                        text: `Receta "${recetas[recetaElegida - 1].nombre}" agregada a favoritos!`,
                        icon: 'success'
                    });
                    let recetaFavorita = {
                        nombre: recetas[recetaElegida - 1].nombre,
                        porciones: recetas[recetaElegida - 1].porciones,
                        ingredientes: recetas[recetaElegida - 1].ingredientes,
                        preparacion: recetas[recetaElegida - 1].preparacion,
                        id: recetaElegida - 1,
                        fecha: luxon.DateTime.now().setLocale('es').toLocaleString(luxon.DateTime.DATETIME_MED)
                    }
                    sessionStorage.setItem('recetaFavorita', JSON.stringify(recetaFavorita));
                    agregarListaFavoritos();
                } else {
                    Swal.fire({
                        text: 'No se ha seleccionado ninguna receta',
                        icon: 'warning'
                    });
                }
            });
        }
        if (id === 'botonVerFavorito') {
            boton.addEventListener('click', () => {
                let recetaFavorita = JSON.parse(sessionStorage.getItem('recetaFavorita'));
                if (recetaFavorita) {
                    mostrarIngredientes(recetaFavorita);
                    mostrarPreparacion(recetaFavorita);
                    sessionStorage.removeItem('recetasVistas');
                } else {
                    Swal.fire({
                        text: 'No hay receta favorita guardada',
                        icon: 'warning'
                    });
                }
            });
        }
    }
}

function agregarListaFavoritos() {
    const recetaFavorita = JSON.parse(sessionStorage.getItem('recetaFavorita'));
    if (recetaFavorita) {
        agregarElemento(recetaFavorita.id, recetaFavorita.nombre, `Porciones: ${recetaFavorita.porciones}`, true, listaFav, 'favoritos');
        agregarParrafo(`Fecha de guardado: ${recetaFavorita.fecha}`, recetaFavorita.id);
        console.log(`Receta favorita agregada: ${recetaFavorita.nombre}`);
        
    } else {
        Swal.fire({
            text: 'No hay receta favorita guardada',
            icon: 'warning'
        });
    }
}

//Funciones para selección y muestra de información

function limpiarContenedor() {
    eliminarElemento('lista');
    eliminarElemento('ingredientes');
    eliminarElementoPorClass('card');
    sessionStorage.removeItem('recetasVistas');
}

async function mostrarIngredientes (receta) {
    const { value: cantidad, isConfirmed } = await Swal.fire({
        title: '¿Cuántas porciones querés preparar?',
        input: 'number',
        inputPlaceholder: `${receta.porciones}`,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    });

    if (isConfirmed) {
        if (cantidad === '' || cantidad === '0') {
        limpiarContenedor();
        let titulo = `Ingredientes para ${receta.porciones} porciones: `;
        agregarElemento('ingredientes', receta.nombre, titulo);
            for (let item of receta.ingredientes) {
                let cant = item.cantidad;
                if (item.cantidad === null) {
                    cant = '';
                }
                let txt = `${item.nombre}: ${cant} ${item.unidad}`;
                agregarParrafo(txt, 'ingredientes');
            }
        }else {
            limpiarContenedor();
            let calc = Number(cantidad) / Number(receta.porciones);
            let titulo = `Ingredientes para ${cantidad} porciones: `;
            agregarElemento('ingredientes', titulo, '');
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
    mostrarPreparacion(receta);
}

function mostrarPreparacion(receta) {
    const recetaArray=receta.preparacion.split('*');
    let titulo = 'Instrucciones para la preparación:';
    agregarElemento('preparacion', titulo, '');
    for(let p of recetaArray){
        agregarParrafo(p, 'preparacion');
    }
}

function mostrarLista(){
    limpiarContenedor();
        let txt = `
            <h2>Recetas disponibles:</h2>
            <ol>
            ${recetas.map((receta) => `<li>${receta.nombre}</li>`).join('')}
            </ol>
        `;
        agregarParrafo(txt, 'lista');
}

//Eventos de interacción con botones
function normalizarInput(input) {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

botonBuscar.addEventListener('click', () => {
    limpiarContenedor();
    const inputBuscar = document.querySelector('#inputBuscar');
    console.log(`Valor del input: ${inputBuscar.value}`);
    
    const busqueda = normalizarInput(inputBuscar.value);
    if (busqueda) {
        const recetasFiltradas = recetas.filter(receta => normalizarInput(receta.nombre).includes(busqueda));
        if (recetasFiltradas.length > 0) {
            eliminarElementoPorClass('card');
            recetasFiltradas.forEach(receta => {
                agregarElemento(receta.id, receta.nombre, `Porciones: ${receta.porciones}`, true);
            });
        } else {
            Swal.fire({
                title: 'Sin coincidencias',
                text: 'No se encontraron recetas que coincidan con la búsqueda.',
                icon: 'error'
            });
        }
    } else {
        Swal.fire({
            title: 'Ingresar datos',
            text: 'Por favor, ingrese un término de búsqueda.',
            icon: 'error'
        });
    }
});

botonVer.addEventListener("click", () => {
    eliminarElemento('botonAgregarFavorito');
    if(sessionStorage.getItem('recetaElegida')){
        agregarBoton('botonVerFavorito', 'Ver receta favorita');
    }
    mostrarLista();
    sessionStorage.setItem("recetasVistas", true);
});

async function seleccionarReceta() {
    if (sessionStorage.getItem("recetasVistas")) {
        const { value: seleccion, isConfirmed } = await Swal.fire({
            title: 'Ingrese selección',
            input: 'number',
            inputPlaceholder: 'Seleccione una receta de la lista por número:',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        })
        if (isConfirmed) {
            if (recetas[seleccion - 1]) {
                mostrarIngredientes(recetas[seleccion - 1]);
                sessionStorage.setItem('recetaElegida', seleccion);
                agregarBoton('botonAgregarFavorito', 'Agregar a favoritos');
                sessionStorage.removeItem('recetasVistas');
            } else {
                Swal.fire({
                    title: 'Receta no encontrada',
                    text: `No se encontró la receta con el número ${seleccion}, revisar elección`,
                    icon: 'warning'
                });

            }
        }
    } else {
        Swal.fire({
            title: 'No hay lista',
            text: 'Primero hacé click en "Ver recetas"',
            icon: 'warning'
        })
    }
}

botonElegir.addEventListener("click", () => {
    seleccionarReceta();
});

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