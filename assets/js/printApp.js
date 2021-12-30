let printButton = document.getElementById('stampaPDF');
printButton.addEventListener('click', printAll);
// Stampa PDF
var element = document.querySelector('#print');
function printAll() {
    //Nascondi Bottoni
    let btnList = document.querySelectorAll('button');
    for (let i = 0; i < btnList.length; i++) {
        btnList[i].style.visibility = 'hidden';
    }

    let pageBreak = document.querySelectorAll('.schema');

    function inserisciBreak(schema){
        let breakHTML = `<br><br><br><div class="html2pdf__page-break"></div><br><br><br>`
        for(let i=0; i<pageBreak.length; i++){
            schema[i].insertAdjacentHTML('afterend', breakHTML);
            schema[i].insertAdjacentHTML('afterend', '<br>');
        }
    }

    inserisciBreak(pageBreak);
    
    let altezza = 2400;
    let larghezza = 1300;

    // Creazione PDF
    var opt = {
        margin: 0,
        imageTimeout: 10000,
        filename: prompt('Inserisci nome del file:', ''),
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'px', hotfixes: ["px_scaling"], format: [larghezza, altezza], orientation: 'portrait'}
    };
    html2pdf().set(opt).from(element).to('img').save();
    //Reset delle proprietà
    setTimeout(() => {
        //Bottoni
        for (let i = 0; i < btnList.length; i++) {
            btnList[i].style.visibility = 'visible';
        }
    }, 500);
}

