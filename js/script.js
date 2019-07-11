import './byeie'; // loučíme se s IE
import 'choices.js/public/assets/styles/choices.min.css';
import Choices from 'choices.js';
import Highcharts from 'highcharts/highstock';
import { Modal } from './modal';
import { kresliGraf } from './graf';
import {
  sectiPrachy, zlidstiCislo, formatNumber, sklonujFakturu,
} from './helperFunctions';

// globalni state
let kompletniData; // nacte se pri inicializaci z fetche, pak zustava stejne
let vybranyDopravce = '0'; // meni se vybiratkem
let dataMin; // meni se posunovatkem v grafu
let dataMax; // meni se posunovatkem v grafu
let vybiratko; // pri initu se naplni vybiratkem
let modal; // pri initu se naplni modalem
let initVybiratka = true;

// interni tabulka pro vybiratko a zobrazenou tabulku
const vygenerujTabulkuDodavatelu = (vybranaData, unikatniIC) => unikatniIC
  .map((ic) => {
    const vybranaDataDodavatel = vybranaData.filter(zaznam => zaznam.i === ic);
    return {
      celkemKcDodavatel: sectiPrachy(vybranaDataDodavatel),
      nazevDodavatel: vybranaDataDodavatel[0].d,
      pocetFaktur: vybranaDataDodavatel.length,
      ic,
    };
  })
  .sort((a, b) => b.celkemKcDodavatel - a.celkemKcDodavatel);

// modalni tabulka
const vyplnTabulkuvModalu = (ic, vybranaData) => {
  const vybraneFaktury = vybranaData.filter(i => i.i === ic);

  const nazevTabulky = document.querySelector('#faktury-header');
  nazevTabulky.innerText = `Faktury dopravce ${vybraneFaktury[0].d}`;

  const tabulka = document.querySelector('#faktury > tbody');
  tabulka.innerHTML = '';

  vybraneFaktury.forEach((zaznam) => {
    const radek = document.createElement('tr');
    const datum = new Date(zaznam.x);
    radek.innerHTML = `<td>${zaznam.c}</td>
      <td>${datum.getDate()}. ${datum.getMonth() + 1}. ${datum.getFullYear()}</td>
      <td>${zaznam.u}</td>
      <td style='text-align:right;'>${formatNumber(zaznam.y)} Kč</td>`;
    tabulka.append(radek);
  });
};

// update vybiratka
const naplnVybiratko = (data) => {
  const vybiratkoChoices = data.map(dodavatel => ({
    value: dodavatel.ic,
    label: dodavatel.nazevDodavatel,
  }));

  vybiratko.setChoices([{ value: '0', label: 'Všichni', selected: initVybiratka }, ...vybiratkoChoices], 'value', 'label', true);
  initVybiratka = false;
};

// popisek pod grafem
const vypisPopisek = (data, vybranaData, pocetDopravcu) => {
  const celkemKc = sectiPrachy(vybranaData);
  let veta1 = `Ve vybraném období zaplatilo ministerstvo za slevy v osobní dopravě ${zlidstiCislo(celkemKc)} korun ${pocetDopravcu} dopravcům.`;
  if (pocetDopravcu === 1) { veta1 = `Ve vybraném období zaplatilo ministerstvo za slevy v osobní dopravě vybranému dopravci ${zlidstiCislo(celkemKc)}.`; }
  document.querySelector('#veta1').innerText = veta1;

  if (dataMax - dataMin <= 3.154e+10 && dataMin >= 1420070400000) {
    const vybrDataLoni = data.filter(i => i.x >= dataMin - 3.154e+10 && i.x <= dataMax - 3.154e+10);
    const celkemKcLoni = sectiPrachy(vybrDataLoni);
    const veta2 = `To je o ${zlidstiCislo(Math.abs(celkemKc - celkemKcLoni))} (${celkemKc > celkemKcLoni ? (celkemKc / celkemKcLoni * 100 - 100).toFixed(0) : (100 - celkemKc / celkemKcLoni * 100).toFixed(0)} %) ${celkemKc > celkemKcLoni ? 'víc' : 'míň'} než ve stejném období předchozího roku.`;
    document.querySelector('#veta2').innerText = veta2;
  } else document.querySelector('#veta2').innerText = null;
};

// tabulka pod grafem
const nakresliTabulku = (tabulkaDodavatelu, vybranaData) => {
  const tabulka = document.querySelector('#dodavatele > tbody');
  tabulka.innerHTML = '';

  tabulkaDodavatelu.forEach((zaznam) => {
    const radek = document.createElement('tr');
    radek.innerHTML = `<td>${zaznam.nazevDodavatel}</td>
    <td><a href='' id='${zaznam.ic}'> ${zaznam.pocetFaktur} ${sklonujFakturu(zaznam.pocetFaktur)}</a></td>
    <td>${zlidstiCislo(Math.round(zaznam.celkemKcDodavatel))} Kč</td>`;
    tabulka.append(radek);
  });

  const odkazy = document.querySelectorAll('#dodavatele a');
  odkazy.forEach((odkaz) => {
    odkaz.addEventListener('click', (e) => {
      e.preventDefault();
      const ic = e.srcElement.id;
      modal.show(vyplnTabulkuvModalu(ic, vybranaData));
    });
  });
};

// render - provadi se po kazde změně grafu nebo vybírátka
const rendruj = (grafRerender = false) => {
  // filtr podle vybiratka
  const data = vybranyDopravce === '0'
    ? kompletniData
    : kompletniData.filter(zaznam => zaznam.i === vybranyDopravce);

  // načtení dat z grafoslajdítka
  dataMin = Highcharts.charts.filter(el => el !== undefined)[0].rangeSelector.minInput.HCTime;
  dataMax = Highcharts.charts.filter(el => el !== undefined)[0].rangeSelector.maxInput.HCTime;

  // zpracovana data pro tabulku
  const vybranaData = data.filter(i => i.x >= dataMin && i.x <= dataMax);
  const unikatniIC = [...new Set(vybranaData.map(x => x.i))];
  const tabulkaDodavatelu = vygenerujTabulkuDodavatelu(vybranaData, unikatniIC);

  // zpracovana data pro vybiratko
  const vybiratkoData = kompletniData.filter(i => i.x >= dataMin && i.x <= dataMax);
  const vybiratkoIC = [...new Set(vybiratkoData.map(x => x.i))];
  const vybiratkoTabulka = vygenerujTabulkuDodavatelu(vybiratkoData, vybiratkoIC);

  // pokud překlik vybírátkem, rerenderuje se graf
  if (grafRerender) { kresliGraf(data, rendruj); }

  // render vybiratka, popisku pod grafem a tabulky
  vypisPopisek(data, vybranaData, unikatniIC.length);
  naplnVybiratko(vybiratkoTabulka);
  nakresliTabulku(tabulkaDodavatelu, vybranaData);
};

// init
const inicializuj = (data) => {
  // ulozeni dat
  kompletniData = data;

  // init grafu (a event listeneru v nem)
  kresliGraf(data, rendruj);

  // globalni init vybiratka a modalu
  modal = new Modal('vypisFaktur');

  const vybiratkoContainer = document.querySelector('#vybiratko');
  vybiratko = new Choices(vybiratkoContainer, {
    shouldSort: false,
    itemSelectText: 'Stisknutím vyberte',
  });

  // event listenery pro vybiratko a modal
  vybiratkoContainer.addEventListener('change', (e) => {
    vybranyDopravce = e.target.value;
    rendruj(true);
  });

  document.onkeydown = (e) => {
    let isEscape = false;
    if ('key' in e) {
      isEscape = (e.key === 'Escape' || e.key === 'Esc');
    } else {
      isEscape = (e.keyCode === 27);
    }
    if (isEscape) modal.hide();
  };

  // prvni render
  rendruj();
};

// fetch po nacteni DOMu
window.addEventListener('DOMContentLoaded', () => {
  fetch('https://data.irozhlas.cz/vratky-jizdne/js/data/data.json')
    .then(result => result.json())
    .then(data => inicializuj(data))
    .catch(err => console.log(err));
});
