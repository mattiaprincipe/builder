// VARIABILI
let container = document.querySelector('.container-schemi');
let schema = document.querySelector('.schema');
const schemaVuoto = schema.innerHTML;
let card = document.querySelector('.card');

//FUNZIONI
function nuovoSchema(){
    let nuovo = document.createElement('div');
    nuovo.innerHTML = schemaVuoto;
    nuovo.classList.add('schema');
    container.append(nuovo);
    aggiornaSchemi();
}
//Elimina schemi
function eliminaSchema(event){
    //apertura overlay
    document.body.style.overflow = 'hidden';
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.append(overlay);
    //Creazione Dialog
    let dialog = document.createElement('div');
    dialog.classList.add('dialog');
    dialog.innerHTML = `
    <div class="titolo">
        <div class="linea"></div>
        <div class="titolo-testo">Elimina Schema</div>
        <div class="linea"></div>
    </div>
    <p>Cliccando su elimina i dati inseriti verranno persi.</p>
    <div class="dialog-controlli">
        <button id="dialog-elimina" class="dialog-elimina">ELIMINA</button>
        <button id="dialog-annulla" class="aggiungi-esercizio">ANNULLA</button>
    </div>`
    overlay.append(dialog);

    let scelta;
    let dialogElimina = dialog.querySelector('#dialog-elimina');
    let dialogAnnulla = dialog.querySelector('#dialog-annulla');

    dialogAnnulla.addEventListener('click', ()=>{
        scelta = false;
        if(scelta === false){
            aggiornaSchemi();
            overlay.remove();
            document.body.style.overflow = '';
        }
    })
    dialogElimina.addEventListener('click', ()=>{
        scelta = true;
        if(scelta){
            event.target.parentElement.parentElement.remove();
            aggiornaSchemi();
            overlay.remove();
            document.body.style.overflow = '';
        }
    })
}
//Aggiorna titolo schemi
aggiornaSchemi();
function aggiornaSchemi(){
    let listaSchemi = container.querySelectorAll('.schema-titolo');

    for (let i = 0; i < listaSchemi.length ; i++){
        let titoloSchema = listaSchemi[i].querySelector('.schema-titolo-sfera');
        switch(i){
            case 0:
                    titoloSchema.innerHTML = 'A';
                    break;
                case 1:
                    titoloSchema.innerHTML = 'B';
                    break;
                case 2:
                    titoloSchema.innerHTML = 'C';
                    break;
                case 3:
                    titoloSchema.innerHTML = 'D';
                    break;
                
                case 4:
                    titoloSchema.innerHTML = 'E';
                    break;
                
                case 5:
                    titoloSchema.innerHTML = 'F';
                    break;
                case 6:
                    titoloSchema.innerHTML = 'Fabio';
                    break;
        }
        let dragGroup1 = document.querySelectorAll(".schema-lista");
        for (let i = 0 ; i < dragGroup1.length ; i++){
            new Sortable(dragGroup1[i], {
                handle: '.card',
                animation: 200
    });
        }
    }

}
//Elimina singolo esercizio
function eliminaEsercizio(event){
    //apertura overlay
    document.body.style.overflow = 'hidden';
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.append(overlay);
    //Creazione Dialog
    let dialog = document.createElement('div');
    dialog.classList.add('dialog');
    dialog.innerHTML = `
    <div class="titolo">
        <div class="linea"></div>
        <div class="titolo-testo">Elimina Esercizio</div>
        <div class="linea"></div>
    </div>
    <p>Cliccando su elimina i dati inseriti verranno persi.</p>
    <div class="dialog-controlli">
        <button id="dialog-elimina" class="dialog-elimina">ELIMINA</button>
        <button id="dialog-annulla" class="aggiungi-esercizio">ANNULLA</button>
    </div>`
    overlay.append(dialog);

    let scelta;
    let dialogElimina = dialog.querySelector('#dialog-elimina');
    let dialogAnnulla = dialog.querySelector('#dialog-annulla');

    dialogAnnulla.addEventListener('click', ()=>{
        scelta = false;
        if(scelta === false){
            aggiornaSchemi();
            overlay.remove();
            document.body.style.overflow = '';
        }
    })
    dialogElimina.addEventListener('click', ()=>{
        scelta = true;
        if(scelta){
            event.target.parentElement.parentElement.remove();
            overlay.remove();
            document.body.style.overflow = '';
            aggiornaSchemi();
        }
    })
}

//Aggiungi esercizio 
function aggiungiEsercizio(event){
    
    //selezionare lo schema corrente
    let schemaSelezionato = event.target.parentElement.parentElement;
    let listaSchemaSelezionato = schemaSelezionato.querySelector('.schema-lista');
    //creazione nuova card esercizio
    let nuovoEsercizio = document.createElement('div');
    nuovoEsercizio.innerHTML = card.innerHTML;
    nuovoEsercizio.classList.add('card');
    //apertura overlay
    document.body.style.overflow = 'hidden';
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.append(overlay);
    //apertura menù
    let popupMenu = document.createElement('div');
    let popupTemplate = document.querySelector('.popup-container');
    popupMenu.innerHTML = popupTemplate.innerHTML;
    popupMenu.classList.add('popup-container');
    overlay.append(popupMenu);
    
    //oggetto con selezione esercizio attuale
    let selezione = {titolo: '',serie1: '',serie2: '',serie3: '',serie4: '',ripetizione1: '',ripetizione2: '',ripetizione3: '',ripetizione4: '',riposo1: '',riposo2: '',riposo3: '',riposo4: '',};
    //selezione bottoni
    let salva = popupMenu.querySelector('.salva');
    let annulla = popupMenu.querySelector('.annulla');
    //Handler per chiudere menu
    annulla.addEventListener('click', ()=>{
        overlay.remove();
        document.body.style.overflow = '';
    })
    //handler per salvare l'esercizio
    salva.addEventListener('click', ()=>{

        /*---- TITOLO ----*/

        //Selezione dal popup
        let esercizioSelezione = popupMenu.querySelector('#lista-esercizi').value;
        //selezione dell'elemento nella card
        let titoloNuovoEsercizio = nuovoEsercizio.querySelector('h4');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.titolo = esercizioSelezione.toUpperCase();
        //inserimento valore html prima dell append
        titoloNuovoEsercizio.innerHTML = `${selezione.titolo}`;

        /*-------- SERIE --------*/

        /*---- SERIE 1 ----*/

        //Selezione dal popup
        let serie1Selezione = popupMenu.querySelector('.serie1').value;
        //selezione dell'elemento nella card
        let serie1NuovoEsercizio = nuovoEsercizio.querySelector('.serie1');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.serie1 = serie1Selezione;
        //inserimento valore html prima dell append
        serie1NuovoEsercizio.innerHTML = `${selezione.serie1}`;
        
        /*---- SERIE 2 ----*/

        //Selezione dal popup
        let serie2Selezione = popupMenu.querySelector('.serie2').value;
        //selezione dell'elemento nella card
        let serie2NuovoEsercizio = nuovoEsercizio.querySelector('.serie2');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.serie2 = serie2Selezione;
        //inserimento valore html prima dell append
        serie2NuovoEsercizio.innerHTML = `${selezione.serie2}`;
        
        /*---- SERIE 3 ----*/

        //Selezione dal popup
        let serie3Selezione = popupMenu.querySelector('.serie3').value;
        //selezione dell'elemento nella card
        let serie3NuovoEsercizio = nuovoEsercizio.querySelector('.serie3');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.serie3 = serie3Selezione;
        //inserimento valore html prima dell append
        serie3NuovoEsercizio.innerHTML = `${selezione.serie3}`;

        /*---- SERIE 4 ----*/

        //Selezione dal popup
        let serie4Selezione = popupMenu.querySelector('.serie4').value;
        //selezione dell'elemento nella card
        let serie4NuovoEsercizio = nuovoEsercizio.querySelector('.serie4');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.serie4 = serie4Selezione;
        //inserimento valore html prima dell append
        serie4NuovoEsercizio.innerHTML = `${selezione.serie4}`;


        /*-------- RIPETIZIONI --------*/

        /*---- ripetizioni 1 ----*/

        //Selezione dal popup
        let ripetizioni1Selezione = popupMenu.querySelector('.ripetizioni1').value;
        //selezione dell'elemento nella card
        let ripetizioni1NuovoEsercizio = nuovoEsercizio.querySelector('.ripetizioni1');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.ripetizione1 = ripetizioni1Selezione;
        //inserimento valore html prima dell append
        ripetizioni1NuovoEsercizio.innerHTML = `${selezione.ripetizione1}`;
        
        /*---- ripetizioni 2 ----*/

        //Selezione dal popup
        let ripetizioni2Selezione = popupMenu.querySelector('.ripetizioni2').value;
        //selezione dell'elemento nella card
        let ripetizioni2NuovoEsercizio = nuovoEsercizio.querySelector('.ripetizioni2');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.ripetizione2 = ripetizioni2Selezione;
        //inserimento valore html prima dell append
        ripetizioni2NuovoEsercizio.innerHTML = `${selezione.ripetizione2}`;
        
        /*---- ripetizioni 3 ----*/

        //Selezione dal popup
        let ripetizioni3Selezione = popupMenu.querySelector('.ripetizioni3').value;
        //selezione dell'elemento nella card
        let ripetizioni3NuovoEsercizio = nuovoEsercizio.querySelector('.ripetizioni3');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.ripetizione3 = ripetizioni3Selezione;
        //inserimento valore html prima dell append
        ripetizioni3NuovoEsercizio.innerHTML = `${selezione.ripetizione3}`;

        /*---- ripetizioni 4 ----*/

        //Selezione dal popup
        let ripetizioni4Selezione = popupMenu.querySelector('.ripetizioni4').value;
        //selezione dell'elemento nella card
        let ripetizioni4NuovoEsercizio = nuovoEsercizio.querySelector('.ripetizioni4');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.ripetizione4 = ripetizioni4Selezione;
        //inserimento valore html prima dell append
        ripetizioni4NuovoEsercizio.innerHTML = `${selezione.ripetizione4}`;

        /*-------- riposo --------*/

        /*---- riposo 1 ----*/

        //Selezione dal popup
        let riposo1Selezione = popupMenu.querySelector('.riposo1').value;
        //selezione dell'elemento nella card
        let riposo1NuovoEsercizio = nuovoEsercizio.querySelector('.riposo1');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.riposo1 = riposo1Selezione;
        //inserimento valore html prima dell append
        riposo1NuovoEsercizio.innerHTML = `${selezione.riposo1}`;
        
        /*---- riposo 2 ----*/

        //Selezione dal popup
        let riposo2Selezione = popupMenu.querySelector('.riposo2').value;
        //selezione dell'elemento nella card
        let riposo2NuovoEsercizio = nuovoEsercizio.querySelector('.riposo2');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.riposo2 = riposo2Selezione;
        //inserimento valore html prima dell append
        riposo2NuovoEsercizio.innerHTML = `${selezione.riposo2}`;
        
        /*---- riposo 3 ----*/

        //Selezione dal popup
        let riposo3Selezione = popupMenu.querySelector('.riposo3').value;
        //selezione dell'elemento nella card
        let riposo3NuovoEsercizio = nuovoEsercizio.querySelector('.riposo3');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.riposo3 = riposo3Selezione;
        //inserimento valore html prima dell append
        riposo3NuovoEsercizio.innerHTML = `${selezione.riposo3}`;

        /*---- riposo 4 ----*/

        //Selezione dal popup
        let riposo4Selezione = popupMenu.querySelector('.riposo4').value;
        //selezione dell'elemento nella card
        let riposo4NuovoEsercizio = nuovoEsercizio.querySelector('.riposo4');
        //assegnazione del valore nell'oggetto dalla selezione
        selezione.riposo4 = riposo4Selezione;
        //inserimento valore html prima dell append
        riposo4NuovoEsercizio.innerHTML = `${selezione.riposo4}`;


        // IMMAGINE PREVIEW
        let image = nuovoEsercizio.querySelector('img');

        switch(esercizioSelezione){
            case 'sit-up': 
                image.src = 'https://via.placeholder.com/150'
                break;
            case 'reverse crunch':
                image.src = 'https://via.placeholder.com/300'
                break;           
        }
        //Append della card nuova
        listaSchemaSelezionato.append(nuovoEsercizio);  
        overlay.remove(); 
        document.body.style.overflow = '';
    })
}

//LISTA ESERCIZI

let opzioni = [
    '--ADDOMINALI',
    'Sit-up',
    'Plank',
    'Reverse Crunch',
    '--PETTO',
    'Panca Piana',
    'Chest Press',
    'Croci',
    'Distensioni',
    '--Bicipite',
    'Curl',
    'Cavo Basso',
    '--Cardio',
    'Ellittica',
    'Tappeto',
    'Cyclette',
    'fabio'
]

function popolaLista(opzioni){
    opzioni.forEach(item => {
        let select = document.getElementById('lista-esercizi');
        let newoption = new Option(item,item.toLowerCase(), false,false);
        select.appendChild(newoption)
    });
}

popolaLista(opzioni);




//ANIMAZIONI 
let animationGroup = document.querySelectorAll('div');

animationGroup.forEach(item => {
    gsap.to (item, {duration:0.001, opacity:0, y:200})
    gsap.to(item, {duration: 1.5, opacity:1, y:0})
});