const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?');
appendMessage("You joined")
socket.emit('new-user', name)

socket.on("chat-message", function (data) {
    console.log('data',
        data)
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
    const emojis = ["😀", "😅", "🤣", "🙂", "🙃", "😉", "😊", "😇", "😍", "😘", "😜", "🤔", "😐", "😒", "😶", "😏", "🤥", "😌", "🤢", "🤤", "😵", "😎", "🤓", "😕", "😳", "😭", "😱", "😡", "😈", "💩", "🖕"];
    const pickEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    appendMessage(`You: ${message} ${pickEmoji}`)

    socket.emit('send-chat-message', message + pickEmoji)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}