"""
NLP Preprocessing Module
Handles text cleaning, tokenization, and TF-IDF vectorization
"""

import re
import string
import json
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import nltk

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet')


class NLPProcessor:
    """Handle NLP preprocessing tasks"""
    
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
        self.lemmatizer = WordNetLemmatizer()
    
    def clean_text(self, text):
        """
        Clean text by removing special characters, converting to lowercase,
        and removing extra whitespace
        """
        # Convert to lowercase
        text = text.lower()
        
        # Remove URLs
        text = re.sub(r'http\S+|www\S+', '', text)
        
        # Remove email addresses
        text = re.sub(r'\S+@\S+', '', text)
        
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text
    
    def tokenize(self, text):
        """Tokenize text into words"""
        return word_tokenize(text)
    
    def remove_stopwords(self, tokens):
        """Remove stopwords from tokens"""
        return [token for token in tokens if token.lower() not in self.stop_words]
    
    def lemmatize(self, tokens):
        """Lemmatize tokens"""
        return [self.lemmatizer.lemmatize(token) for token in tokens]
    
    def preprocess(self, text):
        """
        Complete preprocessing pipeline:
        1. Clean text
        2. Tokenize
        3. Remove stopwords
        4. Lemmatize
        """
        # Clean
        cleaned = self.clean_text(text)
        
        # Tokenize
        tokens = self.tokenize(cleaned)
        
        # Remove stopwords
        tokens = self.remove_stopwords(tokens)
        
        # Lemmatize
        tokens = self.lemmatize(tokens)
        
        return tokens
    
    def preprocess_text_to_string(self, text):
        """Preprocess and return as space-separated string"""
        tokens = self.preprocess(text)
        return ' '.join(tokens)


def load_faqs(filepath):
    """Load FAQ data from JSON file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data['faqs']


def preprocess_faqs(faqs):
    """Preprocess all FAQ questions and answers"""
    processor = NLPProcessor()
    processed_faqs = []
    
    for faq in faqs:
        processed_faq = {
            'id': faq['id'],
            'original_question': faq['question'],
            'original_answer': faq['answer'],
            'processed_question': processor.preprocess_text_to_string(faq['question']),
            'processed_answer': faq['answer']
        }
        processed_faqs.append(processed_faq)
    
    return processed_faqs
