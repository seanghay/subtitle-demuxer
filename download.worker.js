import { execa } from 'execa'
import path from 'node:path'

export default async function ({ link }) {

  const args = [
    "--rm-cache-dir",
    "--no-part",
    "--no-playlist",
    "--extract-audio",
    "--audio-quality",
    "0",
    "--audio-format",
    "wav",
    "--postprocessor-args",
    "-ar 16000",
    "--sub-lang",
    "km",
    "--write-sub",
    "--convert-subs",
    "srt",
    "--output",
    "files/%(id)s/audio.%(ext)s",
    link,
  ]

  await execa("yt-dlp", args).pipeStdout(process.stdout);
}