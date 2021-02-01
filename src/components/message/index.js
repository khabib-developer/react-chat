import React, {Component} from 'react';

export default class Message extends Component {
	constructor(props) {
		super(props)
		this.elm = React.createRef()
	}
	state = {
		transform:null,
		opacity:null
	}
	componentDidMount() {
		this.setState({
			transform:'translateY(0px)',
			opacity:'1'
		})
	}
	render() {
		let right = null
		const {item, id, key} = this.props
		if(item.user_one !== id) {
			right = 'right'
		}
		if(item.user_one === id || item.user_two === id) {
			return (
				<li key = {key} ref = {this.elm} className='py-3' style={{textAlign:right}}>
					<div className="chat__content" 
						style={{transform:this.state.transform,opacity:this.state.opacity}}>
						<span className="p-2 px-4">
							{item.msg}		
						</span>		
						<div 
						className="pl-2" 
						style = {{fontSize:'.7em',display:'inline-block'}}>{item.time.slice(-8, -3)}</div>
					</div>
				</li>
			)
		} else {
			return <div></div>
		}
		
	}
	
}
