export default class Register {
	constructor() {
        this._apiBase = 'http://websocket/src/api';
        // this._apiBase = 'http://work/api';
	}
	postData = async (data, url) => {
		const res = await fetch(`${this._apiBase}${url}`,{
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
			// credentials:"include",
			body: data
		})
		if (!res.ok) {
			throw new Error (`Could not fetch, recevied ${res.status}`)
		}
		return await res.text()
	}
	postFile = async (data, url) => {
		const res = await fetch(`${this._apiBase}${url}`,{
			method: 'POST',
			body: data
		})
		if (!res.ok) {
			throw new Error (`Could not fetch, recevied ${res.status}`)
		}
		return await res.text()
	}
	getData = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`)
		if (!res.ok) {
			throw new Error (`Could not fetch, recevied ${res.status}`)
		}
		return await res.json()		
	}
}
