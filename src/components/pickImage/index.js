import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Register from '../../services/queryToServer';
import './style.css'

export default class Pick extends Component {
	state = {
		selectedFile: null,
		username:this.props.name,
		login:false
	}
	onFileChange = e => {
		this.setState({selectedFile:e.target.files[0]})
	}
	onFileUpload = (e) => {
		e.preventDefault()
		const form = document.querySelector('form.item')
		const server = new Register()
		const formData = new FormData()
		formData.append('file',this.state.selectedFile)
		formData.append('id',localStorage.userId)
		formData.append('username',this.state.username)
		server.postData(formData, '/file/')
			  .then(res => {
			  	this.setState({login:true})
			  	console.log(res)
			  })

	}
	onInput = e => {
		this.setState({username:e.target.value})
	}
 
	render() {
		if(this.props.userId) {
			if(this.state.login) {return(<Redirect to="/app" />)}

			return (
				<div className="wrapper">
					<form className="item" onSubmit = {this.onFileUpload} >			
						<div className = 'image'>
							<input 
							type = 'file' 
							name="file" 
							onChange = {this.onFileChange} 
							className = "pick" />
						</div>
						<div className="userName">
							<input 
							type = "text" 
							onInput = {this.onInput}
							name="userName" 
							defaultValue = {this.props.name}/>
						</div>
						<div className="submit d-flex justify-content-center">
							<button type = "submit" name="submit">
								NEXT 
							</button>
						</div>
					</form>
				</div>
			)
		} else {
			return (
	            <div style = {{color:'#fff'}}>access denied</div>
	        ) 
		}
		
	}
	
}

