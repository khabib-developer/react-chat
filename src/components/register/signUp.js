import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Loader from '../loader'
import Register from '../../services/queryToServer';
import './style.css'

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.postData = this.postData.bind(this)
        this.onInput = this.onInput.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.onClear = this.onClear.bind(this)
        this.onEmail = this.onEmail.bind(this)
        this.state =  {
            name: '',
            email: '',
            password: '',
            error: false,
            login:false,
            loading:false
        }
        this.register = new Register()
    }

    postData(e) {
        e.preventDefault()
        let {name, email, password} = this.state
        if(name !== '' && password !== '' && email !=='') {
            this.setState({loading:true})
            this.register.postData((JSON.stringify(this.state)),'/register/')
                .then(res => {
                    this.setState({login:true})
                    this.props.getData(res, name)
                })
                .finally(this.onClear)
        } else {
            this.setState({
                error:'red'
            })
        }
    }
    onClear() {
        this.setState({
            error:false,
            loading:false
        })
    }
    onInput(e) {
        this.setState({
            name: e.target.value
        })
    }
    onEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onPassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    render() {

        const {error, login, loading} = this.state,
               red = error,
               loader = loading ? <Loader /> : null
        if(login) {return ( <Redirect to="/pick/" />)}
    	return (
    		<div className="account__pages d-flex align-items-center">
                {loader}
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-5 pt-4 mt-4">
                            <div className="text-center mb-4">
                                <h4 className = "sign">Sign up</h4>
                                <p className="text-muted mb-4">Get your Chatgramm account now.</p>
                                
                            </div>
                            <div className="card border-0">
                                <div className="card-body p-4">
                                    <div className="p-0 p-sm-3">
                                        <form onSubmit = {this.postData} >
                                            <div className="form-group">
                                                <label style={{color:red}}>Email</label>
                                                <div className="input-group mb-3 d-flex flex- input-group-lg rounded-lg">
                                                    <div className="icons">
                                                        <span className="" style={{color:red}}>
                                                            <i className="far fa-envelope"></i>
                                                        </span>
                                                    </div>
                                                    <input
                                                    onInput = {this.onEmail} 
                                                    type="email" 
                                                    className="border-light"
                                                    placeholder="Enter email" />
                                                    
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label style={{color:red}}>Username</label>
                                                <div className="input-group mb-3 d-flex flex- input-group-lg rounded-lg">
                                                    <div className="icons" style={{color:red}}>
                                                        <span className="">
                                                            <i className="far fa-user"></i>
                                                        </span>
                                                    </div>
                                                    <input
                                                    onInput = {this.onInput} 
                                                    type="text" 
                                                    className="border-light" 
                                                    placeholder="Enter Username" />
                                                    
                                                </div>
                                            </div>

                                            <div className="form-group mb-4">
                                                
                                                <label style={{color:red}}>Password</label>
                                                <div className="input-group mb-3 d-flex flex- input-group-lg rounded-lg">
                                                    <div className="icons" style={{color:red}}>
                                                        <span className="">
                                                            <i className="fa fa-lock"></i>
                                                        </span>
                                                    </div>
                                                    <input
                                                    onInput = {this.onPassword} 
                                                    type="password" 
                                                    className="border-light"
                                                    placeholder="Enter Password" />
                                                    
                                                </div>
                                            </div>
                                            <div>
                                                <button className="btn btn-dark btn-block waves-effect waves-light" type="submit">Sign up</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 text-center">
                                <p>Already have an account ?<Link to="/" className="font-weight-medium text-primary"> Sign in</Link> </p>
                                <p>© 2020 Chatgramm. Crafted with <i className="fa fa-heart"></i> by Habib</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    	)
    }

}
