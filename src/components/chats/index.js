import React, {Component} from 'react';
import Register from '../../services/queryToServer.js'
import Friends from '../friends'
import OnlineFriends from '../onlineFriends'
import Search from '../search'
export default class Chats extends Component {
	state = {
		friends:false,
		friend:[],
		online:false,
		search:null,
		searchEl:false,
		searchRes:null,
		onsearch:true
	}
	search = e => {
		let val = e.target.value.toLowerCase()
		this.setState({
			onsearch:false,
			searchEl:val
		})
		if(val === '') {
			return this.setState({
				onsearch:true,
				searchRes:null
			})
		}
		let res = this.state.search.filter(el => {
			let names = el.username.toLowerCase()
			return names.indexOf(this.state.searchEl) > -1
		})
		this.setState({searchRes:res})
	}
	componentDidMount() {
		const server = new Register(),
			  formData = new FormData(),
			  {friends, friend} = this.state
		formData.append('id',this.props.id)
		server.getData('/search/')
			  .then(res => {
			  	this.setState({search:res})
			  })
		server.postFile(formData, '/friends/')
			  .then(res => res ? JSON.parse(res):null)
			  .then(res => {
			  	this.setState({friends:res})
			  	this.getInfo(res)
			  })
		this.props.server.server.onmessage = event => {
			const data = JSON.parse(event.data),
				  server = new Register(),
			  	  formData = new FormData()
			Object.keys(data).forEach((el, i) => {
				let k = 0
				this.state.friend.forEach((item, j) => {
					if(+el === +item.id) {
						k++
					}
				})
				if(k === 0) {
					formData.append('friend_id', el)
					server.postFile(formData,'/friend/')
					  .then(res => JSON.parse(res))
				  	  .then(res => {
				  	  	this.addInfo(res, el, data[el])
				  	  })
				}
			})
			this.setState({friends:JSON.parse(event.data)})
			
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if(this.state.friends !== prevState.friends) {
			// const server = new Register(),
			//   	formData = new FormData()
			// if(this.state.friend.length !== 0) {
			// 	this.state.friend.forEach((item, i) => {
   //               	Object.keys(this.state.friends).forEach((el,i) => {
   //               		if(+item.id !== el) {

   //               		}
   //               	})
			// 	})
			// }
		}
		if(this.props.date !== prevProps.date) {
			this.state.friend.forEach((item, i) => {
				if(+item.id === +this.props.date.friend_id) {

					item.activity = this.props.date.activity
					const arr = [
						...this.state.friend.slice(0,i), 
						item, 
						...this.state.friend.slice(i+1)
					]
					
					this.setState({friend:arr})
				}
			})
		}
		if(this.props.message !== prevProps.message) {
			this.state.friend.forEach((item, i) => {
				if(item.id === this.props.message.user_two ||
					item.id === this.props.message.user_one) {
						const obj = {...item,msg:{'id':this.props.message.id,'text':this.props.message.msg}},
							  arr = [
									...this.state.friend.slice(0,i), 
									obj, 
									...this.state.friend.slice(i+1)
								]
						arr.sort((a, b) => b.msg.id - a.msg.id)
						this.setState({friend:arr})
				}
			})
		}
		if(this.props.newMsg !== prevProps.newMsg) {
			let arr = this.state.friend
			this.state.friend.forEach((item, i) => {
				this.props.newMsg.forEach(obj => {
					if(item.id === obj.friendId) {
						const object = {...item,unread:obj.count}
							  arr = [
									...arr.slice(0,i), 
									object, 
									...arr.slice(i+1)
								]
					}
				})
				
			})
			this.setState({friend:arr})
		}
	}
	getInfo = (obj) => {
		if(obj) {
			const server = new Register(),
			  formData = new FormData()
			let friend = {}
			Object.keys(obj).forEach((item, i) => {
				formData.append('friend_id', item)
				server.postFile(formData,'/friend/')
				  .then(res => JSON.parse(res))
			  	  .then(res => {
			  	  	this.addInfo(res, item, obj[item])
			  	  })
			})
		}
	}
	addInfo = (obj, key, value) => {
		const server = new Register(),
			  formData = new FormData()
		let object
		const lastMsg = (data) => {
			if(data) {
				object = {
					...obj, 
					msg: {
						'id':data.id,
						text:data.msg
					},
					unread:value[2]?value[2]:null
				}
			} else {
				object = {
					...obj, 
					msg: {
						'id':null,
						text:'no message'
					},
					unread:value[2]?value[2]:null
				}
			}
			let info = [...this.state.friend,object]
			info.sort((a, b) => b.msg.id - a.msg.id)
			this.setState({friend:info})
		}
		formData.append('friend_id', key)
        formData.append('user_one', this.props.id)
        formData.append('last', true)
		server.postFile(formData,'/message/')
                  .then(res => JSON.parse(res))
                  .then(res => lastMsg(res))
	}
	render() {
		const {friends, online, searchRes, friend, onsearch} = this.state
		if(!this.props.show) {
			return false
		}
		return (
			<div>
				<div>
					<div className="px-3 pt-3 px-lg-4 pt-lg-4">
						<h4 className="mb-2 mb-lg-4">
							Chats
						</h4>
						<div className="search-box chat-search-box">
							<div className="input-group mb-3 search rounded">
								<div className="input-group-addon">
									<button className="btn beforeInput" 
									style={{fontSize:'18px'}}>
										<i className="fa fa-search"></i>
									</button>
								</div>
								<input 
								type="text" 
								style={{color:'#000',fontSize: '0.875em'}} 
								className="border-0" 
								onInput = {this.search}
								placeholder="search messages or users" />
							</div>
						</div>
					</div>
					<OnlineFriends online = {online} />
					<Friends 
					 newMsg = {this.props.newMsg}
					 friends = {friends} 
					 friend = {friend} 
					 search = {onsearch}
					 id = {this.props.id}
					 getFriendId = {this.props.getFriendId}
					 server = {this.props.server}
					  />
					<Search 
					 search = {searchRes} 
					 id={this.props.id}
					 server = {this.props.server}
					 />
				</div>
			</div>
		)
	}
	
}
 