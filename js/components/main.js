import React,{ Component } from 'react';
import { Link } from 'react-router'

import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import SelectFieldExampleNullable from './employee';
import { employees } from './users';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class Main extends Component {
    constructor(props){
        super(props);
        this.sortUsers = this.sortUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handeChangeFilter = this.handeChangeFilter.bind(this);
        this.state = ({
            users : localStorage.users ? JSON.parse(localStorage.users) : []
        });
    }

    handleChange(event){
        let countUser = event.target.getAttribute('data-user');
        this.state.users[countUser].employee = !this.state.users[countUser].employee;
        this.setState({
            users: this.state.users
        });
    }
    sortUsers(event){
        let colomnName = event.target.getAttribute('data-name'),
            newUser = this.state.users.sort( (a,b)=>{
                return a[colomnName] >b[colomnName] ? 1 : -1;
            });

        this.setState({
            users: newUser
        });
    }
    handeChangeFilter(event){
        let char = event.target.value.toLowerCase(),
            field = event.target.getAttribute('name');
        this.state.users.map((element,index)=>{
            element.visible = element[field].toLowerCase().indexOf(char) !== -1;
            return element;
        });

        this.setState({
            users: this.state.users
        })
    }
    render(){
        let displayNone = {
                display:'none'
            };

        return(
            <div>
                <h2>Filters</h2>
                <TextField
                    hintText="name"
                    name="name"
                    floatingLabelText="Name"
                    floatingLabelFixed={true}
                    onChange={this.handeChangeFilter}
                />
                <TextField
                    hintText="nickName"
                    name="nickname"
                    floatingLabelText="nickName"
                    floatingLabelFixed={true}
                    onChange={this.handeChangeFilter}
                /><br />
                <TextField
                    hintText="age"
                    name="age"
                    floatingLabelText="Age"
                    floatingLabelFixed={true}
                    onChange={this.handeChangeFilter}
                />

                <SelectFieldExampleNullable />
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow onClick={this.sortUsers}>
                            <TableHeaderColumn data-name="name">Name</TableHeaderColumn>
                            <TableHeaderColumn data-name="age">Age</TableHeaderColumn>
                            <TableHeaderColumn data-name="nickname">Nikname</TableHeaderColumn>
                            <TableHeaderColumn data-name="employee">Employee</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.state.users.map( (element,index) => {
                                return (
                                    <TableRow key={index} style={ element.visible ? {} : displayNone }>
                                        <TableRowColumn>{element.name}</TableRowColumn>
                                        <TableRowColumn>{element.age}</TableRowColumn>
                                        <TableRowColumn>{element.nickname}</TableRowColumn>
                                        <TableRowColumn>
                                            <Checkbox checked={element.employee} data-user={index} onClick={this.handleChange}/>
                                        </TableRowColumn>
                                    </TableRow>
                                )

                        })
                        }
                    </TableBody>
                </Table>
                <Link to="/newemployee">
                    <RaisedButton style={'color: black'} label="Новый сотрудник"/>
                </Link>
            </div>
        )
    }
}

