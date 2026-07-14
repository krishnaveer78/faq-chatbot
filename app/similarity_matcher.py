"""
Similarity Matching Engine
Uses TF-IDF and Cosine Similarity to find best matching FAQ
"""

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


class SimilarityMatcher:
    """Find similar FAQs using TF-IDF and Cosine Similarity"""
    
    def __init__(self, processed_faqs):
        """
        Initialize the matcher with processed FAQs
        
        Args:
            processed_faqs: List of preprocessed FAQ dictionaries
        """
        self.processed_faqs = processed_faqs
        self.vectorizer = None
        self.tfidf_matrix = None
        self.fit_vectorizer()
    
    def fit_vectorizer(self):
        """Fit TF-IDF vectorizer on FAQ questions"""
        # Extract processed questions
        questions = [faq['processed_question'] for faq in self.processed_faqs]
        
        # Fit and transform
        self.vectorizer = TfidfVectorizer(
            max_features=1000,
            min_df=1,
            max_df=0.9,
            ngram_range=(1, 2)
        )
        
        self.tfidf_matrix = self.vectorizer.fit_transform(questions)
    
    def get_similarity_scores(self, user_question):
        """
        Calculate similarity scores between user question and all FAQs
        
        Args:
            user_question: Processed user question string
            
        Returns:
            Array of similarity scores
        """
        # Vectorize user question
        user_vector = self.vectorizer.transform([user_question])
        
        # Calculate cosine similarity with all FAQs
        similarities = cosine_similarity(user_vector, self.tfidf_matrix)[0]
        
        return similarities
    
    def find_best_match(self, user_question, threshold=0.1):
        """
        Find the best matching FAQ for user question
        
        Args:
            user_question: Processed user question string
            threshold: Minimum similarity score (0-1)
            
        Returns:
            Dictionary with best match info or None if no good match
        """
        similarities = self.get_similarity_scores(user_question)
        
        # Get best match index
        best_match_idx = np.argmax(similarities)
        best_score = similarities[best_match_idx]
        
        # Check if score meets threshold
        if best_score < threshold:
            return None
        
        # Return best match
        faq = self.processed_faqs[best_match_idx]
        return {
            'faq_id': faq['id'],
            'question': faq['original_question'],
            'answer': faq['original_answer'],
            'similarity_score': float(best_score),
            'confidence': f"{best_score * 100:.1f}%"
        }
    
    def find_top_matches(self, user_question, top_n=3, threshold=0.1):
        """
        Find top N matching FAQs
        
        Args:
            user_question: Processed user question string
            top_n: Number of top matches to return
            threshold: Minimum similarity score
            
        Returns:
            List of top matching FAQs sorted by similarity
        """
        similarities = self.get_similarity_scores(user_question)
        
        # Get indices of top N matches
        top_indices = np.argsort(similarities)[-top_n:][::-1]
        
        matches = []
        for idx in top_indices:
            score = similarities[idx]
            
            if score < threshold:
                continue
            
            faq = self.processed_faqs[idx]
            matches.append({
                'faq_id': faq['id'],
                'question': faq['original_question'],
                'answer': faq['original_answer'],
                'similarity_score': float(score),
                'confidence': f"{score * 100:.1f}%"
            })
        
        return matches
