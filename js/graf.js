import Highcharts from 'highcharts/highstock';
import { zaokrouhliDatum } from './helperFunctions';

export const kresliGraf = (data, rerender) => {
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
          const minFirstDay = zaokrouhliDatum(new Date(e.min));
          const maxFirstDay = zaokrouhliDatum(new Date(e.max));
          setTimeout(() => {
            if ((e.min !== minFirstDay || e.max !== maxFirstDay) && e.trigger === 'navigator') {
              graf.xAxis[0].setExtremes(minFirstDay, maxFirstDay);
            }
            rerender();
          }, 0);
        },
      },
    },
    rangeSelector: {
      inputDateFormat: '%e. %B %Y',
      inputBoxBorderColor: '#FFFFFF',
      buttonTheme: {
        width: '100px',
      },
      buttonSpacing: 12,
      buttons: [{
        type: 'day',
        count: 29,
        text: 'měsíc',
      }, {
        type: 'ytd',
        text: 'letos',
      }, {
        type: 'day',
        count: 241,
        text: 'od září',
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
      text: 'Jednotlivé faktury jsou v grafu zařazené podle data vystavení',
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
        forced: true,
        units: [['month', [1]]],
        dateTimeLabelFormats: {
          millisecond: [
            '%A, %b %e, %H:%M:%S.%L', '%A, %b %e, %H:%M:%S.%L', '-%H:%M:%S.%L',
          ],
          second: ['%A, %b %e, %H:%M:%S', '%A, %b %e, %H:%M:%S', '-%H:%M:%S'],
          minute: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
          hour: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
          day: ['%A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
          week: ['Week from %A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
          month: ['%b %Y', '%b', '-%b %Y'],
          year: ['%Y', '%Y', '-%Y'],
        },
      },
    }],
    tooltip: {
      valueDecimals: 0,
      valueSuffix: ' Kč',
      split: false,
      dateTimeLabelFormats: {
        month: '%b %Y',
      },
    },
    navigator: {
      series: {
        type: 'column',
        dataGrouping: {
          forced: true,
          units: [['month', [1]]],
        },
      },
    },
  });
};

export default kresliGraf;
