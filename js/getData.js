const https = require('https');
const fs = require('fs');
const roky = [2015,2016,2017,2018,2019];

roky.forEach((rok, i) => {
  const fileURL = 'https://www.mdcr.cz/MDCR/media/otevrenadata/faktury/' + rok + '/faktury_md_' + rok + '.csv';
  const file = fs.createWriteStream('data/faktury_md_' + rok + '.csv');
  const request = https.get(fileURL, response => response.pipe(file));
  console.log(fileURL);
});