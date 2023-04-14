import { Piscina } from "piscina";
import path from 'node:path';
import fg from 'fast-glob';
import fs from 'node:fs/promises';
import srtParser2 from "srt-parser-2";

const parser = new srtParser2.default();

/**
 * 
 * @param {string} sentence 
 * @returns 
 */
function normalizeSentence(sentence) {
  return sentence
    .replace(/\n/gm, '')
    .replace(/[។"'«»\(\)]/gm, '')
    .replace(/៖/gm, '').trim()
}

export default async function () {

  const piscina = new Piscina({
    filename: new URL("./chunk.worker.js", import.meta.url).href
  })

  await fs.mkdir("./dataset/data", { recursive: true });
  await fs.mkdir("./dataset/sentences", { recursive: true });

  let csv = 'audio_path,sentence\n';

  for await (const srtFile of fg.stream("./files/**/*.srt")) {
    const { dir } = path.parse(srtFile);
    const id = path.basename(dir);

    const audioFile = path.join(dir, 'audio.wav');
    const srt = await fs.readFile(srtFile, 'utf-8');
    const srtChunks = parser.fromSrt(srt);

    for (const srtChunk of srtChunks) {
      srtChunk.text = normalizeSentence(srtChunk.text);
      const outputAudioPath = path.join("dataset", "data", `${id}-${srtChunk.id}.wav`);
      const outputTextPath = path.join("dataset", "sentences", `${id}-${srtChunk.id}.txt`);
      const relativeDirAudioPath = path.relative("./dataset", outputAudioPath);
      csv += `${JSON.stringify(relativeDirAudioPath)},${JSON.stringify(srtChunk.text)}\n`;
      piscina.run({ srtChunk, audioFile, outputAudioPath, outputTextPath })
    }
  }

  await fs.writeFile(path.join("dataset", "metadata.csv"), csv, 'utf-8');
}