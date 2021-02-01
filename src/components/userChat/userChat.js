import React, {Component, useState} from 'react';
import Register from '../../services/queryToServer.js'
import Websocket from '../../services/websocket'
import Message from '../message'
import Time from '../time'
import './userChat.css'

class ChatWrapper extends Component {
	state = {
		message:null,
		scroll:true
	}
	componentDidMount() {
		// this.props.server.ws.onmessage = event => {
  //       	this.setState({message:JSON.parse(event.data)})
  //       }

	}
	componentDidUpdate(prevProps, prevState) {
		if(this.props.msg !== prevProps.msg) {
			this.setState({message:this.props.msg})
		}
		if(this.props.message !== prevProps.message &&
			(this.props.message.user_one === this.props.friendId ||
				this.props.message.user_one === this.props.selfId)) {
			const obj = [...this.state.message,this.props.message]
			this.setState({message:obj})
		}
		if(this.state.message !== prevState.message) {
			this.props.conservation.current.scrollTop = this.props.wrapper.current.offsetHeight
		}

	}
	render() {
		const {message} = this.state
		if(message !== null) {
			return (
				<ul className="list-unstyled ul">
					{	
						message.map(item => {
							return (
								<Message
								 key={item.id} 
								 item = {item} 
								 id = {this.props.friendId} />
							)
						})
					} 

				</ul>
			)
		}  else {
			return <div>loading...</div>
		}
	}
	
}
class ChatCab extends Component {
	constructor(props) {
		super(props)
		this.wrapper = React.createRef()
		this.conservation = React.createRef()
	}
	state = {
		friend:null,
		msg:false,
		text:null
	}
	componentDidUpdate(prevProps) {
		if(this.props.id !== prevProps.id) {
			const server = new Register(),
              	  formData = new FormData()
            formData.append('friend_id', this.props.id)
            formData.append('user_one', this.props.selfId)
            formData.append('last', 'false')
            server.postFile(formData,'/friend/')
                  .then(res => JSON.parse(res))
                  .then(res => this.setState({friend:res}))
            server.postFile(formData,'/message/')
                  .then(res => JSON.parse(res))
                  .then(res => this.setState({msg:res}))
		}
		if(this.props.date !== prevProps.date) {

			if(+this.props.id === +this.props.date.friend_id) {
				const friend = this.state.friend
				friend.activity = this.props.date.activity
				this.setState({friend})
			}	
		}
	}
	
	time = (time) => {
		if(time !== 'online') {
			return (<div 
				className='d-flex'
				style={{fontSize:'0.8em',color:'#abb4d2'}}
				>
				<Time date={time} /><span className='pl-1'>назад</span>
				</div>)
		}
		else return <div style={{fontSize:'0.8em',color:'#40f570'}}>В сети</div>
	}
	render() {
		if(this.props.id && this.state.friend) {
			const {friend, msg} = this.state
			return (
				<>
					<div className="p-2 p-lg-4" style={{borderBottom:'1px solid #f0eff5'}}>
						<div className="row align-items-center ml-0 mr-0">
							<div className="d-flex align-items-center">
								<div 
								onClick={this.props.changeId}
								className='pl-2 pr-3 back'>
								<i class="fas fa-arrow-circle-left"></i>
								</div>
								<div 
								className="friends__image rounded-circle"
								style={{
									backgroundImage: `url(${friend.url})`,
									border:'0.5px solid #f0eff5',
							 		borderRadius: '50%',
							 		backgroundSize: '100%',
							 		backgroundPosition: 'center',
								}}>
								</div>
								<div className="friends__name pl-3 d-flex flex-column">
									{friend.username}
									{this.time(friend.activity)}
								</div>
							</div>
						</div>
					</div>
					<div className="chat__conservation p-3 p-lg-4" ref = {this.conservation}>
						<div className="chat__wrapper" ref={this.wrapper}>
							<ChatWrapper 
							message = {this.props.message}
							msg={msg} 
							selfId = {this.props.selfId}
							wrapper={this.wrapper} 
							conservation = {this.conservation}
							friendId = {this.props.id} 
							server = {this.props.server} />
						</div>
					</div>
					<div className="p-md-3 p-0 p-lg-4 send__message" style={{borderTop:' 1px solid #f0eff5'}}>
						<form action="" onSubmit = {this.props.sendData} className = "w-100">
							<div className="row no-gutters">
								<div className="col-10">
									<input
										ref = {this.props.input} 
										onInput = {(e) => this.props.msg(e.target.value)}
										type="text" 
										className="enter__message" 
										placeholder="Enter Message..." />
								</div>
								<div className="col-2 d-flex justify-content-around">
									<button
										className="w-25 border-0 file" style={{background:'transparent'}}>
											<i className="far fa-grin"></i>
									</button>
									<button
										className="w-25 border-0 file" style={{background:'transparent'}}>
											<i className="far fa-folder"></i>
									</button>
									<button
										type = "submit"
										className="w-25 border-0" style={{background:'transparent'}}>
											<i className="fas fa-paper-plane"></i>
									</button>
								</div>
							</div>
						</form>
					</div>
				</>
			)
		} else {
			return (
				<div 
				className="w-100 d-flex align-items-center justify-content-center"
				style={{height:'100vh',color:'#000'}}>
					Viberite komu xotite napisat
				</div>
			)
		}
	}
	
}
export default class UserChat extends Component {
	constructor(props) {
		super(props)
		this.myRef = React.createRef()
	}
	state = {
		msg:null,
		friend:null,
		data: null
	}
	componentDidUpdate(prevProps) {
		if(this.props.friendId !== prevProps.friendId) {
			const data = {
	        	  	user_one: this.props.selfId,
	        	  	user_two: this.props.friendId
	        	  }
        	this.setState({data})
		}
		
	}
	sendData = (e) => {
		e.preventDefault()
		if(this.myRef.current.value !== "") {
			const {msg, data} = this.state
			try {
				this.props.server.ws.send(JSON.stringify(data))
			} catch(e) {
				console.log(e);
			}
			this.myRef.current.value = ""
			
		}
	}
	msg = txt => {
		const data = {
			command:'message',
			...this.state.data,
			txt
		}
		this.setState({data})
	}
	render() {
		return (
			<div className="user__chat w-100" style={{transform:this.props.friendId?'translateX(0%)':''}}>
				<div className="d-lg-flex">
					<div className="w-100">
						<ChatCab 
                		changeId={this.props.changeId}
						date={this.props.date}
						server = {this.props.server}
						id={this.props.friendId}
						selfId = {this.props.selfId}
						sendData = {this.sendData} 
						msg = {this.msg}
						message = {this.props.message}
						input = {this.myRef} />
					</div>
				</div>
			</div>
		)
	}
	

}