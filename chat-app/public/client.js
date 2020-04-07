const socket = io();
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?');
appendMessage("You joined")
socket.emit('new-user', name)

socket.on("chat-message", function (data) {
    appendMessage(`${name}: ${data.message}`)
})

socket.on("user-connected", function (name) {
    appendMessage(`${name} connected`)
})

socket.on("user-disconnected", function (name) {
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', function (element) {
    element.preventDefault();
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}