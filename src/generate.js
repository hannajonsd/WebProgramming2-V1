import { writeFile } from 'fs/promises';
import { join } from 'node:path';
import { createDirIfNotExists, readFile, readFilesFromDir } from './lib/file.js';
import { indexTemplate, leikirTemplate, stadaTemplate } from './lib/html.js';
import { parseGamedayJson, parseTeamsJson } from './lib/parse.js';
import { calculateStandings } from './lib/score.js';

// import styles from '../public/styles.css';


const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
  await createDirIfNotExists(OUTPUT_DIR);
  // await createDirIfNotExists(`${OUTPUT_DIR  }/public`)
  // await writeFile(`${OUTPUT_DIR  }/public/styles.css`, styles)
  const files = await readFilesFromDir(INPUT_DIR);

  const data = []
  let teams = [];


  for await (const file of files) {
    // console.log(file);
    if (file.indexOf('teams') > 0){
      const teamContents = await readFile(file);
      if (teamContents){
        const parsedTeams = parseTeamsJson(teamContents);
        if (parsedTeams != null){
          teams = parsedTeams;
        }
      }
      continue;
    }

    if (file.indexOf('gameday') > 0){
      const fileContents = await readFile(file);
      if (fileContents){
        const parsedGameday = parseGamedayJson(fileContents);
        if (parsedGameday != null){
          data.push(parsedGameday);
        }
      }
      continue;
    }

  }

  // console.log('teams',teams);
  // console.log('gameday',data);
  const calculatedStandings = calculateStandings(data, teams);
  // console.log('standings',calculatedStandings);

    // data er fylki af parsed gögnum sem við viljum skrifa
    // niður i html skrá sem heitir index.html
    // (og siðan í frh stada.html og leikir.html)

    const indexHtml = indexTemplate();
    const indexFilename = join(OUTPUT_DIR, 'index.html');
    await writeFile(indexFilename, indexHtml);

    const stadaHtml = stadaTemplate(calculatedStandings);
    const stadaFilename = join(OUTPUT_DIR, 'stada.html');
    await writeFile(stadaFilename, stadaHtml);

    const leikirHtml = leikirTemplate(data);
    const leikirFilename = join(OUTPUT_DIR, 'leikir.html');
    await writeFile(leikirFilename, leikirHtml);



    // dictionary af hlutum
    // parse: taka við gögnum og varpa i gagnaformat

    // 3x fyrir index, leikir, stada

}

main().catch((error) => {
  console.error('error generating', error);
});
