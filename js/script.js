import './byeie'; // loučíme se s IE

const rendruj = (data) => {
  const unikatniIC = [...new Set(data.map(x => x.ic))];
  // unikatniIC.forEach((ic) => {
  //   console.log(data.filter(zaznam => ic === zaznam.ic));
  // });
  console.log(data);
  Highcharts.stockChart('graf', {
    chart: {
      alignTicks: false,
    },
    rangeSelector: {
      selected: 1,
    },
    title: {
      text: 'AAPL Stock Volume',
    },
    series: [{
      turboThreshold: 4000,
      type: 'column',
      name: 'AAPL Stock Volume',
      data: data,
      dataGrouping: {
        units: [[
          'week', // unit name
          [1]], [
          'month',
          [1, 2, 3, 4, 6]]],
      },
    }],
  });
};

fetch('https://data.irozhlas.cz/vratky-jizdne/js/data/data.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error getting the stuff');
    }
    return response;
  })
  .then(result => result.json())
  .then((data) => {
    rendruj(data);
  })
  .catch(err => console.log(err));
