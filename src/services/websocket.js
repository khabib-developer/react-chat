export default class Websocket {
	constructor() {
        this._urlBase = "ws://92e2e12526a1.ngrok.io";
        // this._urlBase = "ws://localhost:8080";
	}
	socket(data = null, url = '/')  {
		const socket = new WebSocket(this._urlBase+url)
		if(data) {
			socket.onopen = () => socket.send(data)
		}
		return socket
	}
	// connect(data = null) {
	// 	// const socket = this.socket()
 //        // socket.onopen = () => socket.send(data)
	// 	// socket.onopen = () => {
 //  //           console.log("connected websocket")
 //  //           socket.send(data)
 //  //       }
 //        // socket.onmessage = event => {
 //        // 	console.log(event.data)
 //        // }
 //        socket.onclose = () => {
 //        	console.log('disconnected')
 //        }
	// }
}