import * as fs from 'fs';
import path from 'path';

const directoryPath = path.resolve(__dirname);

export const csvCounter = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        reject(err);
        return;
      }

      const csvFiles = files.filter((file) => path.extname(file) === '.csv');
      resolve(csvFiles.length);
    });
  });
};
