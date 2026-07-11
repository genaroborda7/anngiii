const clickSound = document.getElementById("clickSound");
const correctoSound = document.getElementById("correctoSound");
const errorSound = document.getElementById("errorSound");
const victoriaSound = document.getElementById("victoriaSound");
const musica = document.getElementById("musica");
const pantalla8 = document.getElementById("pantalla8");
const pantalla9 = document.getElementById("pantalla9");
const pantalla7 = document.getElementById("pantalla7");
const pantalla6 = document.getElementById("pantalla6");
const pantalla5 = document.getElementById("pantalla5");
const pantalla4 = document.getElementById("pantalla4");
document.getElementById("btnVamos").onclick = ()=>{

    pantalla3.classList.remove("activa");
    pantalla4.classList.add("activa");

}
const pasos = document.querySelectorAll(".paso");
const pantalla1 = document.getElementById("pantalla1");
const pantalla2 = document.getElementById("pantalla2");
const pantalla3 = document.getElementById("pantalla3");
let primeraPieza = null;

document.getElementById("btnEmpezar").onclick = () => {

    pasos[1].classList.add("activo");
    pantalla1.classList.remove("activa");
    pantalla2.classList.add("activa");
    musica.volume = 0.12;

musica.play();

let volumen = 0;

const fade = setInterval(()=>{

    volumen += 0.02;

    musica.volume = volumen;

    if(volumen >= 0.35){

        clearInterval(fade);

    }

},120);

}

document.getElementById("btnContinuar").onclick = () => {

    pasos[2].classList.add("activo");
    pantalla2.classList.remove("activa");
    pantalla3.classList.add("activa");

}
const mensaje = document.getElementById("mensaje");

let desafio1Completado = false;
document.querySelectorAll(".emojis span").forEach(emoji=>{

   emoji.onclick = ()=>{

    if(desafio1Completado) return;

       if(emoji.id=="corazon"){

    desafio1Completado = true;


    emoji.classList.add("corazonCorrecto");

    reproducirCorrecto();

    mensaje.innerHTML="💖 Bien, no sos ciega";

    pasos[3].classList.add("activo");

    setTimeout(()=>{

    pantalla4.classList.remove("activa");
    pantalla5.classList.add("activa");

},1200);

}

        else{
reproducirError();
            mensaje.innerHTML="❌ Le erraste burra!";

        }

    }

});
const mensajePregunta=document.getElementById("mensajePregunta");

document.querySelector(".correctaPregunta").onclick=()=>{

    document.querySelector(".correctaPregunta").classList.add("correctaAnimacion");

    reproducirCorrecto();
    mensajePregunta.innerHTML="🎉Correcto!";

    pasos[4].classList.add("activo");

    setTimeout(()=>{

        pantalla5.classList.remove("activa");
    pantalla6.classList.add("activa");

    iniciarPuzzle();

    },1500);

}

document.querySelectorAll(".incorrectaPregunta").forEach(boton=>{

    boton.onclick=()=>{

        boton.classList.add("incorrectaAnimacion");
reproducirError();
        mensajePregunta.innerHTML="❌ Te equivocaste.";

        setTimeout(()=>{

            boton.classList.remove("incorrectaAnimacion");
            mensajePregunta.innerHTML="";

        },700);

    }

});
function iniciarPuzzle(){

    const puzzle = document.getElementById("puzzle");

    puzzle.innerHTML="";

    let posiciones=[0,1,2,3,4,5,6,7,8];

    posiciones.sort(()=>Math.random()-0.5);

    posiciones.forEach((posicion,indice)=>{

        const pieza=document.createElement("div");

        pieza.className="pieza";

        const fila=Math.floor(posicion/3);
        const columna=posicion%3;

        pieza.style.backgroundPosition=
        `${-columna*100}px ${-fila*125}px`;

        pieza.dataset.correcta=indice;
        pieza.dataset.actual=posicion;

        puzzle.appendChild(pieza);
        pieza.onclick = () => {

    if (primeraPieza == null) {

        primeraPieza = pieza;
        pieza.classList.add("seleccionada");
        return;

    }

    if (primeraPieza === pieza) {

        pieza.classList.remove("seleccionada");
        primeraPieza = null;
        return;

    }

    intercambiar(primeraPieza, pieza);

    primeraPieza.classList.remove("seleccionada");
    primeraPieza = null;

};

    });

    document.getElementById("textoPuzzle").innerHTML=
    "🧩 Tocá dos piezas para intercambiarlas.";

}
function intercambiar(a,b){

    const fondo = a.style.backgroundPosition;

    a.style.backgroundPosition = b.style.backgroundPosition;

    b.style.backgroundPosition = fondo;

    const actual = a.dataset.actual;

    a.dataset.actual = b.dataset.actual;

    b.dataset.actual = actual;

    verificarPuzzle();

}
function verificarPuzzle(){

    const piezas = document.querySelectorAll(".pieza");

    let completo = true;

    piezas.forEach((pieza, indice)=>{

        if(parseInt(pieza.dataset.actual) !== indice){

            completo = false;

        }

    });

  if(completo){

    document.getElementById("textoPuzzle").innerHTML =
    "🎉 ¡Muy bien, lo completaste!";

    setTimeout(()=>{

       pasos[5].classList.add("activo");

        pantalla6.classList.remove("activa");

        pantalla7.classList.add("activa");

reproducirVictoria();
        lanzarConfeti();

        pasos[6].classList.add("activo");

    },300);

}

}
function lanzarConfeti(){

    confetti({

        particleCount:180,

        spread:90,

        origin:{ y:0.6 }

    });

}
document.getElementById("btnCarta").onclick=()=>{

      pasos[8].classList.add("activo");

    pantalla8.classList.remove("activa");

    pantalla9.classList.add("activa");

    lluviaCorazones();

    escribirCarta();


}
function escribirCarta(){

    lanzarCorazones();
        lluviaCorazones();

const texto = document.getElementById("textoCarta");

const carta = `

Antes que nada, perdón porque este regalo no llegó exactamente el día de tu cumpleaños. Capaz se nos complico para vernos o querias pasar el dia con otras personas y no pude estar ahí para dártelo como me hubiera gustado. Aun así, quería que sepas que no me olvide de vos.

Por eso queria hacerte algo distinto. No comprar un simple regalo y listo, sino prepararte algo en lo que pudiera dedicarte un poco de mi tiempo, porque sentía que te lo merecías. Capaz este regalo no sea perfecto o lo que esperabas, pero cada desafío, cada detalle y cada línea de código fueron pensados especialmente para vos. Si logré sacarte una sonrisa en algún momento del recorrido, entonces todo el tiempo que le dediqué ya valió completamente la pena.

Hay personas que aparecen en la vida y pasan sin dejar demasiado. Y hay otras que, casi sin darse cuenta, empiezan a ocupar un lugar importante. Vos sos una de esas personas. Me alegra muchísimo haberte conocido y haber compartido muchos momentos, desde las conversaciones más serias hasta las peleas más tontas (porque vos me peleas) que terminan haciéndonos reír.
Muchas veces uno no dice estas cosas porque da por hecho que la otra persona ya las sabe. Pero creo que también está bueno recordarlas de vez en cuando. 

Quiero que sepas algo que para mí es importante decirte: no importa si es para contar una buena noticia, para desahogarte después de un mal día, para pedir ayuda o simplemente porque necesitás que alguien te escuche. Siempre vas a poder contar conmigo. No porque sienta que deba hacerlo, sino porque realmente quiero estar cuando me necesites.

Gracias por cada pelea, por cada risa, por los momentos compartidos y por formar parte de mi vida.
Ojalá este pequeño regalo pueda acompañarte aunque sea por unos minutos y, cuando lo recuerdes dentro de un tiempo, te saque la misma sonrisa con la que espero que lo estés leyendo ahora.

Te deseo un muy feliz cumpleaños, nunca dejes de ser la persona que sos.

te amo con locura pichona, no se que seria de mi sin vos y tu locura.
`;
    let i = 0;


    texto.className = "";

    texto.innerHTML = "";

    document.getElementById("botonesFinales").style.display = "none";

    setTimeout(()=>{

        texto.classList.add("carta");

        const intervalo = setInterval(()=>{

            texto.innerHTML += carta.charAt(i);

            i++;

          if(i>=carta.length){

    
    clearInterval(intervalo);

    texto.innerHTML += `

<strong>Con mucho amor y cariño,<br>Gena ❤️</strong>
`;

    lanzarCorazones();


    setTimeout(()=>{

        const mensaje=document.getElementById("mensajeFinal");

        mensaje.classList.add("mensajeFinalAparece");

        setTimeout(()=>{

            texto.classList.add("cartaOculta");

            setTimeout(()=>{

                texto.style.display="none";

                mensaje.style.display="none";

                document.getElementById("botonesFinales").style.display="flex";

            },900);

        },1400);

    },6500);

}

        },60);

    },600);

}
document.getElementById("btnSiguiente").onclick=()=>{

    document.getElementById("fotoFinal").classList.add("ocultarFinal");

    document.querySelector("#pantalla7 h2").classList.add("ocultarFinal");

    document.querySelector("#pantalla7 p").classList.add("ocultarFinal");

    document.getElementById("btnSiguiente").classList.add("ocultarFinal");

    setTimeout(()=>{

        pasos[7].classList.add("activo");

        pantalla7.classList.remove("activa");

        pantalla8.classList.add("activa");

    },900);

}

function lluviaCorazones(){

    const duracion = 2500;

    const fin = Date.now() + duracion;

    const intervalo = setInterval(()=>{

        confetti({

            particleCount:3,

            angle:60,

            spread:60,

            origin:{x:0},

            shapes:["heart"],

            scalar:1.2,

            colors:["#ff4f91","#ff7fb4","#ffb6d9"]

        });

        confetti({

            particleCount:3,

            angle:120,

            spread:60,

            origin:{x:1},

            shapes:["heart"],

            scalar:1.2,

            colors:["#ff4f91","#ff7fb4","#ffb6d9"]

        });

        if(Date.now()>fin){

            clearInterval(intervalo);

        }

    },180);

}
function lanzarCorazones(){

    confetti({

        particleCount:35,

        spread:70,

        startVelocity:18,

        scalar:1.2,

        shapes:["heart"],

        origin:{y:0.2}

    });

}
document.getElementById("btnLeer").onclick = ()=>{

    const texto = document.getElementById("textoCarta");

    const mensaje = document.getElementById("mensajeFinal");

    document.getElementById("botonesFinales").style.display = "none";

    mensaje.classList.remove("mensajeFinalAparece");
    mensaje.style.display = "none";

    texto.style.display = "block";
    texto.className = "";

    escribirCarta();

}
document.getElementById("btnReiniciar").onclick=()=>{

    location.reload();

}
function reproducirClick(){

    clickSound.currentTime = 0;
    clickSound.play();

}

function reproducirCorrecto(){

    correctoSound.currentTime = 0;
    correctoSound.play();

}

function reproducirError(){

    errorSound.currentTime = 0;
    errorSound.play();

}

function reproducirVictoria(){

    victoriaSound.currentTime = 0;
    victoriaSound.play();

}
document.querySelectorAll("button").forEach(boton=>{

    boton.addEventListener("click",reproducirClick);

});