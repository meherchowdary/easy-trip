# trip_chat_assistant.py

import torch
import torch.nn as nn
from transformers import BertTokenizer, BertModel
from sklearn.preprocessing import LabelEncoder
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import numpy as np
import json
from sklearn.model_selection import train_test_split

# 1. Load and Prepare Dataset
with open("trip_chat_data.json", "r") as f:
    data = json.load(f)

texts = []
labels = []

for item in data["intents"]:
    for pattern in item["patterns"]:
        texts.append(pattern)
        labels.append(item["tag"])

# 2. Encode Labels
label_encoder = LabelEncoder()
encoded_labels = label_encoder.fit_transform(labels)
num_classes = len(label_encoder.classes_)

# 3. Tokenizer
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# 4. Dataset Class
class TripChatDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len=32):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        tokens = self.tokenizer(
            self.texts[idx],
            truncation=True,
            padding="max_length",
            max_length=self.max_len,
            return_tensors="pt"
        )
        input_ids = tokens["input_ids"].squeeze()
        attention_mask = tokens["attention_mask"].squeeze()
        label = torch.tensor(self.labels[idx])
        return input_ids, attention_mask, label

# 5. Split data and create loaders
X_train, X_test, y_train, y_test = train_test_split(texts, encoded_labels, test_size=0.2, random_state=42)
train_dataset = TripChatDataset(X_train, y_train, tokenizer)
test_dataset = TripChatDataset(X_test, y_test, tokenizer)
train_loader = DataLoader(train_dataset, batch_size=8, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=8)

# 6. Define BERT Classifier Model
class BERTClassifier(nn.Module):
    def __init__(self, num_classes):
        super(BERTClassifier, self).__init__()
        self.bert = BertModel.from_pretrained("bert-base-uncased")
        self.drop = nn.Dropout(0.3)
        self.fc = nn.Linear(self.bert.config.hidden_size, num_classes)

    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        pooled_output = outputs[1]
        return self.fc(self.drop(pooled_output))

# 7. Training
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = BERTClassifier(num_classes).to(device)
optimizer = torch.optim.Adam(model.parameters(), lr=2e-5)
criterion = nn.CrossEntropyLoss()

for epoch in range(4):
    model.train()
    total_loss = 0
    for input_ids, attention_mask, labels in train_loader:
        input_ids, attention_mask, labels = input_ids.to(device), attention_mask.to(device), labels.to(device)
        outputs = model(input_ids, attention_mask)
        loss = criterion(outputs, labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    print(f"Epoch {epoch + 1} | Loss: {total_loss / len(train_loader):.4f}")

# 8. Prediction Function
def predict_intent(sentence):
    model.eval()
    tokens = tokenizer(sentence, return_tensors="pt", padding="max_length", truncation=True, max_length=32)
    input_ids = tokens["input_ids"].to(device)
    attention_mask = tokens["attention_mask"].to(device)
    with torch.no_grad():
        output = model(input_ids, attention_mask)
        pred = torch.argmax(output, dim=1).cpu().numpy()
    return label_encoder.inverse_transform(pred)[0]
