import io from 'socket.io-client'

export const SOCKET_EMIT_GAME_READY = 'game-ready';
export const SOCKET_EMIT_SET_DRAWER = 'set-drawer';
export const SOCKET_EMIT_START_PLAYING = 'start-playing';
export const SOCKET_EMIT_WORD_AND_DIFFICULTY = 'word-and-difficulty';
export const SOCKET_EMIT_DRAWER_DONE = 'drawer-done';
export const SOCKET_EMIT_GUESSER_DONE = 'guesser-done';



const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3000'
export const socketService = createSocketService()

window.socketService = socketService

socketService.setup()


function createSocketService() {
    var socket = null;
    const socketService = {
        async setup() {
            socket = io(baseUrl)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        terminate() {
            socket = null
        }
    }
    return socketService
}