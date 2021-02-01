import React, {Component} from 'react';
import Register from '../../services/queryToServer.js'
import Time from '../time'
// const Sended = ({show}) => {
// 	if(!show) {
// 		return (
// 			<div>отправлень</div>
// 		)
// 	} else {
// 		return null
// 	}
// }
// const Accept = ({show, accept, id}) => {
// 	if(!show) {
// 		return (
// 			<div
// 				onClick = {() => accept(id)}
// 				className="addToFriend">
// 				<i className="fas fa-users pr-1"></i>
// 					Принять
// 			</div>
// 		)
// 	} else {
// 		return null
// 	}
// }

export default class  Friends extends Component  {
	state = {
		friends:false,
		interval:{},
		bcg: {},
		newMsg:null
	}
	componentDidMount() {
		const {friends} = this.props
		if(friends) {
			this.setState({friends:Object.values(friends)})
		}
	}
	componentDidUpdate(prevProps) {
		if(this.props.newMsg !== prevProps.newMsg) {
			this.setState({newMsg:this.props.newMsg})
		}
	}
	accept = friend_id => {
		const data = {
			command:"accept",
			id:this.props.id,
			friend_id:friend_id
		}
		this.props.server.server.send(JSON.stringify(data))
	}
	changeBcg = id => {
		const bcg = {}
		this.props.friend.forEach(item => {
			bcg[item.id] = null
		})
		bcg[id] = '#E6EBF5'
		this.setState({bcg})
	}
	time = (time) => {
		if(time !== 'online') {
			return  (
				<div style={{fontSize:'.8em',marginTop:'-3%'}}>
					<Time date={time} />
				</div>
			)
		}
		else return null
	}
	render() {
		if(!this.props.friends || !this.props.search) {
			return false
		}
		const {friends, friend, interval} = this.props,
			  {bcg} = this.state
		if(friend) {
			return (
				<div className="px-2">
					<h5 className="mb-3 px-3" style={{fontSize: '16px'}}>
						Recent
					</h5>
					<div className="chat__message__list">
						<div className="all__friends">
							<ul className="list-unstyled">
								{
									friend.map((item, i) => {
										return (
											<li key = {i}>
												<a href="#" 
												 onClick={(e) => {
													 	e.preventDefault()
													 	this.changeBcg(item.id)
													 	this.props.getFriendId(item.id)
												 	}
												 }
												 className="chat__friends" 
												 style={{backgroundColor:bcg[item.id]}}>
													<div 
													className="friends__image rounded-circle"
													style={{
														backgroundImage: `url(${item.url})`,
												 		borderRadius: '50%',
												 		backgroundSize: '100%',
												 		backgroundPosition: 'center',
													}}>
														<div 
														className='online'
														style={{display:item.activity === 'online'?'block':'none'}}
														>
														</div>
													</div>
													
													<div 
													className="last__message pl-3 d-flex align-items-center justify-content-between"
													style={{flex:'auto'}}
													>
														<h5 className="friend__name mb-1 pt-1 d-flex flex-column w-100">
															<span className='d-flex flex-row justify-content-between'>
																{item.username}
																<span style={{color:'#abb4d2'}}>
																	{this.time(item.activity)}
																</span>
															</span>
															<span 
															className='pt-1 d-flex flex-row justify-content-between'
															style={{color:'#abb4d2'}}>
																{item.msg['text']}
																{item.unread?<span className="unReadMsg">{item.unread}</span>:null}
															</span>
														</h5>
													</div>
												</a>
											</li>
										)
									})
								}
							</ul>
						</div>
					</div>
				</div>
			)
		}
		
	}
	
}