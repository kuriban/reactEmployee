import React, { Component } from 'react';
// import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { bindActionCreators } from 'redux';
import * as userActions from '../actions/users';
import { connect } from 'react-redux';


const NewEmployeeBlock = (props) => (
    <MuiThemeProvider>
        <NewEmployee props={props}/>
    </MuiThemeProvider>
);

class NewEmployee extends Component {
    constructor(props){
        super(props);
        this.state = ({
            name:'',
            age:'',
            nickname:'',
            visible: true
        });
        this.handeChange = this.handeChange.bind(this);
        this.createUser = this.createUser.bind(this);
    }
    handeChange(event){
        let value = event.target.value,
            colomnName = event.target.getAttribute('name');
        this.setState({
            [colomnName]: value
        })
    }
    createUser(){
        console.log(this.props);
        const { createUser } = this.props.props.userActions;
        createUser(this.state);
        // let a = [];
        // if(localStorage.users) {
        //     a = JSON.parse(localStorage.users);
        // }
        // a.push(this.state);
        // localStorage.users =  JSON.stringify(a);
        // this.setState({
        //     name:'',
        //     age:'',
        //     nickname:'',
        //     visible: true
        // })
    }
    render() {
        return (
            <div>
                <h4>New employee</h4>
                <TextField
                    hintText='name'
                    name='name'
                    value={this.state.name}
                    floatingLabelText='name'
                    floatingLabelFixed={true}
                    onChange={this.handeChange}
                />
                <br />
                <TextField
                    hintText='age'
                    name='age'
                    value={this.state.age}
                    floatingLabelText='age'
                    floatingLabelFixed={true}
                    onChange={this.handeChange}
                />
                <br />
                <TextField
                    hintText='nickName'
                    name='nickname'
                    value={this.state.nickname}
                    floatingLabelText='nickName'
                    floatingLabelFixed={true}
                    onChange={this.handeChange}
                />
                <br />
                <RaisedButton onClick={this.createUser}  style={'color: black'} label='Create'/>
                {/*<Link to='/'>*/}
                    {/*<RaisedButton style={'color: black'} label='Back'/>*/}
                {/*</Link>*/}
            </div>
        )
    }
}

function mapStore() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return{
        userActions: bindActionCreators(userActions, dispatch)
    }
}


export default connect(mapStore,mapDispatchToProps)(NewEmployeeBlock);

