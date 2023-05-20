// Actualizaciones:
// - Se cambio el modelo de cartas estáticas por cartas dinámicas (de 4 a 30 cartas a elección del usuario)
// - Reinicio de juego al encontrar todos los pares.

//Mecanismos del menú
const input = document.getElementById('card-input');
const btn = document.getElementById('start-button');

//Ejecución de aplicación
btn.addEventListener ( 'click', () => {
    const totalCards = input.value; // Valores dinámicos (4 a 30)
    let cards = [];
    let selectedCards = [];
    let currentMove = 0;
    let pairsFound = 0;

    let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

    function activate(e) {
        if (currentMove < 2 && !e.target.classList.contains('active')) {
            e.target.classList.add('active');

            if (!selectedCards[0] || selectedCards[0] !== e.target) {
                selectedCards.push(e.target);

                if (++currentMove === 2) {
                    const face1 = selectedCards[0].querySelector('.face').innerHTML;
                    const face2 = selectedCards[1].querySelector('.face').innerHTML;

                    if (face1 === face2) {
                        pairsFound++;
                        selectedCards = [];
                        currentMove = 0;

                        if (pairsFound === totalCards / 2) { 
                            setTimeout( () => {
                                window.location.reload(); //Reinicio al encontrar todos los pares (en este caso se reinciará luego de 2000 milisegundos).
                            }, 2000);                   
                        }

                    }else {
                      setTimeout(() => {
                          selectedCards[0].classList.remove('active');
                          selectedCards[1].classList.remove('active');
                          selectedCards = [];
                          currentMove = 0;
                      }, 800);
                    }
                }
            }
        }      
    }

    function generateRandomValues() {
        let values = [];
        for (let i = 0; i < totalCards / 2; i++) {
            values.push(i);
            values.push(i);
        }
        shuffleArray(values);
        return values;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; 
        }      
    }

    let values = generateRandomValues();

    for (let i = 0; i < totalCards; i++) {
        let div = document.createElement('div');
        div.innerHTML = cardTemplate;
        cards.push(div);
        document.querySelector('#game').append(cards[i]);
        cards[i].querySelector('.face').innerHTML = values[i];
        cards[i].querySelector('.card').addEventListener('click', activate);
    }
    
    //Mecanismos del menú
    btn.remove();
    input.remove();
});
    


