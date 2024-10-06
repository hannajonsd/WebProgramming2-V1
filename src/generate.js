import { writeFile } from 'fs/promises';
import { join } from 'node:path';
import {
  createDirIfNotExists,
  readFile,
  readFilesFromDir,
} from './lib/file.js';
import { indexTemplate, leikirTemplate, stadaTemplate } from './lib/html.js';
import { parseGamedayJson, parseTeamsJson } from './lib/parse.js';
import { calculateStandings } from './lib/score.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
  await createDirIfNotExists(OUTPUT_DIR);
  const files = await readFilesFromDir(INPUT_DIR);

  const data = [];
  let teams = [];

  for await (const file of files) {
    if (file.indexOf('teams') > 0) {
      const teamContents = await readFile(file);
      if (teamContents) {
        const parsedTeams = parseTeamsJson(teamContents);
        if (parsedTeams != null) {
          teams = parsedTeams;
        }
      }
      continue;
    }

    if (file.indexOf('gameday') > 0) {
      const fileContents = await readFile(file);
      if (fileContents) {
        const parsedGameday = parseGamedayJson(fileContents);
        if (parsedGameday != null) {
          data.push(parsedGameday);
        }
      }
      continue;
    }
  }

  const calculatedStandings = calculateStandings(data, teams);

  const indexHtml = indexTemplate();
  const indexFilename = join(OUTPUT_DIR, 'index.html');
  await writeFile(indexFilename, indexHtml);

  const stadaHtml = stadaTemplate(calculatedStandings);
  const stadaFilename = join(OUTPUT_DIR, 'stada.html');
  await writeFile(stadaFilename, stadaHtml);

  const leikirHtml = leikirTemplate(data, teams);
  const leikirFilename = join(OUTPUT_DIR, 'leikir.html');
  await writeFile(leikirFilename, leikirHtml);
}

main().catch((error) => {
  console.error('error generating', error);
});
