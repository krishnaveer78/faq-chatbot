# 🚀 FAQ CHATBOT - COMPLETE QUICK START GUIDE

## What You Have

A fully functional **AI-powered FAQ Chatbot** with:
- ✅ Natural Language Processing (NLTK)
- ✅ Similarity Matching (TF-IDF + Cosine Similarity)
- ✅ Beautiful Web UI (HTML/CSS/JS)
- ✅ Flask Backend API
- ✅ 15 Pre-loaded FAQs
- ✅ Real-time Suggestions
- ✅ Confidence Scores

---

## 📂 Project Location

```
C:\Users\alone\Desktop\faq-chatbot
```

---

## ⚡ Quick Start (3 Steps)

### Option 1: Windows Users (Easiest)

1. **Double-click setup script:**
   ```
   setup.bat
   ```

2. **Wait for installation to complete**

3. **Browser opens automatically** at http://localhost:5000

### Option 2: Command Line (All Platforms)

```bash
# Navigate to project
cd C:\Users\alone\Desktop\faq-chatbot

# Install dependencies
pip install -r requirements.txt

# Download NLTK data
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"

# Run the app
cd app
python main.py
```

---

## 🌐 Access the Chatbot

Once running:
- **Local:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health
- **Get All FAQs:** http://localhost:5000/api/faqs

---

## 📝 How to Use

1. **Type your question** in the input field
2. **Press Send** or hit Enter
3. **Get an instant answer** with confidence score
4. **Click FAQ Topics** on the right to browse all questions
5. **Mark as Helpful** to provide feedback

---

## 🧠 How It Works

```
User Question
     ↓
NLP Preprocessing (clean, tokenize, lemmatize)
     ↓
TF-IDF Vectorization
     ↓
Cosine Similarity Matching
     ↓
Fetch Best Matching FAQ Answer
     ↓
Display with Confidence Score
```

---

## 🔧 API Endpoints

### Send a Question
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is your return policy?"}'
```

Response:
```json
{
  "status": "success",
  "message": "We offer a 30-day return policy...",
  "faq_id": 1,
  "matched_question": "What is your return policy?",
  "similarity_score": 0.95,
  "confidence": "95.0%"
}
```

### Get Suggestions
```bash
curl -X POST http://localhost:5000/api/suggestions \
  -H "Content-Type: application/json" \
  -d '{"message": "return"}'
```

### Get All FAQs
```bash
curl http://localhost:5000/api/faqs
```

---

## 📚 Project Structure

```
faq-chatbot/
├── app/
│   ├── main.py                 # Flask application
│   ├── chatbot.py              # Chatbot logic
│   ├── nlp_processor.py        # Text processing
│   ├── similarity_matcher.py   # Matching engine
│   ├── templates/
│   │   └── index.html          # Chat UI
│   └── static/
│       ├── style.css           # Styles
│       └── script.js           # Frontend logic
├── data/
│   └── faqs.json               # FAQ database
├── requirements.txt            # Dependencies
├── README.md                   # Full documentation
├── GITHUB_SETUP.md             # GitHub guide
├── setup.bat                   # Windows setup
├── setup.sh                    # Linux/Mac setup
└── .gitignore
```

---

## 🛠️ Customization

### Add Your Own FAQs

Edit `data/faqs.json`:

```json
{
  "faqs": [
    {
      "id": 1,
      "question": "Your question?",
      "answer": "Your answer!"
    }
  ]
}
```

### Change Theme Colors

Edit `app/static/style.css`:
```css
/* Change primary color */
background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR2 100%);
```

### Adjust Sensitivity

In `app/main.py`, change threshold (0-1):
```python
response = chatbot.get_response(user_message, threshold=0.15)
# Higher = stricter, Lower = more suggestions
```

---

## 🐛 Troubleshooting

### Port 5000 Already in Use
```bash
# Use different port in app/main.py
app.run(debug=True, host='0.0.0.0', port=5001)
```

### NLTK Data Error
```bash
python -m nltk.downloader punkt stopwords wordnet
```

### Module Not Found
```bash
pip install -r requirements.txt --force-reinstall
```

---

## 📊 Test Questions

Try these to test the matching:

1. "What is your return policy?"
2. "How long does shipping take?"
3. "Do you offer free shipping?"
4. "What payment methods do you accept?"
5. "How can I contact support?"
6. "Are your products sustainable?"

---

## 🌍 Deploy to Internet

### Option 1: Heroku (Free)

```bash
# Install Heroku CLI, then:
heroku login
heroku create your-faq-chatbot
git push heroku main
```

### Option 2: AWS/Azure/Google Cloud

See full documentation in README.md

---

## 📖 Features

| Feature | Status | Details |
|---------|--------|---------|
| NLP Processing | ✅ | NLTK tokenization, lemmatization |
| Similarity Matching | ✅ | TF-IDF + Cosine Similarity |
| Web UI | ✅ | Responsive, modern design |
| Mobile Ready | ✅ | Works on all devices |
| API | ✅ | RESTful endpoints |
| FAQ Management | ✅ | Load from JSON |
| Confidence Scores | ✅ | Shows matching confidence |
| Feedback System | ✅ | Helpful/Not Helpful buttons |
| Real-time Suggestions | ✅ | As you type |

---

## 🤝 Share on GitHub

Ready to share? See **GITHUB_SETUP.md** for complete instructions.

Quick steps:
1. Create repository at https://github.com/new
2. Follow steps in GITHUB_SETUP.md
3. Push your code
4. Share the link!

Example GitHub URL:
```
https://github.com/your-username/faq-chatbot
```

---

## 📞 Support

- **Full Documentation:** See [README.md](README.md)
- **GitHub Setup:** See [GITHUB_SETUP.md](GITHUB_SETUP.md)
- **Code Comments:** Check source files for implementation details

---

## ✨ Next Steps

1. ✅ Customize FAQs for your business
2. ✅ Adjust UI theme to match your brand
3. ✅ Deploy to production
4. ✅ Share on GitHub
5. ✅ Get feedback and improve

---

## 🎉 You're All Set!

Your FAQ Chatbot is ready to use. Start it with:

```bash
cd C:\Users\alone\Desktop\faq-chatbot\app
python main.py
```

Then open: **http://localhost:5000**

Enjoy! 🚀

---

**Made with ❤️ using Python, Flask, and NLP**
