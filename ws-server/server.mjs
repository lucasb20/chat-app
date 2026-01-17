import { createServer } from 'http'
import fs from 'fs/promises'
import path from 'path'
import WebSocket, { WebSocketServer } from 'ws'

const server = createServer(async (req, res) => {
	try {
		if (req.url === '/') {
			const data = await fs.readFile('index.html')
			res.setHeader("Content-Type", "text/html")
			res.writeHead(200)
			res.end(data)
		} else if (req.url === '/style.css') {
			const data = await fs.readFile('style.css')
			res.setHeader("Content-Type", "text/css")
			res.writeHead(200)
			res.end(data)
		} else if (req.url === '/main.js') {
			const data = await fs.readFile('main.js')
			res.setHeader("Content-Type", "text/javascript")
			res.writeHead(200)
			res.end(data)
		} else {
			res.writeHead(404)
			res.end('Not found')
		}
	} catch (error) {
		console.error('Error:', error)
		res.writeHead(500)
		res.end('Server error')
    }
})
const wss = new WebSocketServer({ noServer: true })

function heartbeat() {
	this.isAlive = true
}

const users = new Set()

wss.on('connection', (ws, username) => {
	ws.isAlive = true
	ws.on('error', console.error)
	ws.on('message', event => {
		const data = event.toString().trim()
		if (data == "") return
		wss.clients.forEach((client) => {
	   		if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify({ type: "message", username: username, data: data }))
			}
		})
	})
    ws.on('close', () => {
		users.delete(username)
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify({ type: "left", username: username }))
			}
		})
    })
	ws.on('pong', heartbeat)
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({ type: "join", username: username }))
		}
	})
})

const interval = setInterval(function ping() {
	wss.clients.forEach(function each(ws) {
		if (ws.isAlive === false) return ws.terminate()
		ws.isAlive = false
		ws.ping()
	})
}, 30000)

wss.on('close', function close() {
	clearInterval(interval)
})

server.on('upgrade', function upgrade(request, socket, head) {
	const { pathname, searchParams } = new URL(request.url, 'wss://base.url')
	if (pathname === '/chat' && searchParams.has('username') && !users.has(searchParams.get('username'))) {
		users.add(searchParams.get('username'))
		wss.handleUpgrade(request, socket, head, function done(ws) {
   			wss.emit('connection', ws, searchParams.get('username'))
		})
	} else {
		socket.destroy()
	}
})

server.listen(8080)
