// ========================================
// OBTENER ELEMENTOS DEL HTML
// ========================================

const contenedor = document.getElementById("contenedor");

const anterior = document.getElementById("anterior");

const siguiente = document.getElementById("siguiente");

const puntos = document.querySelectorAll(".punto");


// ========================================
// POSICIÓN ACTUAL
// ========================================

let posicion = 0;


// ========================================
// OBTENER ANCHO DE UNA TARJETA
// ========================================

function obtenerAncho() {

    const tarjeta = document.querySelector(".tarjeta");

    const estilo = window.getComputedStyle(contenedor);

    const gap = parseInt(estilo.columnGap);

    return tarjeta.offsetWidth + gap;
}


// ========================================
// ACTUALIZAR CARRUSEL
// ========================================

function actualizarCarrusel() {

    const ancho = obtenerAncho();


    contenedor.scrollTo({

        left: posicion * ancho,

        behavior: "smooth"

    });


    // Actualizar puntos

    puntos.forEach(function(punto, indice) {

        punto.classList.remove("activo");


        if (indice === posicion) {

            punto.classList.add("activo");

        }

    });

}


// ========================================
// BOTÓN SIGUIENTE
// ========================================

siguiente.addEventListener("click", function() {

    const cantidadTarjetas =
        document.querySelectorAll(".tarjeta").length;


    // Como mostramos 3 tarjetas
    // calculamos cuántos grupos existen

    const maximo =
        Math.ceil(cantidadTarjetas / 3) - 1;


    if (posicion < maximo) {

        posicion++;

    } else {

        posicion = 0;

    }


    actualizarCarrusel();

});


// ========================================
// BOTÓN ANTERIOR
// ========================================

anterior.addEventListener("click", function() {

    const cantidadTarjetas =
        document.querySelectorAll(".tarjeta").length;


    const maximo =
        Math.ceil(cantidadTarjetas / 3) - 1;


    if (posicion > 0) {

        posicion--;

    } else {

        posicion = maximo;

    }


    actualizarCarrusel();

});


// ========================================
// BOTONES DE LOS PUNTOS
// ========================================

puntos.forEach(function(punto) {

    punto.addEventListener("click", function() {

        posicion =
            Number(this.dataset.indice);


        actualizarCarrusel();

    });

});


// ========================================
// CARRUSEL AUTOMÁTICO
// ========================================

setInterval(function() {

    siguiente.click();

}, 5000);