"""
Flask Application - FAQ Chatbot API and Web Interface
"""

from flask import Flask, render_template, request, jsonify, session
import os
import json
from datetime import datetime
from chatbot import FAQChatbot

app = Flask(__name__)
app.secret_key = 'faq-chatbot-secret-key-2024'

# Get the directory of the current file
current_dir = os.path.dirname(os.path.abspath(__file__))
faq_path = os.path.join(current_dir, '..', 'data', 'faqs.json')

# Initialize chatbot
try:
    chatbot = FAQChatbot(faq_path)
    print("✓ Chatbot initialized successfully")
except Exception as e:
    print(f"✗ Error initializing chatbot: {e}")
    chatbot = None


@app.route('/')
def index():
    """Serve the main chat interface"""
    return render_template('index.html')


@app.route('/api/chat', methods=['POST'])
def chat():
    """API endpoint for chatbot responses"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Empty message'}), 400
        
        if not chatbot:
            return jsonify({'error': 'Chatbot not initialized'}), 500
        
        # Get response from chatbot
        response = chatbot.get_response(user_message, threshold=0.15)
        
        # Add timestamp
        response['timestamp'] = datetime.now().isoformat()
        
        return jsonify(response)
    
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/suggestions', methods=['POST'])
def suggestions():
    """API endpoint for multiple FAQ suggestions"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Empty message'}), 400
        
        if not chatbot:
            return jsonify({'error': 'Chatbot not initialized'}), 500
        
        # Get suggestions
        result = chatbot.get_multiple_suggestions(user_message, top_n=3, threshold=0.1)
        result['timestamp'] = datetime.now().isoformat()
        
        return jsonify(result)
    
    except Exception as e:
        print(f"Error in suggestions endpoint: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/faqs', methods=['GET'])
def get_faqs():
    """Get all FAQs"""
    try:
        with open(faq_path, 'r', encoding='utf-8') as f:
            faqs = json.load(f)
        return jsonify(faqs['faqs'])
    
    except Exception as e:
        print(f"Error retrieving FAQs: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'chatbot_initialized': chatbot is not None,
        'timestamp': datetime.now().isoformat()
    })


if __name__ == '__main__':
    print("\n" + "="*60)
    print("FAQ CHATBOT - FLASK APPLICATION")
    print("="*60)
    print(f"✓ FAQ file loaded from: {faq_path}")
    print("\nStarting Flask server...")
    print("Open your browser and go to: http://localhost:5000")
    print("="*60 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
