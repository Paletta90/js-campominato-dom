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

        // Mando in stampa tutti i box al click
        for (let i = 0; i < numCelle; i++) {

            // Creo elemento <div>
            let boxN = document.createElement("div");
            // Aggiungo classe "box"
            boxN.classList.add("box");
            // Numero tutti i box
            boxN.innerText = `${array[i]}`;
            // Appendo il nuovo box
            grid.appendChild(boxN);

            // Al click si colora di azzurro o rossa se è una bomba
            boxN.addEventListener('click',

                function () {

                    if (arrayBombe.includes(parseInt(this.innerText))) {
                        boxN.classList.add('bomb');
                    } else {
                        boxN.classList.add('click');
                    }

                }

            );

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

//Funzione che determina il comportamento di un click su un Box