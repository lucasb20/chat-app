
//const WS_server = process.env.WS_server

const WS_server = 'ws://localhost:6379'

export const get_WS_server = () => {
    return WebSocket(WS_server)
}