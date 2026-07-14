# GitHub Repository Setup Guide

## 📚 Create GitHub Repository

Follow these steps to upload your FAQ Chatbot to GitHub:

### Step 1: Create a New Repository on GitHub

1. Go to https://github.com/new
2. Enter repository name: `faq-chatbot`
3. Add description: `AI-powered FAQ Chatbot with NLP and similarity matching for intelligent question answering`
4. Choose: **Public** (to allow others to see it)
5. Initialize with:
   - ✅ Add a README.md (will be replaced)
   - ✅ Add .gitignore (select Python)
6. Click **Create repository**

### Step 2: Clone and Setup Locally

```bash
# Navigate to where you want the project
cd your-projects-directory

# Clone the repository
git clone https://github.com/YOUR-USERNAME/faq-chatbot.git

# Navigate into the project
cd faq-chatbot

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download NLTK data
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"
```

### Step 3: Start the Application

```bash
# Navigate to app directory
cd app

# Run Flask server
python main.py
```

Open http://localhost:5000 in your browser 🎉

### Step 4: Push to GitHub

```bash
# Stage all changes
git add .

# Create commit
git commit -m "Initial commit: Add complete FAQ Chatbot with NLP and Flask UI"

# Push to GitHub
git push origin main
```

## 📦 Project Files

```
faq-chatbot/
├── app/
│   ├── main.py                 # Flask backend
│   ├── chatbot.py              # Main chatbot logic
│   ├── nlp_processor.py        # NLP preprocessing
│   ├── similarity_matcher.py   # Similarity engine
│   ├── templates/
│   │   └── index.html          # Web UI
│   └── static/
│       ├── style.css           # UI styles
│       └── script.js           # Frontend logic
├── data/
│   └── faqs.json               # FAQ database
├── requirements.txt            # Python dependencies
├── README.md                   # Documentation
├── setup.sh                    # Linux/Mac setup
├── setup.bat                   # Windows setup
└── .gitignore                  # Git ignore rules
```

## 🚀 Features Implemented

✅ **NLP Processing** - Text preprocessing with NLTK
✅ **Similarity Matching** - TF-IDF + Cosine similarity
✅ **Flask API** - RESTful backend endpoints
✅ **Web UI** - Beautiful responsive chat interface
✅ **FAQ Management** - Load and display FAQs
✅ **Confidence Scores** - Show matching confidence
✅ **Mobile Responsive** - Works on all devices

## 🔗 Add to GitHub Pages (Optional)

To create a project website:

1. Go to your repository settings
2. Scroll to "GitHub Pages"
3. Select "main branch" as source
4. Your site will be published at: `https://your-username.github.io/faq-chatbot`

## 📖 Documentation

The complete documentation is available in [README.md](README.md)

## 🤝 Sharing Your Project

### Share with Others:
```
GitHub Link: https://github.com/YOUR-USERNAME/faq-chatbot
Live Demo: http://localhost:5000 (when running locally)
```

### Add Badges to README:

```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-2.3+-red.svg)](https://flask.palletsprojects.com/)
```

## 🎯 Next Steps

1. ✅ Customize FAQs in `data/faqs.json`
2. ✅ Modify UI theme in `app/static/style.css`
3. ✅ Add your own branding
4. ✅ Deploy to production (Heroku, AWS, etc.)
5. ✅ Share with your team

## 📞 Support

For questions or issues:
- Check [README.md](README.md) for detailed documentation
- Review code comments for implementation details
- Check GitHub Issues for common problems

---

**Now you're ready to share your FAQ Chatbot on GitHub! 🎉**
