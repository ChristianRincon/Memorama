// Evitamos que el usuario pueda ingresar manualmente valores en nuestro input y lo forzamos a hacerlo por medio de los selectores de incremento y decremento que vienen por defecto en el <input type="number">

const input = document.getElementById('card-input');

input.addEventListener( 'keydown', function(e){
    if(![38, 40, 9].includes(e.keyCode)){
        e.preventDefault();
    }
});

// Se evita dicha inserción manual por parte del usuario porque el juego funciona con valores pares de cartas y hay que evitar que el usuario manualmente ingrese valores impares y vulnere el sistema.
