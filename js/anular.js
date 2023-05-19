// Evitamos que el usuario pueda ingresar manualmente valores en nuestro input y deba hacerlo por medio de los selectores de incremento y decremento.

const input = document.getElementById('card-input');

input.addEventListener( 'keydown', function(e){
    if(![38, 40, 9].includes(e.keyCode)){
        e.preventDefault();
    }
}

)