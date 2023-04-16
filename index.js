import download from './download.js'
import chunk from './chunk.js';
import meta from './meta.js';

await download({ lang: "km" });
await chunk();
await meta()