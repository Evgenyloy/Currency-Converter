
const usdElement = document.querySelector('#usd');
const eurElement = document.querySelector('#eur');
const gbpElement = document.querySelector('#gbp');
const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
let select = document.querySelector('#select');

input1.focus();
const valute = {};

const getApiData = async () => {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();

    valute.usd = data.Valute.USD.Value;
    valute.eur = data.Valute.EUR.Value;
    valute.gbp = data.Valute.GBP.Value;

    usdElement.textContent = valute.usd.toFixed(2);
    eurElement.textContent = valute.eur.toFixed(2);
    gbpElement.textContent = valute.gbp.toFixed(2);


    if (valute.usd > data.Valute.USD.Previous) {
        usdElement.classList.add('green');
    } else {
        usdElement.classList.add('red');
    }


    if (valute.eur > data.Valute.EUR.Previous) {
        eurElement.classList.add('green');
    } else {
        eurElement.classList.add('red');
    }


    if (valute.gbp > data.Valute.GBP.Previous) {
        gbpElement.classList.add('green');
    } else {
        gbpElement.classList.add('red');
    }

}

getApiData();


input1.oninput = convertValue;
select.oninput = convertValue;

function convertValue() {
    if (input1.value === '') {
        input2.value = '';
    } else {
        input2.value = (parseFloat(input1.value) / valute[select.value]).toFixed(2);
    }
}


