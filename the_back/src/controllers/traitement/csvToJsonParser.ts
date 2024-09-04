import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

interface CsvParserResult {
  headers: string[];
  data: any[][];
}

function csvToJsonParser(
  filePath: string,
  separator = ',',
): Promise<CsvParserResult> {
  return new Promise((resolve, reject) => {
    const results: any[][] = [];
    let headers: string[] = [];
    let lineNumber = 0;

    createReadStream(filePath)
      .pipe(parse({ delimiter: separator, from_line: 1 }))
      .on('data', (row: string[]) => {
        lineNumber++;
        if (lineNumber === 1) {
          headers = row;
        } else {
          results.push([lineNumber, ...row]);
        }
      })
      .on('end', () => {
        resolve({ headers: ['ligne', ...headers], data: results });
      })
      .on('error', (error: Error) => {
        reject(error);
      });
  });
}

export default csvToJsonParser;
