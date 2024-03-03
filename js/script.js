const input = document.getElementById('card-input');
const btn = document.getElementById('start-button');
const cardsTitle = document.getElementById('cards-title');

btn.addEventListener('mouseenter', function() {
    this.innerHTML = '<i class="fa-solid fa-check"></i>';
});

btn.addEventListener('mouseleave', function() {
    this.textContent = 'OK';
});

btn.addEventListener ( 'click', () => {
    cardsTitle.style.display = 'none';

    const totalCards = input.value || 4;
    let cards = [];
    let selectedCards = [];
    let currentMove = 0;
    let pairsFound = 0;

    let cardTemplate = `
        <div class="card">
            <div class="back"></div>
            <div class="face"></div>
        </div>`;

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

                        if (pairsFound === totalCards / 2) { //Reinicio al encontrar todos los pares.
                            cards.forEach(card => {
                                card.querySelector('.card .face').style.backgroundColor = 'green';
                                card.querySelector('.card .face').style.transition = '3000ms';
                            });
                            setTimeout( () => {
                                window.location.reload();
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
    


