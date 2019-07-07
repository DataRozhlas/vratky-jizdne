﻿import './byeie'; // loučíme se s IE

const Highcharts = require('highcharts/highstock');

const zaokrouhliDatum = (datum) => {
  if (datum.getDate() < 15) {
    return Date.UTC(datum.getFullYear(), datum.getMonth(), 1);
  }
  return Date.UTC(datum.getFullYear(), (datum.getMonth() + 1), 1) - 8.64e+7;
};

const sectiPrachy = faktury => faktury.reduce((acc, curr) => acc + curr.y, 0);

const zlidstiCislo = (cislo) => {
  if (cislo > 999999999) {
    return `${(cislo / 1000000000).toFixed(2)} miliardy`;
  } if (cislo > 999999) {
    return `${(cislo / 1000000).toFixed(2)} milionů`;
  } if (cislo > 999) {
    return `${(cislo / 1000).toFixed(2)} tisíc`;
  } return cislo;
};

const generujSoucty = (dataMin, dataMax, data) => {
  const vybranaData = data.filter(i => i.x >= dataMin && i.x <= dataMax);
  const unikatniIC = [...new Set(vybranaData.map(x => x.i))];
  const celkemKc = sectiPrachy(vybranaData);
  const veta1 = document.createElement('h3');
  veta1.setAttribute('id', 'veta1');
  veta1.textContent = `Ve vybraném období zaplatilo ministerstvo za slevy v osobní dopravě ${zlidstiCislo(celkemKc)} korun ${unikatniIC.length} dopravcům.`;
  if (document.querySelector('#veta1')) {
    document.querySelector('#veta1').remove();
    document.querySelector('#graf').parentElement.append(veta1);
  } else {
    document.querySelector('#graf').parentElement.append(veta1);
  }
  if (dataMax - dataMin <= 3.154e+10 && dataMin >= 1420070400000) {
    const vybrDataLoni = data.filter(i => i.x >= dataMin - 3.154e+10 && i.x <= dataMax - 3.154e+10);
    const celkemKcLoni = sectiPrachy(vybrDataLoni);
    const veta2 = document.createElement('p');
    veta2.setAttribute('id', 'veta2');
    veta2.textContent = `To je o ${zlidstiCislo(Math.abs(celkemKc - celkemKcLoni))} (${celkemKc > celkemKcLoni ? (celkemKc / celkemKcLoni * 100 - 100).toFixed(0) : (100 - celkemKc / celkemKcLoni * 100).toFixed(0)} %) ${celkemKc > celkemKcLoni ? 'víc' : 'míň'} než ve stejném období předchozího roku.`;
    if (document.querySelector('#veta2')) {
      document.querySelector('#veta2').remove();
      document.querySelector('#graf').parentElement.append(veta2);
    } else {
      document.querySelector('#graf').parentElement.append(veta2);
    }
  } else if (document.querySelector('#veta2')) {
    document.querySelector('#veta2').remove();
  }
  // sečti dodavatele
  let tabulkaDodavatelu = [];
  unikatniIC.forEach((ic) => {
    const vybranaDataDodavatel = vybranaData.filter(zaznam => zaznam.i === ic);
    const celkemKcDodavatel = sectiPrachy(vybranaDataDodavatel);
    const nazevDodavatel = vybranaDataDodavatel[0].d;
    const pocetFaktur = vybranaDataDodavatel.length;
    tabulkaDodavatelu.push(
      {
        celkemKcDodavatel,
        nazevDodavatel,
        pocetFaktur,
      },
    );
  });
  tabulkaDodavatelu = tabulkaDodavatelu.sort((a, b) => b.celkemKcDodavatel - a.celkemKcDodavatel);
  const tabulka = document.createElement('table');
  tabulka.setAttribute('id', 'dodavatele');
  tabulka.append(document.createElement('tbody'));
  //tabulkaDodavatelu.forEach(

  //);
  document.querySelector('#graf').parentElement.append(tabulka);
};

const rendruj = (data) => {
  Highcharts.setOptions({
    lang: {
      months: ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'],
      shortMonths: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
      decimalPoint: ',',
      numericSymbols: [' tis.', ' mil.', 'mld.', 'T', 'P', 'E'],
      rangeSelectorFrom: 'od',
      rangeSelectorTo: 'do',
      rangeSelectorZoom: 'vyberte období:',
    },
  });

  const graf = Highcharts.stockChart('graf', {
    chart: {
      alignTicks: false,
    },
    xAxis: {
      events: {
        afterSetExtremes(e) {
          let minFirstDay = new Date(e.min);
          minFirstDay = zaokrouhliDatum(minFirstDay);
          let maxFirstDay = new Date(e.max);
          maxFirstDay = zaokrouhliDatum(maxFirstDay);
          setTimeout(() => {
            if ((e.min !== minFirstDay || e.max !== maxFirstDay) && e.trigger === 'navigator') {
              graf.xAxis[0].setExtremes(minFirstDay, maxFirstDay);
            }
            generujSoucty(minFirstDay, maxFirstDay, data);
          }, 0);
        },
      },
    },
    rangeSelector: {
      inputDateFormat: '%e. %B %Y',
      inputBoxBorderColor: '#FFFFFF',
      buttons: [{
        type: 'day',
        count: 29,
        text: 'měsíc',
      }, {
        type: 'ytd',
        text: 'letos',
      }, {
        type: 'day',
        count: 364,
        text: 'rok',
      }, {
        type: 'all',
        text: 'vše',
      }],
      selected: 2,
    },
    title: {
      text: 'Kompenzace slev z jízdného ve veřejné osobní dopravě proplacené ministerstvem dopravy',
    },
    subtitle: {
      text: 'Jednotlivé faktury jsou v grafu zařazené podle data vystavení, fakturované kompenzace se mohou vztahovat k jinému období',
    },
    credits: {
      text: 'Zdroj: Uhrazené faktury – otevřená data ministerstva dopravy',
      href: 'https://www.mdcr.cz/Ministerstvo/Otevrena-data/Faktury?returl=/Ministerstvo/Otevrena-data',
    },
    series: [{
      color: '#d52834',
      turboThreshold: 4000,
      type: 'column',
      name: 'vyfakturované kompenzace',
      data,
      dataGrouping: {
        units: [['month', [1]]],
      },
    }],
    tooltip: {
      valueDecimals: 0,
      valueSuffix: ' Kč',
    },
    navigator: {
      series: {
        type: 'column',
        dataGrouping: {
          units: [['month', [1]]],
        },
      },
    },
  });
  generujSoucty(graf.rangeSelector.minInput.HCTime, graf.rangeSelector.maxInput.HCTime, data);
};

fetch('js/data/data.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error getting the data');
    }
    return response;
  })
  .then(result => result.json())
  .then((data) => {
    rendruj(data);
  })
  .catch(err => console.log(err));
