import * as fs from 'fs';

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
    const numericValues = values.map((value) => parseFloat(value));
    result.push(numericValues);
  }

  return result;
};

export const readCsvAsmatrix = async (fn: string) => {
  try {
    const csvFilePath = fn;
    const csvData = await readCSV(csvFilePath);
    const dataArray = parseCSV(csvData);

    console.log(dataArray);
  } catch (error) {
    console.error('Error:', error);
  }
};
