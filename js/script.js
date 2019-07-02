import './byeie'; // loučíme se s IE

const zaokrouhliDatum = (datum) => {
  if (datum.getDate() < 15) {
    return Date.UTC(datum.getFullYear(), datum.getMonth(), 1);
  }
  return Date.UTC(datum.getFullYear(), (datum.getMonth() + 1), 1) - 8.64e+7;
};

const rendruj = (data) => {
  const unikatniIC = [...new Set(data.map(x => x.ic))];
  // unikatniIC.forEach((ic) => {
  //   console.log(data.filter(zaznam => ic === zaznam.ic));
  // });
  // const dataArray =
  console.log(data);

  // eslint-disable-next-line no-undef
  Highcharts.setOptions({
    lang: {
      months: ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'],
      shortMonths: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
      decimalPoint: ',',
      numericSymbols: [' tis.', ' mil.', 'mld.', 'T', 'P', 'E'],
      rangeSelectorFrom: 'od',
      rangeSelectorTo: 'do',
      rangeSelectorZoom: 'období',
    },
  });

  // eslint-disable-next-line no-undef
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
          }, 500);
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
      text: 'Faktury jsou v grafu zařazené podle data vystavení, fakturované kompenzace se mohou vztahovat k jinému období',
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
