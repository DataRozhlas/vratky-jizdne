const https = require('https');
const fs = require('fs');

const roky = [2015,2016,2017,2018,2019];

roky.forEach((rok) => {
  const fileURL = `https://www.mdcr.cz/MDCR/media/otevrenadata/faktury/${rok}/faktury_md_${rok}.csv`;
  const file = fs.createWriteStream(`data/faktury_md_${rok}.csv`);
  https.get(fileURL, response => response.pipe(file));
  console.log(fileURL);
});