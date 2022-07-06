const fs = require('fs');
const { resolve } = require('path');

const current = resolve(__dirname);

const rename = (p) => {
  const root = fs.readdirSync(p);
  root.map((item) => {
    if (fs.statSync(resolve(p, item)).isFile()) {
      if (item.split('.')[1] === 'tsx' && /redux/.test(p)) {
        console.log(p + '/' + item);
        fs.renameSync(p + '/' + item, p + '/' + item.split('.')[0] + '.ts');
      }
    } else {
      rename(resolve(p, item));
    }
  });
};
rename(current);
