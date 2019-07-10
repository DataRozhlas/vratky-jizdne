const fs = require('fs');
const d3 = require('d3');

const roky = [2015, 2016, 2017, 2018, 2019];
let vysledek = [];
let itemsProcessed = 0;

const parseData = (rok, callback) => {
  fs.readFile(`data/faktury_md_${rok}.csv`, (err, data) => {
    callback(d3.csvParse(data.toString('utf-8')));
  });
};

roky.forEach((rok, index, array) => {
  parseData(rok, (data) => {
    vysledek = vysledek.concat(data);
    itemsProcessed += 1;
    if (itemsProcessed === array.length) {
      const kompenzace = vysledek.filter(faktura => faktura.UCELPLATBY.toUpperCase().includes('KOMPENZACE SLEV') || faktura.UCELPLATBY.toUpperCase().includes('FDK'))
        .map(faktura => ({
          c: faktura.CISLOFA,
          i: faktura.ICDOD,
          d: faktura.DODAVATEL,
          u: faktura.UCELPLATBY,
          y: Number(faktura.CASTKA),
          x: new Date(faktura.DATVYST).getTime(),
        }))
        .sort((a, b) => a.x - b.x);
      // .filter(item => item.x < 1556661600000); // jen do konce dubna
      fs.writeFileSync('data/data.json', JSON.stringify(kompenzace));
    }
  });
});
