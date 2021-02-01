import React, {Component} from 'react';
import Register from '../../services/queryToServer.js'


export default class Search extends Component {
	state = {
		element:null,
		query:[],
		res:[],
		loading:false
	}
	addToFriend = (friend_id, e, i) => {
		// this.setState({loading:true})
		// e.target.style.display = 'none'
		const data = {
			command:'send',
			friend_id:friend_id,
			id:this.props.id
		}
		this.props.server.server.send(JSON.stringify(data))
		let arr = []
		arr = [...this.state.query.slice(0,i), {query:true,show:false,self:false}, ...this.state.query.slice(i+1)]
		this.setState({query:arr})
		// console.log(this.state.query)
		// const server = new Register(),
		// 	  formData = new FormData()
		// formData.append('id', this.props.id)
		// formData.append('friend_id', friend_id)
		// server.postFile(formData, '/addToFriends/')
		// 	  .then(res => {
		// 		  this.setState({query:arr})
		// 		})
	}
	componentDidMount() {
		let arr = []
		this.setState({query:arr})
	}
	componentDidUpdate(prevPros) {
		if((this.props.search !== prevPros.search) && this.props.search) {
			const {search} = this.props
			this.setState({res:search})
			let arr = []
			for(let i = 0; i<search.length; i++) {
				if(search[i].id === this.props.id) {
					arr[i] = {
							query:false,
							show:false,
							self:true
						}
				} else {
					if(search[i].friends_ids) {
						for (let variable in JSON.parse(search[i].friends_ids)) {
							if(variable === this.props.id) {
								arr[i] = {
									query:false,
									show:false,
									self:false
								}
								break;
							} else {
								arr[i] = {
									query:false,
									show:true,
									self:false
								}
							}
						}
					} else {
						arr[i] = {
							query:false,
							show:true,
							self:false
						}
					}
				}
			}
			this.setState({query:arr})
		}
	}
	
	render() {
		let {search} = this.props,
			{query, loading, res} = this.state,
			show = 'block',
			success = null
		if(!search) {
			return false
		}
		if(search.length === 0) {
			return (
				<div className="text-center" style={{color:'#fff'}}>No results</div>
			)
		}
		return (

			<div className="px-2">
				<h5 className="mb-3 px-3" style={{fontSize: '16px'}}>
					Rezultati
				</h5>
				<div className="chat__message__list">
					<div className="all__friends">
						<ul className="list-unstyled">
							{
								res.map((item, i) => {
									return (
										<li key={item.id}>
											<a href="#" className="chat__friends">
												<div 
												className="friends__image rounded-circle"
												style={{
													backgroundImage: `url(${item.url})`,
											 		borderRadius: '50%',
											 		backgroundSize: '100%',
											 		backgroundPosition: 'center',
												}}>
												</div>
												<div 
												className="last__message pl-3 d-flex align-items-center justify-content-between"
												style={{flex:'auto'}}>
													<h5 className="friend__name mb-1">
														{item.username}
													</h5>
													<div
														style={{display:query[i].show ? 'block':'none'}}
														onClick={(e) => this.addToFriend(item.id,e,i)}
														className="addToFriend">
														<i className="fas fa-users pr-1"></i>
															Добавить
													</div>
													<div style = {{display:query[i].show || query[i].self ? 'none':'block'}}>
														Ваш друг
													</div>
													<div style = {{display:query[i].self ? 'block':'none'}}>
														Вы
													</div>
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