/* Função responsavel por colocar os horarios de 1 a 12 no relógio*/
function clockNums(){
    var nums = '';
    
    for (let i = 1; i <= 12; i++) {
        nums += `
<div class="number number-${i}">
    <div class="rotacao-${i}">${i}</div>
</div>`
    }

    return nums;
}

/* Função responsavel por colocar os marcadoes de segundos no relógio */
function clockMarks(){
    var nums = '';
    
    for (let i = 1; i <= 60; i++) {
        if (i % 5 === 0 )
            nums += `<div class="marcadores marcadores-${i}">&#10074;</div>`
        else
            nums += `<div class="marcadores marcadores-${i}">|</div>`
    }

    return nums;
}

/* Função responsavel por normalizar strings*/
function normalizeString(str){
    str = str.replace(' ', '').toLowerCase();
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/* Função responsavel por criar um novo relógio*/
const locais = new Array();;
function newClock(local){
    locais.push(local);

    $(document).ready(function() {
        $('.clocks').append(`
        <div class="relogio">
            <h2 class="localizacao">Horário de ${local}</h2>
            
            <div class="clock">
                <div id="test" class="hand seconds ${normalizeString(local)}"></div>
                <div class="hand minutes ${normalizeString(local)}"></div>
                <div class="hand hour ${normalizeString(local)}"></div>
    
                ${clockNums()}
    
                ${clockMarks()}
        </div>`
        );
    });    
}

const setRotation = (element, rotationPercentage) => {
    element.style.setProperty("--rotation", rotationPercentage * 360);
}

/* Manipulação do relogio de Londres e Brasília*/
function handManipulation(local, fuso = 0){
    try {
        $(document).ready(function() {
            const hourHand = document.querySelector(`.hand.hour.${normalizeString(local)}`);
            const minutesHand = document.querySelector(`.hand.minutes.${normalizeString(local)}`);
            const secondsHand = document.querySelector(`.hand.seconds.${normalizeString(local)}`);
            
            
            const setClock = () => {
                const currentDate = new Date();
            
                const secondsPercentage = currentDate.getSeconds() / 60;
                const minutesPercentage = (secondsPercentage + currentDate.getMinutes()) / 60;
                const hoursPercentage = (minutesPercentage + currentDate.getHours() + fuso) / 12;
            
                setRotation(secondsHand, secondsPercentage);
                setRotation(minutesHand, minutesPercentage);
                setRotation(hourHand, hoursPercentage);
            }
            
            
            setClock();
            
            setInterval(setClock, 1000)
        });
    } catch (error) {
        console.log(error)
    }
}

/* Criação dos relógios de Londres e Brasília*/
newClock('Brasília');
newClock('Londres');
newClock('Nova York');
newClock('Tóquio');

/* Altualizar o relógio */
setInterval(handManipulation('Brasília'), 1000);
setInterval(handManipulation('Londres', 4), 1000);
setInterval(handManipulation('Nova York', -1), 1000);
setInterval(handManipulation('Tóquio', 12), 1000);