import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChatSidebar from '../chatSidebar';
import Register from '../../services/queryToServer.js'
import SideMenu from '../sideMenu';
import {Redirect} from 'react-router-dom';
import UserChat from '../userChat';
import {SignIn, SignUp} from '../register';
import Websocket from '../../services/websocket'
import Pick from '../pickImage'
import './app.css';

class PersonalCab extends Component {
    state = {
        num:null,
        friendId:false,
        data: {},
        server:null,
        activity:null,
        message:null,
        newMsg:[]
    }
    componentDidMount() {
        const socket = new Websocket(),
              data = {
                command:'subscribe',
                id:this.props.userId
              }
        const server = {
            ws: socket.socket(JSON.stringify(data)),
            server: socket.socket(JSON.stringify(data), '/friends'),
            activity: socket.socket(JSON.stringify(data), '/activity')
        }
        const api = new Register(),
              formData = new FormData()
        formData.append('id',this.props.userId)
        api.postFile(formData, '/friends/')
              .then(res => res ? JSON.parse(res):null)
              .then(res => this.unReadMsg(res))
        this.setState({server})
        server.activity.onmessage = event => {
            this.setState({activity:JSON.parse(event.data)})
        }
        server.ws.onmessage = event => {
            const data = JSON.parse(event.data)
            if(data.user_two === this.props.userId &&
                data.user_one !== this.state.friendId) {
                if(this.state.newMsg.length !== 0) {
                    this.state.newMsg.forEach((item,i) => {
                        if(item.friendId === data.user_one) {
                            formData.append('friendId',item.friendId)
                            const newMsg = [
                             ...this.state.newMsg.slice(0,i),
                             {'friendId':data.user_one,'count':item.count+1},
                             ...this.state.newMsg.slice(i+1)
                             ]
                            this.setState({newMsg})
                            console.log(data)
                            api.postFile(formData, '/read/unread.php')
                                .then(res => console.log(res))
                        } 
                    })
                } else {
                    formData.append('friendId',data.user_one)
                    api.postFile(formData, '/read/unread.php')
                                .then(res => console.log(res))
                    this.setState({newMsg:[{'friendId':data.user_one,'count':1}]})
                } 
            } 
            this.setState({message:data})
        }
    }
    unReadMsg = obj => {
        if(obj) {
            Object.keys(obj).forEach(key => {
                 if(obj[key][2]) {
                    const newMsg = [...this.state.newMsg, {'friendId':key,'count':obj[key][2]}]
                    this.setState({newMsg})
                }
            })
        }
        
    }
    updateTab = num => {
        this.setState({num})
    }
    getFriendId = friendId => {
        this.setState({friendId})
        const server = new Register(),
              formData = new FormData()
        formData.append('id', this.props.userId)
        formData.append('friend_id', friendId)
        this.state.newMsg.forEach((item, i) => {
            if(item.friendId === friendId) {
                const newMsg = [
                         ...this.state.newMsg.slice(0,i),
                         {'friendId':item.friendId,'count':null},
                         ...this.state.newMsg.slice(i+1)
                         ]
                this.setState({newMsg})
                server.postFile(formData, '/read/')
            }
        })
    }
    changeId = () => {
        this.setState({friendId:false})
    }
    render() {
        const {userId} = this.props
        if(userId !== undefined && this.state.server) {
        return (
            <div className = 'layout__wrapper d-flex'>
                <SideMenu id = {userId} tab = {this.updateTab} />
                <ChatSidebar 
                message={this.state.message}
                id ={userId} 
                tab={this.state.num} 
                getFriendId={this.getFriendId}
                server = {this.state.server}
                activity={this.state.activity}
                newMsg = {this.state.newMsg}
                 />
                <UserChat 
                 changeId={this.changeId}
                 message={this.state.message}
                 date={this.state.activity}
                 friendId = {this.state.friendId} 
                 selfId={userId} 
                 server = {this.state.server} />
            </div>
        )
        } else {
            return (
                <div style = {{color:'#fff'}}>access denied</div>
            ) 
        } 
    }
      
}

export default class App extends Component {
    state = {
        id: false,
        username: false,
        ws:null
    }
    getId = id => {
        this.setState({id})
    }
    getData = (id, name) => {
        console.log(id+' '+name)
        this.setState({
            id:id,
            username:name
        })
    }
    render() {
        let userId = this.state.id
        if(userId) {
            localStorage.setItem('userId',userId)
        }
        return (
            <Router>
                <Route path = '/' exact component = {() => <SignIn getId = {this.getId} />} />
                <Route path = '/register' exact component = {() => <SignUp getData = {this.getData} />} />
                <Route path = '/app' exact component = {() => <PersonalCab userId = {localStorage.userId} />} />
                <Route path = '/pick/' exact component = {
                    () => <Pick userId={localStorage.userId} name={this.state.username} />
                } />
            </Router> 
        )
    }
    
}
