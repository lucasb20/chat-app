let socket
let myUsername

function heartbeat() {
	clearTimeout(this.pingTimeout)
	this.pingTimeout = setTimeout(() => {
		this.terminate()
	}, 30000 + 1000)
}

function connect(e) {
	e.preventDefault()
	myUsername = document.getElementById('username-input').value.trim()
	if (!myUsername) return alert("Invalid username.")

	socket = new WebSocket(`ws://localhost:8080/chat?username=${encodeURIComponent(myUsername)}`)

	socket.onopen = () => {
		heartbeat()
		document.getElementById('login-screen').style.display = 'none'
		document.getElementById('chat-screen').style.display = 'flex'
	}
	socket.onmessage = (event) => {
		const msg = JSON.parse(event.data)
		renderMessage(msg)
	}
	socket.onping = heartbeat
	socket.onclose = () => {
		alert("Connection closed or username already in use.")
		clearTimeout(this.pingTimeout)
		location.reload()
	}
	socket.onerror = console.error
}

function sendMessage(e) {
	e.preventDefault()
	const input = document.getElementById('message-input')
	if (input.value.trim() && socket.readyState === WebSocket.OPEN) {
		socket.send(input.value)
		input.value = ''
	}
}

function renderMessage(msg) {
	const container = document.getElementById('messages')
	const div = document.createElement('div')

	const isMe = msg.username === myUsername
	if (msg.type === 'message') {
		div.className = `msg ${isMe ? 'sent' : 'received'}`
		div.innerHTML = `<span class="username">${msg.username}</span>${msg.data}`
	} else {
		div.className = 'msg system'
		div.innerText = `${isMe ? 'You' : msg.username} ${msg.type === 'join' ? 'joined' : 'left'}`
	}
	container.appendChild(div)
	container.scrollTop = container.scrollHeight
}
