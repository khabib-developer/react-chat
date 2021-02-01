import React, {Component} from 'react'
import Profile from '../profile'
import Chats from '../chats'
import Contacts from '../contacts'
import Settings from '../settings'
import './chatSidebar.css'

export default class ChatSidebar extends Component {
	state = {
		show: {
			two:true,
		}
	}
	updateTab = () => {
		const show = {
			'one':false,
			'two':false,
			'three':false,
			'four':false
		}
		show[this.props.tab] = true
		this.setState({show})
	}
	componentDidUpdate(prevProps) {
		if(this.props.tab !== prevProps.tab) {
			this.updateTab()
		}
	}
	render() {
		return (
			<div className="left__chat__sidebar mr-lg-1">
				<div className="tab__content">
					<Profile show = {this.state.show['one']} />
					<Chats 
					 message={this.props.message}
					 date={this.props.activity}
					 show = {this.state.show['two']} 
					 id = {this.props.id}
					 getFriendId = {this.props.getFriendId}
					 newMsg = {this.props.newMsg}
					 server = {this.props.server} />
					<Contacts show = {this.state.show['three']} />
					<Settings show = {this.state.show['four']} />
				</div>
			</div>
		)
	}
	
}

