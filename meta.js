import fg from 'fast-glob';
import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url';
import shuffle from 'lodash/shuffle.js';

export default async function () {

  const sentenceMap = new Map()

  for await (const sentencePath of fg.stream("./dataset/sentences/*.txt")) {
    const sentence = await fs.readFile(sentencePath, 'utf-8');
    const key = path.parse(sentencePath).name
    if (typeof sentence === 'string' && sentence.length > 0) {
      sentenceMap.set(key, sentence);
    }
  }

  console.log("Sentence Size:", sentenceMap.size);

  let csv = [];
  for await (const audioPath of fg.stream("./dataset/data/*.wav")) {
    const key = path.parse(audioPath).name
    if (!sentenceMap.has(key)) {
      console.log('Deleted: ', audioPath)
      await fs.unlink(audioPath);
      continue;
    }
    const sentence = sentenceMap.get(key);
    const audioRelativePath = path.relative(fileURLToPath(new URL("./dataset", import.meta.url)), audioPath)
    const s = sentence.replace(/\,/gm, '')
    csv.push(`${JSON.stringify(audioRelativePath)},${JSON.stringify(s)}`);
  }

  csv = shuffle(csv);
  csv.unshift('file_name,transcription')

  await fs.writeFile(path.join("dataset", "metadata.csv"), csv.join("\n"), 'utf-8');

}