// Constantes globales
const botonMokeponJugador = document.getElementById('boton-mokepon')
const botonReiniciar = document.getElementById('boton-reiniciar')
const contenedorAtaques = document.getElementById('contenedor-ataques')
const contenedorMokepons = document.getElementById('contenedor-mokepons')
const sectionAtaqueEnemigo = document.getElementById('ataque-enemigo')
const sectionAtaqueJugador = document.getElementById('ataque-jugador')
const sectionMensajes = document.getElementById('resultado')
const sectionReiniciar = document.getElementById('reiniciar')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionSeleccionarMokepon = document.getElementById('seleccionar-mokepon')
const spanMokeponEnemigo = document.getElementById('mokepon-enemigo')
const spanMokeponJugador = document.getElementById('mokepon-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')

// Variables globales
let ataqueEnemigo = []
let ataqueJugador = []
let ataquesMokeponEnemigo
let botonAgua
let botonFuego
let botonPlanta
let botones = []
let inputHerbos
let inputHydros
let inputIgnala
let inputLaguna
let inputNindra
let inputPyrolu
let indexAtaqueEnemigo
let indexAtaqueJugador
let mokepones = []
let mokeponJugador
let opcionesAtaques
let opcionesMokepons
let vidasEnemigo = 3
let vidasJugador = 3

// Constructor de mokepons
class Mokepon {
    constructor(nombre, title, foto, vida) {
        this.nombre = nombre
        this.title = title
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}
// Mokepons actuales
let laguna = new Mokepon('laguna', '💦Laguna💦', 'assets/icons/laguna_01.png', 5)
let pyrolu = new Mokepon('pyrolu', '🔥Pyrolu🔥', 'assets/icons/pyrolu_01.png', 5)
let herbos = new Mokepon('herbos', '🌿Herbos🌿', 'assets/icons/herbos_01.png', 5)
let nindra = new Mokepon('nindra', '💦Nindra🌿', 'assets/icons/nindra_01.png', 5)
let ignala = new Mokepon('ignala', '🔥Ignala🌿', 'assets/icons/ignala_01.png', 5)
let hydros = new Mokepon('hydros', '💦Hydros🔥', 'assets/icons/hydros_01.png', 5)

//<------- Ataques de cada mokepon ------->
laguna.ataques.push(
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
)

pyrolu.ataques.push(
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
)

herbos.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '🌿', id: 'boton-planta' },
)

nindra.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '🌿', id: 'boton-planta' },
)

ignala.ataques.push(
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '🌿', id: 'boton-planta' },
)

hydros.ataques.push(
    { nombre: '🌿', id: 'boton-planta' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '💦', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
)

mokepones.push(laguna, pyrolu, herbos, nindra, ignala, hydros)

//  --------------------Funcion inicial --------------------
function inicioJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    mokepones.forEach((mokepon) => {    // Inyeccion al DOM de cada pokemon
        opcionesMokepons = `
        <input type="radio" id=${mokepon.nombre} name="mokepon">
        <label class="tarjeta-mokepon" for=${mokepon.nombre}>${mokepon.title}
            <img class="mokepon" src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorMokepons.innerHTML += opcionesMokepons
        inputLaguna = document.getElementById('laguna')
        inputPyrolu = document.getElementById('pyrolu')
        inputHerbos = document.getElementById('herbos')
        inputNindra = document.getElementById('nindra')
        inputIgnala = document.getElementById('ignala')
        inputHydros = document.getElementById('hydros')
    })

    botonMokeponJugador.addEventListener('click', seleccionarMokeponJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

// Seleccion de mokepon
function seleccionarMokeponJugador() {
    sectionSeleccionarMokepon.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'

    if (inputLaguna.checked) {
        spanMokeponJugador.innerHTML = laguna.title
        mokeponJugador = laguna.nombre
    } else if (inputPyrolu.checked) {
        spanMokeponJugador.innerHTML = pyrolu.title
        mokeponJugador = pyrolu.nombre
    } else if (inputHerbos.checked) {
        spanMokeponJugador.innerHTML = herbos.title
        mokeponJugador = herbos.nombre
    } else if (inputNindra.checked) {
        spanMokeponJugador.innerHTML = nindra.title
        mokeponJugador = nindra.nombre
    } else if (inputIgnala.checked) {
        spanMokeponJugador.innerHTML = ignala.title
        mokeponJugador = ignala.nombre
    } else if (inputHydros.checked) {
        spanMokeponJugador.innerHTML = hydros.title
        mokeponJugador = hydros.nombre
    } else {
        alert("No seleccionaste ningun mokepon 💔 ESCOGE ALGO! 😡")
    }
    extraerAtaques(mokeponJugador)
    seleccionarMokeponEnemigo()
}

//  ----------------Seccion de ataques ----------------
function extraerAtaques(mokeponJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mokeponJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        opcionesAtaques = `
        <button id=${ataque.id} class='boton-ataque'>${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += opcionesAtaques
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonPlanta = document.getElementById('boton-planta')
    botones = document.querySelectorAll('.boton-ataque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {    //  e.tarjet.textContent lo que registra el evento en si
                ataqueJugador.push('FUEGO 🔥')
                console.log(ataqueJugador)
                boton.disabled = 'true'
            } else if (e.target.textContent === '💦') {
                ataqueJugador.push('AGUA 💦')
                console.log(ataqueJugador)
                boton.disabled = 'true'
            } else {
                ataqueJugador.push('PLANTA 🌿')
                console.log(ataqueJugador)
                boton.disabled = 'true'
            }
            ataqueAleatorioEnemigo()
        })
    });
}

// Mokepon enemigo aleatorio
function seleccionarMokeponEnemigo() {
    let mokeponAleatorio = aleatorio(0, mokepones.length - 1)
    ataquesMokeponEnemigo = mokepones[mokeponAleatorio].ataques
    spanMokeponEnemigo.innerHTML = mokepones[mokeponAleatorio].title
    secuenciaAtaque()
}

// Ataques enemigos aleatorios
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)
    if (ataqueAleatorio == 0 | ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO 🔥')
    } else if (ataqueAleatorio == 3 | ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA 💦')
    } else {
        ataqueEnemigo.push('PLANTA 🌿')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combateMokepon()
    }
}

//Funcion para imprimir un ataque por linea
function indexAmbosJugadores(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

// Logica de combate
function combateMokepon() {
    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            indexAmbosJugadores(i, i)
            crearMensaje("EMPATE")
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        } else if (ataqueJugador[i] == 'FUEGO 🔥' && ataqueEnemigo[i] == 'PLANTA 🌿' || ataqueJugador[i] == 'AGUA 💦' && ataqueEnemigo[i] == 'FUEGO 🔥' || ataqueJugador[i] == 'PLANTA 🌿' && ataqueEnemigo[i] == 'AGUA 💦') {
            indexAmbosJugadores(i, i)
            crearMensaje("Ganaste")
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        } else {
            crearMensaje("PERDISTE")
            vidasJugador--
            spanVidasJugador.innerHTML = vidasJugador
        }
    }
    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal('Felicitaciones! Ganaste 🎉✨')
    } else if (vidasJugador == 0) {
        crearMensajeFinal('HAS PERDIDO!! 💀')
    }
}

// Avisos de combate
function crearMensaje(resultado) {
    // Elemento de tipo <p>
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    // Insercion del elemento
    sectionAtaqueJugador.appendChild(nuevoAtaqueJugador)
    sectionAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo)
}

// Aviso final
function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonPlanta.disabled = true
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

// Generador de numero aleatorio
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Pedimos a la ventana que cargue la funcion "inicioJuego" despues de que termino de cargar el DOM
window.addEventListener('load', inicioJuego)
