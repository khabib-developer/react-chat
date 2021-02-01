import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Register from '../../services/queryToServer';
import Loader from '../loader'
import './style.css';

export default class SignIn extends Component {
	constructor(props) {
		super(props)
		this.postData = this.postData.bind(this)
		this.onInput = this.onInput.bind(this)
		this.onPassword = this.onPassword.bind(this)
		this.onClear = this.onClear.bind(this)
		this.state =  {
			email: '',
			password: '',
			id:false,
			error:false,
			loading:false,
			login:false
		}
		this.register = new Register()
		this._isMount = false
	}
	componentDidMount() {
		this._isMount = true
	}
	postData(e) {
		e.preventDefault()
		const {email, password} = this.state
		if(email !== '' && password !== '') {
			this.setState({loading:true})
			this.register.postData((JSON.stringify(this.state)), '/register/auth.php')
				.then(res => {
					if(this._isMount) {
						if(res !== '') {
							// this.setState({login:true})
	        				this.props.getId(res)
	        				return <Redirect to="/app" />
						} else {
							this.setState({error:'red'})
						}
					}
				})
				.finally(this.onClear)
		} else {
			this.setState({error:'red'})
		}
		
	}
	onClear() {
		this.setState({
			loading:false
		})
	}
	onInput(e) {
		this.setState({
			email: e.target.value
		})
	}
	onPassword(e) {
		this.setState({
			password: e.target.value
		})
	}
	componentWillUnmount() {
		this._isMount = false
	}
	render() {
		const {error,loading,login} = this.state
		const loader = loading ? <Loader /> :null
		if(localStorage.userId) {return(<Redirect to="/app" />)}
		// if(login) {return(<Redirect to="/app" />)}
		return (
			<div className="account__pages d-flex align-items-center">
		    {loader}
		        <div className="container">
		            <div className="row justify-content-center">
		                <div className="col-md-8 col-lg-6 col-xl-5">
		                    <div className="text-center mb-4">
		                        <h4 className = 'sign'>Sign in</h4>
		                      <p className="text-muted mb-4">Sign in to continue to Chatgramm.</p>
		                    </div>
		                    <div className="card border-0">
		                        <div className="card-body p-4">
		                            <div className="p-0 p-sm-3">
		                                <form onSubmit = {this.postData} >

		                                    <div className="form-group">
		                                        <label >E-mail</label>
		                                        <div className="input-group mb-3 d-flex flex- input-group-lg rounded-lg">
		                                            <div className="icons">
		                                                <span className="">
		                                                  <i className="far fa-user" style={{color:error}}></i>
		                                                </span>
		                                            </div>
		                                            <input
		                                             style={{color:error}}
		                                             type="text"
		                                             onChange = {this.onInput}
		                                             className="border-light" 
		                                             placeholder="Enter email" />
		                                            
		                                        </div>
		                                    </div>

		                                    <div className="form-group mb-4">
		                                        <div className="float-right">
		                                            <a href="auth-recoverpw.html" className="text-muted font-size-13">Forgot password?</a>
		                                        </div>
		                                        <label>Password</label>
		                                        <div className="input-group mb-3 d-flex flex- input-group-lg rounded-lg">
		                                            <div className="icons">
		                                                <span className="" style={{color:error}}>
		                                                    <i className="fa fa-lock"></i>
		                                                </span>
		                                            </div>
		                                            <input 
		                                            style={{color:error}}
		                                            type="password" 
		                                            onChange = {this.onPassword}
		                                            className="border-light" 
		                                            placeholder="Enter Password" />
		                                            
		                                        </div>
		                                    </div>

		                                    <div className="custom-control custom-checkbox mb-4">
		                                        <input type="checkbox" className="custom-control-input" id="remember-check" />
		                                        <label className="custom-control-label" htmlFor="remember-check">Remember me</label>
		                                    </div>

		                                    <div>
		                                        <button
		                                         className="btn btn-dark btn-block waves-effect waves-light"
		                                         name = "submit"
		                                         type="submit">
		                                          Sign in
		                                        </button>
		                                    </div>

		                                </form>
		                            </div>
		                        </div>
		                    </div>

		                    <div className="mt-5 text-center">
		                        <p>Don't have an account ? <Link to="/register/" className="font-weight-medium text-primary"> Signup now </Link> </p>
		                        <p>© 2020 Chatgramm. Crafted with <i className="fa fa-heart"></i> by Habib</p>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </div>
		)
	}

}
