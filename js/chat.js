// Chat bot responses
const botResponses = {
    greeting: [
        "Hello! How can I help you today?",
        "Hi there! What can I do for you?",
        "Welcome! How may I assist you?"
    ],
    default: [
        "I'm not sure I understand. Could you please rephrase that?",
        "I'm still learning. Could you try asking that differently?",
        "I don't have an answer for that yet. Would you like to speak with a human representative?"
    ],
    goodbye: [
        "Thank you for chatting with us! Have a great day!",
        "Goodbye! Feel free to come back if you have more questions.",
        "Thanks for your time! We're here if you need anything else."
    ]
};

// Initialize chat functionality
function initializeChat() {
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');
    const sendButton = document.querySelector('.chat-input button');

    // Add initial bot greeting
    setTimeout(() => {
        addMessage(getRandomResponse('greeting'), 'bot');
    }, 1000);

    // Open chat window
    chatButton.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
        chatButton.style.display = 'none';
        chatWindow.classList.add('slide-in');
    });

    // Close chat window
    closeChat.addEventListener('click', () => {
        chatWindow.classList.add('slide-out');
        setTimeout(() => {
            chatWindow.style.display = 'none';
            chatButton.style.display = 'block';
            chatWindow.classList.remove('slide-out');
        }, 300);
    });

    // Send message on button click
    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot thinking
            setTimeout(() => {
                const botResponse = generateBotResponse(message);
                addMessage(botResponse, 'bot');
            }, 1000);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for greetings
        if (lowerMessage.match(/^(hi|hello|hey|greetings)/i)) {
            return getRandomResponse('greeting');
        }
        
        // Check for goodbyes
        if (lowerMessage.match(/^(bye|goodbye|see you|farewell)/i)) {
            return getRandomResponse('goodbye');
        }
        
        // Check for common questions
        if (lowerMessage.includes('course') || lowerMessage.includes('class')) {
            return "We offer a variety of courses in technology, programming, and digital skills. Would you like to know more about any specific course?";
        }
        
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
            return "Our course prices vary depending on the program. You can find detailed pricing information on our courses page. Would you like me to direct you there?";
        }
        
        if (lowerMessage.includes('schedule') || lowerMessage.includes('time') || lowerMessage.includes('when')) {
            return "Our courses are available in both self-paced and scheduled formats. Would you like to know more about our upcoming sessions?";
        }
        
        // Default response
        return getRandomResponse('default');
    }

    function getRandomResponse(type) {
        const responses = botResponses[type];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize chat when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeChat); 