import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({
    port: 6379
}, () => {
    console.log('Server listening on port 6379.')
})

wss.on("connection", ws =>{
    console.log('client connected.')

    ws.on('error', console.error)

    ws.on('message', event => {
        const data = event.toString()
        const dataJson = JSON.parse(data)
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify(dataJson))
            }
        })
    })

    ws.on('close', () => {
        console.log('client disconnected.')
    })
})