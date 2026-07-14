@echo off
REM FAQ Chatbot - Setup Script for Windows

echo.
echo ================================================
echo FAQ Chatbot - Automated Setup (Windows)
echo ================================================
echo.

REM Check Python installation
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org
    pause
    exit /b 1
)

echo Python found: 
python --version

REM Create virtual environment
echo.
echo Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo.
echo Installing dependencies...
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt

REM Download NLTK data
echo.
echo Downloading NLTK data...
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"

REM Run the application
echo.
echo ================================================
echo Setup complete! Starting the application...
echo ================================================
echo.
echo Open your browser and go to: http://localhost:5000
echo.
cd app
python main.py

pause
