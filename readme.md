Create Hugginface 🤗 speech dataset from YouTube links.

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