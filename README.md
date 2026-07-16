# FAQ Chatbot Application

A powerful **FAQ Chatbot** that uses NLP and machine learning to intelligently match user questions with the most relevant FAQ answers in real-time.

<<<<<<< HEAD
## 🌟 Features

✅ **Natural Language Processing** - Uses NLTK for advanced text preprocessing (tokenization, lemmatization, stopword removal)
=======
**View on GitHub**: [https://github.com/krishnaveer78/faq_chatbot_project](https://github.com/krishnaveer78/faq_chatbot_project)  
**Clone URL**: [https://github.com/krishnaveer78/faq_chatbot_project.git](https://github.com/krishnaveer78/faq_chatbot_project.git)  
**Author**: [@krishnaveer78](https://github.com/krishnaveer78)

> Note: This project uses a Flask backend and runs locally in your browser. You do not need to upload documentation or the app to GitHub in order to use it.
> 
> To view in your browser, run `python app.py` and open `http://localhost:5000`.
> 
> GitHub Pages cannot host this Flask app because it only supports static sites.
> 
> For a live public URL, deploy the app to a Python-capable host such as Render, Replit, Heroku, Railway, or Fly.io. After deployment, the host will provide a live browser link you can share with others.

## Features
>>>>>>> e5fb542 (Add GitHub Pages deployment files)

✅ **Intelligent Matching** - TF-IDF vectorization + Cosine similarity for accurate FAQ matching

<<<<<<< HEAD
✅ **Beautiful Web UI** - Modern, responsive chat interface with gradient design

✅ **Real-time Suggestions** - Displays relevant FAQ suggestions as you type

✅ **FAQ Management** - Easily view all FAQs and click to ask questions

✅ **Confidence Scores** - Shows how confident the chatbot is about its answer

✅ **Feedback System** - Users can mark answers as helpful or not helpful

✅ **Mobile Responsive** - Works great on desktop, tablet, and mobile devices

✅ **Fast & Lightweight** - Built with Flask, minimal dependencies

## 🎯 Live Demo

**Try the chatbot online (coming soon after deployment):**
- 🌐 **Live URL:** Will be displayed here after deployment to Render.com
- 📱 **Mobile Friendly:** Works on desktop, tablet, and mobile
- ⚡ **Real-time:** Get instant FAQ answers

> **Want to test locally?** Follow the Quick Start section below!

## 📋 Project Structure
=======
## Deploying Live

This Flask app can be deployed to any Python-friendly host. GitHub Pages is not supported because it only serves static sites.

### Recommended hosts
- Render
- Heroku
- Railway
- Replit
- Fly.io

### Deployment files included
- `requirements.txt` — Python dependencies including `gunicorn`
- `Procfile` — Heroku/Render process definition
- `runtime.txt` — Python runtime version for deployment

### Example deploy commands for Heroku
```bash
git push origin main
heroku create
git push heroku main
```

### Example Render setup
- Create a new Web Service
- Set build command: `pip install -r requirements.txt`
- Set start command: `gunicorn app:app`

After deployment, the host will give you a public URL to share with others.

## Project Structure
>>>>>>> e5fb542 (Add GitHub Pages deployment files)

```
faq-chatbot/
├── app/
│   ├── __init__.py
│   ├── main.py                 # Flask application
│   ├── chatbot.py              # Main chatbot class
│   ├── nlp_processor.py        # NLP preprocessing
│   ├── similarity_matcher.py   # Similarity matching engine
│   ├── static/
│   │   ├── style.css           # UI styles
│   │   └── script.js           # Frontend logic
│   └── templates/
│       └── index.html          # Main chat interface
├── data/
│   └── faqs.json               # FAQ database
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- pip (Python package manager)

### Installation

1. **Clone or download the project:**
   ```bash
   cd faq-chatbot
   ```

2. **Create a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Download NLTK data (first time only):**
   ```bash
   python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"
   ```

5. **Run the application:**
   ```bash
   python app/main.py
   ```

6. **Open your browser:**
   ```
   https://krishnaveer78.github.io/faq-chatbot/
   ```

## 🎯 How It Works

### 1. **Text Preprocessing**
- Converts text to lowercase
- Removes special characters and URLs
- Tokenizes text into words
- Removes stopwords (common words like "the", "is", "and")
- Lemmatizes tokens (reduces words to their base form)

### 2. **Vectorization**
- Converts preprocessed text to TF-IDF vectors
- TF-IDF (Term Frequency-Inverse Document Frequency) weights words based on importance

### 3. **Similarity Matching**
- Calculates cosine similarity between user question and all FAQ questions
- Returns the FAQ with highest similarity score
- Filters out low-confidence matches using a threshold

### 4. **Response Display**
- Shows the best matching FAQ answer
- Displays matched question and confidence score
- Allows user feedback on answer quality

## 📖 API Endpoints

### `POST /api/chat`
Send a user question and get a chatbot response.

**Request:**
```json
{
  "message": "What is your return policy?"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "We offer a 30-day return policy...",
  "faq_id": 1,
  "matched_question": "What is your return policy?",
  "similarity_score": 0.95,
  "confidence": "95.0%",
  "timestamp": "2024-01-15T10:30:45.123456"
}
```

### `POST /api/suggestions`
Get multiple FAQ suggestions for a partial query.

**Request:**
```json
{
  "message": "return"
}
```

**Response:**
```json
{
  "status": "success",
  "suggestions": [
    {
      "faq_id": 1,
      "question": "What is your return policy?",
      "answer": "We offer a 30-day return policy...",
      "similarity_score": 0.92,
      "confidence": "92.0%"
    },
    ...
  ],
  "count": 3
}
```

### `GET /api/faqs`
Retrieve all FAQs.

**Response:**
```json
[
  {
    "id": 1,
    "question": "What is your return policy?",
    "answer": "We offer a 30-day return policy..."
  },
  ...
]
```

### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "chatbot_initialized": true,
  "timestamp": "2024-01-15T10:30:45.123456"
}
```

## 🛠️ Configuration

### Adding Custom FAQs

Edit `data/faqs.json` to add your own frequently asked questions:

```json
{
  "faqs": [
    {
      "id": 16,
      "question": "Your custom question?",
      "answer": "Your custom answer..."
    }
  ]
}
```

### Adjusting Similarity Threshold

In `app/main.py`, modify the threshold parameter (0-1):
- Higher threshold = stricter matching (fewer false positives)
- Lower threshold = more lenient matching (more suggestions)

```python
response = chatbot.get_response(user_message, threshold=0.15)
```

### Customizing UI

Edit `app/static/style.css` to customize colors, fonts, and layout.

## 📊 Example Questions

Try asking these questions:

- "What is your return policy?"
- "How long does shipping take?"
- "Do you offer free shipping?"
- "What payment methods do you accept?"
- "How do I track my order?"
- "Can I cancel my order?"
- "Do you have a warranty?"
- "How do I contact customer support?"

## 🔧 Troubleshooting

### NLTK Data Not Found
```bash
python -m nltk.downloader punkt stopwords wordnet
```

### Port 5000 Already in Use
Edit `app/main.py` and change the port:
```python
app.run(debug=True, host='0.0.0.0', port=5001)
```

### Import Errors
Ensure all dependencies are installed:
```bash
pip install -r requirements.txt --force-reinstall
```

## 🚀 Deployment

### Deploy to Render.com (Recommended - FREE) ⭐

**Easiest way to deploy and get a live URL!**

1. **Go to:** https://render.com
2. **Sign up** with your GitHub account
3. **Click "New +"** → **"Web Service"**
4. **Select your repository:** `krishnaveer78/faq-chatbot`
5. **Fill in these details:**
   - **Name:** `faq-chatbot`
   - **Environment:** `Python 3`
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `gunicorn app.main:app`
6. **Click "Create Web Service"**
7. **Wait 5 minutes** ✅ Your chatbot is live!

**Your live URL will be:** `https://faq-chatbot.onrender.com` (or similar)

---

### Deploy to Heroku

<<<<<<< HEAD
1. Create a `Procfile`:
   ```
   web: gunicorn app.main:app
   ```
=======
🔗 **Repository**: [github.com/krishnaveer78/faq_chatbot_project](https://github.com/krishnaveer78/faq_chatbot_project)  
🔗 **GitHub Profile**: [github.com/krishnaveer78](https://github.com/krishnaveer78)
>>>>>>> e5fb542 (Add GitHub Pages deployment files)

2. Install Gunicorn:
   ```bash
   pip install gunicorn
   ```

3. Deploy:
   ```bash
   heroku login
   heroku create your-faq-chatbot
   git push heroku main
   ```

### Deploy with Docker

Create `Dockerfile`:
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app/main.py"]
```

Build and run:
```bash
docker build -t faq-chatbot .
docker run -p 5000:5000 faq-chatbot
```

## 📝 License

This project is open source and available for educational and commercial use.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 💡 Future Enhancements

- [ ] Multi-language support
- [ ] User authentication
- [ ] Admin dashboard for FAQ management
- [ ] Analytics and usage tracking
- [ ] Integration with external APIs
- [ ] Machine learning model retraining
- [ ] Conversation context awareness
- [ ] Advanced NER (Named Entity Recognition)

## 📧 Support

For questions or issues, please create an issue in the repository.

---

**Happy Chatting! 🚀**

Made with ❤️ for better customer support
