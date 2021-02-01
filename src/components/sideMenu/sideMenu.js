import React, {Component} from 'react';
import './sideMenu.css';
import Register from '../../services/queryToServer';
import Logo from '../../image/crown.png'
export default class SideMenu extends Component {
	state = {
		url:null,
		active:{
			'two': 'active'
		}
	}
	getUrl(url) {
		this.setState({url})
	}
	updateTab = (number, e) => {
		this.props.tab(number)
		e.preventDefault()
		this.setState({tab:number})
		const {active} = this.state
		const updateObj = number => {
			const active = {
				'one':null,
				'two':null,
				'three':null,
				'four':null
			}
			active[number] = 'active'
			return active
		}
		this.setState({active: updateObj(number),tab:number})
	}
	render() {
		const {active} = this.state
		const url = new Register()
		const formData = new FormData()
		const image = this.state.url
		formData.append(
			'userId',
			this.props.id)
		url.postFile(formData, '/file/url.php')
		   .then(res => {
		   		// console.log(this.state.url)
		   		this.getUrl(res)
		   })
		return (
			<div className = 'side__menu d-flex flex-lg-column mr-lg-1'>
				<div className = "navbar__brand d-none d-lg-block">
					<img src = {Logo} width={"100%"} alt="" />
				</div>
				<div className="my-auto flex-lg-column w-100">
					<ul className="list-unstyled d-flex flex-lg-column mb-0 nav__items justify-content-around">
						<li className="nav__item text-center">
							<a href=""
							onClick = {(e) => {
								this.updateTab('one', e)
							}}  
							title="Profile"
							className={active.one}>
							<i className="far fa-user"></i>
							</a>
						</li>
						<li className="nav__item text-center">
							<a href=""
							onClick = {(e) => {
								this.updateTab('two', e)
							}}  
							title="Chats" 
							className={active.two}>
							<i className="far fa-envelope"></i>
							</a>
						</li>
						<li className="nav__item text-center">
							<a href=""
							onClick = {(e) => {
								this.updateTab('three', e)
							}}  
							title="Contacts"
							className={active.three}>
							<i className="fas fa-users"></i>
							</a>
						</li>
						<li className="nav__item text-center">
							<a href="" 
							onClick = {(e) => {
								this.updateTab('four', e)
							}} 
							title="Settings"
							className={active.four}>
							<i className="fas fa-cog"></i>
							</a>
						</li>
					</ul>
				</div>
				<div className="d-none d-lg-flex profile__image">
					<ul className="list-unstyled d-flex flex-lg-column w-100">
						<li className="nav__item text-center w-100 d-block pb-2"><a href="" title="Dark/Light mode"><i className="far fa-lightbulb"></i></a></li>
						<li className="nav__item text-center mx-auto">
							<a href="" title="you" className="d-block"
							 style={{
							 		backgroundImage: `url(${image})`,
							 		borderRadius: '50%',
							 		backgroundSize: '100%',
							 		backgroundPosition: 'center',
							 		height: '45px',
							 		 width: '45px'
							 		}}
							 	>
							</a>
						</li>
					</ul>
				</div>
			</div>

		)
	}

}


