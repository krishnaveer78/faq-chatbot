const faqs = [
    {
        id: 1,
        question: "How do I reset my password?",
        answer: "Go to the login page, click 'Forgot Password', and follow the email instructions to create a new password."
    },
    {
        id: 2,
        question: "What are your business hours?",
        answer: "We are available Monday through Friday from 9:00 AM to 6:00 PM."
    },
    {
        id: 3,
        question: "Do you offer refunds?",
        answer: "Yes, refunds are available within 30 days of purchase if the item is unused and in its original condition."
    },
    {
        id: 4,
        question: "How can I contact support?",
        answer: "You can contact support by emailing support@example.com or using the contact form on our website."
    },
    {
        id: 5,
        question: "Is there a mobile app?",
        answer: "Yes, our mobile app is available on both iOS and Android app stores."
    },
    {
        id: 6,
        question: "How do I update my profile?",
        answer: "Open your account settings and choose the profile section to edit your personal information."
    },
    {
        id: 7,
        question: "What payment methods do you accept?",
        answer: "We accept credit cards, debit cards, PayPal, and bank transfers."
    },
    {
        id: 8,
        question: "Can I cancel my subscription?",
        answer: "Yes, you can cancel at any time from the billing section of your account dashboard."
    }
];

const chatBox = document.getElementById('chatBox');
const faqList = document.getElementById('faqList');
const userInput = document.getElementById('userInput');
const questionForm = document.getElementById('questionForm');
const sendBtn = document.getElementById('sendBtn');
const detailModal = document.getElementById('detailModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalConfidence = document.getElementById('modalConfidence');
const closeModalBtn = document.getElementById('closeModalBtn');

function loadFAQs() {
    faqList.innerHTML = '';

    faqs.forEach((faq) => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML = `
            <div class="faq-item-question">${faq.question}</div>
            <div class="faq-item-id">FAQ #${faq.id}</div>
        `;
        item.addEventListener('click', () => showFAQDetail(faq.question, faq.answer));
        faqList.appendChild(item);
    });
}

function normalizeText(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function tokenize(text) {
    return normalizeText(text).split(' ').filter(Boolean);
}

function getBestMatch(userQuestion) {
    const questionTokens = new Set(tokenize(userQuestion));
    let bestMatch = null;
    let bestScore = -1;

    faqs.forEach((faq) => {
        const faqTokens = tokenize(faq.question + ' ' + faq.answer);
        const overlap = faqTokens.filter((token) => questionTokens.has(token)).length;
        const score = overlap / Math.max(questionTokens.size, 1);

        if (score > bestScore) {
            bestScore = score;
            bestMatch = faq;
        }
    });

    const confidence = Math.min(0.98, 0.35 + bestScore * 0.65);

    return {
        ...bestMatch,
        confidence
    };
}

function addMessageToChat(message, sender, info = '') {
    const wrapper = document.createElement('div');
    wrapper.className = `message ${sender}-message`;

    const text = document.createElement('p');
    text.textContent = message;
    wrapper.appendChild(text);

    if (info) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'message-info';
        infoDiv.textContent = info;
        wrapper.appendChild(infoDiv);
    }

    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function askQuestion(event) {
    event.preventDefault();

    const question = userInput.value.trim();
    if (!question) return;

    addMessageToChat(question, 'user');
    userInput.value = '';
    sendBtn.disabled = true;

    const match = getBestMatch(question);
    const answer = match ? match.answer : 'I could not find a matching answer right now.';
    const confidenceText = `${Math.round(match.confidence * 100)}% match confidence`;

    setTimeout(() => {
        addMessageToChat(answer, 'bot', `Matched FAQ: "${match.question}" (${confidenceText})`);
        sendBtn.disabled = false;
        userInput.focus();
    }, 300);
}

function showFAQDetail(question, answer, confidence = null) {
    modalTitle.textContent = question;
    modalBody.textContent = answer;

    if (confidence !== null) {
        modalConfidence.textContent = `Confidence: ${Math.round(confidence * 100)}%`;
        modalConfidence.style.display = 'inline-block';
    } else {
        modalConfidence.textContent = '';
        modalConfidence.style.display = 'none';
    }

    detailModal.style.display = 'block';
    detailModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    detailModal.style.display = 'none';
    detailModal.setAttribute('aria-hidden', 'true');
}

function clearHistory() {
    chatBox.innerHTML = '';
    addMessageToChat('Hi! 👋 I’m your FAQ assistant. Ask me any question and I’ll help you find the answer.', 'bot');
}

questionForm.addEventListener('submit', askQuestion);
closeModalBtn.addEventListener('click', closeModal);
detailModal.addEventListener('click', (event) => {
    if (event.target === detailModal) {
        closeModal();
    }
});
document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        questionForm.requestSubmit();
    }
});

loadFAQs();
addMessageToChat('Hi! 👋 I’m your FAQ assistant. Ask me any question and I’ll help you find the answer.', 'bot');
