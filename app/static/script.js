/* ============================================
   FAQ Chatbot - JavaScript Logic
   ============================================ */

// Global variables
let conversationHistory = [];
let lastBotMessageElement = null;

// DOM Elements
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const faqList = document.getElementById('faqList');
const feedbackModal = document.getElementById('feedbackModal');
const closeBtn = document.querySelector('.close');

// ============================================
// Event Listeners
// ============================================

chatForm.addEventListener('submit', handleSendMessage);
closeBtn.addEventListener('click', closeFeedbackModal);
window.addEventListener('click', (e) => {
    if (e.target === feedbackModal) {
        closeFeedbackModal();
    }
});

userInput.addEventListener('input', showSuggestions);
userInput.addEventListener('focus', showSuggestions);

// ============================================
// Main Chat Functions
// ============================================

async function handleSendMessage(e) {
    e.preventDefault();
    
    const message = userInput.value.trim();
    if (!message) return;
    
    // Add user message to UI
    addMessageToChat(message, 'user');
    userInput.value = '';
    
    // Show typing indicator
    const typingIndicator = addTypingIndicator();
    
    try {
        // Send message to backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Process and display response
        if (data.status === 'success') {
            displayBotResponse(data);
        } else {
            addMessageToChat(data.message, 'bot');
        }
        
    } catch (error) {
        typingIndicator.remove();
        console.error('Error:', error);
        addMessageToChat('Sorry, an error occurred. Please try again.', 'bot');
    }
    
    // Clear suggestions
    document.getElementById('suggestions').innerHTML = '';
}

function addMessageToChat(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    messageDiv.appendChild(contentDiv);
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = getCurrentTime();
    messageDiv.appendChild(timeDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
}

function addTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.id = 'typing-indicator';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = '<span>●</span><span>●</span><span>●</span>';
    contentDiv.style.cssText = 'animation: typing 1.4s infinite;';
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
}

function displayBotResponse(data) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${escapeHtml(data.message)}</p>`;
    messageDiv.appendChild(contentDiv);
    
    // Add confidence badge
    if (data.confidence) {
        const confidenceDiv = document.createElement('div');
        confidenceDiv.className = 'confidence-badge';
        confidenceDiv.textContent = `Confidence: ${data.confidence}`;
        messageDiv.appendChild(confidenceDiv);
    }
    
    // Add matched question if available
    if (data.matched_question) {
        const metaDiv = document.createElement('div');
        metaDiv.className = 'message-meta';
        metaDiv.innerHTML = `<em>Matched: "${escapeHtml(data.matched_question)}"</em>`;
        messageDiv.appendChild(metaDiv);
    }
    
    // Add action buttons
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'message-actions';
    actionsDiv.innerHTML = `
        <button class="helpful-btn" onclick="markHelpful(true)">👍 Helpful</button>
        <button class="not-helpful-btn" onclick="markHelpful(false)">👎 Not Helpful</button>
    `;
    messageDiv.appendChild(actionsDiv);
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = getCurrentTime();
    messageDiv.appendChild(timeDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    lastBotMessageElement = messageDiv;
}

// ============================================
// Suggestions
// ============================================

async function showSuggestions() {
    const query = userInput.value.trim();
    
    if (query.length < 3) {
        document.getElementById('suggestions').innerHTML = '';
        return;
    }
    
    try {
        const response = await fetch('/api/suggestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: query })
        });
        
        const data = await response.json();
        displaySuggestions(data.suggestions);
        
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}

function displaySuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';
    
    if (suggestions.length === 0) return;
    
    suggestions.forEach(faq => {
        const chip = document.createElement('span');
        chip.className = 'suggestion-chip';
        chip.textContent = `❓ ${faq.question.substring(0, 40)}...`;
        chip.onclick = () => {
            userInput.value = faq.question;
            suggestionsDiv.innerHTML = '';
            chatForm.dispatchEvent(new Event('submit'));
        };
        suggestionsDiv.appendChild(chip);
    });
}

// ============================================
// FAQ Sidebar
// ============================================

async function loadFAQs() {
    try {
        const response = await fetch('/api/faqs');
        const faqs = await response.json();
        displayFAQs(faqs);
    } catch (error) {
        console.error('Error loading FAQs:', error);
        faqList.innerHTML = '<p class="loading">Error loading FAQs</p>';
    }
}

function displayFAQs(faqs) {
    faqList.innerHTML = '';
    
    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.onclick = () => {
            userInput.value = faq.question;
            chatForm.dispatchEvent(new Event('submit'));
        };
        
        faqItem.innerHTML = `
            <div class="faq-item-title">${escapeHtml(faq.question)}</div>
            <div class="faq-item-preview">${escapeHtml(faq.answer.substring(0, 50))}...</div>
        `;
        
        faqList.appendChild(faqItem);
    });
}

// ============================================
// Feedback & Utilities
// ============================================

function markHelpful(isHelpful) {
    showFeedbackModal();
    // Store feedback (in a real app, send to server)
    console.log('User marked response as:', isHelpful ? 'helpful' : 'not helpful');
}

function sendFeedback(isHelpful) {
    closeFeedbackModal();
    const feedbackMessage = isHelpful ? 
        'Great! I\'m glad I could help. 😊' : 
        'I\'ll work on improving my responses. Thank you for the feedback! 📝';
    addMessageToChat(feedbackMessage, 'bot');
}

function showFeedbackModal() {
    feedbackModal.style.display = 'block';
}

function closeFeedbackModal() {
    feedbackModal.style.display = 'none';
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadFAQs();
    userInput.focus();
    
    // Add CSS animation for typing indicator
    const style = document.createElement('style');
    style.textContent = `
        @keyframes typing {
            0%, 60%, 100% {
                opacity: 0.5;
                transform: translateY(0);
            }
            30% {
                opacity: 1;
                transform: translateY(-10px);
            }
        }
        
        #typing-indicator .message-content span {
            margin: 0 3px;
            display: inline-block;
        }
    `;
    document.head.appendChild(style);
});

// ============================================
// Keyboard Shortcuts
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl+Enter to send message
    if (e.ctrlKey && e.key === 'Enter') {
        chatForm.dispatchEvent(new Event('submit'));
    }
    
    // Esc to close modal
    if (e.key === 'Escape') {
        closeFeedbackModal();
    }
});
