import { execa } from "execa";
import fs from 'node:fs/promises'
import { pino } from "pino";

const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
})

export default async function ({ srtChunk, audioFile, outputTextPath, outputAudioPath }) {
  const { startTime, endTime, text } = srtChunk;
  const args = [
    '-i',
    audioFile,
    '-acodec',
    'copy',
    '-ss',
    startTime.replace(',', '.'),
    '-to',
    endTime.replace(',', '.'),
    '-y',
    outputAudioPath
  ];
  await fs.writeFile(outputTextPath, text, 'utf-8');
  await execa('ffmpeg', args);
  logger.info(`${audioFile} -> ${outputAudioPath}`)
}