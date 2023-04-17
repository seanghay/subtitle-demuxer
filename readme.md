Create Huggingface 🤗 speech dataset from YouTube links.

## Prerequisites

- `ffmpeg` must be installed on your device. [Instruction](https://ffmpeg.org/download.html)
- `yt-dlp` must be installed on your device. [Instruction](https://github.com/yt-dlp/yt-dlp)

### Run

Create a file called `links.txt` with all the YouTube links

```txt
https://www.youtube.com/watch?v=ufxAg89IwAU
https://www.youtube.com/watch?v=5NoTr6jSUd0
https://www.youtube.com/watch?v=NBrTro7UV-w
https://www.youtube.com/watch?v=6yjNe41lwE8
```

```shell
node index.js
```

### Output

The output dataset looks like

```
dataset
  - data
    - [id].wav
  - sentences
    - [id].txt
  - metadata.csv
```

## Note

- Output WAV audio sample rate is 16kHz.
- `metadata.csv` values are wrapped with double qoute `"`.
