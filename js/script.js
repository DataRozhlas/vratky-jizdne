import './byeie'; // loučíme se s IE

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
      months: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
      shortMonths: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
      decimalPoint: ',',
      numericSymbols: [' tis.', ' mil.', 'mld.', 'T', 'P', 'E'],
      rangeSelectorFrom: 'od',
      rangeSelectorTo: 'do',
      rangeSelectorZoom: 'období',
    },
  });

  // eslint-disable-next-line no-undef
  Highcharts.stockChart('graf', {
    chart: {
      alignTicks: false,
    },
    rangeSelector: {
      buttons: [{
        type: 'ytd',
        text: 'letos',
      }, {
        type: 'year',
        count: 1,
        text: 'celý rok',
      }, {
        type: 'all',
        text: 'všechno',
      }],
      selected: 1,
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
      turboThreshold: 4000,
      type: 'column',
      name: 'proplacené kompenzace',
      data: data,
      dataGrouping: {
        units: [[
          'month',
          [1]]],
      },
    }],
  });
};

fetch('https://data.irozhlas.cz/vratky-jizdne/js/data/data.json')
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
