"""
FAQ Chatbot Main Module
Combines NLP processing and similarity matching
"""

from nlp_processor import NLPProcessor, load_faqs, preprocess_faqs
from similarity_matcher import SimilarityMatcher
import os


class FAQChatbot:
    """Main Chatbot class"""
    
    def __init__(self, faq_filepath):
        """
        Initialize the chatbot
        
        Args:
            faq_filepath: Path to FAQ JSON file
        """
        self.nlp_processor = NLPProcessor()
        
        # Load and preprocess FAQs
        faqs = load_faqs(faq_filepath)
        self.processed_faqs = preprocess_faqs(faqs)
        
        # Initialize similarity matcher
        self.matcher = SimilarityMatcher(self.processed_faqs)
        
        self.conversation_history = []
    
    def get_response(self, user_question, threshold=0.15):
        """
        Get chatbot response to user question
        
        Args:
            user_question: User's question string
            threshold: Minimum similarity threshold
            
        Returns:
            Dictionary with chatbot response
        """
        # Preprocess user question
        processed_question = self.nlp_processor.preprocess_text_to_string(user_question)
        
        # Find best matching FAQ
        match = self.matcher.find_best_match(processed_question, threshold=threshold)
        
        # Store in conversation history
        self.conversation_history.append({
            'user_question': user_question,
            'bot_response': match,
            'timestamp': None
        })
        
        if match is None:
            return {
                'status': 'no_match',
                'message': "I'm sorry, I couldn't find a matching answer to your question. Please try rephrasing your question or contact our support team.",
                'faq_id': None,
                'answer': None,
                'confidence': None
            }
        
        return {
            'status': 'success',
            'message': match['answer'],
            'faq_id': match['faq_id'],
            'matched_question': match['question'],
            'similarity_score': match['similarity_score'],
            'confidence': match['confidence']
        }
    
    def get_multiple_suggestions(self, user_question, top_n=3, threshold=0.1):
        """
        Get multiple FAQ suggestions for user question
        
        Args:
            user_question: User's question string
            top_n: Number of suggestions
            threshold: Minimum similarity threshold
            
        Returns:
            List of suggested answers
        """
        # Preprocess user question
        processed_question = self.nlp_processor.preprocess_text_to_string(user_question)
        
        # Find top matches
        matches = self.matcher.find_top_matches(processed_question, top_n=top_n, threshold=threshold)
        
        return {
            'status': 'success' if matches else 'no_match',
            'suggestions': matches,
            'count': len(matches)
        }
    
    def add_faq(self, question, answer):
        """
        Add a new FAQ dynamically
        
        Args:
            question: FAQ question
            answer: FAQ answer
        """
        # Generate new ID
        new_id = max([faq['id'] for faq in self.processed_faqs]) + 1
        
        # Create new FAQ
        new_faq = {
            'id': new_id,
            'question': question,
            'answer': answer
        }
        
        # Process and add
        processed_faq = {
            'id': new_id,
            'original_question': question,
            'original_answer': answer,
            'processed_question': self.nlp_processor.preprocess_text_to_string(question),
            'processed_answer': answer
        }
        
        self.processed_faqs.append(processed_faq)
        
        # Refit matcher
        self.matcher = SimilarityMatcher(self.processed_faqs)
        
        return {'status': 'success', 'id': new_id, 'message': 'FAQ added successfully'}
    
    def get_conversation_history(self):
        """Return conversation history"""
        return self.conversation_history


# Simple test
if __name__ == "__main__":
    # Get the directory of the current file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    faq_path = os.path.join(current_dir, '..', 'data', 'faqs.json')
    
    # Initialize chatbot
    chatbot = FAQChatbot(faq_path)
    
    print("=" * 60)
    print("FAQ Chatbot - Test Mode")
    print("=" * 60)
    
    # Test questions
    test_questions = [
        "What is your return policy?",
        "How long for shipping?",
        "Can I cancel my order?",
        "Do you have environmental products?",
        "random question about dinosaurs"
    ]
    
    for q in test_questions:
        print(f"\nUser: {q}")
        response = chatbot.get_response(q)
        if response['status'] == 'success':
            print(f"Bot: {response['message']}")
            print(f"Confidence: {response['confidence']}")
        else:
            print(f"Bot: {response['message']}")
