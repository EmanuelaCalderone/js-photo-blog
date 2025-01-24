//assegno una variabile all'elemento di output selezionandolo dal DOM 
const container = document.getElementById("container");

//assegno una variabile all'endpoint
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";

//faccio la chiamata Ajax tramite Axios all'API che mi restituisce i dati 
axios.get(endpoint)
    
    //gestisco la risposta ricevuta dall'API in caso di successo
    .then(response => {

        //creo la variabile che conterrà le card
        const cards = response.data;
        //console.log(cards);

        //itero con un ciclo 'for' per tutta la lunghezza dell'array di oggetti in formato JSON
        for (let i = 0; i < cards.length; i++) {

            //assegno a una varibile l'elemento I-esimo dell'array
            const card = cards[i];
            //(console.log(card));
            
            //destrutturo la variabile per ricavarne le proprietà
            const { id, url, date, title } = card;
            //console.log(card.date);

            //aggancio all'html le card popolandole con i valori ottenuti
            container.innerHTML += `<div class="card">
            <!--div immagine-->
            <div class="image">
                <img class="picture" src="${url}" alt="${title}">
            </div>
            <!--sezione data-->
            <p class="date">${date}</p>
            <!--sezione titolo-->
            <h4 class="title picture-title">${title}</h4>
            </div>
           `;
            //console.log(container);
            //console.log(cards);
        }

        //creo la variabile che conterrà le singole card selezionando gli elementi del DOM
        const rotateCard = document.querySelectorAll(".card");
        //creo un ciclo 'forEach'
        rotateCard.forEach(card => {
            //aggiungo un evento ad ogni mouseover
            card.addEventListener("mouseover", function () {
                //aggiungo la classe 'rotate'
                card.classList.add("rotate");
            });
            //aggiungo un evento ad ogni mouseout
            card.addEventListener("mouseout", function () {
                //rimuovo la classe 'rotate'
                card.classList.remove("rotate");
            })
        })
    })
    
    //gestione dell'errore
    .catch(error => {
        //da eseguire in caso di errore
        console.error(error)
    });
        
 
