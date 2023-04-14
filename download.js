import fs from 'node:fs';
import { fileURLToPath } from 'node:url'
import { Piscina } from 'piscina';

export default async function ({ lang }) {

  const linkPath = fileURLToPath(
    new URL(
      "./links.txt",
      import.meta.url
    )
  );

  const linkStr = await fs.promises.readFile(linkPath, 'utf-8');
  // dedupe
  const links = [...new Set(linkStr.split("\n").filter(line => line))];

  const piscina = new Piscina({
    filename: new URL("./download.worker.js", import.meta.url).href
  })

  const promises = [];

  await fs.promises.mkdir("./files", { recursive: true })

  for (const link of links) {
    promises.push(piscina.run({ link, lang }))
  }

  await Promise.all(promises);
}