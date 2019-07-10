export const zaokrouhliDatum = (datum) => {
  if (datum.getDate() < 15) {
    return Date.UTC(datum.getFullYear(), datum.getMonth(), 1);
  }
  return Date.UTC(datum.getFullYear(), (datum.getMonth() + 1), 1) - 8.64e+7;
};

export const sectiPrachy = faktury => faktury.reduce((acc, curr) => acc + curr.y, 0);

export const sklonujFakturu = (pocet) => {
  if (pocet > 4) return 'faktur';
  if (pocet === 1) return 'faktura';
  return 'faktury';
};

const desetinnaCarka = cislo => cislo.toString().replace('.', ',');
export const formatNumber = num => desetinnaCarka(num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '));

export const zlidstiCislo = (cislo) => {
  if (cislo > 999999999) {
    if (window.innerWidth < 700) { return desetinnaCarka(`${(cislo / 1000000000).toFixed(2)} mld.`); }
    return desetinnaCarka(`${(cislo / 1000000000).toFixed(2)} miliardy`);
  } if (cislo > 999999) {
    if (window.innerWidth < 700) { return desetinnaCarka(`${(cislo / 1000000).toFixed(2)} mil.`); }
    return desetinnaCarka(`${(cislo / 1000000).toFixed(2)} milionů`);
  } if (cislo > 999) {
    if (window.innerWidth < 700) { return desetinnaCarka(`${(cislo / 1000).toFixed(2)} tis.`); }
    return desetinnaCarka(`${(cislo / 1000).toFixed(2)} tisíc`);
  } return desetinnaCarka(cislo);
};

export default sectiPrachy;
