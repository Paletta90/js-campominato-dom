// Variabile per il button play
let play = document.getElementById("play");
// Variabile per il button reload
let reload = document.getElementById("reload");

// Variabile per il select
let level = document.getElementById("level");

// Al click sul button play realizzo la griglia in base alla difficoltà scelta
play.addEventListener('click',

    function () {

        // Variabile contenitore della griglia
        let grid = document.getElementById("grid");

        // Variabile che definisce se il sistema a griglie è 10*10 o 9*9 o 7*7 
        let numCelle;

        // Controllo quale difficoltà è stata scelta e assegno il num di celle e le classi rispettive 
        if (parseInt(level.value) == 1) {

            // Numero di celle che si voglione generare
            numCelle = 100;
            // Assegno width / x
            document.documentElement.style.setProperty('--celle-num', 10);

        } else if (parseInt(level.value) == 2) {

            numCelle = 81;
            document.documentElement.style.setProperty('--celle-num', 9);

        } else {

            numCelle = 49;
            document.documentElement.style.setProperty('--celle-num', 7);

        }

        // Invoco la funzione che mi stampa X numeri casuali
        let array = arrayRandomNum1toX(numCelle);

        // Invoco la funzione che stampa 16 numeri casuali tra 1 e il num di celle
        let arrayBombe = arrayBomb(numCelle);

        //Contatore
        var contatore = 0;

        //Variabile per mandare in stampa il risultato finale
        let risultato = document.getElementById('risultato');
        // Variabile per mandare in stampa punteggio e risultato finale
        let punteggio = document.getElementById('punteggio');

        // Mando in stampa tutti i box al click
        for (let i = 0; i < numCelle; i++) {

            // Creo elemento <div>
            let boxN = document.createElement("div");
            // Aggiungo classe "box"
            boxN.classList.add("box");
            //Aggiungo un id
            boxN.setAttribute('id', `box${i + 1}`)
            // Numero tutti i box
            boxN.innerText = `${array[i]}`;
            // Appendo il nuovo box
            grid.appendChild(boxN);

            // Al click si colora di azzurro o rosso se è una bomba
            boxN.addEventListener('click', clickBox);
        }

        //Funzione che determina il comportamento di un click su un Box
        function clickBox() {

            //Se il box contiene una bomba allora lo faccio diventare rosso
            if (arrayBombe.includes(parseInt(this.innerText))) {

                this.classList.add('bomb');
                endGame();
                risultato.innerHTML += "Hai Perso!"

            } else {
                this.classList.add('click');
                contatore++;
                punteggio.innerHTML = `Punteggio: ${contatore}`;
                // Se trovo 5 caselle azzurre ho vinto
                if (contatore == 3) {
                    risultato.innerHTML += "Hai vinto!";
                    endGame();
                }
            }

        }

        //Funzione fine gioco
        //Funzione per rimuove tutti gli eventi al click dei box
        function endGame() {

            //Tolgo l'evento al click a tutti i box e coloro tutte le bombe
            for (let x = 0; x < numCelle; x++) {

                // Riprendo tutti i box
                let box = document.getElementById(`box${x + 1}`);

                box.removeEventListener('click', clickBox);

                // Coloro tutte le bombe di rosso
                if (arrayBombe.includes(parseInt(box.innerText))) {
                    box.classList.add('bomb');
                }
            }
        }







    }
    // L'evento al click avviene una sola volta
    , {
        once: true
    })


// Evento al click ricarica la pagina
reload.addEventListener('click', () => location.reload());



//FUNCTION

// Funzione per stampare da 1 a numCell numeri casuali
function arrayRandomNum1toX(numCelle) {
    let array = [];

    for (y = 1; y <= numCelle; y++) {
        array.push(y);
    }

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    return array = shuffle(array);
}

//Funzione che stampa 16 num casuali tra 1 e X
function arrayBomb(numCelle) {

    let arrayBombe = [];

    for (z = 0; z < 16; z++) {

        let numRandom = Math.floor((Math.random() * numCelle) + 1);

        // Se il num random è già presente con z-- faccio ripeter il ciclo un ulteriore volta
        if (arrayBombe.includes(numRandom)) {
            z--;
        } else {
            arrayBombe.push(numRandom);
        }

    }

    return arrayBombe;
}