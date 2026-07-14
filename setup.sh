#!/bin/bash
# FAQ Chatbot - Setup Script for Linux/Mac

echo "================================================"
echo "FAQ Chatbot - Automated Setup"
echo "================================================"

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+"
    exit 1
fi

echo "✓ Python found: $(python3 --version)"

# Create virtual environment
echo ""
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo ""
echo "Installing dependencies..."
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt

# Download NLTK data
echo ""
echo "Downloading NLTK data..."
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"

# Run the application
echo ""
echo "================================================"
echo "Setup complete! Starting the application..."
echo "================================================"
echo ""
echo "Open your browser and go to: http://localhost:5000"
echo ""
cd app
python main.py
