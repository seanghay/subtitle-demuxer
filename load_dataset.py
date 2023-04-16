
from datasets import load_dataset

dataset = load_dataset("./dataset", split="train")

print(dataset[0])