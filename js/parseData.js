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
      let kompenzace = vysledek.filter(faktura => faktura.UCELPLATBY.toUpperCase().includes('KOMPENZACE'));
      kompenzace = kompenzace.map(faktura => ({
        c: faktura.CISLOFA,
        i: faktura.ICDOD,
        d: faktura.DODAVATEL,
        u: faktura.UCELPLATBY,
        x: Number(faktura.CASTKA),
        y: new Date(faktura.DATVYST).getTime(),
      }));
      kompenzace = kompenzace.sort((a, b) => a.dat - b.dat);
      fs.writeFileSync('data/data.json', JSON.stringify(kompenzace));
    }
  });
});
