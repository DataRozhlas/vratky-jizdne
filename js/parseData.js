const fs = require('fs');
const d3 = require('d3');
const roky = [2015,2016,2017,2018,2019];
let vysledek = [];
let itemsProcessed = 0;

const parseData = (rok, callback) => {
    fs.readFileSync('data/faktury_md_' + rok + '.csv', (err, data) => {
        callback(d3.csvParse(data.toString('utf-8')));        
     });
}

roky.forEach((rok, index, array) => {
  parseData(rok, (data) => {
    vysledek = vysledek.concat(data);
    itemsProcessed ++;
    if (itemsProcessed === array.length) {
        let kompenzace = vysledek.filter(faktura => {
            return faktura.UCELPLATBY.toUpperCase().includes('KOMPENZACE');
        });
        kompenzace = kompenzace.map(faktura => {
            return {
                c : faktura.CISLOFA,
                ic: faktura.ICDOD,
                dod: faktura.DODAVATEL,
                u: faktura.UCELPLATBY,
                kc: faktura.CASTKA,
                dat: new Date(faktura.DATVYST),
            }
        });
        kompenzace = kompenzace.sort((a, b) => {
            return a.dat - b.dat;
        });
        fs.writeFileSync('data/data.json', JSON.stringify(kompenzace));
    }
  });    
});