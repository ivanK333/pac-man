import * as fs from 'fs';
import path from 'path';

const filename = (num: string) => {
  if (num.length === 1) {
    return `PacMan levels - Level_00${num}.csv`;
  } else if (num.length === 2) {
    return `PacMan levels - Level_0${num}.csv`;
  } else {
    return `PacMan levels - Level_${num}.csv`;
  }
};
const readCSV = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const parseCSV = (csvData: string): number[][] => {
  const rows = csvData.split('\n');
  const result: number[][] = [];

  for (const row of rows) {
    const values = row.trim().split(',');
    const numericValues = values.map((value) => parseFloat(value) || 0); // Use 0 instead of null
    result.push(numericValues);
  }

  return result;
};

export const readCsvAsmatrix = async (level: string) => {
  const fn = filename(level);
  const absolutePath = path.resolve(__dirname, fn);
  try {
    const csvData = await readCSV(absolutePath);
    const dataArray = parseCSV(csvData);

    console.log(dataArray);
    return dataArray;
  } catch (error) {
    console.error('Error:', error);
    return { error };
  }
};
