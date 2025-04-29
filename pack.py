# Trip Chat Assistant using BERT Model

from transformers import BertTokenizer, BertForQuestionAnswering
import torch

class TripChatAssistant:
    def __init__(self, model_name='bert-large-uncased-whole-word-masking-finetuned-squad'):
        self.tokenizer = BertTokenizer.from_pretrained(model_name)
        self.model = BertForQuestionAnswering.from_pretrained(model_name)
        self.context = ("Jaipur, known as the Pink City, offers attractions like Amer Fort, Hawa Mahal, and City Palace. "
                        "Udaipur, the City of Lakes, boasts places like Lake Pichola, City Palace, and Jag Mandir. "
                        "Popular hotels in Jaipur include ITC Rajputana and Rambagh Palace. In Udaipur, popular hotels include "
                        "The Oberoi Udaivilas and Taj Lake Palace.")

    def get_answer(self, question):
        inputs = self.tokenizer.encode_plus(question, self.context, add_special_tokens=True, return_tensors="pt")
        input_ids = inputs["input_ids"].tolist()[0]

        outputs = self.model(**inputs)
        answer_start_scores, answer_end_scores = outputs.start_logits, outputs.end_logits

        answer_start = torch.argmax(answer_start_scores)
        answer_end = torch.argmax(answer_end_scores) + 1

        answer = self.tokenizer.convert_tokens_to_string(
            self.tokenizer.convert_ids_to_tokens(input_ids[answer_start:answer_end])
        )
        return answer

# Packing Assistant using Decision Tree

from sklearn.tree import DecisionTreeClassifier
import pandas as pd

class PackingAssistant:
    def __init__(self):
        # Training data: [temperature, is_rainy] -> [carry umbrella, carry jacket]
        self.data = pd.DataFrame({
            'temperature': [10, 30, 20, 25, 5],
            'rain': [1, 0, 1, 0, 1],
            'carry_umbrella': [1, 0, 1, 0, 1],
            'carry_jacket': [1, 0, 1, 0, 1]
        })
        self.features = self.data[['temperature', 'rain']]
        self.labels = self.data[['carry_umbrella', 'carry_jacket']]

        self.model = DecisionTreeClassifier()
        self.model.fit(self.features, self.labels)

    def recommend_items(self, temperature, rain):
        prediction = self.model.predict([[temperature, rain]])
        return {
            'carry_umbrella': bool(prediction[0][0]),
            'carry_jacket': bool(prediction[0][1])
        }

# Example Usage
if __name__ == "__main__":
    # Trip Chat Assistant Demo
    trip_chat = TripChatAssistant()
    question = "What are the famous places in Jaipur?"
    print("Trip Chat Answer:", trip_chat.get_answer(question))

    # Packing Assistant Demo
    packing_assistant = PackingAssistant()
    recommendation = packing_assistant.recommend_items(temperature=15, rain=1)
    print("Packing Recommendations:", recommendation)
