//assegno una variabile all'elemento di output selezionandolo dal DOM 
const container = document.getElementById("container");

//assegno una variabile all'endpoint
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";

//faccio la chiamata Ajax tramite Axios all'endpoint dell'API che mi restituisce i dati 
axios.get(endpoint)
    
    //gestisco la risposta ricevuta dall'API in caso di successo
    .then(response => {

        //creo la variabile che conterrà le card
        const cards = response.data;
        //console.log(cards);

        //creo variabile di accumulo per le card;
        let album = '';

        //itero con un ciclo 'for' per tutta la lunghezza dell'array di oggetti in formato JSON
        for (let i = 0; i < cards.length; i++) {

            //assegno a una varibile l'elemento I-esimo dell'array
            const card = cards[i];
            //(console.log(card));
            
            //destrutturo la variabile per ricavarne le proprietà
            const { id, url, date, title } = card;
            //console.log(card.date);

            //aggancio all'html le card popolandole con i valori ottenuti
            album += `
            <div class="card">
                <!--div immagine-->
                <div class="image">
                    <img class="picture" src="${url}" alt="${title}">
                </div>

            <div class="info">
                <!--sezione data-->
                <p class="date">${date}</p>
                <!--sezione titolo-->
                <h4 class="title picture-title">${title}</h4>
            </div>    
            
            </div>

            <div class="openPicture hide">
            <button class="btn">Chiudi</button>
            <img class="zoomPicture" src="${url}" alt="${title}">
            </div>
           `;

            //console.log(container);
            //console.log(cards);
        }

        //inserisco dinamicamente l'html delle card nel container
        container.innerHTML = album;

        
        //gestione rotazione card

        //creo la variabile che conterrà le singole card selezionando gli elementi del DOM
        const rotateCard = document.querySelectorAll(".card");

        //creo un ciclo 'forEach'
        rotateCard.forEach(card => {
            //aggiungo un evento ad ogni mouseover
            card.addEventListener("mouseover", function () {
                //aggiungo la classe 'rotate' e 'hide-pin
                card.classList.add("rotate", "hide-pin");
               
            });
            //aggiungo un evento ad ogni mouseout
            card.addEventListener("mouseout", function () {
                //rimuovo la classe 'rotate' e 'hide-pin'
                card.classList.remove("rotate", "hide-pin");
            });
        });


        //gestione click sulle immagini

        //creo la variabile che conterrà tutti gli elementi del DOM con classe 'picture' 
        const pictures = document.querySelectorAll(".picture");
        
        //ciclo 'forEach' per iterare su ogni elemento di 'pictures'
        pictures.forEach((picture, index) => {
            //aggiungo gestione dell'evento click su ogni immagine
            picture.addEventListener("click", function () {

                // seleziono l'elemento di 'openPicture' corrispondente all'immagine cliccata usando l'indice corrente
                const openPicture = document.querySelectorAll(".openPicture")[index];
                
                //gestisco la condizione per mostrare/nascondere il div con le foto singole
                if (openPicture) {
                    openPicture.classList.remove("hide");
                    openPicture.classList.add("show");
                }
            });
        });

        // gestione click bottone 'chiudi'
    
        //creo la variabile che conterrà tutti gli elementi del DOM con classe '.btn' 
        const buttons = document.querySelectorAll(".btn");

        //ciclo 'forEach' per iterare su ogni elemento di 'button'
        buttons.forEach((button, index) => {
            //aggiungo gestione dell'evento click su ogni bottone
            button.addEventListener("click", function () {

                // seleziono l'elemento di 'openPicture' corrispondente al bottone cliccato usando l'indice corrente
                const openPicture = document.querySelectorAll(".openPicture")[index];
                //gestisco la condizione per mostrare/nascondere il div con le foto singole
                if (openPicture) {
                    openPicture.classList.remove("show");
                    openPicture.classList.add("hide");
                }
            });
        });
    })  
        //gestione dell'errore
        .catch(error => {
        //da eseguire in caso di errore
        console.error(error)
    });
        
 